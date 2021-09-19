import Link from 'next/link';
import { SearchIcon } from '@heroicons/react/solid';

const Header = () => {
	return (
		<header className='flex justify-between items-center p-3 border-b border-gray-100 bg-white'>
			<Link href={'/filmer'}>
				<a className='font-bold p-1'>Filmsøk</a>
			</Link>
			<Link href='/search'>
				<a className='p-2 bg-gray-100 rounded-full'>
					<SearchIcon className='h-4 w-4' />
				</a>
			</Link>
		</header>
	);
};

export default Header;
