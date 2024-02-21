
export function Selected() {
  return (
    <div className="max-w-[1200px] mx-auto flex items-center justify-between">
    <div className="flex items-center gap-3"></div>
    <div className=" items-center gap-3">
        <h1>Selecionado</h1>
        <div className="flex">
          <h1 className="font-bold">Motorista: </h1><p> Carlos José da Silva</p>
        </div>
        <div className="flex">
          <h1 className="font-bold">Veículo: </h1><p>DAF - ABC-1234</p>
        </div>
    </div>
  </div>
    
  )
}
