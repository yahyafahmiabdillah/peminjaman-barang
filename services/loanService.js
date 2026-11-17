const API_URL = 'https://6afbd343892984c4494a6658.mockapi.io/api/v1/loans';

export const getLoans = async () => {
  const response = await fetch(API_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error('Gagal mengambil data peminjaman');
  const data = await response.json();
  return Array.isArray(data) ? data.reverse() : [];
};

export const createLoan = async (payload) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Gagal menambah data peminjaman');
  return response.json();
};

export const updateLoan = async (id, payload) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Gagal memperbarui data peminjaman');
  return response.json();
};

export const deleteLoan = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Gagal menghapus data peminjaman');
  return response.json();
};