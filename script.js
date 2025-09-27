// ==========================================================
// 1. UCAPAN SELAMAT DATANG ("Hi Nama")
// ==========================================================
function setWelcomeGreeting() {
    const greetingElement = document.getElementById('greeting');
    // Pastikan elemen greeting ada di halaman
    if (!greetingElement) return;

    let userName = localStorage.getItem('userName');

    // Jika nama belum ada, minta input dari pengguna
    if (!userName || userName.trim() === "") {
        // Minta nama sampai diisi
        userName = prompt("Selamat datang! Silakan masukkan nama Anda untuk ucapan personal:");
        
        // Cek jika pengguna membatalkan atau mengosongkan
        if (!userName || userName.trim() === "") {
            userName = "Guest"; // Nama default jika input kosong/dibatalkan
        }
        
        // Simpan nama (yang sudah divalidasi)
        localStorage.setItem('userName', userName.trim());
    }

    // Isi teks ucapan selamat datang
    greetingElement.textContent = `Hi, ${userName.trim()} Welcome to Website`;
}


// ==========================================================
// 2. VALIDASI & TAMPILKAN HASIL FORMULIR
// ==========================================================
function validateAndDisplayForm(event) {
    // Mencegah pengiriman formulir default (reload halaman)
    event.preventDefault(); 

    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const interestInput = document.getElementById('interest');
    
    let isValid = true;

    // --- RESET PESAN ERROR ---
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('message-error').textContent = '';

    // --- VALIDASI INPUT ---
    // 1. Validasi Nama
    if (nameInput.value.trim() === "") {
        document.getElementById('name-error').textContent = 'Nama harus diisi.';
        isValid = false;
    }

    // 2. Validasi Email (format dasar)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
        document.getElementById('email-error').textContent = 'Email harus diisi.';
        isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        document.getElementById('email-error').textContent = 'Format email tidak valid.';
        isValid = false;
    }

    // 3. Validasi Pesan
    if (messageInput.value.trim() === "") {
        document.getElementById('message-error').textContent = 'Pesan harus diisi.';
        isValid = false;
    }
    // Note: Interest/Select tidak divalidasi karena selalu memiliki nilai.

    // --- JIKA VALIDASI BERHASIL ---
    if (isValid) {
        // Tampilkan nilai di HTML
        displayFormOutput(
            nameInput.value.trim(), 
            emailInput.value.trim(), 
            interestInput.value,
            messageInput.value.trim()
        );
        
        // Reset formulir setelah sukses
        form.reset(); 
    }
}

function displayFormOutput(name, email, interest, message) {
    const outputBox = document.getElementById('form-output');
    
    // Update elemen output
    document.getElementById('output-name').textContent = name;
    document.getElementById('output-email').textContent = email;
    document.getElementById('output-interest').textContent = interest;
    document.getElementById('output-message').textContent = message;

    // Tampilkan kotak output
    outputBox.style.display = 'block';

    // Gulir ke hasil output agar terlihat oleh pengguna
    outputBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


// ==========================================================
// 3. INISIALISASI
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    // Panggil fungsi selamat datang
    setWelcomeGreeting();

    // Event listener untuk formulir kontak (hanya jika ada di halaman)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateAndDisplayForm);
    }
});