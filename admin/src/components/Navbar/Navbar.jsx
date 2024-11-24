import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '@/assets/assets.js';
import {
	brandData,
	authList,
	loginBtnText,
	objMenu,
	objPages,
} from '@/utils/variables.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';
import { replacePolishLetters } from '@/utils/functions.js';
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx';
import { useCartStore } from '../../store/cartStore';
import { panelPath } from '../../utils/variables';
import Cookies from 'js-cookie';

const Navbar = () => {
	const { user, logout, isAuthenticated } = useAuthStore();

	const { cartItems } = useCartStore();

	const [shakeCart, setShakeCart] = useState(false);

	const sum =
		JSON.stringify(cartItems) === '{}'
			? 0
			: cartItems?.reduce((accumulator, currentObject) => {
					return accumulator + currentObject.quantity;
			  }, 0);

	const [menu, setMenu] = useState('start');
	const [openMenu, setOpenMenu] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [userName, setUserName] = useState('zaloguj się');
	const location = useLocation();

	const navigate = useNavigate();
	let activeClass = openMenu ? 'activeMenu' : '';
	let hideCart = openMenu;

	useEffect(() => {
		if (user) {
			setUserName(user.name);
		}
	}, [user]);

	useEffect(() => {
		setShakeCart(true);
		setOpenMenu(false);
		setTimeout(() => {
			setShakeCart(false);
		}, 500);
	}, [cartItems]);

	const handleChange = () => {
		setTimeout(setIsHovered(false), 2000);
	};

	const handleSetMenu = (item) => {
		setMenu(item);
		setOpenMenu(!openMenu);
	};

	const handleLogout = () => {
		if (window.confirm('wylogowujesz się?')) {
			localStorage.removeItem('cartData');
			setOpenMenu(!openMenu);
			logout();
			Cookies.remove('token');
			navigate('/');
			window.location.reload();
		}
	};

	const renderMenuList = user?.isAdmin
		? { ...authList, ...objPages }
		: objPages;

	return (
		<>
			<Link to='/' className='logoBox'>
				<img
					src={assets.logo}
					alt={`logo ${brandData.name}`}
					className='logo'
					loading='lazy'
					height='71'
					width='135'
				/>
			</Link>
			<div className='navbar'>
				<ul className={`navbarMenu ${activeClass}`}>
					{Object.entries(renderMenuList).map(([item, i]) => (
						<>
							<Link
								to={`${replacePolishLetters(renderMenuList[item])}`}
								key={i + renderMenuList[item]}
								className={`${
									location.pathname ===
									replacePolishLetters(renderMenuList[item])
										? 'active'
										: ''
								}
							`}
								onClick={() => handleSetMenu(item)}
							>
								{renderMenuList[item].replace(panelPath, '').replace('/', '')}
							</Link>

							{renderMenuList[item].includes('/koszyk') && (
								<span
									key={i}
									onClick={() => navigate('/koszyk')}
									className={`cart ${shakeCart ? 'shake' : ''} ${
										hideCart ? 'runAway' : ''
									}`}
									data-totalitems={sum}
								>
									{' '}
									<img
										src={assets.cart}
										alt='koszyk'
										loading='lazy'
										height='40'
										width='40'
									/>
								</span>
							)}
						</>
					))}
					{Object.entries(objMenu).map(([item, i]) => (
						<a
							href={`/#${objMenu[item]}`}
							key={i + item}
							className={`${menu === item ? 'active' : ''}`}
							onClick={() => handleSetMenu(item)}
						>
							{item}
						</a>
					))}
					<div className='navLogout' key='navLogout'>
						<img
							src={assets.logo}
							alt={`logo ${brandData.name}`}
							className='logoMenu'
							onClick={() => {
								setOpenMenu();
								navigate('/');
							}}
							loading='lazy'
							height='57'
							width='100'
						/>
						{isAuthenticated ? (
							<img
								src={assets.logout_icon}
								alt='wyloguj'
								onClick={handleLogout}
								loading='lazy'
								width='60'
								height='60'
							/>
						) : (
							<img
								src={assets.login_icon}
								alt='zaloguj'
								onClick={() => {
									setOpenMenu();
									navigate('/login');
								}}
								loading='lazy'
								width='60'
								height='60'
							/>
						)}
					</div>
				</ul>
				<div
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={handleChange}
					className='navbarRight'
				>
					<div
						className='navProfile'
						onClick={() => {
							setOpenMenu();
							navigate('/login');
						}}
					>
						<img
							src={assets.profile_image}
							alt='profile'
							className='profile'
							onClick={() => {
								var width = window.innerWidth;
								if (width <= 750) {
									if (user) {
										handleLogout();
									} else {
										navigate('/login');
									}
								}
							}}
							loading='lazy'
							width='32'
							height='32'
						/>
						<p>{user ? userName : loginBtnText}</p>
					</div>
					<a className={`logOutImg ${isHovered ? 'hoverImg' : ''}`}>
						{isAuthenticated ? (
							<img
								src={assets.logout_icon}
								alt='wyloguj'
								onClick={handleLogout}
								loading='lazy'
								width='60'
								height='60'
							/>
						) : (
							<img
								src={assets.login_icon}
								alt='zaloguj'
								onClick={() => {
									navigate('/login');
								}}
								loading='lazy'
								width='60'
								height='60'
							/>
						)}
					</a>
				</div>
				<BurgerMenu
					variant={'arrow1'}
					setOpenMenu={setOpenMenu}
					openMenu={openMenu}
				/>
			</div>
		</>
	);
};

export default Navbar;
