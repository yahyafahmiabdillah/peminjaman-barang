'use client'; // Mengaktifkan mode interaktif browser agar tombol filter & aksi bisa diklik

export default function LoanTable({ // Membuat komponen tabel & menerima data/fungsi (props) dari page.js
  loans, // Data daftar peminjaman yang sudah difilter untuk ditampilkan
  loading, // Status penanda apakah data masih dimuat dari API
  filterStatus, // Nama tab filter yang sedang aktif saat ini
  onFilterChange, // Fungsi untuk mengubah tab filter saat tombol diklik
  onReturn, // Fungsi untuk mengembalikan barang (ubah status jadi Dikembalikan)
  onEdit, // Fungsi untuk mengirim data baris yang dipilih ke form edit
  onDelete, // Fungsi untuk menghapus baris data berdasarkan ID
}) { // Menutup daftar penerimaan props
  return ( // Mengembalikan tampilan antarmuka (JSX) ke layar
    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6"> {/* Kotak utama tabel (lebar 2 kolom di layar besar) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5"> {/* Baris header tabel: judul di kiri, tombol filter di kanan */}
        <h2 className="text-base font-semibold text-white"> {/* Judul bagian tabel */}
          Daftar Peminjaman ({loans.length}) {/* Menampilkan judul beserta jumlah total data yang tampil */}
        </h2> {/* Menutup tag judul */}

        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs"> {/* Wadah pembungkus 3 tombol tab filter */}
          {['Semua', 'Dipinjam', 'Dikembalikan'].map((tab) => ( // Melakukan perulangan (looping) untuk mencetak 3 tombol filter otomatis
            <button // Membuat elemen tombol untuk setiap item tab
              key={tab} // Identitas unik wajib di React saat melakukan perulangan .map()
              onClick={() => onFilterChange(tab)} // Mengubah filter aktif sesuai nama tab yang diklik
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${ // Mengatur desain dasar tombol tab
                filterStatus === tab // Mengecek apakah tombol ini sedang aktif dipilih
                  ? 'bg-indigo-600 text-white' // Jika aktif: beri warna latar biru terang (indigo)
                  : 'text-slate-400 hover:text-white' // Jika tidak aktif: beri warna teks abu-abu redup
              }`} // Menutup pengaturan class dinamis
            > {/* Menutup tag pembuka button */}
              {tab} {/* Menampilkan tulisan nama tab ('Semua', 'Dipinjam', atau 'Dikembalikan') */}
            </button> // Menutup tag button
          ))} {/* Menutup perulangan .map() */}
        </div> {/* Menutup wadah tombol filter */}
      </div> {/* Menutup baris header tabel */}
      
            {loading ? (
        <p className="text-sm text-slate-400 py-10 text-center">Memuat data dari API...</p>
      ) : loans.length === 0 ? (
        <p className="text-sm text-slate-500 py-10 text-center">
          Belum ada data peminjaman pada kategori ini.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs text-slate-400">
                <th className="pb-3 font-medium">Barang</th>
                <th className="pb-3 font-medium">Peminjam</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {loans.map((loan) => (
                <tr key={loan.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 pr-3">
                    <p className="font-medium text-white">{loan.itemName}</p>
                    <span className="text-xs text-slate-400">{loan.category}</span>
                  </td>
                  <td className="py-3.5 pr-3 text-slate-300">{loan.borrowerName}</td>
                  <td className="py-3.5 pr-3">
                    <span
                      className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${
                        loan.status === 'Dipinjam'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right space-x-2 text-xs">
                    {loan.status === 'Dipinjam' && (
                      <button
                        onClick={() => onReturn(loan)}
                        className="text-emerald-400 hover:underline cursor-pointer"
                      >
                        Kembalikan
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(loan)}
                      className="text-indigo-400 hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(loan.id)}
                      className="text-rose-400 hover:underline cursor-pointer"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}