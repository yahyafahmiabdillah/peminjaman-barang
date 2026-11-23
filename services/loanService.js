const API_URL = 'https://6afbd343892984c4494a6658.mockapi.io/api/v1/Loans'; // Menyimpan alamat utama (endpoint) server database MockAPI

export const getLoans = async () => { // Membuat fungsi asinkron untuk mengambil seluruh data peminjaman (Read)
  const response = await fetch(API_URL, { cache: 'no-store' }); // Mengambil data dari API tanpa cache lama agar data selalu paling baru
  if (!response.ok) throw new Error('Gagal mengambil data peminjaman'); // Jika server gagal merespons, hentikan proses & tampilkan pesan error
  const data = await response.json(); // Mengubah balasan teks JSON dari server menjadi data array JavaScript
  return Array.isArray(data) ? data.reverse() : []; // Membalik urutan data agar peminjaman yang paling baru muncul di urutan teratas
}; // Menutup fungsi getLoans

export const createLoan = async (payload) => { // Membuat fungsi asinkron untuk mengirim data peminjaman baru ke server (Create)
  const response = await fetch(API_URL, { // Mengirim permintaan jaringan ke alamat API_URL
    method: 'POST', // Menggunakan metode POST (standar REST API untuk menambah data baru)
    headers: { 'Content-Type': 'application/json' }, // Memberi tahu server bahwa format data yang dikirim adalah JSON
    body: JSON.stringify(payload), // Mengubah objek data dari form menjadi teks JSON agar bisa dikirim lewat internet
  }); // Menutup pengaturan fetch POST
  if (!response.ok) throw new Error('Gagal menambah data peminjaman'); // Melempar pesan error jika proses simpan ke server gagal
  return response.json(); // Mengembalikan data yang baru saja tersimpan beserta ID otomatis dari server
}; // Menutup fungsi createLoan

export const updateLoan = async (id, payload) => { // Membuat fungsi asinkron untuk mengubah data berdasarkan ID barang (Update)
  const response = await fetch(`${API_URL}/${id}`, { // Menargetkan URL spesifik milik satu data peminjaman berdasarkan ID-nya
    method: 'PUT', // Menggunakan metode PUT (standar REST API untuk memperbarui data yang sudah ada)
    headers: { 'Content-Type': 'application/json' }, // Memberi tahu server bahwa format data pembaruan adalah JSON
    body: JSON.stringify(payload), // Mengubah objek data yang sudah diedit menjadi teks JSON
  }); // Menutup pengaturan fetch PUT
  if (!response.ok) throw new Error('Gagal memperbarui data peminjaman'); // Melempar pesan error jika proses pembaruan di server gagal
  return response.json(); // Mengembalikan data terbaru yang sudah diperbarui dari server
}; // Menutup fungsi updateLoan

export const deleteLoan = async (id) => { // Membuat fungsi asinkron untuk menghapus satu data berdasarkan ID (Delete)
  const response = await fetch(`${API_URL}/${id}`, { // Menargetkan URL spesifik milik data yang akan dihapus berdasarkan ID
    method: 'DELETE', // Menggunakan metode DELETE (standar REST API untuk menghapus data)
  }); // Menutup pengaturan fetch DELETE
  if (!response.ok) throw new Error('Gagal menghapus data peminjaman'); // Melempar pesan error jika proses penghapusan di server gagal
  return response.json(); // Mengembalikan balasan konfirmasi dari server bahwa data berhasil dihapus
}; // Menutup fungsi deleteLoan