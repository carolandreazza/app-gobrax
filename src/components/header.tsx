
import React, { useState } from 'react';
import { Button, Popover, IconButton  } from '@mui/material';
import { Close } from '@mui/icons-material';
import Motoristas from './drivers'; 
import Vehicles from './vehicles';

export function Header() {
  const [anchorElMotoristas, setAnchorElMotoristas] = useState<HTMLButtonElement | null>(null);
  const [anchorElVeiculos, setAnchorElVeiculos] = useState<HTMLButtonElement | null>(null);


  const handleVeiculosButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElVeiculos(event.currentTarget);
  };
  const handleMotoristasButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMotoristas(event.currentTarget);
  };

  const handleCloseMotoristas = () => {
    setAnchorElMotoristas(null);
    window.location.reload();
  };

  const handleCloseVeiculos = () => {
    setAnchorElVeiculos(null);
  };

  const openMotoristas = Boolean(anchorElMotoristas);
  const openVeiculos = Boolean(anchorElVeiculos);
  
  return (
    <div className="max-w-[1200px] mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <Button color="primary" onClick={handleMotoristasButtonClick}>Motoristas</Button>
          <Button color="primary" onClick={handleVeiculosButtonClick}>Veículos</Button>

          <Popover
            open={openVeiculos}
            anchorEl={anchorElVeiculos}
            onClose={handleCloseVeiculos}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            <div style={{ position: 'relative', padding: '16px' }}>
              <IconButton
                style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={handleCloseVeiculos}
                aria-label="Fechar"
              >
                <Close />
              </IconButton>
              <Vehicles />
            </div>
          </Popover>
          
          <Popover
            open={openMotoristas}
            anchorEl={anchorElMotoristas}
            onClose={handleCloseMotoristas}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            <div style={{ position: 'relative', padding: '16px' }}>
              <IconButton
                style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={handleCloseMotoristas}
                aria-label="Fechar"
              >
                <Close />
              </IconButton>
              <Motoristas />
            </div>
          </Popover>
          
        </div>
      </div>
      <img src={"./logogb.png"} alt="logo" />
      <div className="flex items-center gap-3">
        <Button variant="contained" href="https://www.linkedin.com/company/gobrax">
            Linkedin
        </Button>
      </div>
    </div>
  )
}
