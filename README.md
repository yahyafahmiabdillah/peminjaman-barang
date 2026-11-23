# Sistem Peminjaman Barang (CRUD App)

Aplikasi web untuk mencatat, memantau, dan memperbarui status peminjaman barang/aset kantor secara *real-time*.

## Tech Stack
- **Frontend:** Next.js (App Router), React Hooks (`useState`, `useEffect`), Tailwind CSS
- **REST API:** MockAPI.io
- **Deployment:** Vercel

---

## Dokumentasi Fitur
1. **Catat Peminjaman (Create):** Menambahkan data barang yang dipinjam beserta nama peminjam, kategori, dan status.
2. **Daftar & Filter Barang (Read):** Menampilkan seluruh riwayat peminjaman dari API dan memfilter tampilan (`Semua`, `Dipinjam`, `Dikembalikan`).
3. **Edit & Pengembalian Cepat (Update):** Mengubah detail peminjaman atau menandai barang sudah dikembalikan dalam satu klik.
4. **Hapus Data (Delete):** Menghapus catatan peminjaman dari database.

---

## Dokumentasi REST API

**Base URL:** `https://6afbd343892984c4494a6658.mockapi.io/api/v1`

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/loans` | Mengambil seluruh daftar peminjaman barang |
| `POST` | `/loans` | Menambahkan data peminjaman baru |
| `PUT` | `/loans/:id` | Memperbarui data atau status peminjaman berdasarkan ID |
| `DELETE` | `/loans/:id` | Menghapus data peminjaman berdasarkan ID |

### Contoh Request Body (`POST /loans` & `PUT /loans/:id`)
```json
[
  {
    "name": "name 1",
    "avatar": "avatar 1",
    "status": "Dipinjam",
    "id": "1",
    "itemName": "laptop",
    "borrowerName": "yahya",
    "category": "Laptop"
  }
]