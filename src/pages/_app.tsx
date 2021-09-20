import '../global.css';
import { LoadingContext } from '../lib/loadingContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import type { AppProps } from 'next/app';

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
			<LoadingContext.Provider value={{ loading, setLoading }}>
				<Component {...pageProps} />
			</LoadingContext.Provider>
		</>
	);
}
export default MyApp;
