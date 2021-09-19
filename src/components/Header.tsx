import Link from 'next/link';
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import { useState } from 'react';

const Header = () => {
	const [visibleSearch, setVisibleSearch] = useState(false);

	return (
		<header className='flex justify-between items-center p-3 border-b border-gray-100 bg-white'>
			<Link href={'/filmer'}>
				<a className='font-bold p-1'>Filmsøk</a>
			</Link>
			<button
				onClick={() => setVisibleSearch(s => !s)}
				className='p-2 bg-gray-100 rounded-full'
				aria-label='Søk'
			>
				{visibleSearch && <SearchIcon className='h-4 w-4' />}
				{!visibleSearch && <XIcon className='h-4 w-4' />}
			</button>
		</header>
	);
};

export default Header;
