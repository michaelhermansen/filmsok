import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

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
		<div className=''>
			{totalPages > 0 && (
				<ReactPaginate
					forcePage={currentPage - 1}
					pageCount={totalPages}
					pageRangeDisplayed={4}
					marginPagesDisplayed={1}
					onPageChange={handlePageChange}
					nextLabel='→'
					previousLabel='←'
					breakLabel='…'
					disableInitialCallback={true}
					containerClassName='flex gap-1 sm:gap-6 md:gap-8 items-center mx-auto w-min pt-14 text-sm md:text-base'
					previousLinkClassName='block p-2'
					nextLinkClassName='block p-2'
					pageLinkClassName='block py-1 px-2'
					activeClassName='border-b border-gray-800'
					breakLinkClassName='pointer-events-none select-none'
					breakClassName='text-gray-400'
				/>
			)}
		</div>
	);
};

export default Pagination;
