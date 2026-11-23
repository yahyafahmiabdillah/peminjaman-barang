'use client'; // Mengaktifkan mode interaktif browser agar form bisa menerima ketikan pengguna

import { useState, useEffect } from 'react'; // Mengimpor fitur memori sementara (state) dan efek otomatis dari React

export default function LoanForm({ onSave, editingLoan, onCancelEdit, submitting }) { // Membuat komponen form & menerima data/fungsi (props) dari page.js
  const [itemName, setItemName] = useState(''); // Menyimpan teks ketikan untuk kolom Nama Barang
  const [borrowerName, setBorrowerName] = useState(''); // Menyimpan teks ketikan untuk kolom Nama Peminjam
  const [category, setCategory] = useState('Laptop'); // Menyimpan pilihan Kategori (pilihan awal 'Laptop')
  const [status, setStatus] = useState('Dipinjam'); // Menyimpan pilihan Status (pilihan awal 'Dipinjam')

  useEffect(() => { // Menjalankan perintah otomatis setiap kali tombol Edit di tabel diklik
    if (editingLoan) { // Mengecek apakah ada data barang yang dikirim untuk diedit
      setItemName(editingLoan.itemName || ''); // Mengisi kotak Nama Barang dengan data lama
      setBorrowerName(editingLoan.borrowerName || ''); // Mengisi kotak Nama Peminjam dengan data lama
      setCategory(editingLoan.category || 'Laptop'); // Mengatur pilihan Kategori sesuai data lama
      setStatus(editingLoan.status || 'Dipinjam'); // Mengatur pilihan Status sesuai data lama
    } else { // Jika tidak sedang mengedit (mode tambah baru atau klik Batal)
      setItemName(''); // Mengosongkan kembali kotak Nama Barang
      setBorrowerName(''); // Mengosongkan kembali kotak Nama Peminjam
      setCategory('Laptop'); // Mengembalikan pilihan Kategori ke awal ('Laptop')
      setStatus('Dipinjam'); // Mengembalikan pilihan Status ke awal ('Dipinjam')
    } // Menutup percabangan if-else
  }, [editingLoan]); // Memantau perubahan pada variabel editingLoan (jalan ulang kalau nilainya berubah)

  const handleSubmit = async (e) => { // Fungsi yang berjalan saat tombol Simpan / Update diklik
    e.preventDefault(); // Mencegah halaman web me-refresh otomatis bawaan form HTML
    const success = await onSave({ itemName, borrowerName, category, status }); // Mengirim semua isi form ke fungsi handleSave di page.js
    if (success && !editingLoan) { // Jika simpan berhasil dan sedang dalam mode tambah baru (bukan edit)
      setItemName(''); // Mengosongkan kotak Nama Barang agar siap dipakai input lagi
      setBorrowerName(''); // Mengosongkan kotak Nama Peminjam
      setCategory('Laptop'); // Mereset pilihan Kategori ke 'Laptop'
      setStatus('Dipinjam'); // Mereset pilihan Status ke 'Dipinjam'
    } // Menutup blok if
  }; // Menutup fungsi handleSubmit
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit">
      <h2 className="text-base font-semibold text-white mb-4">
        {editingLoan ? 'Edit Data Peminjaman' : 'Catat Peminjaman Baru'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Nama Barang</label>
          <input
            type="text"
            required
            placeholder="Contoh: MacBook Pro M2"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Nama Peminjam</label>
          <input
            type="text"
            required
            placeholder="Contoh: Fahmi"
            value={borrowerName}
            onChange={(e) => setBorrowerName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
          >
            <option value="Laptop">Laptop</option>
            <option value="Kamera">Kamera</option>
            <option value="Kabel & Adapter">Kabel & Adapter</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
          >
            <option value="Dipinjam">Dipinjam</option>
            <option value="Dikembalikan">Dikembalikan</option>
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl transition cursor-pointer"
          >
            {submitting ? 'Menyimpan...' : editingLoan ? 'Update Data' : '+ Pinjam Barang'}
          </button>
          {editingLoan && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition cursor-pointer"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}