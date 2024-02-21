import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, Typography, MenuItem } from '@mui/material';
import { Delete, Edit  } from '@mui/icons-material';
import { red } from '@mui/material/colors';

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
  const [nome, setNome] = useState<string>('');
  const [documento, setDocumento] = useState<string>('');
  const [veiculoId, setVeiculoId] = useState<number | null>(null);
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

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

  const handleAlterarMotorista = (id: number) => {
    // Implemente a lógica de alteração do motorista conforme necessário
    console.log(`Alterar motorista com ID ${id}`);
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
          onClick={handleCadastroMotorista}
        >
          Cadastrar Motorista
        </Button>
      </Paper>

      <Grid container spacing={2}>
        {motoristas.map((motorista) => (
          <Grid item xs={12} key={motorista.id}>
            <Paper style={{ padding: 10 }}>
              <Typography variant="subtitle1">
                {motorista.nome} - {motorista.documento} - Veículo: {motorista.veiculoId || 'Nenhum'}
              </Typography>
              <Button
                /* variant="contained"
                color="primary" */
                onClick={() => handleAlterarMotorista(motorista.id)}
              >
                 <Edit  sx={{ color: red[900] }} />
              </Button>
              <Button
                onClick={() => handleExcluirMotorista(motorista.id)}
              >
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
