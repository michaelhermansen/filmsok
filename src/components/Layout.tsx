import Header from './Header';

const Layout = ({ children }: { children: any }) => {
	return (
		<>
			<Header />
			<main className='py-8'>{children}</main>
		</>
	);
};

export default Layout;
