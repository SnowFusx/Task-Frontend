import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';
import TextField from '@mui/material/TextField';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { red, blueGrey } from '@mui/material/colors';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';

const NuevoPassword = () => {
	const [alerta, setAlerta] = useState({});
	const [tokenValido, setTokenValido] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordModificado, setPasswordModificado] = useState(false);

	const params = useParams();
	const { token } = params;

	useEffect(() => {
		const handleConfirmarCuenta = async () => {
			try {
				await clienteAxios.get(`/usuarios/olvide-password/${token}`);
				setTokenValido(true);
			} catch (error) {
				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});
			}
		};
		handleConfirmarCuenta();
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		if (password === '' || password.trim() === '' || password.length < 6) {
			setAlerta({
				msg: 'Debes introducir un password válido',
				error: true,
			});
			return;
		}
		setAlerta({});
		try {
			const { data } = await clienteAxios.post(
				`/usuarios/olvide-password/${token}`,
				{
					password,
				}
			);
			setAlerta({
				msg: data.msg,
				error: false,
			});
			setPassword('');
			setPasswordModificado(true);
			setTokenValido(false);
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
			<div className='my-10 bg-white shadow-xl rounded-lg p-10'>
				{tokenValido ? (
					<>
						<form onSubmit={handleSubmit}>
							<div className='flex justify-center'>
								<LockOpenOutlinedIcon
									sx={{
										fontSize: 40,
										color: blueGrey[900],
									}}
								/>
							</div>
							<p className='text-gray-600 text-lg font-semibold items-center text-center'>
								Reestablece tu Password
							</p>
							{passwordModificado ? (
								<Link
									to='/'
									className='bg-gray-600 block text-center text-white text-sm my-3 p-5 rounded-xl uppercase hover:bg-gray-700 transition duration-300'
								>
									Inicia Sesión con tu nuevo Password
								</Link>
							) : (
								<>
									<div className='flex flex-col gap-5 my-5'>
										<TextField
											id='password'
											label='Nuevo Password'
											variant='outlined'
											size='normal'
											type='password'
											fullWidth
											value={password}
											onChange={e =>
												setPassword(e.target.value)
											}
										/>
									</div>

									<input
										type='submit'
										value='Guardar nuevo password'
										className='bg-sky-950 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-700 transition duration-300 cursor-pointer'
									/>
								</>
							)}
							<nav className='lg:flex justify-center mb-10'>
								<Link
									to='/'
									className='block text-center text-slate-500 text-sm  hover:text-gray-700'
								>
									Volver al login
								</Link>
							</nav>
						</form>
					</>
				) : (
					<>
						<div className='flex flex-col justify-center items-center'>
							<GppBadOutlinedIcon
								sx={{ fontSize: 40, color: red[700] }}
							/>
							{msg && <Alerta alerta={alerta} />}
							<Link
								to='/'
								className='block text-center text-slate-500 text-sm  hover:text-gray-700'
							>
								Volver al Login
							</Link>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default NuevoPassword;
