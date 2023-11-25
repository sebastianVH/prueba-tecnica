import axios from 'axios'
import './App.css'
import DataTable from './components/DataTable/DataTable'
import FormClient from './components/FormClient/FormClient'
import { useClientStore } from './store/clientStore'
import { useEffect, useState } from 'react'
import {Routes,Route, useLocation, useNavigate} from 'react-router-dom'
import FormCharge from './components/FormCharge/FormCharge'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'


const baseUrl = 'http://localhost:8000'
axios.defaults.baseURL = baseUrl

function App() {

  const { pathname } = useLocation()
  const {clients,isLogged} = useClientStore()
  const [theme,setTheme] = useState('light')
  const navigate = useNavigate()

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  
  const handleTheme = () => {
    setTheme(theme === 'dark'? 'light':'dark')
  }

  useEffect(() => {
    !isLogged && navigate('/')
  }, [clients,isLogged,navigate]);


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {pathname !== '/' && <Navbar themeUsed={theme} handleTheme={handleTheme} />}
      <Routes>
        <Route key={'home'} path={`/home`} element={<DataTable />} />
        <Route key={'login'} path={`/`} element={<Login />} />
        <Route key={'form'} path={`/createClient`} element={<FormClient />} />
        <Route key={'charge'} path={`/createCharge`} element={<FormCharge />} />
      </Routes>

    </ThemeProvider>
  )
}

export default App
