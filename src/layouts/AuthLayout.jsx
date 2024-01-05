import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAuth from '../components/SidebarAuth';
import MobileHeader from '../components/MobileHeader';
import { Toaster } from 'sonner';
import { InfoSidebarAuth } from '../components/InfoSidebarAuth';

const AuthLayout = () => {
	// Si es mobile
	const isMobile = window.innerWidth <= 640;
	const [iniciarSesion, setIniciarSesion] = useState(true);

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
						{isMobile && iniciarSesion ? (
							<>
								<aside className='flex flex-col sticky top-0 max-h-screen min-h-screen gap-10 w-80 md:w-80 lg:w-80 px-10 py-8 mt-20 text-gray-600 font-inter'>
									<InfoSidebarAuth
										setIniciarSesion={setIniciarSesion}
									/>
								</aside>
							</>
						) : (
							<Outlet />
						)}
					</main>
				</div>
			</div>
		</>
	);
};

export default AuthLayout;
