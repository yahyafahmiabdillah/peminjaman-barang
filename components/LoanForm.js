'use client';

import { useState, useEffect } from 'react';

export default function LoanForm({ onSave, editingLoan, onCancelEdit, submitting }) {
  const [itemName, setItemName] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const [category, setCategory] = useState('Laptop');
  const [status, setStatus] = useState('Dipinjam');

  useEffect(() => {
    if (editingLoan) {
      setItemName(editingLoan.itemName || '');
      setBorrowerName(editingLoan.borrowerName || '');
      setCategory(editingLoan.category || 'Laptop');
      setStatus(editingLoan.status || 'Dipinjam');
    } else {
      setItemName('');
      setBorrowerName('');
      setCategory('Laptop');
      setStatus('Dipinjam');
    }
  }, [editingLoan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSave({ itemName, borrowerName, category, status });
    if (success && !editingLoan) {
      setItemName('');
      setBorrowerName('');
      setCategory('Laptop');
      setStatus('Dipinjam');
    }
  };

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