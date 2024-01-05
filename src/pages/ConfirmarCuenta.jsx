import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { red, blueGrey } from '@mui/material/colors';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';

const ConfirmarCuenta = () => {
	const params = useParams();
	const { id } = params;
	const [alerta, setAlerta] = useState({});
	const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

	useEffect(() => {
		const handleConfirmarCuenta = async () => {
			try {
				const { data } = await clienteAxios.get(
					`/usuarios/confirmar/${id}`
				);
				setAlerta({
					msg: data.msg,
					error: false,
				});
				setCuentaConfirmada(true);
			} catch (error) {
				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});
			}
		};
		handleConfirmarCuenta();
	}, []);

	const { msg } = alerta;

	return (
		<>
			<div className='my-10 bg-white shadow-xl rounded-lg p-10'>
				{cuentaConfirmada ? (
					<>
						<div className='flex flex-col justify-center items-center'>
							<div className='flex justify-center'>
								<CheckOutlinedIcon
									sx={{ fontSize: 40, color: blueGrey[900] }}
								/>
							</div>

							<Alerta
								alerta={{
									msg: 'Cuenta confirmada correctamente',
									error: false,
								}}
							/>

							<Link
								to='/'
								className='block text-center text-slate-500 text-sm  hover:text-gray-700'
							>
								Volver al Login
							</Link>
						</div>
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

export default ConfirmarCuenta;
