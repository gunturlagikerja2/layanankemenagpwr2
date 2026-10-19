/**
 * ACCESSIBILITY & AUDIO READER ENGINE - KEMENAG PURWOREJO
 * Fokus: Pembaca Suara (TTS) Bahasa Indonesia, Tema Kontras, Pengatur Huruf, dan Umpan Balik Akustik
 * Ringan, Cepat, Mobile-First, Standar WCAG AAA
 */

const A11yEngine = (function () {
  // State
  const state = {
    theme: localStorage.getItem('kemenag_theme') || 'default',
    fontScale: parseFloat(localStorage.getItem('kemenag_font_scale')) || 1.0,
    soundEffects: localStorage.getItem('kemenag_sound_fx') !== 'false',
    ttsRate: parseFloat(localStorage.getItem('kemenag_tts_rate')) || 1.0,
    isSpeaking: false,
    isPaused: false
  };

  // Audio Context untuk efek suara sintetis (100% offline tanpa unduh berkas mp3)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!state.soundEffects) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'click') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'toggle') {
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(560, now + 0.07);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch (e) {
      console.warn("Audio feedback error:", e);
    }
  }

  function triggerVibrate(pattern = [50]) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  // Text-To-Speech (TTS) Engine
  const synth = window.speechSynthesis;
  let currentUtterance = null;
  let availableVoices = [];

  function initVoices() {
    if (!synth) return;
    availableVoices = synth.getVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = () => {
        availableVoices = synth.getVoices();
      };
    }
  }

  function getIndonesianVoice() {
    if (!availableVoices || availableVoices.length === 0) {
      availableVoices = synth ? synth.getVoices() : [];
    }
    const idVoice = availableVoices.find(v => 
      v.lang.startsWith('id') || v.lang.startsWith('in') || v.name.toLowerCase().includes('indonesia')
    );
    return idVoice || availableVoices[0] || null;
  }

  function speakText(text, callbackOnEnd) {
    if (!synth) {
      showToast("Peramban Anda tidak mendukung fitur suara (TTS).", "warning");
      return;
    }
    stopSpeaking();

    const cleanText = text.replace(/<[^>]+>/g, ' ')
                          .replace(/[#*_~`]/g, '')
                          .replace(/\s+/g, ' ')
                          .trim();

    if (!cleanText) return;

    currentUtterance = new SpeechSynthesisUtterance(cleanText);
    currentUtterance.rate = state.ttsRate;
    currentUtterance.pitch = 1.0;
    currentUtterance.lang = 'id-ID';

    const voice = getIndonesianVoice();
    if (voice) {
      currentUtterance.voice = voice;
    }

    currentUtterance.onstart = () => {
      state.isSpeaking = true;
      state.isPaused = false;
      updateTTSControlsUI(true, false);
      announceToScreenReader("Mulai membaca suara layanan.");
    };

    currentUtterance.onend = () => {
      state.isSpeaking = false;
      state.isPaused = false;
      updateTTSControlsUI(false, false);
      if (typeof callbackOnEnd === 'function') callbackOnEnd();
    };

    currentUtterance.onerror = (err) => {
      console.warn("TTS Error:", err);
      state.isSpeaking = false;
      state.isPaused = false;
      updateTTSControlsUI(false, false);
    };

    synth.speak(currentUtterance);
  }

  function pauseSpeaking() {
    if (synth && state.isSpeaking && !state.isPaused) {
      synth.pause();
      state.isPaused = true;
      updateTTSControlsUI(true, true);
      playSound('click');
    }
  }

  function resumeSpeaking() {
    if (synth && state.isPaused) {
      synth.resume();
      state.isPaused = false;
      updateTTSControlsUI(true, false);
      playSound('click');
    }
  }

  function stopSpeaking() {
    if (synth) {
      synth.cancel();
      state.isSpeaking = false;
      state.isPaused = false;
      updateTTSControlsUI(false, false);
      playSound('click');
    }
  }

  function setTTSRate(rate) {
    state.ttsRate = parseFloat(rate);
    localStorage.setItem('kemenag_tts_rate', state.ttsRate);
    if (state.isSpeaking) {
      const currentText = currentUtterance ? currentUtterance.text : '';
      stopSpeaking();
      if (currentText) {
        speakText(currentText);
      }
    }
  }

  function updateTTSControlsUI(speaking, paused) {
    const bar = document.getElementById('floating-tts-bar');
    const playBtn = document.getElementById('tts-toggle-btn');
    const statusText = document.getElementById('tts-status-text');
    const bottomNavTts = document.getElementById('bottom-nav-tts');

    if (!bar) return;

    if (speaking) {
      bar.classList.add('visible');
      if (bottomNavTts) bottomNavTts.classList.add('active');
      if (paused) {
        if (playBtn) playBtn.innerHTML = '<span aria-hidden="true">▶️</span> Lanjut';
        if (statusText) statusText.textContent = 'Suara Dijeda';
      } else {
        if (playBtn) playBtn.innerHTML = '<span aria-hidden="true">⏸️</span> Jeda';
        if (statusText) statusText.textContent = 'Sedang Membaca...';
      }
    } else {
      bar.classList.remove('visible');
      if (bottomNavTts) bottomNavTts.classList.remove('active');
      if (playBtn) playBtn.innerHTML = '<span aria-hidden="true">🔊</span> Baca Suara';
      if (statusText) statusText.textContent = 'Pembaca Suara';
    }
  }

  function announceToScreenReader(message) {
    const liveRegion = document.getElementById('a11y-live-announcer');
    if (liveRegion) {
      liveRegion.textContent = '';
      setTimeout(() => {
        liveRegion.textContent = message;
      }, 50);
    }
  }

  // Theme Manager
  function setTheme(themeName) {
    const root = document.documentElement;
    root.classList.remove('theme-default', 'theme-dark', 'theme-yellow-black', 'theme-black-yellow');
    root.classList.add('theme-' + themeName);
    state.theme = themeName;
    localStorage.setItem('kemenag_theme', themeName);

    playSound('toggle');
    triggerVibrate([30]);
    announceToScreenReader('Tema tampilan diubah ke ' + getThemeLabel(themeName));
    updateThemeSelectorUI();
  }

  function getThemeLabel(name) {
    switch (name) {
      case 'default': return 'Hijau Standar Kemenag';
      case 'dark': return 'Mode Gelap (Dark Mode)';
      case 'yellow-black': return 'Kuning di atas Hitam (Low Vision)';
      case 'black-yellow': return 'Hitam di atas Kuning';
      default: return name;
    }
  }

  function updateThemeSelectorUI() {
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      const t = btn.getAttribute('data-theme-btn');
      if (t === state.theme) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  // Font Scaling
  function setFontScale(scale) {
    scale = Math.min(1.75, Math.max(0.9, parseFloat(scale)));
    state.fontScale = scale;
    document.documentElement.style.setProperty('--font-scale', scale);
    localStorage.setItem('kemenag_font_scale', scale);

    const percent = Math.round(scale * 100);
    const display = document.getElementById('font-scale-display');
    if (display) display.textContent = percent + '%';

    playSound('click');
    announceToScreenReader('Ukuran teks diubah ke ' + percent + ' persen');
  }

  function increaseFontSize() {
    setFontScale(state.fontScale + 0.15);
  }

  function decreaseFontSize() {
    setFontScale(state.fontScale - 0.15);
  }

  function resetFontSize() {
    setFontScale(1.0);
  }

  function toggleSpeechCurrentPage() {
    if (state.isSpeaking) {
      if (state.isPaused) {
        resumeSpeaking();
      } else {
        pauseSpeaking();
      }
    } else {
      speakCurrentPageContent();
    }
  }

  function speakCurrentPageContent() {
    const activeView = document.querySelector('.page-view:not(.hidden)');
    if (!activeView) return;

    let textToRead = "";
    const detailTitle = activeView.querySelector('.service-detail-title');
    if (detailTitle) {
      const title = detailTitle.innerText;
      const meta = activeView.querySelector('.service-meta-summary')?.innerText || "";
      const deskripsi = activeView.querySelector('.service-desc-box')?.innerText || "";
      const syarat = activeView.querySelector('.service-syarat-list')?.innerText || "";
      const hotlineInfo = "Nomor Hotline Pengaduan Layanan Kemenag Purworejo adalah 085196822220 melalui WhatsApp.";

      textToRead = `${title}. ${meta}. Deskripsi Layanan: ${deskripsi}. Persyaratan dokumen yang perlu disiapkan: ${syarat}. ${hotlineInfo}`;
    } else {
      const heading = activeView.querySelector('h1, h2')?.innerText || "Layanan Publik Kantor Kementerian Agama Purworejo";
      const lead = activeView.querySelector('.hero-lead, .section-subtitle')?.innerText || "";
      const hotlineInfo = "Nomor Hotline Pengaduan Layanan adalah 085196822220. Nomor WA Si MANTAP adalah 082334451010.";
      textToRead = `${heading}. ${lead}. ${hotlineInfo}`;
    }

    speakText(textToRead);
  }

  // Modals
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('hidden');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    playSound('click');
    triggerVibrate([30]);
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('hidden');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    playSound('click');
  }

  function toggleAccessibilityModal() {
    const modal = document.getElementById('accessibility-modal');
    if (!modal) return;
    if (modal.classList.contains('hidden')) {
      openModal(modal);
    } else {
      closeModal(modal);
    }
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <div class="toast-body">
        <span class="toast-icon" aria-hidden="true">${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
        <span class="toast-text">${message}</span>
      </div>
      <button class="toast-close" aria-label="Tutup">×</button>
    `;

    container.appendChild(toast);
    playSound(type === 'success' ? 'success' : 'click');
    triggerVibrate([40]);

    toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function init() {
    initVoices();
    setTheme(state.theme);
    setFontScale(state.fontScale);

    // Keyboard Esc to stop speech or close modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        stopSpeaking();
        const openModal = document.querySelector('.a11y-modal:not(.hidden)');
        if (openModal) closeModal(openModal);
      }
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal(btn.closest('.a11y-modal'));
      });
    });

    document.querySelectorAll('.a11y-modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    });
  }

  return {
    init,
    getState: () => ({ ...state }),
    setTheme,
    setFontScale,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    playSound,
    triggerVibrate,
    speakText,
    pauseSpeaking,
    resumeSpeaking,
    stopSpeaking,
    setTTSRate,
    toggleSpeechCurrentPage,
    speakCurrentPageContent,
    announceToScreenReader,
    showToast,
    openModal,
    closeModal,
    toggleAccessibilityModal
  };
})();
