import { Link } from 'react-router-dom';
import logo from '../assets/task.png';
import { InfoSidebarAuth } from './InfoSidebarAuth';

const SidebarAuth = () => {
	return (
		<>
			<aside className='flex flex-col sticky top-0 max-h-screen min-h-screen gap-10 w-80 md:w-80 lg:w-80 px-10 py-8 bg-gray-200 text-gray-600 font-inter'>
				<Link to='/proyectos'>
					<img src={logo} alt='logo' className='w-20' />
				</Link>
				<InfoSidebarAuth />
			</aside>
		</>
	);
};

export default SidebarAuth;
