'use client';

export default function LoanTable({
  loans,
  loading,
  filterStatus,
  onFilterChange,
  onReturn,
  onEdit,
  onDelete,
}) {
  return (
    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="text-base font-semibold text-white">
          Daftar Peminjaman ({loans.length})
        </h2>

        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {['Semua', 'Dipinjam', 'Dikembalikan'].map((tab) => (
            <button
              key={tab}
              onClick={() => onFilterChange(tab)}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                filterStatus === tab
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

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