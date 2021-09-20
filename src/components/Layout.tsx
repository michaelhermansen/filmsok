import Header from './Header';

interface LayoutProps {
	children: any;
	searchState?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, searchState }) => {
	return (
		<>
			<Header searchState={searchState} />
			<main className='py-8'>{children}</main>
		</>
	);
};

export default Layout;
