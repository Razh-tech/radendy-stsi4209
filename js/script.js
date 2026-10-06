// js/script.js

// 1. UTILITAS MODAL
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('show');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('show');
}

// Tutup modal jika klik di luar area konten
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('show');
  }
});

// 2. OTENTIKASI & SESI
function checkAuth() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('login.html');

  if (!user && !isLoginPage) {
    window.location.href = 'index.html';
  } else if (user && isLoginPage) {
    window.location.href = 'dashboard.html';
  }

  // Tampilkan nama di navbar jika elemen tersedia
  const navUserInfo = document.getElementById('navUserInfo');
  if (navUserInfo && user) {
    navUserInfo.textContent = `${user.nama} (${user.role})`;
  }
}

function handleLogout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Handler Form Login
const formLogin = document.getElementById('formLogin');
if (formLogin) {
  formLogin.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');

    // Validasi kredensial pada dataPengguna
    const userFound = dataPengguna.find(u => u.email === emailInput && u.password === passwordInput);

    if (userFound) {
      localStorage.setItem('currentUser', JSON.stringify(userFound));
      window.location.href = 'dashboard.html';
    } else {
      // Sesuai kriteria soal: Tampilkan pesan spesifik
      const errorMessage = "The email/password you entered is incorrect.";
      alert(errorMessage); // Pop-up Alert bawaan
      if (alertBox) {
        alertBox.textContent = errorMessage;
        alertBox.style.display = 'block';
      }
    }
  });

  // Tombol Forgot Password & Sign Up
  document.getElementById('btnForgotPassword').addEventListener('click', () => openModal('modalForgot'));
  document.getElementById('btnSignUp').addEventListener('click', () => openModal('modalRegister'));
}

function handleForgotSubmit() {
  const email = document.getElementById('forgotEmail').value;
  if (!email) {
    alert("Silakan masukkan email Anda!");
    return;
  }
  alert(`Instruksi pengaturan ulang kata sandi telah dikirim ke: ${email}`);
  closeModal('modalForgot');
}

function handleRegisterSubmit() {
  const nama = document.getElementById('regNama').value;
  const email = document.getElementById('regEmail').value;
  const pass = document.getElementById('regPass').value;

  if (!nama || !email || !pass) {
    alert("Harap lengkapi semua kolom pendaftaran!");
    return;
  }

  // Simpan simulasi pengguna baru
  dataPengguna.push({
    id: dataPengguna.length + 1,
    nama: nama,
    email: email,
    password: pass,
    role: "UPBJJ-UT",
    lokasi: "Cabang Baru"
  });

  alert("Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.");
  closeModal('modalRegister');
}

// 3. LOGIKA DASHBOARD (Greeting Berdasarkan Jam Lokal)
function initDashboard() {
  const greetingText = document.getElementById('greetingText');
  const greetingSubtitle = document.getElementById('greetingSubtitle');
  if (!greetingText) return;

  const user = JSON.parse(localStorage.getItem('currentUser')) || { nama: "Sobat UT" };
  const currentHour = new Date().getHours();
  let waktuSalam = "Pagi";

  if (currentHour >= 4 && currentHour < 11) {
    waktuSalam = "Pagi";
  } else if (currentHour >= 11 && currentHour < 15) {
    waktuSalam = "Siang";
  } else if (currentHour >= 15 && currentHour < 18) {
    waktuSalam = "Sore";
  } else {
    waktuSalam = "Malam";
  }

  greetingText.textContent = `Selamat ${waktuSalam}, ${user.nama}!`;
  greetingSubtitle.textContent = `Anda masuk sebagai ${user.role} di ${user.lokasi || 'Pusat'}. Siap melayani distribusi bahan ajar hari ini.`;
}

