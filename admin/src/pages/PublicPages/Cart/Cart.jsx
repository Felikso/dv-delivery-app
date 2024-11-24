import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';

import {
	cartData,
	cartItemsData,
	currency,
	pagesLinks,
	customErrors,
	customInfo,
	imgUrl,
} from '@/utils/variables';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import toast from 'react-hot-toast';

import { assets } from '@/assets/assets';
import NetworkErrorText from '@/components/NetworkErrorText/NetworkErrorText';
/* import BackgroundAnimation from '@/components/BackgroundAnimation/BackgroundAnimation'; */
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '../../../store/cartStore';

function Cart({setRabat, rabat}) {
	const { name, price, quantity, total, remove } = cartItemsData;

	const { verifyRabatCode, user, netErr, deleteRabat } = useAuthStore();
	const { cartItems, decreaseQuantity } = useCartStore();

	const sumPrice = useCartStore((state) => state.totalPrice());

	const deliveryPrice = sumPrice === 0 ? 0 : 8;

	const navigate = useNavigate();

	const [data, setData] = useState('');

	const [rabatExpirest, setRabatExpirest] = useState('');


	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setData((data) => ({ ...data, [name]: value }));
	};

	const handleSetRabat = async (e) => {
		e.preventDefault();

		if (window.confirm('Czy na pewno chcesz wykorzystać swój kod rabatowy?')) {
			if (!user) {
				toast.error(
					'musisz byc zalogowany, żeby wykorzystać swój kod rabatowy'
				);
			}
			try {
				const response = await verifyRabatCode(data.rabatCode, user.email);

				if (response.success) {
					if (response.data) {
						setRabat(response.data);
						
					} else {
						setRabat(0);
					}
					if (response.rabatCodeExpiresAt) {
						setRabatExpirest(response.rabatCodeExpiresAt);
					}
					toast.success('kod rabatowy zaakceptowany');
					//window.location.reload();
				} else {
					toast.error('podano nieprawidłowy kod rabatowy');
				}
			} catch (error) {
				console.log(error);
				toast.error(error?.response?.data.message);
			}
		}
	};

	const handleDeleteRabat = async (e) => {
		e.preventDefault();

		if (window.confirm('Czy na pewno chcesz usunąć swój kod rabatowy?')) {
			try {
				const response = await deleteRabat(user?.rabat.rabatCode);

				if (response.data.success) {
					setRabat(0); //
					setRabatExpirest(0);
					toast.success('kod rabatowy został usunięty');
					//window.location.reload();
				} else {
					toast.error('podano nieprawidłowy kod rabatowy');
				}
			} catch (error) {
				console.log(error);
				toast.error(error?.response?.data.message);
			}
		}
	};

	let disabled = rabat ? 'disabled' : '';
	return (
		<div
			className='cartBox'
		>
			{netErr && <NetworkErrorText />}
			{
				/* dataLoading */ false ? (
					/* <BackgroundAnimation /> */ <p></p>
				) : (
					<>
						<div className='cartItems'>
							<div className='cartItemsTitle'>
								<p></p>
								<p>{name}</p>
								<p>{price}</p>
								<p>{total}</p>
								<p>{remove}</p>
							</div>
							<hr />
							{cartItems.map((item, i) => {
								const onDecreaseQuantity = () => {
									decreaseQuantity(item._id);
								};

								return (
									<div key={i} className='cartItemsTitle cartItemsItem'>
										<div className='cartItemsImg'>
										<img
											src={
												import.meta.env.VITE_BACKEND_URL + imgUrl + item.image
											}
											alt={`zdjęcie ${item.name}`}
											loading='lazy'
										/>
										</div>
										<p className='name'>{item.name} x {item.quantity}</p>
										<p className='price'>
											{item.price} {' '}
											{currency} x {item.quantity}
										</p>
										<p className='total'>
											{item.price * item.quantity}
											{currency}
										</p>
										<img
											className='cross'
											src={assets.rabish_icon}
											alt='usuń'
											onClick={() => {
												if (
													window.confirm(
														'Czy na pewno chcesz usunąć ten przedmiot?'
													)
												) {
													onDecreaseQuantity();
												}
											}}
										/>
									</div>
								);
							})}
						</div>

						<div className='cartBottom'>
							<div className='cartTotal'>
								<h2>{cartData.h2}</h2>
								<div className='cartTotalDetails'>
									<p>{rabat ? cartData.beforeRabat : cartData.subtotal}</p>
									<span
										style={
											rabat
												? { color: 'red', textDecoration: 'line-through' }
												: {}
										}
									>
										<p style={{ color: 'black' }}>
											{sumPrice}
											{currency}
										</p>
									</span>
								</div>
								<div
									className={`cartTotalDetails ${rabat ? '' : 'displayNone'}`}
								>
									<b>
										{rabat
											? cartData.rabat +
											  ' ( ' +
											  Math.floor(rabat * 100) +
											  '% ) '
											: cartData.total}
									</b>
									<b>
										{(sumPrice - sumPrice * rabat).toFixed(2)}
										{currency}
									</b>
								</div>
								<div>
									<hr />
									<div className='cartTotalDetails'>
										<p>{cartData.delivery}</p>
										<p>
											{deliveryPrice}
											{currency}
										</p>
									</div>
									<hr />
									<div className='cartTotalDetails'>
										<b>{cartData.total}</b>
										<b style={{ color: 'green' }}>
											{(sumPrice - sumPrice * rabat + deliveryPrice).toFixed(2)}
											{currency}
										</b>
									</div>
								</div>

								<Button
									color={0}
									onClick={() => {
										if (sumPrice == 0) {
											toast.error(customInfo.emptyCart);
										} else {
											navigate(`/${pagesLinks.order}`);
										}
									}}
									text={cartData.checkout}
								/>
							</div>

							<div className='cartPromocode'>
								<div>
									{rabat ? (
										<p>{cartData.promocodeUsed}</p>
									) : (
										<p>{cartData.promocodeInfo}</p>
									)}
									<form className='cartPromocodeInput'>
										{rabat ? (
											rabatExpirest ? (
												<p>Rabat wygaśnie za: {rabatExpirest}</p>
											) : (
												<></>
											)
										) : (
											<input
												className={`${disabled}`}
												onChange={onChangeHandler}
												name='rabatCode'
												type='text'
												placeholder={cartData.promocodePlaceholder}
											/>
										)}
										<div style={{position: 'relative'}}>
											{' '}
											<button
												className={`${disabled}`}
												onClick={(e) => handleSetRabat(e)}
												type='submit'
											>
												{rabat
													? cartData.removeRabatCode
													: cartData.subbmitCodebtn}
											</button>
											{rabat ? (
												<span className='removeRabat' onClick={handleDeleteRabat}>X</span>
											) : (
												<></>
											)}
										</div>
									</form>
								</div>
							</div>
						</div>
					</>
				)
			}
		</div> //cart
	);
}

export default Cart;
