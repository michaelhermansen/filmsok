import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	queryState: NodeJS.Dict<string | string[]>;
	pathState: string;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	queryState,
	pathState,
}) => {
	const router = useRouter();

	const handlePageChange = ({ selected }: { selected: number }) => {
		if (selected + 1 !== currentPage) {
			window.scrollTo({ top: 0 });
			console.log(queryState);
			router.push({
				pathname: pathState,
				query: {
					...queryState,
					page: selected + 1,
				},
			});
		}
	};

	return (
		<div className='py-14'>
			{totalPages > 0 && (
				<ReactPaginate
					forcePage={currentPage - 1}
					pageCount={totalPages}
					pageRangeDisplayed={2}
					marginPagesDisplayed={1}
					onPageChange={handlePageChange}
					nextLabel={<ArrowRightIcon className='w-4 h-4' />}
					previousLabel={<ArrowLeftIcon className='w-4 h-4' />}
					breakLabel='…'
					disableInitialCallback={true}
					containerClassName='flex gap-3 sm:gap-6 md:gap-9 items-center mx-auto w-min text-sm md:text-base'
					previousLinkClassName='block w-8 h-8 shadow-lg rounded-full bg-white grid place-items-center'
					nextLinkClassName='block w-8 h-8 shadow-lg rounded-full bg-white grid place-items-center'
					pageLinkClassName='block p-1'
					activeClassName='border-b border-gray-800'
					breakLinkClassName='pointer-events-none select-none text-gray-400'
				/>
			)}
		</div>
	);
};

export default Pagination;
