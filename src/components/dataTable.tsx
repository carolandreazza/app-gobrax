/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, createContext } from 'react'
import { DataGrid, GridRowSelectionModel  } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Search from '@mui/icons-material/Search';
import { TextField } from "@mui/material";
import { Selected } from './selected';

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


export const DriverContext = createContext<any | null>(null);
export const VehicleContext = createContext<any | null>(null);

export default function DataTable() {
 // const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  //atualiza estado ao selecionar linha da tabela
  useEffect(() => {
    if(selectedRow) {
      setSelectedDriver(selectedRow.name);
      if(selectedRow.bond === true) {
        setSelectedVehicle(selectedRow.vehicle);
      }
      else {
        setSelectedVehicle('');
      }
    }
    else {
      setSelectedVehicle('');
      setSelectedDriver('');
    }
  }, [selectedRow])

  //realiza busca na tabela 
  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.document.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <div style={{ height: 400, width: '100%' }}>
      <DriverContext.Provider value={selectedDriver}>
        <VehicleContext.Provider value={selectedVehicle}>
          <Selected />
        </VehicleContext.Provider>
      </DriverContext.Provider>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
        <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField 
          id="input-with-sx" 
          label="Buscar motorista" 
          variant="standard" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <DataGrid
        rows={filteredRows}
        /* rows={rows} */
        columns={columns}
        //esconde a coluna do veiculo
        columnVisibilityModel={{ 
          vehicle: false,
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection

        //permite selecionar apenas 1 linha
        disableRowSelectionOnClick={true} // ao clicar na linha
        rowSelectionModel={selectedRow ? [selectedRow.id] : []} // checkbox
        
        //atualiza estado ao selecionar linha da tabela
        onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
          setSelectedRow(rows.find(row => row.id === newSelection[0]) || null);
          console.log(selectedRow);
        }}
      />
    </div>
  );
} 
