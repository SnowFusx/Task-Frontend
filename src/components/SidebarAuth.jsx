import { Link } from 'react-router-dom';
import logo from '../assets/task.png';
import taskdemo from '../assets/task-snowdevmartin.png';

const SidebarAuth = () => {
	return (
		<>
			<aside className='flex flex-col sticky top-0 max-h-screen min-h-screen gap-10 w-80 md:w-80 lg:w-80 px-10 py-8 bg-gray-200 text-gray-600 font-inter'>
				<Link to='/proyectos'>
					<img src={logo} alt='logo' className='w-20' />
				</Link>
				<h1 className='text-4xl font-bold text-sky-950 font-barlow'>
					Gestión de Proyectos
				</h1>
				<img
					src={taskdemo}
					alt='task-demo'
					className='w-full rounded-lg'
				/>
				<p>
					Descubre Task, tu herramienta esencial. Con una interfaz
					intuitiva, podrás crear proyectos y asignar tareas de manera
					eficiente.
				</p>
				<p>
					<span className='font-semibold'>Simple y efectiva</span>
					<br /> Nuestra plataforma te brinda el control total sobre
					tus proyectos, garantizando una experiencia de gestión
					eficiente y flexible.
				</p>
			</aside>
		</>
	);
};

export default SidebarAuth;
