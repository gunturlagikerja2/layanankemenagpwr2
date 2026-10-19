/**
 * APLIKASI WEB LAYANAN PUBLIK KEMENAG PURWOREJO
 * Mobile-First, Client-Side Only, Offline PWA
 * Fokus: Penyampaian 14 Layanan Publik, Pembaca Suara (TTS), dan Nomor Hotline Aduan
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi Mesin Aksesibilitas & Pembaca Suara
  A11yEngine.init();

  // State Aplikasi
  let currentCategory = 'all';
  let currentSearchQuery = '';
  let deferredInstallPrompt = null;

  // Elemen DOM Utama
  const servicesGrid = document.getElementById('services-grid');
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const categoryFiltersContainer = document.getElementById('category-filters');
  const searchResultsCount = document.getElementById('search-results-count');
  const pwaInstallBanner = document.getElementById('pwa-install-banner');
  const pwaInstallBtn = document.getElementById('pwa-install-btn');

  // Views / Laman
  const views = {
    home: document.getElementById('view-home'),
    detail: document.getElementById('view-detail'),
    aduan: document.getElementById('view-aduan'),
    maklumat: document.getElementById('view-maklumat')
  };

  // Registrasi PWA Service Worker (Dukungan Offline 100%)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('ServiceWorker PWA Kemenag aktif:', reg.scope))
        .catch(err => console.warn('ServiceWorker gagal:', err));
    });
  }

  // PWA Install Prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (pwaInstallBanner) pwaInstallBanner.classList.remove('hidden');
    const headerInstallBtn = document.getElementById('header-install-btn');
    if (headerInstallBtn) headerInstallBtn.classList.remove('hidden');
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    if (pwaInstallBanner) pwaInstallBanner.classList.add('hidden');
    const headerInstallBtn = document.getElementById('header-install-btn');
    if (headerInstallBtn) headerInstallBtn.classList.add('hidden');
    A11yEngine.showToast('Aplikasi berhasil dipasang di perangkat! Dapat dibuka tanpa internet.', 'success');
  });

  if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener('click', triggerInstallPrompt);
  }
  const headerInstallBtn = document.getElementById('header-install-btn');
  if (headerInstallBtn) {
    headerInstallBtn.addEventListener('click', triggerInstallPrompt);
  }

  function triggerInstallPrompt() {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User installed PWA');
        }
        deferredInstallPrompt = null;
      });
    } else {
      A11yEngine.showToast('Pada menu peramban, pilih "Tambahkan ke Layar Utama" atau "Pasang Aplikasi".', 'info');
    }
  }

  // Router Hash Navigation (Mobile-First)
  function router() {
    const hash = window.location.hash || '#home';
    const parts = hash.replace(/^#\/?/, '').split('/');
    const mainRoute = parts[0] || 'home';
    const param = parts[1] || null;

    // Sembunyikan semua tampilan
    Object.values(views).forEach(v => {
      if (v) v.classList.add('hidden');
    });

    // Perbarui status link navigasi header & drawer
    document.querySelectorAll('[data-nav-route]').forEach(link => {
      const r = link.getAttribute('data-nav-route');
      if (r === mainRoute || (mainRoute === 'home' && r === 'layanan')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    // Perbarui status navigasi bawah mobile
    document.querySelectorAll('.bottom-nav-item[data-bottom-route]').forEach(item => {
      const r = item.getAttribute('data-bottom-route');
      if (r === mainRoute || (mainRoute === 'home' && r === 'layanan')) {
        item.classList.add('active');
        item.setAttribute('aria-current', 'page');
      } else {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      }
    });

    // Gulir ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Tampilkan tampilan sesuai rute
    if (mainRoute === 'home' || mainRoute === 'layanan') {
      if (param) {
        renderServiceDetail(param);
      } else {
        if (views.home) views.home.classList.remove('hidden');
        renderServicesList();
        A11yEngine.announceToScreenReader('Menampilkan Daftar 14 Layanan Publik Kemenag Purworejo');
      }
    } else if (mainRoute === 'aduan') {
      if (views.aduan) views.aduan.classList.remove('hidden');
      A11yEngine.announceToScreenReader('Menampilkan Halaman Hotline Pengaduan Layanan');
    } else if (mainRoute === 'maklumat') {
      if (views.maklumat) views.maklumat.classList.remove('hidden');
      A11yEngine.announceToScreenReader('Menampilkan Maklumat dan Kompensasi Pelayanan');
    } else {
      if (views.home) views.home.classList.remove('hidden');
      renderServicesList();
    }
  }

  window.addEventListener('hashchange', router);

  // Render Daftar 14 Layanan Publik (Mobile-First)
  function renderServicesList() {
    if (!servicesGrid) return;

    let filtered = LAYANAN_LIST.filter(item => {
      if (currentCategory !== 'all' && item.kategori !== currentCategory) {
        return false;
      }
      if (currentSearchQuery) {
        const q = currentSearchQuery.toLowerCase();
        return item.nama.toLowerCase().includes(q) ||
               item.deskripsi.toLowerCase().includes(q) ||
               item.kategori.toLowerCase().includes(q) ||
               item.output.toLowerCase().includes(q) ||
               item.syarat.some(s => s.teks.toLowerCase().includes(q));
      }
      return true;
    });

    if (searchResultsCount) {
      searchResultsCount.textContent = `Menampilkan ${filtered.length} dari ${LAYANAN_LIST.length} layanan`;
    }

    if (filtered.length === 0) {
      servicesGrid.innerHTML = `
        <div class="empty-state-box" role="status">
          <div class="empty-icon" aria-hidden="true">🔍</div>
          <h3 class="empty-title">Layanan Tidak Ditemukan</h3>
          <p class="empty-text">Tidak ada layanan yang cocok dengan kata kunci "<strong>${escapeHtml(currentSearchQuery)}</strong>".</p>
          <button type="button" class="btn btn-primary btn-sm" id="btn-reset-filters">
            <span aria-hidden="true">🔄</span> Tampilkan Semua 14 Layanan
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', resetAllFilters);
      }
      return;
    }

    servicesGrid.innerHTML = filtered.map(item => `
      <article class="service-card" data-service-id="${item.id}" aria-labelledby="card-title-${item.id}">
        <div class="card-header">
          <span class="service-badge-number" aria-hidden="true">${item.nomor}</span>
          <span class="service-category-tag">${item.kategoriBadge}</span>
          <span class="service-fee-pill" aria-label="Tarif: Gratis Rp 0">Gratis (Rp 0)</span>
        </div>

        <h2 class="service-card-title" id="card-title-${item.id}">
          <a href="#layanan/${item.id}" class="service-title-link">
            ${escapeHtml(item.nama)}
          </a>
        </h2>

        <p class="service-card-desc">
          ${escapeHtml(item.deskripsi)}
        </p>

        <!-- Informasi Pokok Layanan (SLA & Berkas) -->
        <div class="service-meta-grid">
          <div class="meta-item">
            <span class="meta-icon" aria-hidden="true">⏱️</span>
            <span class="meta-label">Waktu (SLA):</span>
            <strong class="meta-value">${escapeHtml(item.waktu)}</strong>
          </div>
          <div class="meta-item">
            <span class="meta-icon" aria-hidden="true">📄</span>
            <span class="meta-label">Persyaratan:</span>
            <strong class="meta-value">${item.syarat.length} Berkas</strong>
          </div>
        </div>

        <!-- Tombol Aksi Langsung (Mobile-Friendly Touch Buttons) -->
        <div class="card-footer-actions">
          <button type="button" class="btn btn-warning-soft btn-speak-service" data-service-id="${item.id}" aria-label="Dengarkan penjelasan suara layanan ${item.nama}">
            <span aria-hidden="true">🔊</span> Dengarkan
          </button>
          <a href="#layanan/${item.id}" class="btn btn-primary btn-sm" aria-label="Lihat persyaratan dan alur lengkap layanan ${item.nama}">
            <span aria-hidden="true">📋</span> Rincian Syarat
          </a>
          <a href="https://wa.me/6282334451010?text=${encodeURIComponent(item.wa_template)}" 
             target="_blank" rel="noopener noreferrer" class="btn btn-success-soft btn-sm" 
             aria-label="Ajukan secara daring via WhatsApp Si MANTAP">
            <span aria-hidden="true">💬</span> Ajukan WA
          </a>
        </div>
      </article>
    `).join('');

    // Listener tombol suara di kartu
    document.querySelectorAll('.btn-speak-service').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = parseInt(btn.getAttribute('data-service-id'));
        const service = LAYANAN_LIST.find(l => l.id === id);
        if (service) {
          const speakText = `Layanan Nomor ${service.nomor}. ${service.nama}. Kategori: ${service.kategoriBadge}. Estimasi waktu penyelesaian: ${service.waktu}. Biaya: Gratis Rp 0. Dokumen yang diperoleh: ${service.output}. Memerlukan ${service.syarat.length} berkas persyaratan. Buka rincian untuk membaca daftar berkas lengkap. Layanan ini dapat diajukan luring di PTSP atau daring via WhatsApp Si MANTAP di 082334451010. Hotline pengaduan di 085196822220.`;
          A11yEngine.speakText(speakText);
        }
      });
    });
  }

  // Render Laman Rincian Layanan (Detail View - Bebas Ceklist, Fokus Berkas & Suara)
  function renderServiceDetail(identifier) {
    if (!views.detail) return;
    views.detail.classList.remove('hidden');

    const service = LAYANAN_LIST.find(l => l.id.toString() === identifier || l.slug === identifier);
    if (!service) {
      views.detail.innerHTML = `
        <div class="container error-view" style="padding: 2rem 1rem; text-align: center;">
          <h2>Layanan Tidak Ditemukan</h2>
          <p>Layanan publik yang Anda tuju tidak tercatat dalam sistem.</p>
          <a href="#home" class="btn btn-primary">Kembali ke Daftar 14 Layanan</a>
        </div>
      `;
      return;
    }

    views.detail.innerHTML = `
      <div class="service-detail-container container">
        <!-- Breadcrumb / Tombol Kembali Mobile -->
        <div style="margin-bottom: 1rem;">
          <a href="#home" class="btn btn-sm btn-outline-secondary" aria-label="Kembali ke Daftar 14 Layanan">
            <span aria-hidden="true">←</span> Kembali ke 14 Layanan
          </a>
        </div>

        <!-- Header Rincian Layanan -->
        <header class="service-detail-header">
          <div class="detail-header-badges">
            <span class="badge-service-no" aria-label="Nomor Layanan ${service.nomor}">Layanan ${service.nomor}</span>
            <span class="badge-service-category">${service.kategoriBadge}</span>
            <span class="badge-service-cost">Rp 0,- (GRATIS)</span>
          </div>

          <h1 class="service-detail-title">${escapeHtml(service.nama)}</h1>

          <!-- Tombol Pembaca Suara Utama & Kontak Langsung -->
          <div class="detail-action-buttons">
            <button type="button" class="btn btn-warning-soft btn-speak-detail" id="btn-speak-this-detail" aria-label="Putar suara penjelasan layanan ini">
              <span aria-hidden="true">🔊</span> Dengarkan Penjelasan Layanan
            </button>
            <a href="https://wa.me/6282334451010?text=${encodeURIComponent(service.wa_template)}" 
               target="_blank" rel="noopener noreferrer" class="btn btn-success" aria-label="Ajukan atau konsultasi via WA Si MANTAP">
              <span aria-hidden="true">💬</span> Ajukan via WA Si MANTAP (082334451010)
            </a>
            <a href="https://wa.me/6285196822220?text=Halo%20Hotline%20Aduan%20Kemenag%20Purworejo%2C%20saya%20ingin%20berkonsultasi%2Flapor%20terkait%20${encodeURIComponent(service.nama)}" 
               target="_blank" rel="noopener noreferrer" class="btn btn-outline-danger" aria-label="Hubungi nomor aduan jika ada kendala">
              <span aria-hidden="true">📢</span> Hotline Aduan (085196822220)
            </a>
          </div>

          <!-- Ringkasan Metrik Layanan -->
          <div class="grid-metrics">
            <div class="metric-card">
              <span class="metric-icon" aria-hidden="true">⏱️</span>
              <div class="metric-content">
                <span class="metric-label">Jangka Waktu (SLA)</span>
                <strong class="metric-val">${escapeHtml(service.waktu)}</strong>
              </div>
            </div>
            <div class="metric-card">
              <span class="metric-icon" aria-hidden="true">💰</span>
              <div class="metric-content">
                <span class="metric-label">Biaya / Tarif</span>
                <strong class="metric-val text-success">Rp 0,- (Gratis Resmi)</strong>
              </div>
            </div>
            <div class="metric-card">
              <span class="metric-icon" aria-hidden="true">📜</span>
              <div class="metric-content">
                <span class="metric-label">Produk Diterima</span>
                <strong class="metric-val">${escapeHtml(service.output)}</strong>
              </div>
            </div>
            <div class="metric-card">
              <span class="metric-icon" aria-hidden="true">🏛️</span>
              <div class="metric-content">
                <span class="metric-label">Kanal Pengajuan</span>
                <strong class="metric-val">PTSP &amp; WA Si MANTAP</strong>
              </div>
            </div>
          </div>
        </header>

        <!-- Deskripsi Layanan -->
        <section class="detail-section service-desc-box" aria-labelledby="sec-desc-title">
          <h2 class="section-title-sm" id="sec-desc-title">
            <span aria-hidden="true">📌</span> Deskripsi Layanan
          </h2>
          <p class="service-description-text">${escapeHtml(service.deskripsi)}</p>
        </section>

        <!-- Sub-Layanan jika ada (Layanan 14) -->
        ${service.sub_layanan ? `
          <section class="detail-section" aria-labelledby="sec-sublayanan-title">
            <h2 class="section-title-sm" id="sec-sublayanan-title">
              <span aria-hidden="true">📂</span> Pembagian Sub-Layanan Urusan Agama
            </h2>
            <div class="sub-layanan-grid">
              ${service.sub_layanan.map(sub => `
                <div class="sub-layanan-card">
                  <h3 class="sub-title">${escapeHtml(sub.nama)}</h3>
                  <div class="sub-info">
                    <p><strong>Syarat:</strong> ${escapeHtml(sub.syarat)}</p>
                    <p><strong>Output:</strong> ${escapeHtml(sub.output)}</p>
                    <p><strong>Waktu:</strong> <span class="badge-time">${escapeHtml(sub.waktu)}</span></p>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Persyaratan Berkas Dokumen (Format Bersih & Rapi Tanpa Ceklist) -->
        <section class="detail-section" aria-labelledby="sec-syarat-title">
          <h2 class="section-title-sm" id="sec-syarat-title">
            <span aria-hidden="true">📄</span> Persyaratan Berkas Dokumen (${service.syarat.length} Berkas)
          </h2>
          <p class="section-subtitle-sm">
            Siapkan berkas dokumen fisik (untuk layanan luring di PTSP) atau foto/softfile PDF (untuk layanan daring via WA Si MANTAP).
          </p>

          <ol class="clean-syarat-list">
            ${service.syarat.map((item, idx) => `
              <li class="clean-syarat-item">
                <span class="clean-syarat-badge" aria-hidden="true">${idx + 1}</span>
                <span class="clean-syarat-text">${escapeHtml(item.teks)}</span>
              </li>
            `).join('')}
          </ol>
        </section>

        <!-- Alur Pelayanan (Luring di PTSP & Daring via WA) -->
        <section class="detail-section" aria-labelledby="sec-alur-title">
          <h2 class="section-title-sm" id="sec-alur-title">
            <span aria-hidden="true">🔄</span> Alur &amp; Prosedur Pelayanan
          </h2>
          <p class="section-subtitle-sm">
            Pilih metode pengajuan yang paling sesuai untuk Anda:
          </p>

          <!-- Tab Pilihan Alur (Mobile Touch Friendly) -->
          <div class="alur-mode-tabs" role="tablist" aria-label="Pilih Metode Pelayanan">
            <button type="button" class="alur-tab-btn active" id="tab-btn-luring" role="tab" aria-selected="true">
              <span aria-hidden="true">🏛️</span> 1. Alur Luring di Kantor PTSP
            </button>
            <button type="button" class="alur-tab-btn" id="tab-btn-daring" role="tab" aria-selected="false">
              <span aria-hidden="true">📱</span> 2. Alur Daring via WA Si MANTAP
            </button>
          </div>

          <div class="alur-dual-container" id="alur-dual-container">
            <!-- Alur Luring -->
            <div class="alur-card alur-luring-box" id="panel-alur-luring">
              <div class="alur-card-header luring-header">
                <span class="alur-icon" aria-hidden="true">🏛️</span>
                <div>
                  <h3 class="alur-title">Alur Luring di Kantor PTSP</h3>
                  <span class="alur-subtitle">Alamat: Jl. H.A. Dahlan No. 10, Purworejo</span>
                </div>
              </div>
              <ol class="alur-step-list">
                ${service.alur_luring.map((step, idx) => `
                  <li class="alur-step-item">
                    <span class="step-badge" aria-hidden="true">${idx + 1}</span>
                    <div class="step-text">${escapeHtml(step)}</div>
                  </li>
                `).join('')}
              </ol>
            </div>

            <!-- Alur Daring -->
            <div class="alur-card alur-daring-box" id="panel-alur-daring" style="display: none;">
              <div class="alur-card-header daring-header">
                <span class="alur-icon" aria-hidden="true">📱</span>
                <div>
                  <h3 class="alur-title">Alur Daring (WA Si MANTAP)</h3>
                  <span class="alur-subtitle">Nomor WhatsApp: 082334451010</span>
                </div>
              </div>
              <ol class="alur-step-list">
                ${service.alur_daring.map((step, idx) => `
                  <li class="alur-step-item">
                    <span class="step-badge step-badge-daring" aria-hidden="true">${idx + 1}</span>
                    <div class="step-text">${escapeHtml(step)}</div>
                  </li>
                `).join('')}
              </ol>
            </div>
          </div>
        </section>

        <!-- Kotak Bantuan & Hotline Aduan Layanan -->
        <section class="detail-cta-box" aria-labelledby="sec-cta-title">
          <div class="cta-content">
            <h2 class="cta-title" id="sec-cta-title">Kanal Resmi &amp; Pengaduan</h2>
            <p class="cta-desc">
              Pelayanan bebas biaya (Rp 0,-). Jika Anda mendapati pungli, keterlambatan melebihi SLA, atau perlakuan kurang ramah, sampaikan laporan ke Hotline Aduan Kemenag Purworejo.
            </p>
          </div>
          <div class="cta-buttons">
            <a href="https://wa.me/6282334451010?text=${encodeURIComponent(service.wa_template)}" 
               target="_blank" rel="noopener noreferrer" class="btn btn-success btn-lg">
              <span aria-hidden="true">💬</span> Ajukan via WA Si MANTAP (082334451010)
            </a>
            <a href="https://wa.me/6285196822220?text=Halo%20Hotline%20Aduan%20Kemenag%20Purworejo%2C%20saya%20ingin%20menyampaikan%20laporan%2Faduan%20layanan." 
               target="_blank" rel="noopener noreferrer" class="btn btn-outline-danger btn-lg">
              <span aria-hidden="true">📢</span> Lapor Hotline Aduan (085196822220)
            </a>
          </div>
        </section>
      </div>
    `;

    // Pasang listener di tampilan rincian
    attachDetailListeners(service);
    A11yEngine.announceToScreenReader(`Membuka rincian ${service.nama}`);
  }

  function attachDetailListeners(service) {
    // Tombol Dengarkan Rincian
    const speakBtn = document.getElementById('btn-speak-this-detail');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        const syaratText = service.syarat.map((s, i) => `${i + 1}, ${s.teks}`).join('. ');
        const speakText = `Rincian ${service.nama}. Kategori: ${service.kategoriBadge}. Estimasi waktu penyelesaian: ${service.waktu}. Biaya: Gratis Rp 0. Produk dokumen yang diterima adalah ${service.output}. Deskripsi layanan: ${service.deskripsi}. Persyaratan berkas dokumen: ${syaratText}. Nomor WhatsApp Si MANTAP untuk pengajuan daring adalah 082334451010. Nomor Hotline Aduan Resmi Kemenag Purworejo adalah 085196822220.`;
        A11yEngine.speakText(speakText);
      });
    }

    // Tab Alur Pelayanan (Luring vs Daring)
    const tabLuring = document.getElementById('tab-btn-luring');
    const tabDaring = document.getElementById('tab-btn-daring');
    const panelLuring = document.getElementById('panel-alur-luring');
    const panelDaring = document.getElementById('panel-alur-daring');

    if (tabLuring && tabDaring && panelLuring && panelDaring) {
      tabLuring.addEventListener('click', () => {
        tabLuring.classList.add('active');
        tabLuring.setAttribute('aria-selected', 'true');
        tabDaring.classList.remove('active');
        tabDaring.setAttribute('aria-selected', 'false');
        panelLuring.style.display = 'block';
        panelDaring.style.display = 'none';
        A11yEngine.playSound('click');
        A11yEngine.triggerVibrate([30]);
        A11yEngine.announceToScreenReader('Menampilkan Alur Luring di PTSP');
      });

      tabDaring.addEventListener('click', () => {
        tabDaring.classList.add('active');
        tabDaring.setAttribute('aria-selected', 'true');
        tabLuring.classList.remove('active');
        tabLuring.setAttribute('aria-selected', 'false');
        panelLuring.style.display = 'none';
        panelDaring.style.display = 'block';
        A11yEngine.playSound('click');
        A11yEngine.triggerVibrate([30]);
        A11yEngine.announceToScreenReader('Menampilkan Alur Daring via WA Simantap');
      });
    }
  }

  // Pencarian Cepat & Filter Kategori
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim();
      if (searchClearBtn) {
        searchClearBtn.classList.toggle('hidden', currentSearchQuery === '');
      }
      renderServicesList();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      currentSearchQuery = '';
      searchClearBtn.classList.add('hidden');
      renderServicesList();
      A11yEngine.announceToScreenReader('Kotak pencarian dibersihkan.');
    });
  }

  if (categoryFiltersContainer) {
    categoryFiltersContainer.querySelectorAll('[data-category-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        categoryFiltersContainer.querySelectorAll('[data-category-filter]').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        currentCategory = btn.getAttribute('data-category-filter');
        A11yEngine.playSound('click');
        renderServicesList();
        A11yEngine.announceToScreenReader('Kategori ' + btn.textContent.trim());
      });
    });
  }

  function resetAllFilters() {
    currentCategory = 'all';
    currentSearchQuery = '';
    if (searchInput) searchInput.value = '';
    if (searchClearBtn) searchClearBtn.classList.add('hidden');

    if (categoryFiltersContainer) {
      categoryFiltersContainer.querySelectorAll('[data-category-filter]').forEach(btn => {
        const isAll = btn.getAttribute('data-category-filter') === 'all';
        btn.classList.toggle('active', isAll);
        btn.setAttribute('aria-pressed', isAll ? 'true' : 'false');
      });
    }

    renderServicesList();
    A11yEngine.playSound('click');
  }

  // Floating TTS Audio Controls
  const ttsToggleBtn = document.getElementById('tts-toggle-btn');
  const ttsStopBtn = document.getElementById('tts-stop-btn');
  const ttsSpeedSelect = document.getElementById('tts-speed-select');

  if (ttsToggleBtn) {
    ttsToggleBtn.addEventListener('click', () => A11yEngine.toggleSpeechCurrentPage());
  }
  if (ttsStopBtn) {
    ttsStopBtn.addEventListener('click', () => A11yEngine.stopSpeaking());
  }
  if (ttsSpeedSelect) {
    ttsSpeedSelect.addEventListener('change', (e) => A11yEngine.setTTSRate(e.target.value));
  }

  // Accessibility Modal & Theme Buttons
  document.querySelectorAll('[data-theme-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      A11yEngine.setTheme(btn.getAttribute('data-theme-btn'));
    });
  });

  const fontIncreaseBtn = document.getElementById('font-increase-btn');
  const fontDecreaseBtn = document.getElementById('font-decrease-btn');
  const fontResetBtn = document.getElementById('font-reset-btn');

  if (fontIncreaseBtn) fontIncreaseBtn.addEventListener('click', () => A11yEngine.increaseFontSize());
  if (fontDecreaseBtn) fontDecreaseBtn.addEventListener('click', () => A11yEngine.decreaseFontSize());
  if (fontResetBtn) fontResetBtn.addEventListener('click', () => A11yEngine.resetFontSize());

  const a11yPanelBtn = document.getElementById('open-a11y-panel-btn');
  if (a11yPanelBtn) a11yPanelBtn.addEventListener('click', () => A11yEngine.toggleAccessibilityModal());

  // Bottom Navigation Bar
  const bottomNavTts = document.getElementById('bottom-nav-tts');
  if (bottomNavTts) bottomNavTts.addEventListener('click', () => A11yEngine.toggleSpeechCurrentPage());

  const bottomNavSearch = document.getElementById('bottom-nav-search');
  if (bottomNavSearch) {
    bottomNavSearch.addEventListener('click', () => {
      window.location.hash = '#home';
      setTimeout(() => {
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }, 100);
    });
  }

  const bottomNavA11y = document.getElementById('bottom-nav-a11y');
  if (bottomNavA11y) bottomNavA11y.addEventListener('click', () => A11yEngine.toggleAccessibilityModal());

  // Mobile Drawer
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const mobileDrawerCloseBtn = document.getElementById('mobile-drawer-close-btn');

  function openMobileDrawer() {
    if (mobileDrawer && mobileDrawerBackdrop) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      mobileDrawerBackdrop.classList.remove('hidden');
      document.body.classList.add('drawer-open');
      A11yEngine.playSound('click');
      A11yEngine.triggerVibrate([30]);
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer && mobileDrawerBackdrop) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileDrawerBackdrop.classList.add('hidden');
      document.body.classList.remove('drawer-open');
    }
  }
  window.closeMobileDrawer = closeMobileDrawer;

  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileDrawer);
  if (mobileDrawerCloseBtn) mobileDrawerCloseBtn.addEventListener('click', closeMobileDrawer);
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);

  document.querySelectorAll('[data-drawer-nav]').forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // Utility XSS Escaper
  function escapeHtml(text) {
    if (!text) return '';
    return text.toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Jalankan routing awal
  router();
});
