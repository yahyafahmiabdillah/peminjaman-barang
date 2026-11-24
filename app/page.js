'use client'; // Mengaktifkan mode interaktif browser (wajib untuk useState/useEffect)

import { useState, useEffect } from 'react'; // Mengimpor fitur penyimpanan data sementara & efek otomatis dari React
import { getLoans, createLoan, updateLoan, deleteLoan } from '../services/loanService'; // Mengimpor 4 fungsi koneksi API (CRUD)
import LoanForm from '../components/LoanForm'; // Mengimpor komponen tampilan form input/edit
import LoanTable from '../components/LoanTable'; // Mengimpor komponen tampilan tabel daftar barang

export default function PeminjamanBarangPage() { // Membuat komponen utama halaman beranda
  const [loans, setLoans] = useState([]); // Menyimpan daftar peminjaman dari API (awal kosong)
  const [loading, setLoading] = useState(true); // Penanda status sedang memuat data dari server
  const [submitting, setSubmitting] = useState(false); // Mengunci tombol simpan saat data sedang dikirim
  const [editingLoan, setEditingLoan] = useState(null); // Menyimpan data barang yang sedang diedit (null = mode tambah)
  const [filterStatus, setFilterStatus] = useState('Semua'); // Menyimpan status tab filter yang sedang aktif

  useEffect(() => { // Menjalankan perintah otomatis saat halaman pertama kali dibuka
    const loadData = async () => { // Membuat fungsi asinkron untuk mengambil data
      try { // Mencoba menjalankan perintah ambil data dari API
        const data = await getLoans(); // Menunggu semua data peminjaman diambil dari MockAPI (Read)
        setLoans(data); // Memasukkan data dari API ke memori layar (state loans)
      }
      catch (error) { // Menangkap error jika koneksi atau API gagal
        console.error(error); // Menampilkan detail error di console browser
      } 
       finally { // Blok yang pasti dijalankan baik proses sukses maupun gagal
        setLoading(false); // Mematikan teks loading setelah proses selesai
      }
    }
    loadData(); // Memanggil fungsi loadData agar langsung berjalan
  }, []);

  const handleSave = async (payload) => { // Fungsi untuk menyimpan data baru atau hasil edit
    setSubmitting(true); // Mengubah tombol jadi "Menyimpan..." agar tidak diklik dua kali
    try { // Mencoba proses kirim data ke API
      if (editingLoan)
        { // Mengecek apakah pengguna sedang dalam mode Edit
        const updated = await updateLoan(editingLoan.id, payload); // Mengirim perubahan data ke MockAPI (Update)
        setLoans(loans.map((item) => (item.id === editingLoan.id ? updated : item))); // Mengganti baris lama di layar dengan data baru
        setEditingLoan(null); // Mengembalikan form ke mode tambah data baru
      }
      else
        { // Jika tidak sedang edit (berarti mode tambah baru)
        const created = await createLoan(payload); // Mengirim data baru ke MockAPI (Create)
        setLoans([created, ...loans]); // Menaruh data baru di urutan paling atas pada tabel
        }
      return true; // Memberi tahu form bahwa simpan berhasil (agar input dikosongkan)
    }
     catch (error)
      { // Menangkap error jika gagal menyimpan ke API
      alert(error.message); // Menampilkan pop-up peringatan error
      return false; // Memberi tahu form bahwa simpan gagal
    }
     finally { // Blok penutup proses simpan
      setSubmitting(false); // Mengaktifkan kembali tombol simpan
    }
  }

  const handleReturn = async (loan) => { // Fungsi cepat 1 klik untuk mengembalikan barang
    try { // Mencoba proses update status ke API
      const updated = await updateLoan(loan.id, { ...loan, status: 'Dikembalikan' }); // Menyalin data lama & mengubah status jadi Dikembalikan
      setLoans(loans.map((item) => (item.id === loan.id ? updated : item))); // Memperbarui status baris barang tersebut di layar
    } catch (error) { // Menangkap error jika gagal update
      alert(error.message); // Menampilkan pop-up peringatan error
    }
  }

  const handleDelete = async (id) => { // Fungsi untuk menghapus data berdasarkan ID
    if (!confirm('Yakin ingin menghapus data peminjaman ini?')) return; // Munculkan konfirmasi hapus; batalkan jika klik Cancel
    try { // Mencoba proses hapus ke API
      await deleteLoan(id); // Menghapus data di server MockAPI (Delete)
      setLoans(loans.filter((item) => item.id !== id)); // Membuang baris yang dihapus dari tampilan layar
    } catch (error) { // Menangkap error jika gagal hapus
      alert(error.message); // Menampilkan pop-up peringatan error
    } 
  }

  const filteredLoans = loans.filter((loan) => // Menyaring daftar barang sesuai tab filter yang diklik
    filterStatus === 'Semua' ? true : loan.status === filterStatus // Jika 'Semua' tampilkan semua; selain itu cocokkan statusnya
  )
  
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Inventaris & Operasional
          </span>
          <h1 className="text-3xl font-bold text-white mt-1">
            Sistem Peminjaman Barang
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Catat, pantau, dan perbarui status peminjaman aset kantor secara real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LoanForm
            onSave={handleSave}
            editingLoan={editingLoan}
            onCancelEdit={() => setEditingLoan(null)}
            submitting={submitting}
          />
          <LoanTable
            loans={filteredLoans}
            loading={loading}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            onReturn={handleReturn}
            onEdit={setEditingLoan}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </main>
  );
}