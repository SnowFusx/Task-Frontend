import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';
import TextField from '@mui/material/TextField';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { blueGrey } from '@mui/material/colors';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alerta, setAlerta] = useState({});

	const { setAuth } = useAuth();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/proyectos');
		}
	}, []);

	const handleFillForm = () => {
		setEmail('demo@example.com');
		setPassword('TokyoPass1@');
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if ([email, password].includes('')) {
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true,
			});
			return;
		}

		setAlerta({});

		try {
			const { data } = await clienteAxios.post(`/usuarios/login`, {
				email,
				password,
			});

			localStorage.setItem('token', data.token);
			setAuth(data);
			navigate('/proyectos');
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const { msg } = alerta;
	const token = localStorage.getItem('token');

	return (
		<>
			{token ? (
				navigate('/proyectos')
			) : (
				<>
					{msg && <Alerta alerta={alerta} />}

					<form
						className='my-10 bg-white shadow-xl rounded-lg p-10'
						onSubmit={handleSubmit}
					>
						<div className='flex justify-center'>
							<PersonOutlineOutlinedIcon
								sx={{ fontSize: 40, color: blueGrey[900] }}
							/>
						</div>
						<p className='text-gray-600 text-lg font-semibold items-center text-center'>
							Inicia sesión en task
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
							<TextField
								id='password'
								label='Password'
								variant='outlined'
								size='normal'
								type='password'
								fullWidth
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<nav className='lg:flex lg:justify-between mb-10'>
							<Link
								to='/registrar'
								className='block text-center text-slate-500 text-sm  hover:text-gray-700'
							>
								¿No tienes una cuenta?{' '}
								<span className='font-bold'>Regístrate</span>
							</Link>
							<Link
								to='/olvide-password'
								className='block text-center text-slate-500 text-sm  hover:text-gray-700'
							>
								Olvidé mi password
							</Link>
						</nav>

						<input
							type='submit'
							value='Iniciar Sesión'
							className='bg-sky-950 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-700 transition duration-300 cursor-pointer'
						/>
						<Alert
							severity='warning'
							action={
								<Button
									color='inherit'
									size='small'
									onClick={handleFillForm}
								>
									USAR
								</Button>
							}
						>
							<AlertTitle>Usa un usuario de prueba</AlertTitle>
							demo@example.com | Contraseña: TokyoPass1@
						</Alert>
					</form>
				</>
			)}
		</>
	);
};

export default Login;
