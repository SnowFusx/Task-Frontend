import { useState } from 'react';
import Alerta from '../components/Alerta';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import TextField from '@mui/material/TextField';
import { blueGrey } from '@mui/material/colors';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';

const OlvidePassword = () => {
	const [email, setEmail] = useState('');
	const [alerta, setAlerta] = useState({});

	const handleSubmit = async e => {
		e.preventDefault();
		if (email === '' || email.trim() === '' || email.length < 6) {
			setAlerta({
				msg: 'El email es obligatorio',
				error: true,
			});
			return;
		}
		setAlerta({});

		// Enviar el email a la API
		try {
			const { data } = await clienteAxios.post(
				`/usuarios/olvide-password`,
				{
					email,
				}
			);
			setAlerta({
				msg: data.msg,
				error: false,
			});
			setEmail('');
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const { msg } = alerta;

	return (
		<>
			{msg && <Alerta alerta={alerta} />}
			<form
				className='my-10 bg-white shadow rounded-lg p-10'
				onSubmit={handleSubmit}
			>
				<div className='flex justify-center'>
					<PasswordOutlinedIcon
						sx={{ fontSize: 40, color: blueGrey[900] }}
					/>
				</div>
				<p className='text-gray-600 text-lg font-semibold items-center text-center'>
					Olvidé mi contraseña - Restaurar
				</p>
				<div className='flex flex-col gap-5 my-5'>
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
					value='Restaurar contraseña'
					className='bg-sky-950 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-700 transition duration-300 cursor-pointer'
				/>
				<nav className='lg:flex lg:justify-between mb-10'>
					<Link
						to='/registrar'
						className='block text-center text-slate-500 text-sm  hover:text-gray-700'
					>
						¿No tienes una cuenta?{' '}
						<span className='font-bold'>Regístrate</span>
					</Link>
					<Link
						to='/'
						className='block text-center text-slate-500 text-sm  hover:text-gray-700'
					>
						Volver al login
					</Link>
				</nav>
			</form>
		</>
	);
};

export default OlvidePassword;
