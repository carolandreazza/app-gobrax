import React, { useState, useEffect, useContext } from 'react';
import { Button, Grid, Paper, TextField, Typography, MenuItem } from '@mui/material';
import { Delete, Edit  } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { DriverContext } from './dataTable'; // Importa o contexto DriverContext

interface Veiculo {
  id: number;
  marca: string;
  placa: string;
}

interface Motorista {
  id: number;
  nome: string;
  documento: string;
  veiculoId: number | null;
}


const Drivers: React.FC = () => {
  const selectedDriver = useContext(DriverContext); // Acesse o motorista selecionado pelo contexto

  const [nome, setNome] = useState<string>('');
  const [documento, setDocumento] = useState<string>('');
  const [veiculoId, setVeiculoId] = useState<number | null>(null);
  //const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [motoristas, setMotoristas] = useState<Motorista[]>(() => {
    const storedMotoristas = localStorage.getItem('motoristas');
    return storedMotoristas ? JSON.parse(storedMotoristas) : [];
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [editingMotoristaId, setEditingMotoristaId] = useState<number | null>(null);


  // Atualiza os campos do formulário quando vem da home
  useEffect(() => {
    if (selectedDriver) {
      setNome(selectedDriver.nome);
      setDocumento(selectedDriver.documento);
      setVeiculoId(selectedDriver.veiculoId);
      setEditingMotoristaId(selectedDriver.id);
    }
  }, [selectedDriver]);
  

  // Carregar motoristas do localStorage quando o componente é montado
  useEffect(() => {
    const storedMotoristas = localStorage.getItem('motoristas');
    if (storedMotoristas) {
      setMotoristas(JSON.parse(storedMotoristas));
      const storedVeiculos = localStorage.getItem('veiculos');
      if (storedVeiculos) {
        setVeiculos(JSON.parse(storedVeiculos));
      }
    }
  }, []);


  // Salvar motoristas no localStorage sempre que for atualizado
  useEffect(() => {
    localStorage.setItem('motoristas', JSON.stringify(motoristas));
  }, [motoristas]);


  const handleCadastroMotorista = () => {
    if (nome.trim() === '' || documento.trim() === '') {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novoMotorista: Motorista = {
      id: motoristas.length + 1,
      nome,
      documento,
      veiculoId
    };

    setMotoristas([...motoristas, novoMotorista]);
    setNome('');
    setDocumento('');
  };

  const handleExcluirMotorista = (id: number) => {
    const novosMotoristas = motoristas.filter(motorista => motorista.id !== id);
    setMotoristas(novosMotoristas);
  };


  const handleEditarMotorista = (motorista: Motorista) => {
    setNome(motorista.nome);
    setDocumento(motorista.documento);
    setVeiculoId(Number(motorista.veiculoId));
    setEditingMotoristaId(motorista.id);
  };

  const handleSalvarEdicao = () => {
    if (editingMotoristaId === null) return;

    const novosMotoristas = motoristas.map(motorista => {
      if (motorista.id === editingMotoristaId) {
        return {
          ...motorista,
          nome,
          documento,
          veiculoId
        };
      }
      return motorista;
    });

    setMotoristas(novosMotoristas);
    setEditingMotoristaId(null);
    setNome('');
    setDocumento('');
    setVeiculoId(null);
  };

  const handleVeiculoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVeiculoId(Number(event.target.value));
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Cadastro de Motoristas
      </Typography>
      <Paper style={{ padding: 20, marginBottom: 20 }}>
        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Documento"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          select
          label="Vínculo com Veículo"
          value={veiculoId || ''}
          onChange={handleVeiculoChange}
          fullWidth
          disabled={veiculos.length === 0}
          margin="normal"
        >
          {veiculos.map((veiculo) => (
            <MenuItem key={veiculo.id} value={veiculo.id}>
              {veiculo.marca} - {veiculo.placa}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={editingMotoristaId !== null ? handleSalvarEdicao : handleCadastroMotorista}
        >
          {editingMotoristaId !== null ? 'Salvar Edição' : 'Cadastrar Motorista'}
        </Button>
      </Paper>

      <Grid container spacing={2}>
        {motoristas.map((motorista) => (
          <Grid item xs={12} key={motorista.id}>
            <Paper style={{ padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">
                {motorista.nome} - {motorista.documento} - Veículo: {motorista.veiculoId || 'Nenhum'}
              </Typography>
              <Button onClick={() => handleEditarMotorista(motorista)}>
                 <Edit sx={{ color: 'primary' }} />
              </Button>
              <Button onClick={() => handleExcluirMotorista(motorista.id)}>
                <Delete sx={{ color: red[900] }}/>
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Drivers;
