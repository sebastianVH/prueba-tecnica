import { TextField, Box,Button,Typography} from '@mui/material';
import { useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import { useClientStore } from '../../store/clientStore';
import { Link, useNavigate } from 'react-router-dom';



export default function FormClient() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {createClient} = useClientStore()
    const navigate = useNavigate()

    const onSubmit = async formdata => {
        try {
            await createClient(formdata)
            Swal.fire("Success","Client Created successFully",'success')
            .then(navigate('/home'))
        } catch (error) {
            console.log(error);
            Swal.fire("Error",error,'error');
        }
    };

    return (
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
            onSubmit={handleSubmit(onSubmit)}
        >   
            <Typography variant='h6'>Client Form</Typography>
            <TextField
                error={errors.name}
                id={errors.name ? "outlined-error" : "outlined-basic"}
                label="Name"
                variant="outlined"
                helperText={errors.name && "Name required"}
                {...register("name", { required: true, maxLength: 80 })}
            />
            <TextField
                error={errors.last_name}
                id="outlined-error"
                label="Last Name"
                variant="outlined"
                helperText={errors.last_name && "Last Name required"}
                {...register("last_name", { required: true, maxLength: 100 })}
            />
            <TextField
                error={errors.email}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                helperText={errors.email && "Email required"}
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            <TextField
                error={errors.phone_number}
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                helperText={errors.phone_number && "Phone required"}
                {...register("phone_number", { required: true, maxLength: 12 })}
            />
            <Button type='submit' variant="contained" color='success' endIcon={<SendIcon />}>
                    Send
            </Button>
            
            <Button type='reset' variant="contained" color='error' endIcon={<CloseIcon/>}>
                    Reset
            </Button>
            <Link to='/home'>
                Return to home
            </Link>
        </Box>
    );
}