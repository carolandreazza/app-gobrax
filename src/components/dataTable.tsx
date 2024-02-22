/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, createContext } from 'react'
import { DataGrid, GridRowSelectionModel  } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Search from '@mui/icons-material/Search';
import { TextField, Typography } from "@mui/material";
import { Selected } from './selected';

interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  placa: string;
}


const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'nome', headerName: 'Nome', width: 430 },
  { field: 'documento', headerName: 'Documento', width: 260 },
  { field: 'vinculo', headerName: 'Vinculo', type: 'boolean', width: 130 },
  { field: 'veiculoId', headerName: 'Veículo', width: 130 },
];


export const DriverContext = createContext<any | null>(null);
export const VehicleContext = createContext<any | null>(null);

export default function DataTable() {
 // const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');  
  const [motoristas, setMotoristas] = useState<any[]>(() => {
    const storedMotoristas = localStorage.getItem('motoristas');
    return storedMotoristas ? JSON.parse(storedMotoristas) : [];
  });

  
  // Carregar motoristas do localStorage quando o componente é montado
  useEffect(() => {
    const storedMotoristas = localStorage.getItem('motoristas');
    if (storedMotoristas) {
      const parsedMotoristas = JSON.parse(storedMotoristas);
      // Adicionar a propriedade 'vinculo' para cada motorista
      const updatedMotoristas = parsedMotoristas.map((motorista: { veiculoId: null; }) => ({
        ...motorista,
        vinculo: motorista.veiculoId !== null,
      }));
      setMotoristas(updatedMotoristas);
    }
  }, []);

  //atualiza motorista e placa ao selecionar linha da tabela
  useEffect(() => {
    if (selectedRow) {
      setSelectedDriver(selectedRow.nome);
      if (selectedRow.veiculoId !== null) {
        const storedVeiculos = localStorage.getItem('veiculos');
        if (storedVeiculos) {
          const parsedVeiculos = JSON.parse(storedVeiculos) as Veiculo[];
          const selectedVeiculo = parsedVeiculos.find(veiculo => veiculo.id === selectedRow.veiculoId);
          if (selectedVeiculo) {
            setSelectedVehicle(selectedVeiculo.placa);
          }
        }
      } else {
        setSelectedVehicle('');
      }
    } else {
      setSelectedVehicle('');
      setSelectedDriver('');
    }
  }, [selectedRow])

  //realiza busca na tabela 
  const filteredRows = motoristas.filter(row =>
    row.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.documento.toLowerCase().includes(searchTerm.toLowerCase())
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

      {filteredRows.length === 0 ? (
        <Typography variant="subtitle1" align="center">Nenhum dado encontrado.</Typography>
      ) : (
        <DataGrid
          rows={filteredRows}
          columns={columns}          
          columnVisibilityModel={{ //esconde a coluna do veiculo
            veiculoId: false,
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
            setSelectedRow(filteredRows.find(row => row.id === newSelection[0]) || null);
            console.log(selectedRow);
          }}
        />
      )}
    </div>
  );
} 