import { FormEventHandler, useState } from 'react';
import { LoadingContext } from '../lib/loadingContext';
import { SearchIcon } from '@heroicons/react/solid';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = ({ searchState }: { searchState?: string }) => {
	const { loading } = useContext(LoadingContext);
	const router = useRouter();

	const [searchInput, setSearchInput] = useState(searchState || '');

	const handleSearch: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();

		if (searchInput) {
			router.push({
				pathname: 'search',
				query: {
					query: encodeURI(searchInput),
				},
			});
		}
	};

	return (
		<header className='flex justify-between items-center p-3 border-b border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-900'>
			<Link href={'/filmer'}>
				<a className='font-bold p-1'>Filmsøk</a>
			</Link>
			<form
				onSubmit={handleSearch}
				role='search'
				className='relative w-full max-w-sm pl-2'
			>
				<input
					className='pl-4 pr-10 py-2 bg-gray-100 rounded-full text-sm w-full dark:bg-gray-900'
					placeholder='Søk etter filmer og tv-serier …'
					type='text'
					role='searchbox'
					name='search'
					id='search'
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
					disabled={loading}
				/>
				<button
					type='submit'
					className='absolute right-0 p-2 pr-4'
					disabled={loading}
				>
					<SearchIcon className='w-4 h-4' />
				</button>
			</form>
		</header>
	);
};

export default Header;
