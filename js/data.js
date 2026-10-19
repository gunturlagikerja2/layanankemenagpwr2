/**
 * DATA LAYANAN PUBLIK KANTOR KEMENTERIAN AGAMA KABUPATEN PURWOREJO
 * Dikelompokkan ke dalam 14 Layanan Publik Utama
 * Dilengkapi informasi SLA, Biaya, Persyaratan, Alur Luring & Daring, serta Tips Aksesibilitas
 */

const KEMENAG_INFO = {
  instansi: "Kantor Kementerian Agama Kabupaten Purworejo",
  singkatan: "Kemenag Purworejo",
  wilayah: "Kabupaten Purworejo, Jawa Tengah",
  alamat: "Jl. H.A. Dahlan No. 10, Purworejo, Jawa Tengah 54111",
  jamLayanan: {
    senin_kamis: "07.30 - 16.00 WIB (Istirahat 12.00 - 13.00 WIB)",
    jumat: "07.30 - 16.30 WIB (Istirahat 11.30 - 13.00 WIB)",
    sabtu_minggu: "Tutup (Layanan Daring via WA Simantap tetap menerima pesan)"
  },
  kontak: {
    wa_simantap: "082334451010",
    wa_simantap_link: "https://wa.me/6282334451010",
    hotline_aduan: "085196822220",
    hotline_aduan_link: "https://wa.me/6285196822220",
    email: "purworejo@kemenag.go.id",
    website: "https://purworejo.kemenag.go.id"
  },
  maklumat: `“Dengan ini kami menyatakan sanggup menyelenggarakan pelayanan publik sesuai standar pelayanan yang telah ditetapkan dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai ketentuan peraturan perundang-undangan yang berlaku.”`,
  kompensasi: `Apabila pelayanan yang kami berikan tidak sesuai standar pelayanan yang telah ditetapkan (misalnya melebihi batas waktu SLA tanpa pemberitahuan sah), pemohon berhak mendapatkan kompensasi pelayanan berupa:
1. Permohonan maaf resmi dari pimpinan/petugas PTSP Kemenag Purworejo.
2. Percepatan penyelesaian berkas/dokumen prioritas tanpa antrean ulang.
3. Pemberian cinderamata / souvenir apresiasi layanan.
4. Pengantaran dokumen langsung ke alamat pemohon secara gratis (jika diperlukan).`,
  ramah_rentan: {
    fasilitas_fisik: [
      "Jalur pemandu tuna netra (guiding block) di area kantor",
      "Ramp landai ramah kursi roda dan pegangan tangan (handrail)",
      "Kursi roda gratis untuk pemohon disabilitas, lansia, dan ibu hamil",
      "Loket prioritas khusus kelompok rentan di Front Office PTSP",
      "Toilet ramah disabilitas dengan tombol darurat",
      "Ruang laktasi / ibu menyusui dan area bermain anak",
      "Ruang tunggu prioritas berpendingin udara (AC)"
    ],
    fasilitas_komunikasi: [
      "Petugas pendampingan disabilitas khusus terlatih di PTSP",
      "Layanan komunikasi teks visual via WhatsApp SIMANTAP untuk Teman Tuli",
      "Panggilan video (video call) dengan petugas juru bahasa isyarat / komunikasi visual",
      "Aplikasi web ramah pembaca layar (Screen Reader) dan fitur Suara Suara (TTS)",
      "Formulir cetak huruf besar dan kontras tinggi"
    ]
  }
};

