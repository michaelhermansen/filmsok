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
		<div>
			{totalPages > 0 && (
				<ReactPaginate
					forcePage={currentPage - 1}
					pageCount={totalPages}
					pageRangeDisplayed={4}
					marginPagesDisplayed={1}
					onPageChange={handlePageChange}
					nextLabel='>'
					previousLabel='<'
					containerClassName='flex gap-2'
					pageLinkClassName='min-w-4 px-2 block text-center'
					activeClassName='bg-blue-100'
					breakLabel='…'
					breakLinkClassName='pointer-events-none select-none'
					disableInitialCallback={true}
				/>
			)}
		</div>
	);
};

export default Pagination;
