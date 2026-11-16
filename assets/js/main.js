// =========================================================
// 1. DATA DUMMY BARANG UNTUK HALAMAN BERANDA (index.html)
// =========================================================
const dummyItems = [
    { id: 1, nama: "Charger Ugreen GaN 65W", kategori: "Elektronik", lokasi: "Gedung U201", tanggal: "13-10-2026", status: "DITEMUKAN", ikon: "🔌" },
    { id: 2, nama: "Dompet Kulit Cokelat", kategori: "Dompet", lokasi: "Pendopo", tanggal: "13-10-2026", status: "HILANG", ikon: "👛" },
    { id: 3, nama: "Kunci Motor Honda + Gantungan", kategori: "Kunci", lokasi: "Bengkel", tanggal: "12-10-2026", status: "DITEMUKAN", ikon: "🔑" },
    { id: 4, nama: "Kalkulator Scientific Casio", kategori: "Perlengkapan", lokasi: "Lab", tanggal: "12-10-2026", status: "DIKEMBALIKAN", ikon: "🧮" },
    { id: 5, nama: "KTM & Kartu ATM BNI (Disamarkan)", kategori: "Dokumen", lokasi: "Gedung U201", tanggal: "12-10-2026", status: "DITEMUKAN", ikon: "🪪" },
    { id: 6, nama: "Earphone TWS Putih", kategori: "Elektronik", lokasi: "Lab", tanggal: "11-10-2026", status: "HILANG", ikon: "🎧" },
    { id: 7, nama: "Helm Half Face Hitam Doff", kategori: "Perlengkapan", lokasi: "Bengkel", tanggal: "11-10-2026", status: "DITEMUKAN", ikon: "🪖" },
    { id: 8, nama: "Tumbler Stainless Biru", kategori: "Aksesori", lokasi: "Pendopo", tanggal: "10-10-2026", status: "DIKEMBALIKAN", ikon: "🧴" }
];

let activeLocation = "Semua";
let activeStatus = "Semua";

function renderItems(items) {
    const grid = document.getElementById("items-grid");
    const emptyState = document.getElementById("empty-state");
    const resultCount = document.getElementById("result-count");
    if (!grid) return;

    grid.innerHTML = "";

    if (items.length === 0) {
        grid.classList.add("hidden");
        emptyState.classList.remove("hidden");
        resultCount.textContent = "Menampilkan 0 laporan";
        return;
    }

    grid.classList.remove("hidden");
    emptyState.classList.add("hidden");
    resultCount.textContent = `Menampilkan ${items.length} laporan sesuai filter`;

    items.forEach(item => {
        let badgeClass = "bg-amber-100 text-amber-800";
        if (item.status === "HILANG") badgeClass = "bg-rose-100 text-rose-800";
        if (item.status === "DIKEMBALIKAN") badgeClass = "bg-emerald-100 text-emerald-800";

        const card = `
            <div class="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div class="space-y-3">
                    <div class="w-full h-40 bg-slate-100 rounded-xl relative flex items-center justify-center text-4xl">
                        <span>${item.ikon}</span>
                        <span class="absolute top-2.5 left-2.5 ${badgeClass} text-[10px] font-bold px-2.5 py-1 rounded uppercase">● ${item.status}</span>
                    </div>
                    <div class="space-y-1">
                        <span class="text-[11px] font-medium text-slate-400">${item.kategori}</span>
                        <h4 class="font-bold text-slate-900 text-sm line-clamp-1">${item.nama}</h4>
                        <p class="text-xs text-slate-500">📍 ${item.lokasi} • ${item.tanggal}</p>
                    </div>
                </div>
                <a href="detail.html?id=${item.id}" class="block text-center bg-slate-50 hover:bg-blue-50 text-blue-600 font-semibold py-2.5 rounded-xl text-xs transition border border-slate-200/70">
                    Lihat Detail
                </a>
            </div>
        `;
        grid.insertAdjacentHTML("beforeend", card);
    });
}

