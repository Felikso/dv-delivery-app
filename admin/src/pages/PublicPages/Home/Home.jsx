import React, { useState, Suspense } from 'react';

import { allCategoriesName } from '@/utils/variables';
import { useNavigate } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorBoundary/ErrorBoundary';

import Loader from '@/components/Loader/Loader';

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

	const navigate = useNavigate();

	return (
		<>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => navigate('/')}
			>
				<Suspense fallback={<Loader />}>
					<Header />
				</Suspense>
			</ErrorBoundary>

			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => navigate('/')}
			>
				<Suspense fallback={<Loader />}>
					<ExploreMain
						category={category}
						setCategory={setCategory}
					/>
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => navigate('/')}
			>
				<Suspense fallback={<Loader />}>
					<ItemsDisplay category={category} />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => navigate('/')}
			>
				<Suspense fallback={<Loader />}>
					<AppDownload />
				</Suspense>
			</ErrorBoundary>
		</>
	);
};

export default Home;
