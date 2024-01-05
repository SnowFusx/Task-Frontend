import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import TextField from '@mui/material/TextField';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import { blueGrey } from '@mui/material/colors';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Registrar = () => {
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [alerta, setAlerta] = useState({});
	const [equalPassword, setEqualPassword] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const handleCrearCuenta = async e => {
		e.preventDefault();
		if ([nombre, email, password, password2].includes('')) {
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true,
			});
			return;
		}

		if (password !== password2) {
			setAlerta({
				msg: 'Los password no coinciden',
				error: true,
			});
			return;
		}

		if (password.length < 6) {
			setAlerta({
				msg: 'El password debe tener al menos 6 caracteres',
				error: true,
			});
			return;
		}

		setAlerta({});

		// Crear el usuario en la API
		try {
			const { data } = await clienteAxios.post(`/usuarios`, {
				nombre,
				email,
				password,
			});
			setAlerta({
				msg: data.msg,
				error: false,
			});

			setNombre('');
			setEmail('');
			setPassword('');
			setPassword2('');

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

	useEffect(() => {
		if (password2 === '') {
			setEqualPassword('');
			return;
		}
		if (password !== password2) {
			setEqualPassword('border-red-500');
		} else {
			setEqualPassword('border-green-500');
		}
	}, [password, password2]);

	const { msg } = alerta;

	return (
		<>
			{msg && <Alerta alerta={alerta} />}

			<form
				className='my-10 bg-white shadow-xl rounded-lg p-10'
				onSubmit={handleCrearCuenta}
			>
				<div className='flex justify-center'>
					<PersonPinOutlinedIcon
						sx={{ fontSize: 40, color: blueGrey[900] }}
					/>
				</div>
				<p className='text-gray-600 text-lg font-semibold items-center text-center'>
					Regístrate en task
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
						id='email'
						label='Email'
						variant='outlined'
						size='normal'
						type='email'
						fullWidth
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						id='password'
						label='Password'
						variant='outlined'
						size='normal'
						fullWidth
						value={password}
						onChange={e => setPassword(e.target.value)}
						error={equalPassword === 'border-red-500'}
						color={
							equalPassword === 'border-green-500'
								? 'success'
								: ''
						}
						type={showPassword ? 'text' : 'password'}
						InputProps={{
							// <-- This is where the toggle button is added.
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? (
											<Visibility />
										) : (
											<VisibilityOff />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						id='password2'
						label='Repite el password'
						variant='outlined'
						size='normal'
						fullWidth
						value={password2}
						onChange={e => setPassword2(e.target.value)}
						error={equalPassword === 'border-red-500'}
						color={
							equalPassword === 'border-green-500'
								? 'success'
								: ''
						}
						type={showPassword ? 'text' : 'password'}
						InputProps={{
							// <-- This is where the toggle button is added.
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? (
											<Visibility />
										) : (
											<VisibilityOff />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>

				<input
					type='submit'
					value='Crear Cuenta'
					className='bg-sky-950 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-700 transition duration-300 cursor-pointer'
				/>

				<nav className='lg:flex justify-center mb-10'>
					<Link
						to='/'
						className='block text-center text-slate-500 text-sm  hover:text-gray-700'
					>
						Ya tengo cuenta,{' '}
						<span className='font-bold'>volver al login</span>
					</Link>
				</nav>
			</form>
		</>
	);
};

export default Registrar;
