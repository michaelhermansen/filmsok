import { GetServerSideProps } from 'next';
import { MenuAlt3Icon } from '@heroicons/react/solid';
import { Response } from '../../types/Response';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import Button from '../../components/shared/Button';
import Container from '../../components/shared/Container';
import Dropdown from '../../components/shared/Dropdown';
import generateQueryString from '../../lib/generateQueryString';
import Layout from '../../components/Layout';
import MediaItem from '../../components/MediaItem';
import Pagination from '../../components/Pagination';
import Filters from '../../components/Filters';
import correctQueryObj from '../../lib/correctQueryObj';

interface Data extends Response {
	state: {
		pathname: string;
		query: NodeJS.Dict<string | string[]>;
	};
}

interface DiscoverPageProps {
	data: Data | null;
}

const DiscoverPage: React.FC<DiscoverPageProps> = ({ data }) => {
	const router = useRouter();
	const [mediaPath, setMediaPath] = useState(data?.state.pathname || 'filmer');
	const [showFilters, setShowFilters] = useState(false);

	useEffect(() => {
		if (mediaPath !== data?.state.pathname) {
			router.push({
				pathname: mediaPath,
			});
		}
	}, [mediaPath]);

	return (
		<Layout>
			{data && (
				<>
					<Container>
						<h1 className='text-xl font-bold'>Utforsk</h1>
						<div className='flex gap-2 mt-5'>
							<Dropdown
								className='flex-grow'
								value={mediaPath}
								setValue={setMediaPath}
								options={[
									{ value: 'filmer', label: 'Filmer' },
									{ value: 'serier', label: 'Serier' },
								]}
							/>
							<Button onClick={() => setShowFilters(true)} Icon={MenuAlt3Icon}>
								Filtrer
							</Button>
						</div>
						{showFilters && (
							<Filters
								closeModal={() => setShowFilters(false)}
								initialState={data.state}
							/>
						)}
					</Container>
					<div className='px-2 pt-8 grid md:grid-cols-2 md:gap-4 md:mt-4 lg:grid-cols-3 xl:grid-cols-4'>
						{data.results.map(result => (
							<MediaItem media={result} key={result.id} />
						))}
					</div>
					<Container>
						<Pagination
							currentPage={data.page}
							totalPages={data.total_pages}
							queryState={data.state.query}
							pathState={mediaPath}
						/>
					</Container>
				</>
			)}
		</Layout>
	);
};

export default DiscoverPage;

export const getServerSideProps: GetServerSideProps = async context => {
	const media = context.params?.media;
	delete context.query.media;

	// Endre 'filmer' og 'serier' til 'movie' og 'tv' slik at det passer med TMDB sin api.
	// Returner 404 om media verken er 'filmer' eller 'serier'.
	let apiPath: 'movie' | 'tv';
	if (media === 'filmer') apiPath = 'movie';
	else if (media === 'serier') apiPath = 'tv';
	else return { notFound: true };

	// Retter opp query-parameterne slik at det passer med API-en
	const query = correctQueryObj({ media, originalQueryObject: context.query });

	const apiQuery = generateQueryString({
		api_key: process.env.TMDB_API_KEY,
		language: 'no',
		...query,
	});

	try {
		// Dersom 'sort_by' er lik 'top_rated', hent dette fra API-en:
		const topRatedReq =
			query.sort_by === 'top_rated'
				? `https://api.themoviedb.org/3/${apiPath}/top_rated${apiQuery}`
				: null;

		// Hvis ikke, hent dette:
		const req = `https://api.themoviedb.org/3/discover/${apiPath}${apiQuery}`;

		const res: AxiosResponse<Response> = await axios.get(topRatedReq || req);
		const data = {
			...res.data,
			state: {
				pathname: media,
				query: { ...context.query },
			},
		};

		const dataId = media + query.page;

		return { props: { data, key: dataId } };
	} catch (error) {
		console.error(error);
		return { props: { data: null } };
	}
};
