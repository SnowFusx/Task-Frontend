import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import RutaProtegida from './layouts/RutaProtegida';

import Login from './pages/Login';
import Registrar from './pages/Registrar';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import Proyectos from './pages/Proyectos';
import NuevoProyecto from './pages/NuevoProyecto';
import Proyecto from './pages/Proyecto';
import EditarProyecto from './pages/EditarProyecto';

import EditarPerfil from './pages/EditarPerfil';

import { AuthProvider } from './context/AuthProvider';
import { ProyectosProvider } from './context/ProyectosProvider';
import NuevoColaborador from './pages/NuevoColaborador';
import PaginaNoEncontrada from './pages/PaginaNoEncontrada';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ProyectosProvider>
					<Routes>
						<Route path='/' element={<AuthLayout />}>
							<Route index element={<Login />} />
							<Route path='registrar' element={<Registrar />} />
							<Route
								path='olvide-password'
								element={<OlvidePassword />}
							/>
							<Route
								path='olvide-password/:token'
								element={<NuevoPassword />}
							/>
							<Route
								path='confirmar/:id'
								element={<ConfirmarCuenta />}
							/>
						</Route>
						<Route path='/proyectos' element={<RutaProtegida />}>
							<Route index element={<Proyectos />} />
							<Route
								path='crear-proyecto'
								element={<NuevoProyecto />}
							/>
							<Route path=':id' element={<Proyecto />} />
							<Route
								path='editar/:id'
								element={<EditarProyecto />}
							/>
							<Route
								path='nuevo-colaborador'
								element={<NuevoColaborador />}
							/>
							<Route
								path='nuevo-colaborador/:id'
								element={<NuevoColaborador />}
							/>
						</Route>

						<Route
							path='/editar-perfil'
							element={<RutaProtegida />}
						>
							<Route index element={<EditarPerfil />} />
						</Route>

						{/* Ruta comodín para manejar rutas no coincidentes */}
						<Route path='*' element={<PaginaNoEncontrada />} />
					</Routes>
				</ProyectosProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
