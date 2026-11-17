'use client';

import { useState, useEffect } from 'react';
import { getLoans, createLoan, updateLoan, deleteLoan } from '../services/loanService';
import LoanForm from '../components/LoanForm';
import LoanTable from '../components/LoanTable';

export default function PeminjamanBarangPage() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Semua');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getLoans();
        setLoans(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSave = async (payload) => {
    setSubmitting(true);
    try {
      if (editingLoan) {
        const updated = await updateLoan(editingLoan.id, payload);
        setLoans(loans.map((item) => (item.id === editingLoan.id ? updated : item)));
        setEditingLoan(null);
      } else {
        const created = await createLoan(payload);
        setLoans([created, ...loans]);
      }
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleReturn = async (loan) => {
    try {
      const updated = await updateLoan(loan.id, { ...loan, status: 'Dikembalikan' });
      setLoans(loans.map((item) => (item.id === loan.id ? updated : item)));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus data peminjaman ini?')) return;
    try {
      await deleteLoan(id);
      setLoans(loans.filter((item) => item.id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredLoans = loans.filter((loan) =>
    filterStatus === 'Semua' ? true : loan.status === filterStatus
  );

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