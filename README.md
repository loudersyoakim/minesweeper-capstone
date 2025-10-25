# Minesweeper: Studi Kasus Pengembangan React dengan Bantuan AI (IBM Granite)

## Deskripsi

Sebuah implementasi klasik dari game Minesweeper yang dibuat menggunakan React. Proyek ini berfungsi sebagai Capstone Brief Project untuk menunjukkan kemampuan pengembangan web front-end, manajemen state, dan logika algoritma. Game ini memiliki tiga tingkat kesulitan yang dapat dipilih (Newbie, Intermediate, Pro).

## Technologies Used

- **React:** (v18+) Digunakan sebagai library utama untuk membangun User Interface yang reaktif dan berbasis komponen.
- **JavaScript (ES6+):** Digunakan untuk semua logika permainan, termasuk pembuatan papan, penanganan klik, dan algoritma _flood fill_.
- **CSS3:** Digunakan untuk styling komponen, memberikan tampilan klasik game Minesweeper.
- **Vite:** Digunakan sebagai _build tool_ modern untuk pengembangan front-end.
- **Netlify/Vercel:** Digunakan untuk _deployment_ dan _hosting_ aplikasi.

## Features

- **Gameplay Klasik:** Klik untuk mengungkap sel, klik kanan untuk menandai bendera.
- **Tiga Tingkat Kesulitan:**
  - **Newbie:** Papan 10x15 dengan 10 ranjau.
  - **Intermediate:** Papan 15x15 dengan 25 ranjau.
  - **Pro:** Papan 15x30 dengan 99 ranjau.
- **Timer:** Menghitung waktu permainan dari klik pertama.
- **Mine Counter:** Menampilkan sisa ranjau (total ranjau dikurangi bendera).
- **Tombol Reset:** Memulai ulang permainan 
- **Logika Kemenangan/Kekalahan:** Game otomatis berakhir jika pemain mengklik ranjau atau berhasil mengungkap semua sel non-ranjau.

## Setup Instructions

Untuk menjalankan proyek ini secara lokal:

1.  Clone repositori ini:
    ```bash
    git clone https://github.com/loudersyoakim/minesweeper-capstone
    ```
2.  Masuk ke direktori proyek:
    ```bash
    cd minesweeper-capstone
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Jalankan development server:
    ```bash
    npm run dev
    ```
5.  Buka `http://localhost:5173` (atau port yang tertera) di browser Anda.

## AI Support Explanation (IBM Granite)

Selama proses pengembangan, **IBM Granite** digunakan sebagai asisten AI untuk mempercepat dan meningkatkan kualitas kode di beberapa area kritis:

1.  **Desain Algoritma Inti (`gameLogic.js`):** Saya menggunakan AI untuk membantu menyusun fungsi `createBoard`. Secara spesifik, AI membantu merancang logika untuk **menempatkan ranjau secara acak** tanpa duplikasi dan, yang lebih penting, **algoritma untuk menghitung `neighborCount`** (jumlah ranjau tetangga) untuk setiap sel dengan efisien.
2.  **Logika Rekursif (`revealCell`):** Tantangan terbesar adalah algoritma "flood fill" (saat mengklik sel '0', semua sel '0' tetangga harus terbuka). Saya berkonsultasi dengan AI untuk menulis **fungsi rekursif `revealCell`** yang aman (menghindari _infinite loops_) dan efisien untuk menangani kasus ini.
3.  **Refactoring State Management (`App.jsx`):** Awalnya, logika _state_ saya bercampur. AI memberikan saran untuk memisahkan logika _timer_ ke dalam _custom hook_ (`useTimer.js`) dan mengoptimalkan penggunaan `useEffect` untuk memeriksa kondisi kemenangan, membuat `App.jsx` lebih bersih dan mudah dikelola.
4.  **Optimasi Performa (`Cell.jsx`):** AI menyarankan penggunaan `React.memo` pada komponen `Cell` untuk mencegah _re-render_ yang tidak perlu pada setiap sel di papan ketika _state_ berubah, yang secara signifikan meningkatkan performa _rendering_.
