import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import MediaItem from '../components/MediaItem';
import Pagination from '../components/Pagination';
import Container from '../components/shared/Container';
import generateQueryString from '../lib/generateQueryString';
import { Response } from '../types/Response';

interface Data extends Response {
	state: {
		query: NodeJS.Dict<string | string[]>;
	};
}

interface SearchPageProps {
	data: Data | null;
}

const SearchPage: React.FC<SearchPageProps> = ({ data }) => {
	const searchString = decodeURI(`${data?.state.query.query}`);

	return (
		<Layout searchState={searchString}>
			{data && (
				<>
					<Container>
						<h1 className='text-xl font-bold'>
							Søkeresultater for «{searchString}»
						</h1>
					</Container>
					<div className='px-2 pt-6 grid md:grid-cols-2 md:gap-4 md:mt-4 lg:grid-cols-3 xl:grid-cols-4'>
						{data.results.map(result => (
							<MediaItem media={result} key={result.id} />
						))}
					</div>
					<Container>
						<Pagination
							currentPage={data.page}
							totalPages={data.total_pages}
							queryState={data.state.query}
							pathState='search'
						/>
					</Container>
				</>
			)}
		</Layout>
	);
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async context => {
	const searchQuery = context.query.query;

	// Returner {data: null} om det ikke finnes en søke-query.
	if (!searchQuery) return { props: { data: null } };

	const apiQuery = generateQueryString({
		api_key: process.env.TMDB_API_KEY,
		query: searchQuery,
		language: 'no',
		page: context.query.page || '1',
	});

	try {
		const movieReq = `https://api.themoviedb.org/3/search/movie/${apiQuery}`;
		const tvReq = `https://api.themoviedb.org/3/search/tv/${apiQuery}`;

		const res: AxiosResponse<Response>[] = await Promise.all([
			axios.get(movieReq),
			axios.get(tvReq),
		]);

		const movieData = res[0].data;
		const tvData = res[1].data;
		const allResults = [...movieData.results, ...tvData.results];

		const data = {
			page: movieData.page,
			total_pages: Math.max(movieData.total_pages, tvData.total_pages),
			total_results: movieData.total_results + tvData.total_results,
			results: allResults.sort((a, b) => b.popularity - a.popularity),
			state: {
				query: { ...context.query },
			},
		};

		const dataId = searchQuery.toString() + context.query.page?.toString();

		return { props: { data, key: dataId } };
	} catch (error) {
		console.error(error);
		return { props: { data: null } };
	}
};
