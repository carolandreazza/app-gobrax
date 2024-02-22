import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { red } from '@mui/material/colors';

interface Veiculo {
  id: number;
  marca: string;
  placa: string;
}

const Vehicles: React.FC = () => {
  const [marca, setMarca] = useState<string>('');
  const [placa, setPlaca] = useState<string>('');
  //const [veiculos, setVeiculos] = useState<Veiculo[]>([]);  
  const [veiculos, setVeiculos] = useState<Veiculo[]>(() => {
    const storedVeiculos = localStorage.getItem('veiculos');
    return storedVeiculos ? JSON.parse(storedVeiculos) : [];
  });
  const [editingVeiculoId, setEditingVeiculoId] = useState<number | null>(null);

  
  // Carregar Veiculos do localStorage quando o componente é montado
  useEffect(() => {
    const storedVeiculos = localStorage.getItem('veiculos');
    if (storedVeiculos) {
      setVeiculos(JSON.parse(storedVeiculos));
    }
  }, []);

  // Salvar Veiculos no localStorage sempre que for atualizado
  useEffect(() => {
    localStorage.setItem('veiculos', JSON.stringify(veiculos));
  }, [veiculos]);

  
  const handleCadastroVeiculo = () => {
    if (marca.trim() === '' || placa.trim() === '') {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novoVeiculo: Veiculo = {
      id: veiculos.length + 1,
      marca,
      placa
    };

    setVeiculos([...veiculos, novoVeiculo]);
    setMarca('');
    setPlaca('');
  };

  const handleExcluirVeiculo = (id: number) => {
    const novosVeiculos = veiculos.filter(veiculo => veiculo.id !== id);
    setVeiculos(novosVeiculos);
  };

  const handleEditarVeiculo = (veiculo: Veiculo) => {
    setMarca(veiculo.marca);
    setPlaca(veiculo.placa);
    setEditingVeiculoId(veiculo.id);
  };

  const handleSalvarEdicao = () => {
    if (editingVeiculoId === null) return;

    const novosVeiculos = veiculos.map(veiculo => {
      if (veiculo.id === editingVeiculoId) {
        return {
          ...veiculo,
          marca,
          placa
        };
      }
      return veiculo;
    });

    setVeiculos(novosVeiculos);
    setEditingVeiculoId(null);
    setMarca('');
    setPlaca('');
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Cadastro de Veículos
      </Typography>
      <Paper style={{ padding: 20, marginBottom: 20 }}>
        <TextField
          label="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Placa"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={editingVeiculoId !== null ? handleSalvarEdicao : handleCadastroVeiculo}
        >
          {editingVeiculoId !== null ? 'Salvar Edição' : 'Cadastrar Veículo'}
        </Button>
      </Paper>

      <Grid container spacing={2}>
        {veiculos.map((veiculo) => (
          <Grid item xs={12} key={veiculo.id}>
            <Paper style={{ padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">{veiculo.marca}</Typography>
              <Typography variant="subtitle1">{veiculo.placa}</Typography>
              <Button onClick={() => handleEditarVeiculo(veiculo)}>
                <Edit sx={{ color: 'primary' }} />
              </Button>
              <Button onClick={() => handleExcluirVeiculo(veiculo.id)}>
                <Delete sx={{ color: red[900] }} />
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Vehicles;
