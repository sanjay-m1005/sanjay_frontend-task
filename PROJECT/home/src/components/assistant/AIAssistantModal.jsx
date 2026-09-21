import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Droplet
} from 'lucide-react';
import { useIoT } from '../../context/IoTContext';
import { PRODUCTS } from '../../data/productsData';

export const AIAssistantModal = ({ isOpen, onClose }) => {
  const { ownedDeviceIds, deviceStates, triggerDeviceAction } = useIoT();
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: "Hello! I'm **KinBot**, your KinNest Smart Home & Care Assistant. 🌿 How can I help you check on your plants, pets, nursery, or devices today?",
      chips: [
        'Is my plant okay?',
        'How is my dog?',
        'Are my doors locked?',
        'What devices do I own?',
        'How does IoT hardware connect?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Intelligent Context-Aware Response Generator
  const generateBotReply = (query) => {
    const q = query.toLowerCase().trim();
    const states = deviceStates;
    const owned = ownedDeviceIds;

    // 1. Plant Queries
    if (q.includes('plant') || q.includes('moisture') || q.includes('soil') || q.includes('water')) {
      if (!owned.includes('plant')) {
        return {
          text: "🌱 You don't have the **Smart Plant Monitor** connected to your Smart Home yet! You can add it anytime from the Products catalog.",
          actionBtn: null
        };
      }
      const plant = states.plant;
      if (plant.moisture < 35) {
        return {
          text: `⚠️ **Your plant may need water.** Soil moisture is currently **${plant.moisture}%** (critical threshold is 40%) and ambient temperature is **${plant.temp}°C**. The foliage is beginning to show dehydration signs.`,
          actionBtn: {
            label: '💧 Water Plant Now',
            onClick: () => triggerDeviceAction('plant', 'WATER_PUMP', { state: true })
          }
        };
      } else {
        return {
          text: `🌱 **Your plant currently looks healthy and thriving!** Soil moisture is at an optimal **${plant.moisture}%** and temperature is **${plant.temp}°C**. Last watered: *${plant.lastWatered}*.`,
          actionBtn: null
        };
      }
    }

    // 2. Dog Queries
    if (q.includes('dog') || q.includes('puppy') || q.includes('kibble')) {
      if (!owned.includes('dog')) {
        return {
          text: "🐶 You haven't added **Smart Dog Care** to your home yet. Visit the Products tab to add automated portion dispensing!",
          actionBtn: null
        };
      }
      const dog = states.dog;
      if (q.includes('feed') || q.includes('food') || q.includes('dispense')) {
        triggerDeviceAction('dog', 'FEED');
        return {
          text: `🐶 **Dispensing 250g of kibble right now!** Feeder auger motor is spinning. Last fed was at *${dog.lastFed}*.`,
          actionBtn: null
        };
      }
      return {
        text: `🐶 **Your dog's status is ${dog.health}.** Food hopper capacity is at **${dog.foodLevel}%** and fresh water reservoir is at **${dog.waterLevel}%**. Last feeding was: *${dog.lastFed}*.`,
        actionBtn: {
          label: '🍖 Dispense Meal Now',
          onClick: () => triggerDeviceAction('dog', 'FEED')
        }
      };
    }

    // 3. Cat Queries
    if (q.includes('cat') || q.includes('kitten') || q.includes('fountain')) {
      if (!owned.includes('cat')) {
        return {
          text: "🐱 The **Smart Cat Care** station is not currently connected to your account. Add it to monitor whisker-safe feeding & water filtration.",
          actionBtn: null
        };
      }
      const cat = states.cat;
      return {
        text: `🐱 **Your cat is ${cat.health}!** Food hopper is at **${cat.foodLevel}%** and the triple-filtration water fountain is currently **${cat.fountainActive ? 'Running' : 'Paused'}**.`,
        actionBtn: {
          label: '🐱 Dispense Cat Meal',
          onClick: () => triggerDeviceAction('cat', 'FEED')
        }
      };
    }

    // 4. Bird Queries
    if (q.includes('bird') || q.includes('canary') || q.includes('aviary') || q.includes('seed')) {
      if (!owned.includes('bird')) {
        return {
          text: "🐦 You don't have the **Smart Bird Care** module active yet. You can add it from the catalog to automate aviary feeding.",
          actionBtn: null
        };
      }
      const bird = states.bird;
      return {
        text: `🐦 **Your birds have food available and water level is normal!** Seed hopper is at **${bird.seedLevel}%**, bird bath level is **${bird.waterBathLevel}%**, and latest activity was: *${bird.activity}*.`,
        actionBtn: {
          label: '🌾 Replenish Seeds',
          onClick: () => triggerDeviceAction('bird', 'FEED')
        }
      };
    }

    // 5. Fish Queries
    if (q.includes('fish') || q.includes('aquarium') || q.includes('tank')) {
      if (!owned.includes('fish')) {
        return {
          text: "🐟 **Smart Fish Care** is not active in your Smart Home yet. Add it to monitor water temperature, aeration, and timed flake feeding.",
          actionBtn: null
        };
      }
      const fish = states.fish;
      return {
        text: `🐟 **Aquarium status is ${fish.health}.** Submersible thermal probe reads **${fish.waterTemp}°C**, tank level is **${fish.waterLevel}%**, and bubble aeration is **${fish.aerationActive ? 'Active' : 'Standby'}**.`,
        actionBtn: {
          label: '🐟 Feed Flakes',
          onClick: () => triggerDeviceAction('fish', 'FEED')
        }
      };
    }

    // 6. Door Lock Queries
    if (q.includes('door') || q.includes('lock') || q.includes('gate') || q.includes('secure')) {
      if (!owned.includes('door')) {
        return {
          text: "🚪 The **Smart Door Lock** is not yet registered. Add it to control motorized deadbolt security from your dashboard.",
          actionBtn: null
        };
      }
      const door = states.door;
      if (door.isLocked) {
        return {
          text: `🔒 **Your front door is safely LOCKED.** Deadbolt is fully extended. Battery level is **${door.batteryPercent}%**. Status: *${door.lastActivity}*.`,
          actionBtn: null
        };
      } else {
        return {
          text: `⚠️ **Front Door is currently UNLOCKED!** Access is open. Would you like me to engage the deadbolt now?`,
          actionBtn: {
            label: '🔒 Lock Door Now',
            onClick: () => triggerDeviceAction('door', 'TOGGLE_LOCK', { state: true })
          }
        };
      }
    }

    // 7. Baby Monitor Queries
    if (q.includes('baby') || q.includes('nursery') || q.includes('crib') || q.includes('cry')) {
      if (!owned.includes('baby')) {
        return {
          text: "👶 **Smart Baby Monitor** is not connected. Add it to track nursery audio decibels, cry alerts, and stream simulated camera video.",
          actionBtn: null
        };
      }
      const baby = states.baby;
      return {
        text: `👶 **Nursery status: ${baby.cryDetected ? '⚠️ CRY ALERT ACTIVE' : 'Peaceful Rest'}.** Audio level is **${baby.soundDecibels} dB**, room temperature is **${baby.roomTemp}°C**, and night vision is **${baby.nightVision ? 'ON' : 'OFF'}**.`,
        actionBtn: {
          label: '🎵 Toggle Soothing Lullaby',
          onClick: () => triggerDeviceAction('baby', 'TOGGLE_LULLABY')
        }
      };
    }

    // 8. Light & Fan Queries
    if (q.includes('light') || q.includes('lamp') || q.includes('fan') || q.includes('breeze')) {
      const light = states.light;
      const fan = states.fan;
      return {
        text: `💡 **Smart Light:** ${light.isOn ? `ON at ${light.brightness}% (${light.colorTemp}K)` : 'OFF'} • 🌀 **Smart Fan:** ${fan.isOn ? `Speed ${fan.speed} (${fan.rpm} RPM)` : 'OFF'}.`,
        actionBtn: null
      };
    }

    // 9. List Owned Devices
    if (q.includes('device') || q.includes('own') || q.includes('connected') || q.includes('products')) {
      const ownedProducts = PRODUCTS.filter(p => owned.includes(p.id));
      if (ownedProducts.length === 0) {
        return {
          text: "You currently have **0 active devices** connected. You are in Clean Slate mode. Open the **Products** page to add your favorite smart home products!",
          actionBtn: null
        };
      }
      const names = ownedProducts.map(p => `${p.emoji} **${p.name}**`).join(', ');
      return {
        text: `You currently have **${ownedProducts.length} devices** active in your KinNest Home:\n\n${names}\n\nAll of them are reporting telemetry to your Dashboard!`,
        actionBtn: null
      };
    }

    // 10. IoT Hardware Integration Question
    if (q.includes('iot') || q.includes('hardware') || q.includes('esp32') || q.includes('backend') || q.includes('mqtt')) {
      return {
        text: "📡 **How KinNest IoT Architecture Works:**\n\n1. Currently, all sensor telemetry & controls run through a reactive state engine (`IoTContext` + `localStorage`).\n2. Real hardware connects via **ESP32 microcontrollers** equipped with capacitive moisture probes, ultrasonic distance sensors, digital temperature ICs, and relays.\n3. Devices communicate over lightweight **MQTT 3.1.1 / WebSockets** directly to our cloud broker. When live hardware is ready, the frontend switches from mock data to real MQTT topics without changing a single UI component!",
        actionBtn: null
      };
    }

    // Default Fallback
    return {
      text: "I can check any of your connected devices, monitor plant soil moisture, feed your pets, check door locks, or explain how KinNest IoT hardware integrates. What would you like to explore?",
      actionBtn: null
    };
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const reply = generateBotReply(query);
      const botMsg = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'bot',
        text: reply.text,
        actionBtn: reply.actionBtn
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 sm:right-6 sm:bottom-6 sm:inset-y-auto sm:w-[420px] sm:h-[620px] z-50 flex flex-col bg-white/95 backdrop-blur-xl sm:rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-kin-700 via-emerald-700 to-teal-700 text-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
            🤖
          </div>
          <div>
            <h3 className="font-extrabold text-sm flex items-center gap-1.5">
              <span>KinBot Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            </h3>
            <p className="text-[11px] text-emerald-100 font-medium">
              KinNest Smart Home Intelligence
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Close Assistant"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-kin-600 text-white rounded-br-xs'
                  : 'bg-slate-100/90 text-slate-800 rounded-bl-xs border border-slate-200/60'
              }`}
            >
              {/* Parse basic bolding and linebreaks */}
              <div 
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: m.text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                }}
              />

              {/* Optional embedded action button */}
              {m.actionBtn && (
                <button
                  onClick={() => {
                    m.actionBtn.onClick();
                    setMessages(prev => [
                      ...prev,
                      {
                        id: 'msg-action-' + Date.now(),
                        sender: 'bot',
                        text: `✅ Action executed: ${m.actionBtn.label}`
                      }
                    ]);
                  }}
                  className="mt-2.5 px-3 py-1.5 rounded-xl bg-kin-600 hover:bg-kin-700 text-white font-semibold text-[11px] flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm"
                >
                  <span>{m.actionBtn.label}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick Suggestion Chips on initial message */}
            {m.chips && (
              <div className="mt-3 flex flex-wrap gap-1.5 max-w-[95%]">
                {m.chips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip)}
                    className="px-2.5 py-1 rounded-full bg-kin-50 hover:bg-kin-100 text-kin-800 text-[10px] font-semibold border border-kin-200/80 transition-colors shadow-2xs"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-slate-400 text-xs p-2 bg-slate-50 rounded-2xl w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
            <span className="text-[10px] ml-1">KinBot is analyzing telemetry...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask: 'Is my plant okay?' or 'Feed my dog'..."
          className="flex-1 bg-slate-50 text-slate-800 text-xs px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-kin-400/50"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-10 h-10 rounded-2xl bg-kin-600 hover:bg-kin-700 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-sm shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