function applyFilters() {
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    if (!searchInput) return;

    const keyword = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;

    const filtered = dummyItems.filter(item => {
        const matchKeyword = item.nama.toLowerCase().includes(keyword) || item.lokasi.toLowerCase().includes(keyword);
        const matchCategory = category === "Semua" || item.kategori === category;
        const matchLocation = activeLocation === "Semua" || item.lokasi === activeLocation;
        const matchStatus = activeStatus === "Semua" || item.status === activeStatus;
        return matchKeyword && matchCategory && matchLocation && matchStatus;
    });

    renderItems(filtered);
}

function setLocationFilter(location, btnElement) {
    activeLocation = location;
    document.querySelectorAll(".loc-btn").forEach(btn => {
        btn.className = "loc-btn bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg transition";
    });
    btnElement.className = "loc-btn bg-blue-50 text-blue-600 border border-blue-200 font-semibold px-3 py-1.5 rounded-lg transition";
    applyFilters();
}

function setStatusFilter(status, btnElement) {
    activeStatus = status;
    document.querySelectorAll(".status-tab").forEach(btn => {
        btn.className = "status-tab text-slate-600 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg text-xs transition";
    });
    btnElement.className = "status-tab bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition";
    applyFilters();
}

// =========================================================
// 2. LOGIKA LOGIN & REGISTER (login.html)
// =========================================================
function switchAuthTab(mode) {
    const formLogin = document.getElementById("form-login");
    const formRegister = document.getElementById("form-register");
    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const heading = document.getElementById("auth-heading");
    const subtext = document.getElementById("auth-subtext");
    const alertBox = document.getElementById("auth-alert");

    if (alertBox) alertBox.classList.add("hidden");

    if (mode === "login") {
        formLogin.classList.remove("hidden");
        formRegister.classList.add("hidden");
        tabLogin.className = "bg-white text-slate-900 font-semibold py-2.5 rounded-lg shadow-sm text-sm transition";
        tabRegister.className = "text-slate-500 hover:text-slate-800 font-semibold py-2.5 rounded-lg text-sm transition";
        heading.textContent = "Selamat datang kembali";
        subtext.textContent = "Login untuk membuat laporan, mengajukan klaim, dan terhubung lewat chat.";
    } else {
        formRegister.classList.remove("hidden");
        formLogin.classList.add("hidden");
        tabRegister.className = "bg-white text-slate-900 font-semibold py-2.5 rounded-lg shadow-sm text-sm transition";
        tabLogin.className = "text-slate-500 hover:text-slate-800 font-semibold py-2.5 rounded-lg text-sm transition";
        heading.textContent = "Buat akun civitas Polmed";
        subtext.textContent = "Daftar menggunakan identitas kampus untuk mulai melaporkan atau mengklaim barang.";
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === "password" ? "text" : "password";
}

function handleLoginSubmit(event) {
    event.preventDefault();
    const user = document.getElementById("login-username").value.trim();
    const pass = document.getElementById("login-password").value.trim();
    const alertBox = document.getElementById("auth-alert");

    if (user.length < 3 || pass.length < 4) {
        alertBox.className = "p-3.5 rounded-xl text-xs font-medium bg-rose-50 border border-rose-200 text-rose-700";
        alertBox.textContent = "Username atau kata sandi salah.";
        alertBox.classList.remove("hidden");
        return;
    }
    window.location.href = "laporan-saya.html";
}

function handleRegisterSubmit(event) {
    event.preventDefault();
    const alertBox = document.getElementById("auth-alert");
    switchAuthTab("login");
    alertBox.className = "p-3.5 rounded-xl text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-800";
    alertBox.textContent = "Registrasi berhasil! Silakan login menggunakan username dan password baru Anda.";
    alertBox.classList.remove("hidden");
}

// =========================================================
// 3. LOGIKA FORMULIR LAPORAN (lapor.html)
// =========================================================
function setReportType(type) {
    const hiddenInput = document.getElementById("jenis-laporan");
    const btnHilang = document.getElementById("btn-jenis-hilang");
    const btnTemuan = document.getElementById("btn-jenis-temuan");
    const boxSimpan = document.getElementById("box-lokasi-simpan");
    const inputSimpan = document.getElementById("lokasi-simpan");
    const fotoWajibLabel = document.getElementById("foto-wajib-label");

    hiddenInput.value = type;

    if (type === "HILANG") {
        btnHilang.className = "border border-blue-600 bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-sm";
        btnTemuan.className = "border border-slate-200 bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition";
        boxSimpan.classList.add("hidden");
        inputSimpan.removeAttribute("required");
        fotoWajibLabel.textContent = "(Opsional)";
    } else {
        btnTemuan.className = "border border-blue-600 bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-sm";
        btnHilang.className = "border border-slate-200 bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition";
        boxSimpan.classList.remove("hidden");
        inputSimpan.setAttribute("required", "true");
        fotoWajibLabel.textContent = "*";
    }
}

function previewPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validasi NFR-07: JPG/PNG maks 2 MB
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
        alert("Format file tidak didukung. Harap unggah gambar JPG atau PNG.");
        event.target.value = "";
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file melebihi batas maksimal 2 MB.");
        event.target.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("foto-preview-img").src = e.target.result;
        document.getElementById("foto-preview-name").textContent = file.name;
        document.getElementById("foto-preview-size").textContent = `${(file.size / 1024).toFixed(0)} KB • Siap diunggah`;
        document.getElementById("foto-preview-box").classList.remove("hidden");
    };
    reader.readAsDataURL(file);
}

