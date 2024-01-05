import taskdemo from '../assets/task-snowdevmartin.png';

export const InfoSidebarAuth = ({ setIniciarSesion }) => {
	const isMobile = window.innerWidth <= 640;

	return (
		<>
			<h1
				className={`${
					isMobile ? 'text-2xl' : 'text-4xl'
				} font-bold text-sky-950 font-barlow`}
			>
				Gestión de Proyectos
			</h1>
			<img src={taskdemo} alt='task-demo' className='w-full rounded-lg' />
			<p>
				Descubre Task, tu herramienta esencial. Con una interfaz
				intuitiva, podrás crear proyectos y asignar tareas de manera
				eficiente.
			</p>
			<p>
				<span className='font-semibold'>Simple y efectiva</span>
				<br /> Nuestra plataforma te brinda el control total sobre tus
				proyectos, garantizando una experiencia de gestión eficiente y
				flexible.
			</p>
			{isMobile && (
				<>
					<div className='flex gap-5 my-5'>
						<button
							className='bg-sky-950 w-full py-3 text-white uppercase text-sm font-bold rounded hover:bg-sky-700 transition duration-300 cursor-pointer'
							onClick={() => setIniciarSesion(false)}
						>
							Iniciar Sesión
						</button>
					</div>
				</>
			)}
		</>
	);
};