// 4. LOGIKA PELACAKAN DO (Tracking)
function renderTrackingView(doData, containerElement) {
  if (!doData) {
    containerElement.innerHTML = `
      <div class="alert alert-danger">
        Nomor Delivery Order (DO) tidak ditemukan. Silakan periksa kembali nomor DO Anda.
      </div>
    `;
    containerElement.style.display = 'block';
    return;
  }

  const isCompleted = doData.status.toLowerCase().includes('selesai');
  
  let html = `
    <div style="background: #f8fafc; border-radius: 8px; padding: 1.25rem; border: 1px solid var(--border-color);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <h3 style="color: var(--primary);">Nomor DO: ${doData.nomorDO}</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Nama Penerima: <strong>${doData.nama}</strong></p>
        </div>
        <span class="badge ${isCompleted ? 'badge-success' : 'badge-warning'}" style="font-size: 0.95rem; padding: 6px 14px;">
          ${doData.status}
        </span>
      </div>

      <!-- Detail Pengiriman -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 1.25rem;">
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Ekspedisi:</span>
          <p style="font-weight: 600;">${doData.ekspedisi}</p>
        </div>
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Tanggal Kirim:</span>
          <p style="font-weight: 600;">${doData.tanggalKirim}</p>
        </div>
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Jenis Paket:</span>
          <p style="font-weight: 600;">${doData.paket}</p>
        </div>
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Total Biaya:</span>
          <p style="font-weight: 600; color: var(--primary);">${doData.total}</p>
        </div>
      </div>

      <!-- Progress Stepper -->
      <div class="tracking-status-bar">
        <div class="status-step">
          <div class="step-circle active">✓</div>
          <small>Loket Pusat</small>
        </div>
        <div class="status-step">
          <div class="step-circle active">✓</div>
          <small>Hub Transit</small>
        </div>
        <div class="status-step">
          <div class="step-circle ${isCompleted ? 'active' : ''}">3</div>
          <small>${isCompleted ? 'Terkirim' : 'Perjalanan'}</small>
        </div>
      </div>

      <!-- Riwayat Perjalanan (Timeline) -->
      <h4 style="margin-top: 1rem; color: var(--primary);">Riwayat Perjalanan Paket</h4>
      <ul class="timeline">
  `;

  doData.perjalanan.forEach(step => {
    html += `
      <li class="timeline-item">
        <div class="timeline-time">${step.waktu}</div>
        <div class="timeline-desc">${step.keterangan}</div>
      </li>
    `;
  });

  html += `
      </ul>
    </div>
  `;

  containerElement.innerHTML = html;
  containerElement.style.display = 'block';
}

function quickTrackDO() {
  const doNum = document.getElementById('quickDoInput').value.trim();
  const resContainer = document.getElementById('quickDoResult');
  const data = dataTracking[doNum];
  renderTrackingView(data, resContainer);
}

function executeSearchTracking() {
  const doNum = document.getElementById('trackingDoInput').value.trim();
  const resContainer = document.getElementById('trackingResultArea');
  const data = dataTracking[doNum];
  renderTrackingView(data, resContainer);
}

// 5. LOGIKA STOK BAHAN AJAR (DOM Rendering & Manipulation)
function renderStokTable(items = dataBahanAjar) {
  const tbody = document.getElementById('stokTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Tidak ada data bahan ajar ditemukan.</td></tr>`;
    return;
  }

  items.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <img src="${item.cover}" alt="Sampul ${item.namaBarang}" class="thumbnail-cell" onerror="this.onerror=null; this.src='assets/img/pengantar_komunikasi.jpg';">
      </td>
      <td><strong>${item.kodeLokasi}</strong></td>
      <td><span class="badge badge-info">${item.kodeBarang}</span></td>
      <td>${item.namaBarang}</td>
      <td>${item.jenisBarang}</td>
      <td>Edisi ${item.edisi}</td>
      <td><strong style="color: ${item.stok < 200 ? 'var(--danger)' : 'var(--success)'};">${item.stok.toLocaleString('id-ID')} Eks</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

function handleAddNewBahanAjar() {
  const kodeLokasi = document.getElementById('newKodeLokasi').value.trim();
  const kodeBarang = document.getElementById('newKodeBarang').value.trim();
  const namaBarang = document.getElementById('newNamaBarang').value.trim();
  const jenisBarang = document.getElementById('newJenis').value;
  const edisi = document.getElementById('newEdisi').value;
  const stok = parseInt(document.getElementById('newStok').value, 10);

  const newItem = {
    kodeLokasi,
    kodeBarang,
    namaBarang,
    jenisBarang,
    edisi,
    stok,
    cover: "assets/img/pengantar_komunikasi.jpg"
  };

  // Tambahkan data ke array secara runtime
  dataBahanAjar.unshift(newItem);

  // Render ulang tabel DOM
  renderStokTable();

  // Bersihkan form & tutup modal
  document.getElementById('formAddBahanAjar').reset();
  closeModal('modalAddStok');

  alert(`Berhasil menambahkan modul [${kodeBarang}] ${namaBarang} ke dalam katalog!`);
}

function filterStokTable() {
  const query = document.getElementById('searchBukuInput').value.toLowerCase();
  const filtered = dataBahanAjar.filter(buku => 
    buku.namaBarang.toLowerCase().includes(query) ||
    buku.kodeBarang.toLowerCase().includes(query) ||
    buku.kodeLokasi.toLowerCase().includes(query)
  );
  renderStokTable(filtered);
}

// Inisialisasi saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  initDashboard();
  renderStokTable();
});