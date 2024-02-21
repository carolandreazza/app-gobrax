import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { Delete, Edit  } from '@mui/icons-material';
import { red } from '@mui/material/colors';

interface Veiculo {
  id: number;
  marca: string;
  placa: string;
}

const Vehicles: React.FC = () => {
  const [marca, setMarca] = useState<string>('');
  const [placa, setPlaca] = useState<string>('');
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

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
          onClick={handleCadastroVeiculo}
        >
          Cadastrar Veículo
        </Button>
      </Paper>

      <Grid container spacing={2}>
        {veiculos.map((veiculo) => (
          <Grid item xs={12} key={veiculo.id}>
            <Paper style={{ padding: 10 }}>
              <Typography variant="subtitle1">
                {veiculo.marca} - {veiculo.placa}
              </Typography>
              <Button
                /* variant="contained"
                color="primary" */
                onClick={() => console.log(`Editar veículo com ID ${veiculo.id}`)}
              >
                 <Edit  sx={{ color: red[900] }} />
              </Button>
              <Button
                onClick={() => handleExcluirVeiculo(veiculo.id)}
              >
                <Delete  sx={{ color: red[900] }} />
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Vehicles;
