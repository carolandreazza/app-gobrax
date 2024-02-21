/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { DataGrid, GridRowSelectionModel  } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Search from '@mui/icons-material/Search';
import { TextField } from "@mui/material";

const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'name', headerName: 'Nome', width: 430 },
  { field: 'document', headerName: 'Documento', width: 260 },
  { field: 'bond', headerName: 'Vinculo', type: 'boolean', width: 130 },
  { field: 'vehicle', headerName: 'Veículo', width: 130, },
];

const rows = [
  { id: 1, name: 'Carlos José da Silva', document: '999.999.999-99', bond: true, vehicle: 'DAF - ABC-1234' },
  { id: 2, name: 'João da Silva', document: '3999.999.999-99', bond: false, vehicle: '' },
  { id: 4, name: 'João da Silva', document: '3999.999.999-99', bond: true, vehicle: 'DAF - ABC-1234' },
  { id: 5, name: 'João da Silva', document: '3999.999.999-99', bond: false, vehicle: ''  },
  { id: 6, name: 'João da Silva', document: '3999.999.999-99', bond: true, vehicle: 'DAF - ABC-1234' },
  { id: 7, name: 'João da Silva', document: '3999.999.999-99', bond: false, vehicle: ''  },
  { id: 8, name: 'João da Silva', document: '3999.999.999-99', bond: true, vehicle: 'DAF - ABC-1234' },
  { id: 9, name: 'João da Silva', document: '3999.999.999-99', bond: false, vehicle: ''  },
  { id: 3, name: 'João da Silva', document: '3999.999.999-99', bond: true, vehicle: 'DAF - ABC-1234' },
  { id: 10, name: 'João da Silva', document: '3999.999.999-99', bond: false, vehicle: ''  },
];

export default function DataTable() {
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    if(selectedRow) {
      setSelectedDriver(selectedRow.name);
      if(selectedRow.bond === true) {
        setSelectedVehicle(selectedRow.vehicle);
      }
      else {
        setSelectedVehicle(null);
      }
    }
    else {
      setSelectedVehicle(null);
      setSelectedDriver(null);
    }
  })

  return (
    
    <div style={{ height: 400, width: '100%' }}>
       <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3"></div>
        <div className=" items-center gap-3">
            <h1>Selecionado</h1>
            <div className="flex">
              <h1 className="font-bold">Motorista:</h1><p> {selectedDriver}</p>
            </div>
            <div className="flex">
              <h1 className="font-bold">Veículo:</h1><p>{selectedVehicle}</p>
            </div>
        </div>
      </div>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
        <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Buscar motorista" variant="standard" />
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        columnVisibilityModel={{ //esconde a coluna do veiculo
          vehicle: false,
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        
        disableRowSelectionOnClick={true}
        rowSelectionModel={selectedRow ? [selectedRow.id] : []}//permite selecionar apenas 1 linha
        
        onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
          setSelectedRow(rows.find(row => row.id === newSelection[0]) || null);
          console.log(selectedRow);
        }}
      />
    </div>
  );
} 
