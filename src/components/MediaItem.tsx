import { LoadingContext } from '../lib/loadingContext';
import { Result } from '../types/Response';
import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MediaItemProps {
	media: Result;
}

const MediaItem: React.FC<MediaItemProps> = ({ media }) => {
	const { loading } = useContext(LoadingContext);
	const mediaDate = media.release_date || media.first_air_date || '';
	const mediaYear = mediaDate.substring(0, 4);
	const mediaPath = media.title ? 'filmer' : 'serier';

	return (
		<Link href={`/${mediaPath}/${media.id}`}>
			<a
				className={`p-2 flex gap-4 items-center rounded-lg hover:bg-white hover:shadow-xl transition-all duration-300 ${
					loading && 'opacity-10 pointer-events-none'
				}`}
			>
				<div className='bg-gray-300 h-40 w-28 rounded-md flex-shrink-0 relative overflow-hidden'>
					<Image
						src={`https://image.tmdb.org/t/p/w200/${media.poster_path}`}
						width={250}
						height={360}
						objectFit='cover'
						alt={`Plakat for ${media.title || media.name}`}
					/>
				</div>
				<div className='pr-2'>
					<h2 className='mb-2 font-semibold'>{media.title || media.name}</h2>
					<p>{mediaYear}</p>
					<p className='mt-8'>{media.vote_average.toFixed(1)}</p>
				</div>
			</a>
		</Link>
	);
};

export default MediaItem;
