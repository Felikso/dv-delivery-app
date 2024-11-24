import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import React, { useEffect, useState, lazy, Suspense } from 'react';
//public
import Navbar from './components/Navbar/Navbar';

/* import Home from '@/pages/PublicPages/Home/Home';
import Cart from '@/pages/PublicPages/Cart/Cart';
import PlaceOrder from '@/pages/PublicPages/PlaceOrder/PlaceOrder';
import MyOrders from '@/pages/PublicPages/MyOrders/MyOrders'; */

import Footer from '@/components/Footer/Footer';

const Home = React.lazy(()=>import('@/pages/PublicPages/Home/Home'))
const Cart = React.lazy(()=>import('@/pages/PublicPages/Cart/Cart'))
const PlaceOrder = React.lazy(()=>import('@/pages/PublicPages/PlaceOrder/PlaceOrder'))
const MyOrders = React.lazy(()=>import('@/pages/PublicPages/MyOrders/MyOrders'))

import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from '@/components/ErrorBoundary/ErrorBoundary'



import SignUpPage from './pages/LoginPages/SignUpPage';
import LoginPage from './pages/LoginPages/LoginPage.jsx';
import ForgotPasswordPage from './pages/LoginPages/ForgotPasswordPage.jsx';
import EmailVerificationPage from './pages/LoginPages/EmailVerificationPage';
import ResetPasswordPage from './pages/LoginPages/ResetPasswordPage';

import DashboardPage from './pages/AuthPages/DashboardPage';

import { Toaster } from 'react-hot-toast';

import ListPage from './pages/AuthPages/ListPage';
import AddPage from './pages/AuthPages/AddPage.jsx';
import OrdersPage from './pages/AuthPages/OrdersPage.jsx';

import { pagesLinks, authList } from './utils/variables.jsx';
import { replacePolishLetters } from './utils/functions.js';
import NotAdminPage from './pages/NotAdminPage.jsx';

import PopupPage from '@/components/PopupPage/PopupPage';
import ScrollToTop from './components/ScrollTop/ScrollTop';

import 'react-loading-skeleton/dist/skeleton.css'

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, []);
	return (
		<>
			{isAuthenticated && user.isVerified && user.isAdmin ? (
				<div style={{ margin: '80px auto' }}>{children}</div>
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
				<PopupPage
					setShowPopupPage={setShowPopupPage}
					showPopupPage={showPopupPage}
				/>
			)}
			<Navbar />
			
			
			<Routes>



			<Route path='/' element={
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => navigate('/')}
          >
            <Suspense fallback={<div>LOADING...</div>}>
              <Home />
            </Suspense>
          </ErrorBoundary>}
        />
			

				<Route
					path={`/${pagesLinks.cart}`}
					element={<Cart setRabat={setRabat} rabat={rabat} />}
				/>
				<Route
					path={`/${pagesLinks.order}`}
					element={<PlaceOrder rabat={rabat} />}
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

				<Route path='/not-admin' element={<NotAdminPage />} />

				<Route
					path={replacePolishLetters(authList.add)}
					element={
						<ProtectedRoute>
							<AddPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path={replacePolishLetters(authList.list)}
					element={
						<ProtectedRoute>
							<ListPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path={replacePolishLetters(authList.orders)}
					element={
						<ProtectedRoute>
							<OrdersPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path={pagesLinks.signup}
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path={pagesLinks.login}
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path={pagesLinks.verifyEmail}
					element={<EmailVerificationPage />}
				/>
				<Route
					path={pagesLinks.forgotPass}
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

				<Route
					path={`${pagesLinks.resetPass}/:token`}
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Footer setShowPopupPage={setShowPopupPage} />
			<ScrollToTop />
			<Toaster />
		</div>
	);
}

export default App;
