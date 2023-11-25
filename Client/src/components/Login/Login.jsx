import { TextField, Box,Button,Typography} from '@mui/material';
import { useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2'
import { useClientStore } from '../../store/clientStore';
import {  useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [login,setLogin] = useState(true)
    const {setLoginStatus,loginUser,createUser,isLogged} = useClientStore()
    const navigate = useNavigate()

    const clientLogin = async (formdata) => {
        try {
            const response = await loginUser(formdata)
            if (response) {
                Swal.fire("Logging Success", "", 'success')
                setLoginStatus(true)
                navigate('/home')
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Error","User/Password not valid",'error');
        }
    };

    const clientCreate = async formdata => {
        try {
            const response = await createUser(formdata)
            if (response) {
                Swal.fire("Account created!", "Redirecting...", 'success')
                setLoginStatus(true)
                navigate('/home')
            }
        } catch (error) {
            Swal.fire("Error","Email is already used",'error');
        }
    };

    const handleLogin = () => {
        setLogin(!login)
    }

    useEffect(() => {
        console.log(isLogged);
        isLogged && navigate('/home')
    }, []);

    return (login ? 
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems:'center'
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(clientLogin)}
        >   
            <Typography variant='h6'>Login</Typography>
            <TextField
                error={errors.email}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                helperText={errors.email && "Email required"}
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            <TextField
                error={errors.password}
                type='password'
                id="outlined-basic"
                label="Password"
                variant="outlined"
                helperText={errors.password && "Password required: Max length 16"}
                {...register("password", { required: true, maxLength: 16 })}
            />
            <Button type='submit' variant="contained" color='success' endIcon={<SendIcon />}>
                    Login
            </Button>     
            <Button onClick={handleLogin} color='info' >
                Create Account
            </Button>
        </Box> :  <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems:'center'
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(clientCreate)}
        >   
            <Typography variant='h6'>Create Account</Typography>
            <TextField
                error={errors.email}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                helperText={errors.email && "Email required"}
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            <TextField
                error={errors.password}
                type='password'
                id="outlined-basic"
                label="Password"
                variant="outlined"
                helperText={errors.password && "Password required: Max length 16"}
                {...register("password", { required: true, maxLength: 16 })}
            />
            <Button type='submit' variant="contained" color='success' endIcon={<SendIcon />}>
                    Submit
            </Button>     
            <Button onClick={handleLogin} color='info'>
                Sign Up
            </Button>
        </Box>)
       
}