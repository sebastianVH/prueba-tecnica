import { Button, Box, Typography } from "@mui/material"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import firebaseSignOut from "../../services/FirebaseSignOut";
import { useClientStore } from "../../store/clientStore";


export default function Navbar({ handleTheme, themeUsed }) {

  const { setLoginStatus, user } = useClientStore()

  const handleLogin = async () => {
    await firebaseSignOut()
    setLoginStatus(false)
  }


  return( 
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
      <Button onClick={handleTheme}>
        {themeUsed === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </Button>
      <Button onClick={handleLogin}>
        Logout
      </Button>
      <Typography>
        Welcome back {user.email}
      </Typography>
    </Box>
  )
}