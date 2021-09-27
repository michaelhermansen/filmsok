import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import Container from '../../components/shared/Container';
import generateQueryString from '../../lib/generateQueryString';
import { Result } from '../../types/Response';
import Image from 'next/image';
import { useState } from 'react';

const MediaPage = ({ data }: { data: Result }) => {
	const [imgError, setImgError] = useState(false);

	return (
		<Layout>
			<div className='px-2 mx-auto max-w-5xl'>
				<div className='relative h-56 sm:h-80 md:h-96'>
					<Image
						onError={() => setImgError(true)}
						src={
							!imgError
								? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
								: '/assets/placeholder.svg'
						}
						layout='fill'
						objectFit='cover'
						alt={`Fremhevet bilde av ${data.title || data.name}`}
						className='rounded-xl bg-gray-300 dark:bg-gray-700'
					/>
				</div>
			</div>
			<Container>
				<h1 className='mt-6 text-xl font-bold'>{data.title || data.name}</h1>
			</Container>
		</Layout>
	);
};

export default MediaPage;

export const getServerSideProps: GetServerSideProps = async context => {
	const media = context.params?.media;
	const id = context.params?.id;

	// Endre 'filmer' og 'serier' til 'movie' og 'tv' slik at det passer med TMDB sin api.
	// Returner 404 om media verken er 'filmer' eller 'serier'.
	let apiMedia: 'movie' | 'tv';
	if (media === 'filmer') apiMedia = 'movie';
	else if (media === 'serier') apiMedia = 'tv';
	else return { notFound: true };

	const apiQuery = generateQueryString({
		api_key: process.env.TMDB_API_KEY,
		language: 'no',
	});

	try {
		const req = `https://api.themoviedb.org/3/${apiMedia}/${id}${apiQuery}`;
		const res: AxiosResponse<Result> = await axios.get(req);
		const data = {
			...res.data,
			state: { pathname: media },
		};

		return {
			props: {
				data,
				key: id,
			},
		};
	} catch (error) {
		console.error(error);
		return { props: { data: null } };
	}
};
