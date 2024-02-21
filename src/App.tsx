import { TextField } from "@mui/material";
/* import SearchIcon from '@mui/icons-material/Search'; */
import { Header } from "./components/header";
import { Selected } from "./components/selected";
import Box from '@mui/material/Box';
import Search from '@mui/icons-material/Search';
import DataTable from "./components/dataTable";
import Drivers from "./components/drivers";
import Vehicles from "./components/vehicles";

export function App() {

  return (
      <div className="py-10 space-y-8">
        <Header />
        <Selected />
        <main className="max-w-6xl mx-auto space-y-5">
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Buscar motorista" variant="standard" />
          </Box>
          <DataTable />
          <Vehicles />
          <Drivers />
        </main>
      </div>
  )
}

/* export default App */
