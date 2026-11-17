constAPI_URL='https://6afbd343892984c4494a6658.mockapi.io/api/v1/loans';

exportconstgetLoans=async()=>{
constresponse=awaitfetch(API_URL,{cache:'no-store'});
if(!response.ok)thrownewError('Gagalmengambildatapeminjaman');
constdata=awaitresponse.json();
returnArray.isArray(data)?data.reverse():[];
};

exportconstcreateLoan=async(payload)=>{
constresponse=awaitfetch(API_URL,{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(payload),
});
if(!response.ok)thrownewError('Gagalmenambahdatapeminjaman');
returnresponse.json();
};

exportconstupdateLoan=async(id,payload)=>{
constresponse=awaitfetch(`${API_URL}/${id}`,{
method:'PUT',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(payload),
});
if(!response.ok)thrownewError('Gagalmemperbaruidatapeminjaman');
returnresponse.json();
};

exportconstdeleteLoan=async(id)=>{
constresponse=awaitfetch(`${API_URL}/${id}`,{
method:'DELETE',
});
if(!response.ok)thrownewError('Gagalmenghapusdatapeminjaman');
returnresponse.json();
};