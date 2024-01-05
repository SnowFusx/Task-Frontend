import { Outlet } from 'react-router-dom';
import SidebarAuth from '../components/SidebarAuth';
import MobileHeader from '../components/MobileHeader';
import { Toaster } from 'sonner';

const AuthLayout = () => {
	return (
		<>
			<Toaster richColors closeButton />
			<div className='flex flex-wrap  bg-gray-100'>
				<div className='border-r hidden sm:flex border-gray-300'>
					<SidebarAuth />
				</div>
				<div className='sm:hidden'>
					<MobileHeader />
				</div>
				<div className='container items-center justify-center mx-auto p-2 flex flex-1'>
					<main className='md:w-4/5 lg:w-2/5 xl:2/5 w-full'>
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
};

export default AuthLayout;
