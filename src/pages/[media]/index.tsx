import { DiscoverResponse } from '../../types/Response';
import { GetServerSideProps } from 'next';
import { MenuAlt3Icon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import Button from '../../components/shared/Button';
import Dropdown from '../../components/shared/Dropdown';
import generateQueryString from '../../lib/generateQueryString';
import Pagination from '../../components/Pagination';
import Layout from '../../components/Layout';
import Container from '../../components/shared/Container';
import MediaItem from '../../components/MediaItem';

interface Data extends DiscoverResponse {
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

	useEffect(() => {
		if (mediaPath !== data?.state.pathname) {
			router.push({
				pathname: mediaPath,
			});
		}
	}, [mediaPath]);

	return (
		data && (
			<Layout>
				<Container>
					<h1 className='text-xl font-bold'>Utforsk</h1>
					<div className='flex gap-2 my-5'>
						<Dropdown
							className='flex-grow'
							value={mediaPath}
							setValue={setMediaPath}
							options={[
								{ value: 'filmer', label: 'Filmer' },
								{ value: 'serier', label: 'Serier' },
							]}
						/>
						<Button Icon={MenuAlt3Icon}>Filtrer</Button>
					</div>
				</Container>
				<div className='px-2 grid md:grid-cols-2 md:gap-4 md:mt-4 lg:grid-cols-3 xl:grid-cols-4'>
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
			</Layout>
		)
	);
};

export default DiscoverPage;

export const getServerSideProps: GetServerSideProps = async context => {
	let media = context.params?.media;

	// Endre 'filmer' og 'serier' til 'movie' og 'tv' slik at det passer med TMDB sin api.
	// Returner 404 om media verken er 'filmer' eller 'serier'.
	let apiPath: 'movie' | 'tv';
	if (media === 'filmer') apiPath = 'movie';
	else if (media === 'serier') apiPath = 'tv';
	else return { notFound: true };

	const query = { ...context.query };
	delete query.media;

	const apiQuery = generateQueryString({
		api_key: process.env.TMDB_API_KEY,
		...query,
	});

	try {
		const req = `https://api.themoviedb.org/3/discover/${apiPath}/${apiQuery}`;
		const res: AxiosResponse<DiscoverResponse> = await axios.get(req);
		const data = {
			...res.data,
			state: {
				pathname: media,
				query: { ...query },
			},
		};

		const dataId = media + query.page;

		return { props: { data, key: dataId } };
	} catch (error) {
		console.error(error);
		return { props: { data: null } };
	}
};
