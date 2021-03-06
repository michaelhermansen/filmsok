import { useEffect, useRef, useState } from 'react';
import Dropdown from './shared/Dropdown';
import Button from './shared/Button';
import { useRouter } from 'next/router';
import { XIcon } from '@heroicons/react/solid';

interface FiltersProps {
	closeModal: () => void;
	initialState: {
		pathname: string;
		query: NodeJS.Dict<string | string[]>;
	};
}

const Filters: React.FC<FiltersProps> = ({ closeModal, initialState }) => {
	const router = useRouter();
	const bgRef = useRef<HTMLElement>(null);

	const initialSort = initialState.query.sort_by?.toString() || '';
	const [sortState, setSortState] = useState(initialSort);

	const initialDateFrom = initialState.query.from_date?.toString() || '';
	const [dateFromState, setDateFromState] = useState(initialDateFrom);

	const initialDateTo = initialState.query.to_date?.toString() || '';
	const [dateToState, setDateToState] = useState(initialDateTo);

	// Lukker modal på klikk utenfor eller esc-key
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (e.target === bgRef.current) closeModal();
		};

		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeModal();
		};

		document.addEventListener('click', handleClick);
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('click', handleClick);
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [closeModal]);

	const handleSubmit: React.EventHandler<React.FormEvent> = e => {
		e.preventDefault();

		const filterQuery: any = {
			sort_by: sortState,
			from_date: dateFromState,
			to_date: dateToState,
		};

		if (!sortState) delete filterQuery['sort_by'];
		if (!dateFromState) delete filterQuery['from_date'];
		if (!dateToState) delete filterQuery['to_date'];

		router.push({
			pathname: initialState.pathname,
			query: { ...filterQuery },
		});

		closeModal();
	};

	const handleReset: React.EventHandler<React.FormEvent> = e => {
		e.preventDefault();
		setSortState('');
		setDateFromState('');
		setDateToState('');
	};

	return (
		<section
			ref={bgRef}
			className='fixed inset-0 px-4 bg-black bg-opacity-40 dark:bg-opacity-75 z-50 overflow-y-scroll'
		>
			<form
				onSubmit={handleSubmit}
				onReset={handleReset}
				className='bg-gray-50 dark:bg-gray-900 p-6 rounded-lg max-w-2xl mx-auto shadow-xl relative my-8'
			>
				<button
					type='button'
					onClick={closeModal}
					className='absolute top-5 right-6 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-1 transition-colors duration-200'
				>
					<XIcon className='h-5 w-5' />
				</button>
				<h1 className='text-xl font-bold'>Filtrer</h1>
				<div className='pt-8'>
					<h2 className='font-semibold pb-2'>Sorter etter</h2>
					<Dropdown
						options={[
							{ value: 'popularity.desc', label: 'Popularitet' },
							{ value: 'top_rated', label: 'Rangering' },
						]}
						value={sortState}
						setValue={setSortState}
					/>
				</div>
				<div className='pt-8'>
					<h2 className='font-semibold pb-4'>Utgivelsesdato</h2>
					<div className='flex gap-4 flex-col sm:flex-row sm:gap-2'>
						<div className='flex-grow'>
							<label htmlFor='date_from' className='block mb-2'>
								Fra og med
							</label>
							<input
								className='block w-full py-2 px-4 rounded-lg border border-gray-200 appearance-none h-10 bg-transparent dark:border-gray-800'
								type='date'
								name='date_from'
								id='date_from'
								value={dateFromState}
								onChange={e => setDateFromState(e.target.value)}
							/>
						</div>
						<div className='flex-grow'>
							<label htmlFor='date_to' className='block mb-2'>
								Til og med
							</label>
							<input
								className='block w-full py-2 px-4 rounded-lg border border-gray-200 appearance-none h-10 bg-transparent dark:border-gray-800'
								type='date'
								name='date_to'
								id='date_to'
								value={dateToState}
								onChange={e => setDateToState(e.target.value)}
							/>
						</div>
					</div>
					<div className='flex gap-2 flex-col sm:flex-row border-t border-gray-100 pt-6 mt-6 dark:border-gray-800'>
						<Button type='reset' className='flex-1'>
							Nullstill
						</Button>
						<Button type='submit' className='flex-1'>
							Vis resultater
						</Button>
					</div>
				</div>
			</form>
		</section>
	);
};

export default Filters;
