import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'name', headerName: 'Nome', width: 430 },
  { field: 'document', headerName: 'Documento', width: 260 },
  { field: 'bond', headerName: 'Vinculo', type: 'boolean', width: 130 },
];

const rows = [
  { id: 1, name: 'Carlos José da Silva', document: '999.999.999-99', bond: true },
  { id: 2, name: 'João da Silva', document: '3999.999.999-99', bond: false },
  { id: 4, name: 'João da Silva', document: '3999.999.999-99', bond: true },
  { id: 5, name: 'João da Silva', document: '3999.999.999-99', bond: false },
  { id: 6, name: 'João da Silva', document: '3999.999.999-99', bond: true },
  { id: 7, name: 'João da Silva', document: '3999.999.999-99', bond: false },
  { id: 8, name: 'João da Silva', document: '3999.999.999-99', bond: true },
  { id: 9, name: 'João da Silva', document: '3999.999.999-99', bond: false },
  { id: 3, name: 'João da Silva', document: '3999.999.999-99', bond: true },
  { id: 10, name: 'João da Silva', document: '3999.999.999-99', bond: false },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}