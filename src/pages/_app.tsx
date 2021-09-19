import '../global.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { LoadingContext } from '../lib/loadingContext';

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	// Automatisk start og stopp loading-state på route-change.
	// Loading-staten er tilgjengelig globalt, og kan blant annet
	// brukes til å vise laste-animasjoner eller deaktivere knapper e.l.
	useEffect(() => {
		const startLoading = () => setLoading(true);
		const stopLoading = () => setLoading(false);

		router.events.on('routeChangeStart', startLoading);
		router.events.on('routeChangeComplete', stopLoading);

		return () => {
			router.events.off('routeChangeStart', startLoading);
			router.events.off('routeChangeComplete', stopLoading);
		};
	}, [router.events]);

	return (
		<>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='true'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<LoadingContext.Provider value={{ loading, setLoading }}>
				<Component {...pageProps} />
			</LoadingContext.Provider>
		</>
	);
}
export default MyApp;