const LAYANAN_LIST = [
  {
    id: 1,
    slug: "rekomendasi-bantuan-masjid-mushola",
    nomor: "01",
    nama: "Layanan Rekomendasi Bantuan Masjid / Mushola",
    singkat: "Rekomendasi Bantuan Masjid / Mushola",
    kategori: "Bimas Islam",
    kategoriBadge: "Bimbingan Masyarakat Islam",
    waktu: "3 Hari",
    waktuMenit: 4320,
    biaya: "Rp 0,- (Gratis)",
    output: "Asli Surat Rekomendasi Bantuan Masjid / Mushola",
    deskripsi: "Layanan pemberian surat rekomendasi dari Kantor Kemenag Purworejo bagi pengurus takmir masjid atau mushola yang mengajukan permohonan bantuan dana pembangunan, renovasi, atau sarana peribadatan ke instansi pemerintah atau lembaga pemberi bantuan.",
    syarat: [
      { id: "1-1", teks: "Daftar Nama Masjid / Musholla, Nama Pengurus, dan Nomor HP aktif" },
      { id: "1-2", teks: "KTP asli dan Fotokopi KTP Pengurus (Ketua, Sekretaris, Bendahara)" },
      { id: "1-3", teks: "Surat Permohonan yang diterbitkan dari Sistem Informasi Masjid (SIMAS)" },
      { id: "1-4", teks: "Surat Rekomendasi dari Sistem Informasi Masjid (SIMAS)" },
      { id: "1-5", teks: "Susunan Pengurus Takmir Masjid / Musholla yang sah" },
      { id: "1-6", teks: "Rencana Anggaran Biaya (RAB) pembangunan atau renovasi" },
      { id: "1-7", teks: "Gambar Rencana Bangunan (Site plan / denah / desain)" },
      { id: "1-8", teks: "Foto kondisi fisik bangunan masjid/mushola saat ini" },
      { id: "1-9", teks: "Fotokopi Surat Keterangan Status Tanah / Akta Ikrar Wakaf (AIW) / Sertifikat Wakaf / Hibah / Hak Guna Pakai" },
      { id: "1-10", teks: "Fotokopi Buku Rekening Bank atas nama Masjid / Musholla" },
      { id: "1-11", teks: "Surat Pernyataan Kebenaran Dokumen bermaterai cukup" }
    ],
    alur_luring: [
      "Pemohon hadir di Front Office PTSP Kemenag Purworejo (tersedia antrean prioritas kelompok rentan).",
      "Mengisi Buku Tamu digital/manual dan mengambil nomor antrean.",
      "Petugas Front Office memverifikasi kelengkapan dokumen fisik persyaratan.",
      "Dokumen diteruskan ke Seksi Bimas Islam untuk dilakukan analisis berkas.",
      "Penandatanganan Surat Rekomendasi secara elektronik oleh Kepala Kantor atau pejabat berwenang.",
      "Pemohon menerima Asli Surat Rekomendasi Bantuan Masjid/Mushola di loket penyerahan."
    ],
    alur_daring: [
      "Pemohon menyiapkan softfile dokumen persyaratan dalam format PDF/JPG.",
      "Mengunggah dokumen persyaratan ke formulir digital melalui tautan WA SIMANTAP Kemenag Purworejo (082334451010).",
      "Petugas melakukan verifikasi softfile dokumen yang telah diunggah.",
      "Analisis kelayakan dan keabsahan berkas oleh tim Seksi Bimas Islam.",
      "Penerbitan dan penandatanganan elektronik Surat Rekomendasi.",
      "Pengguna menerima Surat Rekomendasi resmi ber-barcode/elektronik melalui WhatsApp Si MANTAP."
    ],
    wa_template: "Halo Petugas PTSP Kemenag Purworejo, saya ingin mengajukan Layanan Rekomendasi Bantuan Masjid/Mushola. Mohon informasi tautan form dan panduan verifikasi berkas daringnya. Terima kasih.",
    tips_rentan: "Bagi pemohon lansia atau disabilitas yang kesulitan mengisi SIMAS mandiri, petugas PTSP siap memberikan pendampingan pendaftaran SIMAS secara langsung di loket prioritas."
  },
  {
    id: 2,
    slug: "rekomendasi-bantuan-madrasah",
    nomor: "02",
    nama: "Layanan Rekomendasi Bantuan Madrasah",
    singkat: "Rekomendasi Bantuan Madrasah",
    kategori: "Pendidikan Madrasah",
    kategoriBadge: "Pendidikan Madrasah (Penmad)",
    waktu: "73 Menit",
    waktuMenit: 73,
    biaya: "Rp 0,- (Gratis)",
    output: "Asli Surat Rekomendasi Bantuan Madrasah",
    deskripsi: "Layanan penerbitan surat rekomendasi dari Kantor Kemenag Purworejo untuk madrasah (RA/MI/MTs/MA) yang mengajukan bantuan sarana prasarana, rehabilitasi gedung, atau bantuan operasional ke instansi pemerintah atau pihak ketiga.",
    syarat: [
      { id: "2-1", teks: "Surat Permohonan Rekomendasi Bantuan Madrasah bertandatangan Kepala Madrasah" },
      { id: "2-2", teks: "Proposal Bantuan lengkap (memuat latar belakang, profil madrasah, dan RAB)" },
      { id: "2-3", teks: "Surat Keterangan Terdaftar aktif di Aplikasi EMIS Kemenag" },
      { id: "2-4", teks: "KTP Pemohon / Kepala Madrasah" },
      { id: "2-5", teks: "Fotokopi buku rekening bank atas nama Yayasan / Lembaga / Sekolah atau pengurus/panitia (minimal 2 orang)" },
      { id: "2-6", teks: "Pengurus yang terdaftar pada SK penetapan pengurus/panitia bantuan" },
      { id: "2-7", teks: "Surat Keterangan Aktif dari bank penerbit rekening pada tahun berjalan" },
      { id: "2-8", teks: "Fotokopi NPWP Yayasan / Lembaga / Sekolah atau salah satu Pengurus/Panitia" },
      { id: "2-9", teks: "Surat Keterangan Domisili madrasah dari pemerintah desa / kelurahan setempat" }
    ],
    alur_luring: [
      "Hadir di PTSP Kemenag Purworejo.",
      "Isi Buku Tamu dan ambil nomor antrean loket Pendidikan Madrasah.",
      "Verifikasi dokumen fisik proposal dan berkas pendukung di Front Office.",
      "Analisis kelayakan madrasah terdaftar EMIS oleh staf Seksi Penmad.",
      "Persetujuan dan penandatanganan elektronik oleh Kepala Seksi/Kepala Kantor.",
      "Pengguna menerima Surat Rekomendasi Bantuan Madrasah dalam waktu 73 menit."
    ],
    alur_daring: [
      "Unggah berkas PDF proposal dan lampiran ke Google Form melalui WA Si MANTAP.",
      "Verifikasi berkas softfile oleh petugas verifikator Penmad.",
      "Pemeriksaan data keaktifan di pangkalan data EMIS Kemenag.",
      "Pengesahan dan penandatanganan digital surat rekomendasi.",
      "Surat Rekomendasi Bantuan Madrasah dikirimkan langsung ke nomor WhatsApp pemohon."
    ],
    wa_template: "Halo PTSP Kemenag Purworejo, kami dari madrasah ingin mengajukan Layanan Rekomendasi Bantuan Madrasah. Mohon panduan pengiriman berkas daring via WA Simantap. Terima kasih.",
    tips_rentan: "Pastikan data NSM dan keaktifan EMIS telah terupdate sebelum pengajuan. Berkas dapat diantar oleh perwakilan staf madrasah ke loket prioritas."
  },
  {
    id: 3,
    slug: "rekomendasi-bantuan-lembaga-sekolah-rumah-ibadah",
    nomor: "03",
    nama: "Layanan Rekomendasi Bantuan Lembaga / Sekolah / Rumah Ibadah",
    singkat: "Rekomendasi Bantuan Lembaga/Sekolah/Rumah Ibadah",
    kategori: "Urusan Agama",
    kategoriBadge: "Urusan Agama & Keagamaan",
    waktu: "62 Menit",
    waktuMenit: 62,
    biaya: "Rp 0,- (Gratis)",
    output: "Asli Surat Rekomendasi Bantuan Lembaga / Sekolah / Rumah Ibadah",
    deskripsi: "Pemberian rekomendasi bantuan untuk lembaga keagamaan, sekolah lintas agama, atau rumah peribadatan (Gereja, Pura, Vihara, Klenteng, dan lembaga keagamaan lainnya) di wilayah Kabupaten Purworejo.",
    syarat: [
      { id: "3-1", teks: "Surat Permohonan Rekomendasi yang ditujukan kepada Kepala Kantor Kemenag Purworejo" },
      { id: "3-2", teks: "Proposal Bantuan lengkap (memuat profil lembaga/rumah ibadah, maksud tujuan, dan Rencana Anggaran Biaya/RAB)" }
    ],
    alur_luring: [
      "Pemohon hadir di Front Office PTSP Kemenag Purworejo.",
      "Mengisi Buku Tamu dan mengambil nomor antrean.",
      "Verifikasi dokumen surat permohonan dan proposal di loket Front Office.",
      "Analisis berkas oleh Seksi/Penyelenggara terkait (Urusan Agama Kristen, Katolik, Hindu, Buddha, atau Bimas Islam).",
      "Penandatanganan elektronik oleh Kepala Kantor Kemenag Purworejo.",
      "Pemohon menerima Asli Surat Rekomendasi dalam 62 menit."
    ],
    alur_daring: [
      "Mengunggah berkas permohonan dan proposal PDF ke formulir WA SIMANTAP.",
      "Verifikasi berkas digital oleh petugas administrasi.",
      "Analisis kelayakan dan paraf pejabat berwenang.",
      "Tanda tangan elektronik resmi oleh Kepala Kantor.",
      "Pengguna menerima dokumen Surat Rekomendasi ber-barcode via WhatsApp Si MANTAP."
    ],
    wa_template: "Halo PTSP Kemenag Purworejo, kami ingin mengajukan Rekomendasi Bantuan Lembaga / Sekolah / Rumah Ibadah. Mohon informasi kelengkapan dan tautan pengajuannya. Terima kasih.",
    tips_rentan: "Layanan ini terbuka inklusif untuk semua umat beragama di Kabupaten Purworejo tanpa diskriminasi. Petugas pendamping siap membantu komunikasi ramah difabel."
  },
  {
    id: 4,
    slug: "rekomendasi-bantuan-lembaga-keagamaan-islam",
    nomor: "04",
    nama: "Layanan Rekomendasi Bantuan Lembaga Keagamaan Islam (LPQ / MDT / Ponpes)",
    singkat: "Rekomendasi Bantuan LPQ / MDT / Ponpes",
    kategori: "PD Pontren",
    kategoriBadge: "Pendidikan Diniyah & Pontren",
    waktu: "90 Menit",
    waktuMenit: 90,
    biaya: "Rp 0,- (Gratis)",
    output: "Asli Surat Rekomendasi Bantuan Lembaga Keagamaan Islam (LPQ/MDT/Ponpes)",
    deskripsi: "Pemberian surat rekomendasi bantuan dana hibah / bantuan operasional bagi Lembaga Pendidikan Al-Qur'an (LPQ), Madrasah Diniyah Takmiliyah (MDT), dan Pondok Pesantren di Kabupaten Purworejo.",
    syarat: [
      { id: "4-1", teks: "Surat Permohonan Rekomendasi yang ditujukan kepada Kepala Kantor Kemenag Purworejo" },
      { id: "4-2", teks: "Fotokopi Izin Operasional Lembaga yang masih berlaku" },
      { id: "4-3", teks: "Fotokopi Proposal bantuan (minimal memuat profil lembaga dan RAB rinci)" },
      { id: "4-4", teks: "Fotokopi KTP Pimpinan / Kepala Lembaga (Kiai / Ustadz / Kepala LPQ/MDT)" },
      { id: "4-5", teks: "Surat Keterangan Domisili lembaga dari Pemerintah Desa / Kelurahan setempat" },
      { id: "4-6", teks: "Fotokopi Berita Acara (BA) Updating EMIS Pontren tahun berjalan" }
    ],
    alur_luring: [
      "Hadir di Front Office PTSP Kemenag Purworejo.",
      "Isi Buku Tamu dan ambil nomor antrean loket PD Pontren.",
      "Verifikasi dokumen izin operasional dan proposal fisik di loket.",
      "Pengecekan pangkalan data EMIS PD Pontren oleh staf analis.",
      "Penandatanganan Surat Rekomendasi secara elektronik.",
      "Penyerahan Asli Surat Rekomendasi kepada pemohon dalam estimasi 90 menit."
    ],
    alur_daring: [
      "Mengunggah scan berkas izin operasional, proposal, dan KTP ke form WA SIMANTAP.",
      "Verifikasi softfile kelayakan oleh tim PD Pontren.",
      "Analisis keaktifan lembaga pada sistem SITREN/EMIS.",
      "Pengesahan tanda tangan elektronik Kepala Kantor.",
      "Pengiriman softfile Surat Rekomendasi resmi ber-QR Code via WA Si MANTAP."
    ],
    wa_template: "Assalamu'alaikum PTSP Kemenag Purworejo, kami ingin mengajukan Rekomendasi Bantuan Lembaga Keagamaan Islam (LPQ/MDT/Ponpes). Mohon bantuan verifikasinya. Terima kasih.",
    tips_rentan: "Bagi pengasuh sepuh / kiai sepuh yang tidak dapat hadir langsung, berkas dapat diwakilkan oleh pengurus madrasah/pesantren dengan membawa surat tugas sederhana."
  },
  {
    id: 5,
    slug: "rekomendasi-ijin-operasional-ra-madrasah",
    nomor: "05",
    nama: "Layanan Rekomendasi Ijin Operasional RA / Madrasah",
    singkat: "Rekomendasi Ijin Operasional RA/Madrasah",
    kategori: "Pendidikan Madrasah",
    kategoriBadge: "Pendidikan Madrasah (Penmad)",
    waktu: "2 Hari",
    waktuMenit: 2880,
    biaya: "Rp 0,- (Gratis)",
    output: "Surat Rekomendasi Ijin Operasional RA / Madrasah",
    deskripsi: "Pemberian rekomendasi izin operasional bagi yayasan/organisasi yang hendak mendirikan Raudhatul Athfal (RA), Madrasah Ibtidaiyah (MI), Madrasah Tsanawiyah (MTs), atau Madrasah Aliyah (MA) baru di Kabupaten Purworejo.",
    syarat: [
      { id: "5-1", teks: "Persyaratan Administratif: Fotokopi sah Akte Notaris Pendirian Organisasi & Pengesahan Kemenkumham" },
      { id: "5-2", teks: "Persyaratan Administratif: Fotokopi sah SK Pengurus Organisasi + KTP seluruh Pengurus" },
      { id: "5-3", teks: "Persyaratan Administratif: Fotokopi sah Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART)" },
      { id: "5-4", teks: "Persyaratan Administratif: Fotokopi sah SK Struktur Manajemen / Pengelola Madrasah" },
      { id: "5-5", teks: "Persyaratan Teknis: Dokumen Kurikulum madrasah sesuai ketentuan kurikulum Kemenag yang berlaku" },
      { id: "5-6", teks: "Persyaratan Teknis: Dokumen Rencana Induk Pengembangan Madrasah (RIPM)" },
      { id: "5-7", teks: "Persyaratan Teknis: Berkas Calon Guru (Daftar nama, CV, dan fotokopi sah ijazah S1 kependidikan)" },
      { id: "5-8", teks: "Persyaratan Teknis: Berkas Kepala Madrasah (SK Pengangkatan, CV, dan fotokopi sah ijazah)" },
      { id: "5-9", teks: "Persyaratan Teknis: Berkas Tenaga Kependidikan/TU (Daftar nama, CV, dan fotokopi sah ijazah)" },
      { id: "5-10", teks: "Persyaratan Teknis: Data Sarana Prasarana (Daftar inventaris ruang kelas, kantor, mebeler, serta foto/gambar sarpras)" },
      { id: "5-11", teks: "Persyaratan Teknis: Kepemilikan Lahan (Fotokopi sah sertifikat tanah atas nama yayasan / lembaga minimal luas standar)" },
      { id: "5-12", teks: "Persyaratan Kelayakan: Dokumen Studi Kelayakan (Analisis tata ruang, geografis, ekologis, prospek siswa, sosial-budaya, dan demografi)" }
    ],
    alur_luring: [
      "Hadir di Front Office PTSP Kemenag Purworejo dan mengambil antrean loket Penmad.",
      "Verifikasi berkas administratif, teknis, dan kelayakan di Front Office.",
      "Pembentukan Tim Verifikasi dan Visitasi Lapangan oleh Seksi Penmad.",
      "Pelaksanaan verifikasi faktual dan visitasi lapangan langsung ke lokasi RA/Madrasah oleh Tim Penilai.",
      "Penyusunan Berita Acara (BA) Visitasi dan draft Surat Rekomendasi.",
      "Penandatanganan Surat Rekomendasi secara elektronik oleh Kepala Kantor.",
      "Pengguna menerima Surat Rekomendasi Ijin Operasional RA/Madrasah."
    ],
    alur_daring: [
      "Mengunggah berkas persyaratan digital ke Google Form melalui WhatsApp Si MANTAP.",
      "Verifikasi kelengkapan softfile dokumen oleh tim analis Penmad.",
      "Penjadwalan visitasi lapangan terkoordinasi dengan pengusul yayasan.",
      "Kunjungan lapangan dan pemeriksaan kesesuaian fisik bangunan serta sarpras.",
      "Pembuatan Berita Acara dan pengesahan tanda tangan elektronik Kepala Kantor.",
      "Surat Rekomendasi resmi dikirimkan via WA Si MANTAP berformat PDF terenkripsi."
    ],
    wa_template: "Halo PTSP Kemenag Purworejo, kami dari pengurus yayasan ingin mengajukan Permohonan Rekomendasi Izin Operasional RA/Madrasah. Mohon informasi alur berkas dan visitasi lapangannya. Terima kasih.",
    tips_rentan: "Pastikan gedung madrasah yang diajukan sudah memiliki fasilitas dasar aksesibel (seperti ramp tangga landai dan toilet yang ramah siswa disabilitas)."
  },
  {
    id: 6,
    slug: "rekomendasi-mutasi-siswa",
    nomor: "06",
    nama: "Layanan Rekomendasi Mutasi Siswa",
    singkat: "Rekomendasi Mutasi Siswa",
    kategori: "Pendidikan Madrasah",
    kategoriBadge: "Pendidikan Madrasah (Penmad)",
    waktu: "53 Menit",
    waktuMenit: 53,
    biaya: "Rp 0,- (Gratis)",
    output: "Surat Rekomendasi Mutasi Siswa",
    deskripsi: "Pemberian surat rekomendasi perpindahan (mutasi) siswa madrasah antar kabupaten/kota atau antar provinsi, baik dari madrasah ke madrasah maupun dari madrasah ke sekolah umum (dan sebaliknya).",
    syarat: [
      { id: "6-1", teks: "Surat Pengantar permohonan rekomendasi mutasi siswa dari madrasah asal" },
      { id: "6-2", teks: "Surat Keterangan Mutasi Keluar resmi dari Aplikasi EMIS Kemenag" },
      { id: "6-3", teks: "Buku Rapor siswa (asli dan fotokopi lembar biodata serta nilai semester terakhir)" }
    ],
    alur_luring: [
      "Orang tua / wali siswa hadir di Front Office PTSP Kemenag Purworejo.",
      "Isi Buku Tamu dan ambil nomor antrean loket Pendidikan Madrasah.",
      "Verifikasi surat pengantar, surat EMIS, dan rapor di Front Office.",
      "Pemeriksaan kevalidan NISN dan sinkronisasi data EMIS.",
      "Penerbitan Surat Rekomendasi Mutasi dan penandatanganan elektronik.",
      "Pengguna menerima Surat Rekomendasi Mutasi Siswa dalam waktu 53 menit."
    ],
    alur_daring: [
      "Mengunggah foto/scan surat pengantar, lembar EMIS keluar, dan scan rapor ke form WA Si MANTAP.",
      "Petugas memverifikasi kelengkapan berkas secara daring.",
      "Pemeriksaan silang data EMIS madrasah asal dan tujuan.",
      "Penerbitan Surat Rekomendasi ber-barcode pengesahan elektronik.",
      "Dokumen PDF rekomendasi mutasi dikirimkan langsung ke nomor WhatsApp orang tua/wali."
    ],
    wa_template: "Halo PTSP Kemenag Purworejo, saya orang tua/wali murid ingin mengajukan Surat Rekomendasi Mutasi Siswa Madrasah. Mohon bantuan pengajuannya. Terima kasih.",
    tips_rentan: "Bagi orang tua murid berkebutuhan khusus, layanan mutasi ke madrasah inklusi mendapat atensi dan pendampingan khusus dari tim Penmad Kemenag Purworejo."
  },
  {
    id: 7,
    slug: "rekomendasi-pbg-pendirian-rumah-ibadah",
    nomor: "07",
    nama: "Layanan Rekomendasi PBG Pendirian Rumah Ibadah",
    singkat: "Rekomendasi PBG Pendirian Rumah Ibadah",
    kategori: "Bimas Islam",
    kategoriBadge: "Bimas Islam / FKUB",
    waktu: "3 Hari",
    waktuMenit: 4320,
    biaya: "Rp 0,- (Gratis)",
    output: "Asli Surat Rekomendasi Izin Pendirian Rumah Ibadah (PBG)",
    deskripsi: "Pemberian rekomendasi tertulis dari Kepala Kantor Kemenag Purworejo sebagai syarat penerbitan Persetujuan Bangunan Gedung (PBG) untuk pendirian rumah ibadah semua agama sesuai Peraturan Bersama Menteri (PBM) No. 9 dan 8 Tahun 2006.",
    syarat: [
      { id: "7-1", teks: "Surat Permohonan Rekomendasi yang ditujukan kepada Kepala Kantor Kementerian Agama Kab. Purworejo" },
      { id: "7-2", teks: "Isian Blanko Permohonan Izin Mendirikan Bangunan bermaterai cukup, diketahui Kepala Desa/Lurah, Kepala Dinas PUPR, dan Camat" },
      { id: "7-3", teks: "Surat Keputusan (SK) Susunan Panitia Pembangunan Rumah Ibadah" },
      { id: "7-4", teks: "Gambar Rencana Bangunan Rumah Ibadah yang telah disahkan oleh Kepala Dinas PUPR" },
      { id: "7-5", teks: "Sertifikat tanah / surat kepemilikan tanah yang sah milik lembaga atau yayasan" },
      { id: "7-6", teks: "Akta Ikrar Wakaf (AIW) atau Sertifikat Wakaf (khusus Masjid / Mushola)" },
      { id: "7-7", teks: "Daftar nama dan KTP pengguna rumah ibadah paling sedikit 90 (sembilan puluh) orang, disahkan oleh Kepala Desa / Lurah" },
      { id: "7-8", teks: "Dukungan masyarakat setempat paling sedikit 60 (enam puluh) orang, disahkan oleh Kepala Desa / Lurah" },
      { id: "7-9", teks: "KTP Pemohon / Ketua Panitia Pembangunan" }
    ],
    alur_luring: [
      "Hadir di Front Office PTSP Kemenag Purworejo dan menyerahkan berkas permohonan.",
      "Verifikasi kelengkapan berkas fisik syarat 90 jemaat & 60 warga oleh Front Office.",
      "Pembentukan Tim Verifikasi Lapangan bersama pihak terkait.",
      "Verifikasi faktual dan visitasi lapangan ke lokasi pendirian rumah ibadah oleh Tim Kemenag.",
      "Penyusunan Berita Acara dan telaah staf keharmonisan umat beragama.",
      "Penandatanganan Surat Rekomendasi PBG oleh Kepala Kantor Kemenag.",
      "Penyerahan Asli Surat Rekomendasi kepada panitia pembangunan rumah ibadah."
    ],
    alur_daring: [
      "Mengunggah berkas scan formulir, daftar jemaat & warga, serta sertifikat tanah ke form WA SIMANTAP.",
      "Verifikasi berkas administratif softfile oleh tim verifikator.",
      "Penetapan jadwal kunjungan dan koordinasi visitasi lapangan ke lokasi rumah ibadah.",
      "Pelaksanaan visitasi dan penandatanganan Berita Acara verifikasi.",
      "Penerbitan Surat Rekomendasi PBG bertanda tangan elektronik Kepala Kantor.",
      "Dokumen resmi diterbitkan dan dikirimkan via WA Si MANTAP serta arsip fisik di PTSP."
    ],
    wa_template: "Halo PTSP Kemenag Purworejo, kami panitia pembangunan rumah ibadah ingin mengajukan Rekomendasi PBG Pendirian Rumah Ibadah. Mohon informasi jadwal dan pengecekan berkasnya. Terima kasih.",
    tips_rentan: "Desain gambar rencana bangunan rumah ibadah sangat dianjurkan menyertakan jalur akses ramah kursi roda, toilet disabilitas, dan sarana ramah lansia."
  },
  {
    id: 8,
    slug: "pembebasan-biaya-sertifikat-tanah-wakaf",
    nomor: "08",
    nama: "Permohonan Pembebasan Biaya Pendaftaran Sertifikat Tanah Wakaf",
    singkat: "Pembebasan Biaya Sertifikat Tanah Wakaf",
    kategori: "Zakat & Wakaf",
    kategoriBadge: "Penyelenggara Zakat & Wakaf (Zawa)",
    waktu: "65 Menit",
    waktuMenit: 65,
    biaya: "Rp 0,- (Gratis)",
    output: "Surat Permohonan Pembebasan Biaya Pendaftaran Sertifikat Tanah Wakaf (ke BPN)",
    deskripsi: "Pemberian surat pengantar resmi permohonan keringanan / pembebasan biaya pendaftaran pertama kali sertifikat tanah wakaf ke Kantor Pertanahan / BPN Kabupaten Purworejo.",
    syarat: [
      { id: "8-1", teks: "Surat Pengantar dari Kantor Urusan Agama (KUA) setempat" },
      { id: "8-2", teks: "Asli Akta Ikrar Wakaf (AIW) / Akta Pengganti Akta Ikrar Wakaf (APAIW)" },
      { id: "8-3", teks: "Asli Surat Keputusan (SK) Pengesahan Nazhir yang masih berlaku" },
      { id: "8-4", teks: "Fotokopi KTP dan Kartu Keluarga (KK) Wakif / Pelapor" },
      { id: "8-5", teks: "Fotokopi KTP 2 (dua) orang saksi ikrar wakaf" },
      { id: "8-6", teks: "Fotokopi KTP semua anggota Nazhir yang terdaftar pada SK" },
      { id: "8-7", teks: "Sertifikat Tanah Asli / Sertifikat Hak Milik (SHM) / Letter C desa" },
      { id: "8-8", teks: "Surat Pemberitahuan Pajak Terhutang (SPPT PBB) tahun terakhir" }
    ],
    alur_luring: [
      "Nazhir wakaf hadir di Front Office PTSP Kemenag Purworejo.",
      "Mengisi Buku Tamu dan mengambil nomor antrean loket Zakat Wakaf.",
      "Verifikasi dokumen AIW, SK Nazhir, dan bukti kepemilikan tanah di Front Office.",
      "Analisis keabsahan dokumen wakaf oleh Penyelenggara Zakat dan Wakaf.",
      "Penandatanganan Surat Rekomendasi Pembebasan Biaya secara elektronik.",
      "Pemohon menerima surat pengantar pembebasan biaya untuk diserahkan ke loket BPN Purworejo (65 menit)."
    ],
    alur_daring: [
      "Mengunggah scan berkas pengantar KUA, AIW, SK Nazhir, dan KTP ke form WA SIMANTAP.",
      "Verifikasi dokumen digital oleh staf Zawa Kemenag.",
      "Pemeriksaan data pada Sistem Informasi Wakaf (SIWAK).",
      "Penerbitan surat rekomendasi pembebasan biaya ber-QR Code.",
      "Pengiriman softfile surat resmi via WhatsApp Si MANTAP."
    ],
    wa_template: "Assalamu'alaikum PTSP Kemenag Purworejo, kami nazhir wakaf ingin mengajukan Permohonan Pembebasan Biaya Pendaftaran Sertifikat Tanah Wakaf ke BPN. Mohon informasi syaratnya. Terima kasih.",
    tips_rentan: "Bagi nazhir yang berusia lanjut, petugas Kemenag Purworejo siap memberikan pendampingan penuh saat pengurusan berkas agar proses pengamanan aset umat berjalan lancar."
  },
  {
    id: 9,
    slug: "surat-keterangan-terdaftar-majlis-taklim",
    nomor: "09",
    nama: "Layanan Surat Keterangan Terdaftar Majlis Taklim",
    singkat: "Surat Keterangan Terdaftar Majlis Taklim",
    kategori: "Bimas Islam",
    kategoriBadge: "Penerangan Agama Islam",
    waktu: "2 Hari",
    waktuMenit: 2880,
    biaya: "Rp 0,- (Gratis)",
    output: "Asli Surat Keterangan / Rekomendasi Terdaftar Majelis Taklim",
    deskripsi: "Pemberian Surat Keterangan Terdaftar (SKT) resmi bagi majelis taklim di Kabupaten Purworejo untuk pencatatan pada pangkalan data Kementerian Agama dan pembinaan keagamaan.",
    syarat: [
      { id: "9-1", teks: "Surat Permohonan Pendaftaran Majelis Taklim" },
      { id: "9-2", teks: "Surat Rekomendasi dari Kepala KUA kecamatan setempat" },
      { id: "9-3", teks: "Profil Majelis Taklim (Nama Majelis, Alamat, Tahun Berdiri, Nama Ketua/Pengurus, Tempat Kegiatan, Ormas yang diikuti, No. HP aktif)" },
      { id: "9-4", teks: "Susunan Pengurus Majelis Taklim (Ketua, Sekretaris, Bendahara, dan Seksi)" },
      { id: "9-5", teks: "Daftar Nama Ustadz / Guru Pengajar" },
      { id: "9-6", teks: "Rincian Jenis Kegiatan dan Materi Kajian yang diajarkan" },
      { id: "9-7", teks: "Surat Keterangan Domisili dari Pemerintah Kelurahan / Desa setempat" },
      { id: "9-8", teks: "KTP Asli dan Fotokopi KTP Pengurus" },
      { id: "9-9", teks: "KTP Asli dan Fotokopi KTP Pengajar / Penceramah" },
      { id: "9-10", teks: "Daftar Nama Jemaah Majelis Taklim aktif" },
      { id: "9-11", teks: "Fotokopi KTP Jemaah Majelis Taklim" }
    ],
    alur_luring: [
      "Pengurus hadir di Front Office PTSP Kemenag Purworejo.",
      "Mengisi Buku Tamu dan menyerahkan berkas persyaratan majelis taklim.",
      "Verifikasi dokumen fisik di Front Office.",
      "Entry data ke dalam database Sistem Informasi Majelis Taklim oleh petugas.",
      "Survei lokasi, checklist instrumen kelayakan, dan penyusunan Surat Keterangan.",
      "Penandatanganan Surat Keterangan Terdaftar secara elektronik oleh Kepala Kantor.",
      "Pengguna menerima Asli Surat Keterangan Terdaftar Majelis Taklim."
    ],
    alur_daring: [
      "Mengunggah berkas permohonan, rekomendasi KUA, dan profil ke form WA SIMANTAP.",
      "Verifikasi kelengkapan softfile dokumen secara daring.",
      "Input data majelis taklim ke sistem oleh operator Bimas Islam.",
      "Verifikasi faktual lapangan terkoordinasi dengan Penyuluh Agama Islam setempat.",
      "Penerbitan SKT dengan tandatangan elektronik Kepala Kantor.",
      "Pengiriman softfile Surat Keterangan Terdaftar via WhatsApp Si MANTAP."
    ],
    wa_template: "Assalamu'alaikum PTSP Kemenag Purworejo, kami pengurus majelis taklim ingin mendaftarkan majelis taklim kami agar mendapatkan Surat Keterangan Terdaftar. Mohon arahannya. Terima kasih.",
    tips_rentan: "Majelis taklim yang memiliki jemaah lansia atau disabilitas dapat melaporkan kebutuhan bimbingan keagamaan ramah inklusi kepada Penyuluh Agama Islam pendamping."
  },
  {
    id: 10,
    slug: "pendaftaran-lpq-sipdar",
    nomor: "10",
    nama: "Layanan Pendaftaran Lembaga Pendidikan Qur'an (LPQ) Melalui SIPDAR LPQ",
    singkat: "Pendaftaran LPQ via SIPDAR",
    kategori: "PD Pontren",
    kategoriBadge: "Pendidikan Diniyah & Pontren",
    waktu: "3 Hari",
    waktuMenit: 4320,
    biaya: "Rp 0,- (Gratis)",
    output: "Surat Keputusan (SK) Kepala Kantor Kemenag Purworejo dan Asli Piagam Tanda Daftar LPQ",
    deskripsi: "Pendaftaran resmi bagi Lembaga Pendidikan Al-Qur'an (TPQ / TQA / PaudQu / Rumah Tahfidz) melalui aplikasi nasional SIPDAR-LPQ untuk mendapatkan Nomor Statistik LPQ dan Piagam Tanda Daftar.",
    syarat: [
      { id: "10-1", teks: "Surat Permohonan Tanda Daftar LPQ dari pengurus lembaga" },
      { id: "10-2", teks: "Surat Rekomendasi dari Kepala KUA kecamatan setempat" },
      { id: "10-3", teks: "Proposal Pendaftaran LPQ yang melampirkan Dokumen Kurikulum pembelajaran Al-Qur'an" },
      { id: "10-4", teks: "Proposal: Data Jumlah dan Kompetensi Pendidik (Ustadz/Ustadzah) serta Tenaga Kependidikan" },
      { id: "10-5", teks: "Proposal: Data Sarana dan Prasarana tempat belajar LPQ (foto ruang, papan nama, peralatan mengajar)" }
    ],
    alur_luring: [
      "Hadir di Front Office PTSP Kemenag Purworejo.",
      "Mengisi Buku Tamu dan menyerahkan berkas proposal permohonan LPQ.",
      "Petugas Front Office memverifikasi kelengkapan dokumen persyaratan.",
      "Pelaksanaan verifikasi dan visitasi lapangan oleh Tim Seksi PD Pontren ke lokasi LPQ.",
      "Pembuatan Surat Rekomendasi Visitasi ber-TTD elektronik oleh Kepala Kantor.",
      "Unggah berkas visitasi ke Aplikasi SIPDAR LPQ Kemenag RI oleh Petugas Back Office.",
      "Penerbitan SK Kepala Kantor dan Asli Piagam Tanda Daftar LPQ."
    ],
    alur_daring: [
      "Mengunggah berkas proposal PDF dan rekomendasi KUA ke form WA Si MANTAP.",
      "Verifikasi softfile kelayakan awal oleh analis PD Pontren.",
      "Jadwal visitasi lapangan langsung oleh tim penilai Kemenag Purworejo.",
      "Input data dan berkas visitasi ke sistem SIPDAR LPQ nasional.",
      "Penerbitan SK dan Piagam Tanda Daftar ber-barcode resmi.",
      "Pemberitahuan nomor statistik dan pengambilan piagam fisik di loket PTSP / PDF via WA."
    ],
    wa_template: "Assalamu'alaikum PTSP Kemenag Purworejo, kami ingin mendaftarkan Lembaga Pendidikan Al-Qur'an (TPQ) melalui SIPDAR LPQ. Mohon informasi syarat dan alurnya. Terima kasih.",
    tips_rentan: "LPQ yang menerima santri berkebutuhan khusus (tunanetra santri braille atau tunarungu isyarat) dapat mengajukan pembinaan metodologi khusus ke Seksi PD Pontren."
  },
  {
    id: 11,
    slug: "pendaftaran-madrasah-diniyah-takmiliyah-sitren",
    nomor: "11",
    nama: "Layanan Pendaftaran Madrasah Diniyah Takmiliyah (MDT) Melalui Aplikasi SITREN",
    singkat: "Pendaftaran MDT via SITREN",
    kategori: "PD Pontren",
    kategoriBadge: "Pendidikan Diniyah & Pontren",
    waktu: "2 Hari",
    waktuMenit: 2880,
    biaya: "Rp 0,- (Gratis)",
    output: "Surat Keputusan (SK) Kepala Kantor Kemenag Purworejo dan Asli Piagam Penyelenggaraan MDT",
    deskripsi: "Pendaftaran izin operasional dan tanda daftar bagi Madrasah Diniyah Takmiliyah (Awwaliyah / Wustha / Ulya) di Kabupaten Purworejo melalui aplikasi pangkalan data SITREN Kemenag RI.",
    syarat: [
      { id: "11-1", teks: "Surat Permohonan Tanda Daftar MDT yang ditujukan kepada Kepala Kantor Kemenag Purworejo" },
      { id: "11-2", teks: "Surat Rekomendasi dari Kepala KUA kecamatan setempat" },
      { id: "11-3", teks: "Proposal: Nama Madrasah Diniyah Takmiliyah dan alamat lengkap lembaga" },
      { id: "11-4", teks: "Proposal: Nama Kepala MDT beserta CV dan SK pengangkatan" },
      { id: "11-5", teks: "Proposal: Jenjang MDT yang diselenggarakan (Awwaliyah, Wustha, atau Ulya)" },
      { id: "11-6", teks: "Proposal: Daftar nama siswa/santri aktif, minimal 15 (lima belas) orang" },
      { id: "11-7", teks: "Proposal: Daftar nama guru/ustadz, minimal 2 (dua) orang beserta mata pelajaran yang diampu (Al-Qur'an, Hadits, Aqidah, Fiqih, Tarikh Islam, Bahasa Arab)" },
      { id: "11-8", teks: "Proposal: Daftar nama tenaga administrasi, minimal 1 (satu) orang" },
      { id: "11-9", teks: "Proposal: Data sarana prasarana berupa ruangan dan peralatan pembelajaran" }
    ],
    alur_luring: [
      "Pengurus MDT hadir di Front Office PTSP Kemenag Purworejo.",
      "Isi Buku Tamu dan ambil nomor antrean loket PD Pontren.",
      "Verifikasi dokumen kelayakan minimal 15 santri dan 2 guru di Front Office.",
      "Visitasi dan verifikasi lapangan ke gedung madrasah diniyah oleh Tim Kemenag.",
      "Penyusunan Surat Rekomendasi Visitasi ber-TTD elektronik oleh Kepala Kantor.",
      "Petugas Back Office mengunggah berkas ke Aplikasi SITREN nasional.",
      "Pengguna menerima SK Kepala Kantor dan Asli Piagam Penyelenggaraan MDT."
    ],
    alur_daring: [
      "Mengunggah proposal lengkap dan rekomendasi KUA ke tautan form WA Si MANTAP.",
      "Verifikasi softfile data santri dan guru oleh petugas verifikator.",
      "Penyusunan jadwal verifikasi faktual lapangan oleh tim PD Pontren.",
      "Sinkronisasi data ke aplikasi SITREN Kemenag RI.",
      "Penerbitan SK dan Piagam ber-QR code.",
      "Pengguna menerima pemberitahuan resmi dan dokumen via WA Si MANTAP."
    ],
    wa_template: "Assalamu'alaikum PTSP Kemenag Purworejo, kami ingin mengajukan Pendaftaran Madrasah Diniyah Takmiliyah (MDT) melalui aplikasi SITREN. Mohon panduan persyaratannya. Terima kasih.",
    tips_rentan: "Pastikan rasio santri dan ruang kelas aman serta mudah diakses bagi santri disabilitas atau anak usia dini."
  },
  {
    id: 12,
    slug: "pendaftaran-keberadaan-pondok-pesantren-sitren",
    nomor: "12",
    nama: "Layanan Pendaftaran Keberadaan Pondok Pesantren (Melalui Aplikasi SITREN)",
    singkat: "Pendaftaran Pondok Pesantren via SITREN",
    kategori: "PD Pontren",
    kategoriBadge: "Pendidikan Diniyah & Pontren",
    waktu: "240 Menit",
    waktuMenit: 240,
    biaya: "Rp 0,- (Gratis)",
    output: "Surat Rekomendasi Pendaftaran Keberadaan Pondok Pesantren (untuk penerbitan Piagam Statistik Pesantren di SITREN)",
    deskripsi: "Layanan verifikasi dan penerbitan rekomendasi pendaftaran keberadaan pesantren baru di Kabupaten Purworejo agar terdaftar secara resmi di Kementerian Agama RI dan memperoleh Nomor Statistik Pesantren (NSP).",
    syarat: [
      { id: "12-1", teks: "Surat Permohonan Izin Terdaftar Pesantren asli bertandatangan Kiai/Pimpinan dan berstempel lembaga" },
      { id: "12-2", teks: "Formulir Pengajuan Izin Terdaftar Pesantren yang telah diisi lengkap bertandatangan dan stempel" },
      { id: "12-3", teks: "Surat Pernyataan Komitmen Asli mengamalkan Islam Rahmatan Lil'alamin, Pancasila, UUD 1945, NKRI, Bhinneka Tunggal Ika, dan memenuhi rukun pesantren (arkanul ma'had)" },
      { id: "12-4", teks: "Struktur Organisasi Pesantren yang jelas" },
      { id: "12-5", teks: "Data Tenaga Pendidik (Guru/Ustadz) yang mengajar di Pesantren" },
      { id: "12-6", teks: "Data Tenaga Kependidikan / penunjang administrasi pesantren" },
      { id: "12-7", teks: "Data Santri mukim yang tercatat dalam administrasi pesantren" },
      { id: "12-8", teks: "Data Kurikulum Pesantren dan Daftar Kitab Kuning rujukan keilmuan Islam" },
      { id: "12-9", teks: "Surat Keterangan Domisili Pesantren asli dari Kelurahan / Desa setempat" },
      { id: "12-10", teks: "Salinan Akta Notaris & SK Kemenkumham Badan Hukum Yayasan / Ormas (bagi yang berbadan hukum)" },
      { id: "12-11", teks: "Salinan NPWP Yayasan / Ormas / Pimpinan Pesantren" },
      { id: "12-12", teks: "Salinan KTP Pendiri, Pimpinan Yayasan, atau Pimpinan Ormas" },
      { id: "12-13", teks: "Salinan bukti kepemilikan tanah (sertifikat hak milik / hak pakai / wakaf) atas nama pimpinan/lembaga" },
      { id: "12-14", teks: "Dokumentasi foto Sarpras: Papan nama pesantren, Asrama santri mukim, Masjid/Mushalla, Ruang belajar, Aktivitas pembelajaran kitab kuning, Denah pesantren, Dapur santri, MCK & sanitasi" },
      { id: "12-15", teks: "(Khusus Cabang): Salinan Piagam PSP Induk dan Naskah Perjanjian Kerjasama Kerjasama Pesantren" }
    ],
    alur_luring: [
      "Pimpinan / Utusan Pesantren hadir di Front Office PTSP Kemenag Purworejo.",
      "Mengisi Buku Tamu dan menyerahkan berkas pendaftaran keberadaan pesantren.",
      "Verifikasi dokumen 5 rukun pesantren (Kiai, Santri Mukim, Asrama, Masjid, Kitab Kuning).",
      "Tim verifikator PD Pontren melaksanakan visitasi dan verifikasi faktual ke lokasi pesantren.",
      "Pembuatan Berita Acara Visitasi dan draft Surat Rekomendasi bertanda tangan elektronik Kepala Kantor.",
      "Petugas Back Office mengunggah Berita Acara dan rekomendasi ke Aplikasi SITREN Kemenag RI.",
      "Penyerahan Surat Rekomendasi Pendaftaran Keberadaan Pesantren dalam estimasi 240 menit (4 jam)."
    ],
    alur_daring: [
      "Mengunggah berkas scan pendaftaran pesantren lengkap ke formulir daring WA SIMANTAP.",
      "Verifikasi berkas administratif secara daring oleh tim PD Pontren.",
      "Penjadwalan visitasi lapangan ke lokasi pondok pesantren.",
      "Kunjungan lapangan verifikasi kelayakan fisik asrama dan pengajian kitab kuning.",
      "Input data hasil visitasi ke sistem SITREN nasional.",
      "Penerbitan surat rekomendasi resmi ber-barcode yang dikirim via WhatsApp Si MANTAP."
    ],
    wa_template: "Assalamu'alaikum PTSP Kemenag Purworejo, kami dari pengurus pondok pesantren ingin mendaftarkan keberadaan pesantren kami ke aplikasi SITREN Kemenag. Mohon petunjuk berkasnya. Terima kasih.",
    tips_rentan: "Pesantren yang ramah santri difabel (misalnya pesantren tahfidz tunanetra atau santri tuli) dapat mencantumkan kekhususan program inklusi ini dalam profil pesantren."
  },
  {
    id: 13,
    slug: "permohonan-pengukuran-arah-kiblat",
    nomor: "13",
    nama: "Layanan Permohonan Pengukuran Arah Kiblat",
    singkat: "Pengukuran Arah Kiblat",
    kategori: "Bimas Islam",
    kategoriBadge: "Bimas Islam / Tim Hisab Rukyat",
    waktu: "4 Hari",
    waktuMenit: 5760,
    biaya: "Rp 0,- (Gratis)",
    output: "Sertifikat Arah Kiblat Masjid / Musholla",
    deskripsi: "Layanan pengukuran arah kiblat yang presisi dan akurat oleh Tim Falakiyah / Badan Hisab Rukyat Kemenag Purworejo menggunakan theodolite dan perhitungan astronomi Islam untuk masjid, mushola, atau pemakaman muslim.",
    syarat: [
      { id: "13-1", teks: "Surat Permohonan Pengukuran Arah Kiblat Masjid / Musholla ditujukan ke Kepala Kantor Kemenag Purworejo" },
      { id: "13-2", teks: "Denah lokasi / titik koordinat tempat yang akan diukur" },
      { id: "13-3", teks: "Nama dan nomor kontak pengurus/takmir yang akan mendampingi petugas saat pengukuran lapangan" }
    ],
    alur_luring: [
      "Pengurus takmir hadir di Front Office PTSP Kemenag Purworejo.",
      "Mengisi Buku Tamu dan menyerahkan surat permohonan pengukuran arah kiblat.",
      "Petugas Front Office memverifikasi surat permohonan dan mencatat nomor kontak takmir.",
      "Tim Hisab Rukyat Kemenag Purworejo berkoordinasi menentukan jadwal survei lokasi.",
      "Pengukuran arah kiblat secara langsung di lokasi masjid/mushola menggunakan theodolite dan perhitungan astronomis.",
      "Penyusunan Berita Acara dan pembuatan Sertifikat Arah Kiblat bertanda tangan elektronik Kepala Kantor.",
      "Pemohon menerima Sertifikat Arah Kiblat resmi ber-barcode."
    ],
    alur_daring: [
      "Mengunggah scan surat permohonan dan koordinat lokasi ke form WA SIMANTAP (082334451010).",
      "Verifikasi dokumen persyaratan oleh petugas Seksi Bimas Islam.",
      "Penetapan jadwal pengukuran lapangan yang disepakati bersama takmir via WhatsApp.",
      "Kunjungan tim ahli falakiyah ke lokasi untuk pengukuran arah kiblat.",
      "Pembuatan Sertifikat Arah Kiblat digital ber-QR code.",
      "Sertifikat dikirimkan via WhatsApp Si MANTAP dalam bentuk PDF resolusi tinggi siap cetak."
    ],
    wa_template: "Assalamu'alaikum Tim Hisab Rukyat PTSP Kemenag Purworejo, kami takmir masjid/mushola ingin mengajukan Layanan Pengukuran Arah Kiblat. Mohon konfirmasi jadwal dan syaratnya. Terima kasih.",
    tips_rentan: "Takmir lansia dapat menentukan jadwal pengukuran di waktu yang nyaman, dan petugas siap mendemonstrasikan penentuan arah kiblat secara visual di lapangan."
  },
  {
    id: 14,
    slug: "layanan-urusan-agama",
    nomor: "14",
    nama: "Layanan Urusan Agama (Konsultasi Hukum, Informasi Keagamaan, & Penasehatan Perkawinan)",
    singkat: "Layanan Urusan Agama",
    kategori: "Urusan Agama",
    kategoriBadge: "Urusan Agama & Kesekretariatan",
    waktu: "Hukum & Info: 2 Hari | Perkawinan: 3 Minggu",
    waktuMenit: 2880,
    biaya: "Rp 0,- (Gratis)",
    output: "Surat Keterangan Hasil Konsultasi / Data Keagamaan / Berita Acara Penasehatan Perkawinan",
    deskripsi: "Layanan terpadu urusan agama di Kemenag Purworejo yang mencakup: (1) Konsultasi Hukum Keagamaan, (2) Permohonan Informasi / Data Keagamaan Resmi, dan (3) Layanan Penasehatan dan Pelestarian Perkawinan (BP4).",
    sub_layanan: [
      {
        nama: "1. Layanan Konsultasi Hukum Keagamaan",
        syarat: "Surat Permohonan Layanan Konsultasi Hukum",
        output: "Surat Keterangan Hasil Konsultasi Hukum Keagamaan",
        waktu: "2 Hari"
      },
      {
        nama: "2. Layanan Informasi & Data Keagamaan",
        syarat: "Surat Permohonan Data / Informasi Keagamaan resmi (untuk penelitian, instansi, atau umum)",
        output: "Surat Keterangan Data Keagamaan resmi Kemenag Purworejo",
        waktu: "2 Hari"
      },
      {
        nama: "3. Layanan Penasehatan Perkawinan (BP4)",
        syarat: "Surat Permohonan Layanan Penasehatan Perkawinan dari calon pengantin / pasangan suami istri",
        output: "Berita Acara / Naskah Hasil Penasehatan Pelestarian Perkawinan",
        waktu: "3 Minggu (meliputi sesi konseling berkala)"
      }
    ],
    syarat: [
      { id: "14-1", teks: "Untuk Konsultasi Hukum: Surat Permohonan Layanan Konsultasi Hukum yang menjelaskan pokok masalah" },
      { id: "14-2", teks: "Untuk Informasi Keagamaan: Surat Permohonan Data / Informasi Keagamaan dari instansi / lembaga / kampus pemohon" },
      { id: "14-3", teks: "Untuk Penasehatan Perkawinan: Surat Permohonan Layanan Penasehatan Perkawinan dan fotokopi KTP / Buku Nikah pasangan" }
    ],
    alur_luring: [
      "Pemohon hadir di Front Office PTSP Kemenag Purworejo.",
      "Mengisi Buku Tamu dan mengambil antrean konsultasi di loket PTSP.",
      "Verifikasi dokumen persyaratan fisik di Front Office.",
      "Pelaksanaan sesi konsultasi tatap muka dengan pejabat teknis / penghulu / konselor keagamaan di ruang konsultasi tertutup.",
      "Penyusunan Surat Keterangan Hasil Konsultasi / Data Keagamaan / Berita Acara Penasehatan Perkawinan.",
      "Pengguna menerima dokumen hasil layanan resmi bertanda tangan elektronik."
    ],
    alur_daring: [
      "Mengunggah surat permohonan ke formulir daring WA SIMANTAP.",
      "Verifikasi dokumen softfile oleh petugas urusan agama.",
      "Penjadwalan sesi konsultasi di kantor atau konsultasi daring ramah komunikasi teks/video.",
      "Pelaksanaan sesi konsultasi / penyusunan data keagamaan yang diminta.",
      "Penerbitan dokumen resmi ber-barcode hasil konsultasi.",
      "Dokumen dikirimkan via WhatsApp Si MANTAP langsung ke nomor pemohon."
    ],
    wa_template: "Halo PTSP Kemenag Purworejo, saya ingin mengajukan Layanan Urusan Agama (Konsultasi Hukum / Informasi Keagamaan / Penasehatan Perkawinan). Mohon bantuan jadwal layanannya. Terima kasih.",
    tips_rentan: "Tersedia ruang konsultasi khusus yang tenang dan privat. Bagi pemohon Teman Tuli, sesi konsultasi dapat didampingi juru bahasa isyarat atau dilakukan secara tertulis melalui layar gawai."
  }
];

