import { LoadingContext } from '../lib/loadingContext';
import { Result } from '../types/Response';
import { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import translateGenreId from '../lib/translateGenreId';
import classNames from 'classnames';

interface MediaItemProps {
	media: Result;
}

const MediaItem: React.FC<MediaItemProps> = ({ media }) => {
	const { loading } = useContext(LoadingContext);
	const mediaDate = media.release_date || media.first_air_date || '';
	const mediaYear = mediaDate.substring(0, 4);
	const mediaType = media.title ? 'filmer' : 'serier';
	const mainGenre = translateGenreId(media.genre_ids[0], mediaType);

	const [imgError, setImgError] = useState(false);

	return (
		<Link href={`/${mediaType}/${media.id}`}>
			<a
				className={`p-2 flex gap-4 items-center rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-300 ${
					loading && 'opacity-10 pointer-events-none'
				}`}
			>
				<div className='bg-gray-300 dark:bg-gray-800 h-40 w-28 rounded-md flex-shrink-0 relative overflow-hidden'>
					<Image
						onError={() => setImgError(true)}
						src={
							!imgError
								? `https://image.tmdb.org/t/p/w200/${media.poster_path}`
								: '/assets/placeholder.svg'
						}
						width={250}
						height={360}
						objectFit='cover'
						alt={`Plakat for ${media.title || media.name}`}
					/>
				</div>
				<div className='pr-2'>
					<h2 className='mb-2 font-semibold'>{media.title || media.name}</h2>
					<p className='text-sm'>
						{mediaYear} {mediaYear && mainGenre ? '·' : ''} {mainGenre}
					</p>
					{media.vote_average > 0 && (
						<div className='mt-8 flex gap-2 items-center'>
							<p>{media.vote_average.toFixed(1)}</p>
							<div
								className={classNames('h-1 w-1 rounded-full', {
									'bg-red-500': media.vote_average < 4,
									'bg-yellow-500':
										media.vote_average >= 4 && media.vote_average < 7,
									'bg-green-500': media.vote_average >= 7,
								})}
							></div>
						</div>
					)}
					{!media.vote_average && <p className='mt-8'>N/A</p>}
				</div>
			</a>
		</Link>
	);
};

export default MediaItem;