function clearPhoto() {
    document.getElementById("foto-barang").value = "";
    document.getElementById("foto-preview-box").classList.add("hidden");
}

function handleReportSubmit(event) {
    event.preventDefault();
    alert("Laporan berhasil disimpan! Sistem menjalankan pencocokan otomatis (Smart Matching).");
    window.location.href = "laporan-saya.html";
}

// =========================================================
// 4. LOGIKA DETAIL BARANG & KLAIM (detail.html)
// =========================================================
function openClaimModal() {
    document.getElementById("claim-modal").classList.remove("hidden");
}

function closeClaimModal() {
    document.getElementById("claim-modal").classList.add("hidden");
}

function submitClaimForm(event) {
    event.preventDefault();
    closeClaimModal();
    window.location.href = "chat.html";
}

function updateItemStatus() {
    const selected = document.querySelector('input[name="status_barang"]:checked');
    const badge = document.getElementById("detail-status-badge");
    if (!selected || !badge) return;

    if (selected.value === "DIKEMBALIKAN") {
        badge.className = "bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase";
        badge.textContent = "● DIKEMBALIKAN";
    } else {
        badge.className = "bg-amber-100 text-amber-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase";
        badge.textContent = "● DITEMUKAN";
    }
    alert(`Status laporan berhasil diperbarui menjadi ${selected.value}.`);
}

// =========================================================
// 5. LOGIKA WEBCHAT (chat.html)
// =========================================================
function sendChatMessage(event) {
    event.preventDefault();
    const input = document.getElementById("chat-input");
    const box = document.getElementById("chat-messages");
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} WIB`;

    const bubble = `
        <div class="flex flex-col items-end ml-auto max-w-md">
            <div class="bg-blue-600 text-white p-3.5 rounded-2xl rounded-tr-none text-xs shadow-sm">${text}</div>
            <span class="text-[10px] text-slate-400 mt-1">🔒 ${timeStr} ✓✓</span>
        </div>
    `;
    box.insertAdjacentHTML("beforeend", bubble);
    box.scrollTop = box.scrollHeight;
    input.value = "";
}

function confirmHandover() {
    const badge = document.getElementById("chat-status-badge");
    const btn = document.getElementById("btn-confirm-return");
    badge.className = "bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase";
    badge.textContent = "Dikembalikan";
    btn.textContent = "✓ Barang Sudah Dikembalikan";
    btn.disabled = true;
    btn.classList.add("opacity-70", "cursor-not-allowed");
    alert("Pengembalian berhasil dikonfirmasi! Status laporan telah diperbarui menjadi DIKEMBALIKAN.");
}

// Inisialisasi awal saat halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
    renderItems(dummyItems);
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);
});