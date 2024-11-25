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

	const delayComponents = {
		header: 500,
		category: 500,
		menu: 2000,
		app: 4000,
	};

	return (
		<>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => navigate('/')}
			>
				<Suspense fallback={<Loader />}>
					<Header time={delayComponents.header} />
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
						time={delayComponents.category}
					/>
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => navigate('/')}
			>
				<Suspense fallback={<Loader />}>
					<ItemsDisplay category={category} time={delayComponents.menu} />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => navigate('/')}
			>
				<Suspense fallback={<Loader />}>
					<AppDownload time={delayComponents.app} />
				</Suspense>
			</ErrorBoundary>
		</>
	);
};

export default Home;
