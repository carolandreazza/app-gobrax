import Button from '@mui/material/Button';


export function Header() {

  return (
    <div className="max-w-[1200px] mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <Button color="primary">Motoristas</Button>
          <Button color="primary">Veículos</Button>
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
