# SITTA Bahan Ajar

SITTA adalah prototipe aplikasi berbasis web untuk layanan pencetakan dan distribusi bahan ajar Universitas Terbuka. Aplikasi ini menyediakan fitur login, dashboard dengan pelacakan Delivery Order (DO), serta katalog stok bahan ajar.

## Fitur

- **Login:** Masuk menggunakan salah satu akun contoh. Halaman login juga menyediakan dialog simulasi untuk pemulihan kata sandi dan pendaftaran akun.
- **Dashboard:** Menampilkan salam berdasarkan waktu lokal dan menyediakan pencarian DO secara cepat.
- **Pelacakan pengiriman:** Menampilkan penerima, status pengiriman, jasa ekspedisi, tanggal pengiriman, paket, total biaya, dan riwayat perjalanan untuk data DO contoh.
- **Katalog stok:** Menampilkan data bahan ajar dan stok dari `js/data.js`, menyediakan fitur pencarian, serta memungkinkan penambahan baris katalog melalui browser.
- **Identitas visual:** Menggunakan logo Universitas Terbuka untuk logo halaman, navigasi, dan favicon.

## Persyaratan

- Browser web modern.
- Python 3 untuk menjalankan file aplikasi melalui server web lokal.

Tidak perlu memasang package atau menjalankan proses build.

## Menjalankan aplikasi

1. Buka terminal di folder proyek.
2. Jalankan server web bawaan Python:

   ```powershell
   py -m http.server 8000
   ```

   Jika perintah `py` tidak tersedia, gunakan:

   ```powershell
   python -m http.server 8000
   ```

3. Buka [http://localhost:8000](http://localhost:8000) di browser. Halaman login berada di `index.html`.
4. Untuk menghentikan server, pilih jendela terminal lalu tekan `Ctrl+C`.

Anda juga dapat membuka `index.html` secara langsung, tetapi penggunaan server lokal disarankan agar pemuatan aset dan navigasi antarhalaman berjalan konsisten.

## Akun demo

Akun contoh untuk login tersimpan di `js/data.js`. Berikut beberapa di antaranya:

| Peran | Email | Kata sandi |
| --- | --- | --- |
| Administrator | `admin@ut.ac.id` | `admin123` |
| UPBJJ-UT | `rina@ut.ac.id` | `rina123` |
| UPBJJ-UT | `agus@ut.ac.id` | `agus123` |

Akun tersebut hanya untuk keperluan demo dan bukan akun produksi yang aman. Proses autentikasi dan data contoh berjalan sepenuhnya di browser.

## Contoh nomor DO

Masukkan salah satu nomor DO berikut pada pencarian cepat di dashboard atau halaman pelacakan:

- `2023001234`
- `2023005678`

## Struktur proyek

```text
.
├── assets/
│   ├── img/                  # Gambar sampul bahan ajar
│   └── logo/                 # Logo Universitas Terbuka
├── css/
│   └── style.css             # Gaya untuk seluruh halaman
├── js/
│   ├── data.js               # Data contoh pengguna, katalog, dan pelacakan
│   └── script.js             # Logika login, tampilan data, pencarian, dan perilaku halaman
├── dashboard.html            # Dashboard utama dan pencarian cepat DO
├── index.html                # Halaman login
├── stok.html                 # Katalog stok bahan ajar
└── tracking.html             # Pelacakan pengiriman
```

## Kreator

**Radendy Bahtiar** adalah kreator proyek SITTA Bahan Ajar ini.