const FAQ_ITEMS = [
  {
    q: "Apakah seluruh layanan publik di PTSP Kemenag Purworejo dipungut biaya?",
    a: "SAMA SEKALI TIDAK. Seluruh 14 layanan publik di Kantor Kemenag Purworejo memiliki tarif Rp 0,- (GRATIS). Jika ada oknum yang meminta pungutan liar, segera laporkan ke Hotline Aduan di WhatsApp 085196822220."
  },
  {
    q: "Apa itu WA SIMANTAP Kemenag Purworejo?",
    a: "WA SIMANTAP (082334451010) adalah Sistem Informasi dan Manajemen Layanan Terpadu Kemenag Purworejo melalui WhatsApp yang melayani: 1) Pengajuan layanan publik, 2) Informasi layanan publik, 3) Konsultasi layanan, dan 4) Kritik dan saran secara daring tanpa harus datang ke kantor."
  },
  {
    q: "Bagaimana fasilitas untuk kelompok rentan (disabilitas, lansia, ibu hamil)?",
    a: "Kemenag Purworejo menyediakan loket prioritas langsung tanpa antrean umum, ramp kursi roda, guiding block, kursi roda gratis, toilet disabilitas, ruang laktasi, serta pendampingan petugas terlatih untuk disabilitas netra dan rungu/wicara."
  },
  {
    q: "Bagaimana cara memasang aplikasi ini agar bisa dibuka tanpa internet (offline)?",
    a: "Cukup klik tombol 'Pasang Aplikasi (Install PWA)' di bagian atas atau menu navigasi. Setelah terpasang di HP atau laptop, seluruh informasi 14 layanan dan fitur suara dapat dibuka kapan saja meski tanpa kuota internet."
  }
];
