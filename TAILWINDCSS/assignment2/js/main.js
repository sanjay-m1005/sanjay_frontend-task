/**
 * SpeakBetter - Interactive Article Script
 * Handles scroll progress, dynamic TOC highlighting, 30-day challenge tracker,
 * audio simulation, interactive comparisons, and smooth interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgressBar();
  initNavbarScroll();
  initTableOfContents();
  initChallengeTracker();
  initComparisonFilter();
  initAudioSimulation();
  initScrollReveal();
  initBackToTop();
  initCopyButtons();
});

/* --------------------------------------------------------------------------
   1. Reading Progress Bar
   -------------------------------------------------------------------------- */
function initReadingProgressBar() {
  const progressBar = document.getElementById('readingProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Sticky Navbar Glass Effect
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. Table of Contents & ScrollSpy Active Highlighting
   -------------------------------------------------------------------------- */
function initTableOfContents() {
  const tocLinks = document.querySelectorAll('.toc-item a, .mobile-toc-link');
  const sections = document.querySelectorAll('.article-section-block');

  if (!sections.length || !tocLinks.length) return;

  // Intersection Observer for scroll tracking
  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Smooth scroll for TOC links
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 85;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile accordion if open
        const mobileCollapse = document.getElementById('mobileTocCollapse');
        if (mobileCollapse && window.bootstrap) {
          const bsCollapse = bootstrap.Collapse.getInstance(mobileCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. 30-Day Communication Challenge Tracker
   -------------------------------------------------------------------------- */
const challengeData = {
  week1: [
    { day: "Day 01", text: "Read an English news article aloud for 10 minutes." },
    { day: "Day 02", text: "Learn 3 new phrasal verbs and write sentences with them." },
    { day: "Day 03", text: "Record a 1-minute voice note introducing your favorite hobby." },
    { day: "Day 04", text: "Listen to a 10-minute English podcast (e.g. 6 Minute English)." },
    { day: "Day 05", text: "Practice shadow-speaking a 30-second native video clip." },
    { day: "Day 06", text: "Describe 5 objects around your room aloud in English." },
    { day: "Day 07", text: "Weekly Review: Re-listen to your Day 3 audio note and note improvements." }
  ],
  week2: [
    { day: "Day 08", text: "Narrate your morning routine out loud using transition words." },
    { day: "Day 09", text: "Learn 4 polite business phrases for agreeing & disagreeing." },
    { day: "Day 10", text: "Practice 5 tongue twisters for clear 'TH' and 'R' sounds." },
    { day: "Day 11", text: "Summarize a YouTube tutorial in 3 English sentences." },
    { day: "Day 12", text: "Order food, coffee, or speak with an AI voice agent in English." },
    { day: "Day 13", text: "Read a story paragraph with exaggerated intonation and emotion." },
    { day: "Day 14", text: "Weekly Review: Record a 2-minute summary of your week." }
  ],
  week3: [
    { day: "Day 15", text: "Stop translating: Name 20 objects in English without thinking in native language." },
    { day: "Day 16", text: "Practice the 3-second pause technique instead of using 'um' and 'uh'." },
    { day: "Day 17", text: "Learn connected speech rules: 'wanna', 'gonna', 'coulda'." },
    { day: "Day 18", text: "Engage in a 5-minute English conversation (friend, colleague, or language app)." },
    { day: "Day 19", text: "Watch an English movie scene with subtitles, then replay without subtitles." },
    { day: "Day 20", text: "Give a 2-minute elevator pitch about your job/passion." },
    { day: "Day 21", text: "Weekly Review: Compare pronunciation with a native audio sample." }
  ],
  week4: [
    { day: "Day 22", text: "Practice storytelling: Explain an interesting experience using past tenses." },
    { day: "Day 23", text: "Write and speak 5 polite negotiation responses." },
    { day: "Day 24", text: "Shadow a TED Talk speaker for 5 minutes focusing on rhythm." },
    { day: "Day 25", text: "Hold an impromptu 3-minute monologue on a random topic." },
    { day: "Day 26", text: "Identify and correct 3 of your most frequent habitual grammar mistakes." },
    { day: "Day 27", text: "Participate in an online English discussion or comment section." },
    { day: "Day 28", text: "Deliver a 5-minute presentation aloud with confident body posture." },
    { day: "Day 29", text: "Reflect on your 30-day journey: List 5 noticeable areas of growth." },
    { day: "Day 30", text: "Final Milestone: Record a 3-minute video reflection comparing to Day 1!" }
  ]
};

function initChallengeTracker() {
  const taskList = document.getElementById('challengeTaskList');
  const weekTabBtns = document.querySelectorAll('.week-tab-btn');
  const progressFill = document.getElementById('challengeProgressFill');
  const progressPercent = document.getElementById('challengeProgressPercent');
  const completedCount = document.getElementById('challengeCompletedCount');

  if (!taskList) return;

  let currentWeek = 'week1';
  let completedTasks = JSON.parse(localStorage.getItem('speakbetter_challenge') || '{}');

  function renderTasks() {
    taskList.innerHTML = '';
    const tasks = challengeData[currentWeek] || [];

    tasks.forEach(task => {
      const isDone = !!completedTasks[task.day];
      const taskEl = document.createElement('div');
      taskEl.className = `challenge-task-item ${isDone ? 'completed' : ''}`;
      taskEl.innerHTML = `
        <div class="task-checkbox">
          ${isDone ? '<i class="bi bi-check"></i>' : ''}
        </div>
        <div>
          <span class="task-day">${task.day}</span>
          <p class="task-text">${task.text}</p>
        </div>
      `;

      taskEl.addEventListener('click', () => {
        if (completedTasks[task.day]) {
          delete completedTasks[task.day];
        } else {
          completedTasks[task.day] = true;
          showToast(`Great job! Completed ${task.day}`);
        }
        localStorage.setItem('speakbetter_challenge', JSON.stringify(completedTasks));
        renderTasks();
        updateProgress();
      });

      taskList.appendChild(taskEl);
    });
  }

  function updateProgress() {
    const totalTasks = 30;
    const doneCount = Object.keys(completedTasks).length;
    const percentage = Math.round((doneCount / totalTasks) * 100);

    if (progressFill) progressFill.style.width = `${percentage}%`;
    if (progressPercent) progressPercent.textContent = `${percentage}%`;
    if (completedCount) completedCount.textContent = `${doneCount} of ${totalTasks} completed`;
  }

  weekTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      weekTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentWeek = btn.getAttribute('data-week');
      renderTasks();
    });
  });

  renderTasks();
  updateProgress();
}

/* --------------------------------------------------------------------------
   5. Before vs After Comparison Filter
   -------------------------------------------------------------------------- */
function initComparisonFilter() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const cards = document.querySelectorAll('.comparison-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'grid';
          card.classList.add('fade-in-up', 'revealed');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Audio Simulation & Speech Synthesis
   -------------------------------------------------------------------------- */
function initAudioSimulation() {
  const playButtons = document.querySelectorAll('.audio-play-btn, .listen-pill');

  playButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToSpeak = btn.getAttribute('data-phrase') || "Welcome to SpeakBetter. Here is your daily practical English lesson.";
      
      // If Web Speech API is supported, speak it cleanly
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop ongoing speech
        
        if (btn.classList.contains('playing')) {
          btn.classList.remove('playing');
          return;
        }

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.9; // clear, comfortable pace
        utterance.lang = 'en-US';

        btn.classList.add('playing');

        utterance.onend = () => {
          btn.classList.remove('playing');
        };
        utterance.onerror = () => {
          btn.classList.remove('playing');
        };

        window.speechSynthesis.speak(utterance);
        showToast(`Playing audio: "${textToSpeak.length > 28 ? textToSpeak.substring(0, 28) + '...' : textToSpeak}"`);
      } else {
        // Fallback animation
        btn.classList.toggle('playing');
        setTimeout(() => btn.classList.remove('playing'), 2500);
        showToast("Audio playback previewing...");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Copy to Clipboard Utility
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-phrase-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('Copied phrase to clipboard! 📋');
        }).catch(() => {
          showToast('Selected phrase ready to practice!');
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.fade-in-up');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   9. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   10. Toast Notification System
   -------------------------------------------------------------------------- */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('customToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'customToast';
    toast.className = 'custom-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="bi bi-info-circle-fill text-primary"></i> ${message}`;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
