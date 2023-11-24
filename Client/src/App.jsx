import axios from 'axios'
import './App.css'
import DataTable from './components/DataTable/DataTable'
import FormClient from './components/FormClient/FormClient'
import { useClientStore } from './store/clientStore'
import { useEffect, useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import FormCharge from './components/FormCharge/FormCharge'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const baseUrl = 'http://localhost:8000'
axios.defaults.baseURL = baseUrl

function App() {

  const {clients} = useClientStore()
  const [theme,setTheme] = useState('light')

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  
  const handleTheme = () => {
    setTheme(theme === 'dark'? 'light':'dark')
  }

  useEffect(() => {
  }, [clients]);

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <BrowserRouter> 
        <Routes>
            <Route key={'home'} path={`/`} element={<DataTable theme={theme} handleTheme={handleTheme}/>} />
            <Route key={'form'} path={`/createClient`} element={<FormClient/>} />
            <Route key={'charge'} path={`/createCharge`} element={<FormCharge/>} />
        </Routes>
    </BrowserRouter>
  </ThemeProvider>
  )
}

export default App
