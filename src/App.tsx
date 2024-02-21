import { Header } from "./components/header";
import DataTable from "./components/dataTable";

export function App() {

  return (
      <div className="py-10 space-y-8">
        <Header />
        <main className="max-w-6xl mx-auto space-y-5">          
          <DataTable />
        </main>
      </div>
  )
}

/* export default App */
