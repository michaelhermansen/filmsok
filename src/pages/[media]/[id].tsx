import { GetStaticPaths, GetStaticProps } from 'next';
import { Result } from '../../types/Response';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Container from '../../components/shared/Container';
import generateQueryString from '../../lib/generateQueryString';
import Image from 'next/image';
import Layout from '../../components/Layout';

const MediaPage = ({ data }: { data: Result }) => {
	const [imgError, setImgError] = useState(false);

	const mediaDate = data.release_date || data.first_air_date || '';
	const mediaYear = mediaDate.substring(0, 4);

	return (
		<Layout>
			<div className='px-2 mx-auto max-w-5xl'>
				<div className='relative h-56 sm:h-80 md:h-96'>
					<Image
						onError={() => setImgError(true)}
						src={
							!imgError
								? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
								: '/assets/placeholder_backdrop.svg'
						}
						layout='fill'
						objectFit='cover'
						alt={`Fremhevet bilde av ${data.title || data.name}`}
						className='rounded-3xl bg-gray-300 dark:bg-gray-700'
					/>
				</div>
			</div>
			<Container>
				<h1 className='mt-6 text-xl font-bold leading-snug pb-8'>
					{data.title || data.name}{' '}
					<span className='font-normal opacity-50'>({mediaYear})</span>
				</h1>
				<p>{data.overview}</p>
			</Container>
		</Layout>
	);
};

export default MediaPage;

export const getStaticProps: GetStaticProps = async context => {
	const media = context.params?.media;
	const id = context.params?.id;
	const ttl = 60 * 60 * 6; // 6 timer

	// Endre 'filmer' og 'serier' til 'movie' og 'tv' slik at det passer med TMDB sin api.
	// Returner 404 om media verken er 'filmer' eller 'serier'.
	let apiMedia: 'movie' | 'tv';
	if (media === 'filmer') apiMedia = 'movie';
	else if (media === 'serier') apiMedia = 'tv';
	else return { notFound: true, revalidate: ttl };

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
			revalidate: ttl,
		};
	} catch (error) {
		console.error(error);
		return { notFound: true, revalidate: ttl };
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' };
};
