import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import TextField from '@mui/material/TextField';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import { blueGrey } from '@mui/material/colors';
import { toast } from 'sonner';

const EditarPerfil = () => {
	const [foto, setFoto] = useState('');
	const [nombre, setNombre] = useState('');
	const [apellidos, setApellidos] = useState('');
	const [email, setEmail] = useState('');
	const [alerta, setAlerta] = useState({});

	const handleCrearCuenta = async e => {
		e.preventDefault();
		if ([nombre, email].includes('')) {
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true,
			});
			return;
		}

		setAlerta({});

		// Actualizar el usuario en la API
		try {
			const { data } = await clienteAxios.post(`/usuarios`, {
				nombre,
				email,
			});
			setAlerta({
				msg: data.msg,
				error: false,
			});

			toast.success(data.msg);

			setTimeout(() => {
				setAlerta({});
			}, 3000);
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	useEffect(() => {
		let timeout = setTimeout(() => {
			setAlerta({});
		}, 3000);
		return () => clearTimeout(timeout);
	}, [alerta]);

	const { msg } = alerta;

	return (
		<>
			{msg && <Alerta alerta={alerta} />}

			<div className='flex justify-center items-center min-h-full'>
				<form
					className='my-10 bg-white shadow-xl rounded-lg p-10 w-2/5'
					onSubmit={handleCrearCuenta}
				>
					<div className='flex justify-center'>
						<PersonPinOutlinedIcon
							sx={{ fontSize: 40, color: blueGrey[900] }}
						/>
					</div>
					<p className='text-gray-600 text-lg font-semibold items-center text-center'>
						Editar Perfil
					</p>
					<div className='flex flex-col gap-5 my-5'>
						<TextField
							id='nombre'
							label='Nombre'
							variant='outlined'
							size='normal'
							type='text'
							fullWidth
							value={nombre}
							onChange={e => setNombre(e.target.value)}
						/>
						<TextField
							id='apellidos'
							label='Apellidos'
							variant='outlined'
							size='normal'
							type='text'
							fullWidth
							value={apellidos}
							onChange={e => setApellidos(e.target.value)}
						/>
						<TextField
							id='email'
							label='Email'
							variant='outlined'
							size='normal'
							type='email'
							fullWidth
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>

					<input
						type='submit'
						value='Guardar Cambios'
						className='bg-sky-950 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-700 transition duration-300 cursor-pointer'
					/>
				</form>
			</div>
		</>
	);
};

export default EditarPerfil;
