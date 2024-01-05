import { Link } from 'react-router-dom';
import logo from '../assets/task.png';
import { blueGrey } from '@mui/material/colors';
import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';

const PaginaNoEncontrada = () => {
	return (
		<>
			<div className='flex flex-col justify-center items-center min-h-screen'>
				<div>
					<Link to='/'>
						<img src={logo} alt='logo' className='w-20' />
					</Link>
				</div>
				<form className='my-10 bg-white shadow rounded-lg p-10'>
					<div className='flex justify-center'>
						<LinkOffOutlinedIcon
							sx={{ fontSize: 40, color: blueGrey[900] }}
						/>
					</div>
					<h1 className='text-4xl font-bold text-center'>404</h1>
					<p className='text-gray-600 text-lg font-semibold items-center text-center'>
						Página no encontrada
					</p>

					<nav className='lg:flex justify-center mb-10'>
						<Link
							to='/'
							className='block text-center text-slate-500 text-sm mt-2  hover:text-gray-700'
						>
							Volver a la página principal
						</Link>
					</nav>
				</form>
			</div>
		</>
	);
};

export default PaginaNoEncontrada;
