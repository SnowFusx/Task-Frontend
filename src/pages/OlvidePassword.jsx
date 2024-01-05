import { useState } from 'react';
import Alerta from '../components/Alerta';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import logo from '../assets/task.png';

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
					<img src={logo} alt='logo' className='w-20 mb-2' />
				</div>
				<p className='text-gray-600 text-lg font-semibold items-center text-center'>
					Olvidé mi contraseña - Restaurar
				</p>
				<div className='my-5'>
					<label
						className=' text-gray-600 block text-md
						font-bold'
						htmlFor='email'
					>
						Email
					</label>
					<input
						id='email'
						type='email'
						placeholder='Email con el que te registraste'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>

				<input
					type='submit'
					value='Restaurar contraseña'
					className='bg-sky-950 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-700 transition duration-300 cursor-pointer'
				/>
			</form>

			<nav className='lg:flex lg:justify-between'>
				<Link
					to='/'
					className='block text-center text-slate-500 text-sm my-3 uppercase hover:text-gray-700'
				>
					Volver al Login
				</Link>
				<Link
					to='/registrar'
					className='block text-center text-slate-500 text-sm my-3 uppercase hover:text-gray-700'
				>
					No tengo cuenta, quiero registrarme
				</Link>
			</nav>
		</>
	);
};

export default OlvidePassword;
