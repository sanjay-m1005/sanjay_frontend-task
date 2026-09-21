/**
 * Web Audio API Sound Synthesizer for KinNest
 * Lightweight, zero-asset, cross-browser interactive sound effects.
 */

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.lullabyInterval = null;
    this.isLullabyPlaying = false;
  }

  getAudioContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Pleasant click / switch
  playClick() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // Audio context might be blocked prior to user interaction
    }
  }

  // Water pump / drop chime
  playWaterDrop() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // ignore
    }
  }

  // Feeder dispenser mechanical chime
  playDispense() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      [0, 0.08, 0.16].forEach((delay, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25 + idx * 110, ctx.currentTime + delay);
        gain.gain.setValueAtTime(0.09, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.1);
      });
    } catch {
      // ignore
    }
  }

  // Heavy mechanical door lock bolt
  playLock(isLocking = true) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      const startFreq = isLocking ? 260 : 420;
      const endFreq = isLocking ? 180 : 340;
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.11);
    } catch {
      // ignore
    }
  }

  // Chirp bird sound
  playBirdChirp() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2200, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(3200, ctx.currentTime + 0.05);
      osc.frequency.linearRampToValueAtTime(2600, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // ignore
    }
  }

  // Soothing nursery lullaby melody player
  startLullaby(onNotePlay) {
    this.stopLullaby();
    const ctx = this.getAudioContext();
    if (!ctx) return;
    this.isLullabyPlaying = true;

    // Twinkle Twinkle Little Star melody notes (Hz)
    const melody = [
      { f: 261.63, d: 500 }, // C4
      { f: 261.63, d: 500 }, // C4
      { f: 392.00, d: 500 }, // G4
      { f: 392.00, d: 500 }, // G4
      { f: 440.00, d: 500 }, // A4
      { f: 440.00, d: 500 }, // A4
      { f: 392.00, d: 900 }, // G4
      { f: 349.23, d: 500 }, // F4
      { f: 349.23, d: 500 }, // F4
      { f: 329.63, d: 500 }, // E4
      { f: 329.63, d: 500 }, // E4
      { f: 293.66, d: 500 }, // D4
      { f: 293.66, d: 500 }, // D4
      { f: 261.63, d: 900 }  // C4
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!this.isLullabyPlaying) return;
      const note = melody[noteIdx];
      noteIdx = (noteIdx + 1) % melody.length;

      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, ctx.currentTime);
        // soft music-box envelope
        gain.gain.setValueAtTime(0.07, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (note.d / 1000) * 0.9);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + note.d / 1000);

        if (onNotePlay) onNotePlay(note.f);
      } catch {
        // ignore
      }

      this.lullabyInterval = setTimeout(playNext, note.d + 100);
    };

    playNext();
  }

  stopLullaby() {
    this.isLullabyPlaying = false;
    if (this.lullabyInterval) {
      clearTimeout(this.lullabyInterval);
      this.lullabyInterval = null;
    }
  }
}

export const sounds = new SoundEffects();
