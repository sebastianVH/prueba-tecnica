import { TextField, Box, Button, Typography, InputLabel, MenuItem, Select, FormControl, FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import { useClientStore } from '../../store/clientStore';
import { Link, useNavigate } from 'react-router-dom';
import { useChargeStore } from '../../store/chargeStore';



export default function FormCharge() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { clients } = useClientStore()
    const { createCharge } = useChargeStore()
    const navigate = useNavigate()

    const onSubmit = async formdata => {
        try {
            await createCharge(formdata)
            Swal.fire("Success", "Charge Created successFully", 'success')
                .then(navigate('/'))
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Error creating charge", 'error');
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
                alignItems: 'center'
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography variant='h6'>Charge Form</Typography>
            <TextField
                error={errors.amount}
                id={errors.amount ? "outlined-error" : "outlined-basic"}
                label="Amount"
                variant="outlined"
                helperText={errors.amount && "Complete the value: min value = 0"}
                {...register("amount", { required: true, maxLength: 80 })}
            />
            <TextField
                error={errors.description}
                id={errors.description ? "outlined-error" : "outlined-basic"}
                label="Description"
                variant="outlined"
                multiline
                helperText={errors.description && "Description required"}
                {...register("description", { required: true, maxLength: 100 })}
            />

            <FormControl fullWidth>
                <InputLabel id={errors.id_client ? "demo-simple-select-error" : "demo-simple-select-label"}>Client</InputLabel>
                <Select
                    labelId={errors.id_client ? "demo-simple-select-error" : "demo-simple-select-label"}
                    id="demo-simple-select-error"
                    error={errors.id_client}
                    label="Client"
                    helperText={errors.id_client && "Select a client"}
                    {...register("id_client", { required: true })}
                >{clients.map((client, index) => {
                    return <MenuItem key={index} value={client.id}>{`${client.name} ${client.last_name}`}</MenuItem>
                })}
                </Select>
                <FormHelperText>Error</FormHelperText>
            </FormControl>

            <Button type='submit' variant="contained" color='success' endIcon={<SendIcon />}>
                Send
            </Button>

            <Button type='reset' variant="contained" color='error' endIcon={<CloseIcon />}>
                Reset
            </Button>
            <Link to='/'>
                Return to home
            </Link>
        </Box>
    );
}