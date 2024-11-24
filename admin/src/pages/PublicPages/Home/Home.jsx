import React, { useState, useEffect, useRef, Suspense } from 'react';

import { allCategoriesName } from '@/utils/variables';
import { useLocation } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorBoundary/ErrorBoundary';

const Header = React.lazy(() => import('@/components/Header/Header'));
const ExploreMain = React.lazy(() =>
	import('@/components/ExploreMain/ExplorerMain')
);
const AppDownload = React.lazy(() =>
	import('@/components/AppDownload/AppDownload')
);
const ItemsDisplay = React.lazy(() =>
	import('@/components/ItemsDisplay/ItemsDisplay')
);

import './Home.css';

const Home = () => {
	const [category, setCategory] = useState(allCategoriesName);
	const menuRef = useRef(null);
	const contactRef = useRef(null);
	const location = useLocation();

	useEffect(() => {
		// Other location checking and authority enforcing functions here
	}, [location]);

	useEffect(() => {
		if (!menuRef.current) return;
		if (
			location.hash == '#exploreMain' &&
			menuRef.current.getBoundingClientRect()
		) {
			console.log(menuRef);
			const scrollPosY = 600;
			menuRef.current.scrollIntoView();
			window.scrollTo(0, scrollPosY);
		}
	}, [location]);

	return (
		<>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => navigate('/')}
			>
				<Suspense fallback={<div>loading...</div>}>
					<Header />
				</Suspense>
			</ErrorBoundary>

			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => navigate('/')}
			>
				<Suspense fallback={<div>loading...</div>}>
					<ExploreMain
						category={category}
						setCategory={setCategory}
						menuRef={menuRef}
					/>
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => navigate('/')}
			>
				<Suspense fallback={<div>loading...</div>}>
					<ItemsDisplay category={category} />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => navigate('/')}
			>
				<Suspense fallback={<div>loading...</div>}>
					<AppDownload contactRef={contactRef} />
				</Suspense>
			</ErrorBoundary>
		</>
	);
};

export default Home;
