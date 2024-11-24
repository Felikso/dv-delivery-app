import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import React, { useEffect, useState, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorBoundary/ErrorBoundary';
import { pagesLinks, authList } from './utils/variables.jsx';
import { replacePolishLetters } from './utils/functions.js';
import Loader from './components/Loader/Loader';
//public


const Navbar = React.lazy(() => import('@/components/Navbar/Navbar'));


const Home = React.lazy(() => import('@/pages/PublicPages/Home/Home'));
const Cart = React.lazy(() => import('@/pages/PublicPages/Cart/Cart'));
const PlaceOrder = React.lazy(() =>
	import('@/pages/PublicPages/PlaceOrder/PlaceOrder')
);
const MyOrders = React.lazy(() =>
	import('@/pages/PublicPages/MyOrders/MyOrders')
);

const SignUpPage = React.lazy(() => import('@/pages/LoginPages/SignUpPage'));
const LoginPage = React.lazy(() => import('@/pages/LoginPages/LoginPage'));
const ForgotPasswordPage = React.lazy(() =>
	import('@/pages/LoginPages/ForgotPasswordPage')
);
const EmailVerificationPage = React.lazy(() =>
	import('@/pages/LoginPages/EmailVerificationPage')
);
const ResetPasswordPage = React.lazy(() =>
	import('@/pages/LoginPages/ResetPasswordPage')
);

import DashboardPage from './pages/AuthPages/DashboardPage';

const ListPage = React.lazy(() => import('@/pages/AuthPages/ListPage'));
const AddPage = React.lazy(() => import('@/pages/AuthPages/AddPage'));
const OrdersPage = React.lazy(() => import('@/pages/AuthPages/OrdersPage'));


const NotAdminPage = React.lazy(() => import('@/pages/NotAdminPage'));


const PopupPage = React.lazy(() => import('@/components/PopupPage/PopupPage'));
const Footer = React.lazy(() => import('@/components/Footer/Footer'));

import ScrollToTop from './components/ScrollTop/ScrollTop';
import { Toaster } from 'react-hot-toast';

import 'react-loading-skeleton/dist/skeleton.css';

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, []);
	return (
		<>
			{isAuthenticated && user.isVerified && user.isAdmin ? (
				<div style={{ margin: '80px auto', display: 'flex', justifyContent: 'center' }}>{children}</div>
			) : (
				<NotAdminPage />
			)}
		</>
	);
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
	const [showPopupPage, setShowPopupPage] = useState(false);
	const { checkAuth, user } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	const [rabat, setRabat] = useState(0);

	useEffect(() => {
		if (user?.rabat?.rabatValue) {
			setRabat(user.rabat.rabatValue);
		} else {
			setRabat(0); //clean after order
		}
	}, [user]);

	/* 	if (isCheckingAuth) return <LoadSpinner />; */
	const navigate = useNavigate();
	return (
		<div className='background'>
			{showPopupPage && (
				<ErrorBoundary
					FallbackComponent={ErrorFallback}
					onReset={() => navigate('/')}
				>
					<Suspense fallback={<Loader />}>
						<PopupPage
							setShowPopupPage={setShowPopupPage}
							showPopupPage={showPopupPage}
						/>
					</Suspense>
				</ErrorBoundary>
			)}


			<ErrorBoundary
					FallbackComponent={ErrorFallback}
					onReset={() => navigate('/')}
				>
					<Suspense fallback={<Loader />}>
					<Navbar />
					</Suspense>
				</ErrorBoundary>

			<Routes>
				<Route
					path='/'
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<Home />
							</Suspense>
						</ErrorBoundary>
					}
				/>

				<Route
					path={`/${pagesLinks.cart}`}
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<Cart setRabat={setRabat} rabat={rabat} />
							</Suspense>
						</ErrorBoundary>
					}
				/>

				<Route
					path={`/${pagesLinks.order}`}
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<PlaceOrder rabat={rabat} />
							</Suspense>
						</ErrorBoundary>
					}
				/>

				<Route
					path={`/${pagesLinks.myorders}`}
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<MyOrders />
							</Suspense>
						</ErrorBoundary>
					}
				/>

				<Route path={`/${pagesLinks.myorders}`} element={<MyOrders />} />

				<Route
					path='/panel'
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/not-admin'
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<NotAdminPage />
							</Suspense>
						</ErrorBoundary>
					}
				/>

				<Route
					path={replacePolishLetters(authList.add)}
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<ProtectedRoute>
									<AddPage />
								</ProtectedRoute>
							</Suspense>
						</ErrorBoundary>
					}
				/>

				<Route
					path={replacePolishLetters(authList.list)}
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<ProtectedRoute>
									<ListPage />
								</ProtectedRoute>
							</Suspense>
						</ErrorBoundary>
					}
				/>

				<Route
					path={replacePolishLetters(authList.orders)}
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<ProtectedRoute>
									<OrdersPage />
								</ProtectedRoute>
							</Suspense>
						</ErrorBoundary>
					}
				/>

				<Route
					path={pagesLinks.signup}
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<RedirectAuthenticatedUser>
									<SignUpPage />
								</RedirectAuthenticatedUser>
							</Suspense>
						</ErrorBoundary>
					}
				/>

				<Route
					path={pagesLinks.login}
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<RedirectAuthenticatedUser>
									<LoginPage />
								</RedirectAuthenticatedUser>
							</Suspense>
						</ErrorBoundary>
					}
				/>
				<Route
					path={pagesLinks.verifyEmail}
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<EmailVerificationPage />
							</Suspense>
						</ErrorBoundary>
					}
				/>
				<Route
					path={pagesLinks.forgotPass}
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<RedirectAuthenticatedUser>
									<ForgotPasswordPage />
								</RedirectAuthenticatedUser>
							</Suspense>
						</ErrorBoundary>
					}
				/>
				<Route
					path={`${pagesLinks.resetPass}/:token`}
					element={
						<ErrorBoundary
							FallbackComponent={ErrorFallback}
							onReset={() => navigate('/')}
						>
							<Suspense fallback={<Loader />}>
								<RedirectAuthenticatedUser>
									<ResetPasswordPage />
								</RedirectAuthenticatedUser>
							</Suspense>
						</ErrorBoundary>
					}
				/>

				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
	
			<ErrorBoundary
					FallbackComponent={ErrorFallback}
					onReset={() => navigate('/')}
				>
					<Suspense fallback={<Loader />}>
					<Footer setShowPopupPage={setShowPopupPage} />
					</Suspense>
				</ErrorBoundary>
			<ScrollToTop />
			<Toaster />
		</div>
	);
}

export default App;
