import React, { useEffect, useRef, useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import './PlaceOrder.css';
import {
	cartData,
	placeOrderData,
	quantityItems,
	orderPlaceUrl,
	customInfo,
} from '@/utils/variables';

import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input.jsx';
import { useNavigate } from 'react-router-dom';
import NetworkErrorText from '@/components/NetworkErrorText/NetworkErrorText';
import { itemsCat } from '../../../../../backend/controllers/itemsController';

const PlaceOrder = ({ rabat }) => {
	const { user, isAuthenticated, netErr, beUrl } = useAuthStore();

	const { cartItems, mergeCartItems } = useCartStore();

	const sumPrice =
		useCartStore((state) => state.totalPrice()) -
		useCartStore((state) => state.totalPrice()) * rabat;

	const deliveryPrice = sumPrice === 0 ? 0 : 8;

	const [data, setData] = useState(
		user?.address
			? user.address
			: {
					firstName: '',
					lastName: '',
					email: '',
					street: '',
					state: '',
					city: '',
					zipCode: '',
					country: '',
					phone: '',
			  }
	);
	useEffect(() => {
		if (user) {
			setData(user.address);
		}
	}, [user]);

	const [saveAddress, setSaveAddress] = useState(false);

	const [errorMessage, setErrorMessage] = useState({
		firstName: '',
		lastName: '',
		email: '',
		street: '',
		state: '',
		city: '',
		zipCode: '',
		country: '',
		phone: '',
	});

	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		if (e.target.name === 'firstName') {
			if (e.keyCode == 32) {
				e.preventDefault();
				return;
				if (e.target.name !== 'city') {
					console.log(e.target.name);

					//setData((data) => ({ ...data, [name]: String(e.target.value).charAt(0).toUpperCase() + String(e.target.value).slice(1).toLocaleLowerCase() }));
				}
			}
		}

		if (e.target.name == 'zipCode') {
			if (e.target.value.length > 6) {
				setErrorMessage((errorMessage) => ({
					...errorMessage,
					[name]: 'Pamiętaj, że kod powinien się składać z pięciu cyfr',
				}));
				e.preventDefault();
			} else {
				setErrorMessage('');
			}
			setData((data) => ({
				...data,
				[name]: e.target.value.replace(/[^0-9-]/g, ''),
			}));
		} else if (e.target.name == 'phone') {
			if (e.target.value.length > '9') {
				setErrorMessage((errorMessage) => ({
					...errorMessage,
					[name]: 'Pamiętaj, że numer powinien się składać z dziewięciu cyfr',
				}));
				return;
			} else {
				setErrorMessage('');
			}
			setData((data) => ({
				...data,
				[name]: e.target.value.replace(/[^0-9]/g, ''),
			}));
		} else {
			//setData((data) => ({ ...data, [name]: value }));
			let newString = '';
			if (e.target.name === 'email') {
				if (e.target.value.includes('@')) {
					setErrorMessage('');
				}
				newString = value;
				newString.replace(' ', '');
			} else {
				let newArr = [];
				value.split(' ').map((str) => {
					newArr.push(
						String(str).charAt(0).toUpperCase() +
							String(str).slice(1).toLocaleLowerCase()
					);
				});

				newString = newArr.join(' ');
			}

			setData((data) => ({ ...data, [name]: newString.replace('  ', ' ') }));
		}
		//simply validation
	};

	const placeOrder = async (e) => {
		e.preventDefault();

		if (isAuthenticated) {
			if (user.address !== data) {
				if (window.confirm('Czy chcesz zaktualizować dane adresowe?')) {
					setSaveAddress(true);
					toast.success(customInfo.addressUpdated);
				}
			} else {
				if (window.confirm('Czy na pewno chcez złożyć zamówienie?')) {
					toast.success(customInfo.accpetPlaceOrder);
				} else {
					toast.error(customInfo.cancelPlaceOrder);
					return;
				}
			}
		} else {
			if (
				window.confirm(
					'Czy na pewno chcesz złożyć zamówienie bez zakładania konta?'
				)
			) {
			} else {
				toast.error(customInfo.cancelPlaceOrder);
				return;
			}
		}

		var result = cartItems.map(function (obj) {
			return {
				_id: obj._id,
				name: obj.name,
				price: obj.price,
				quantity: obj.quantity,
				__v: obj.__v,
			};
		});

		let orderData = {
			address: data,
			items: result,
			amount: (sumPrice - rabatAmount + deliveryPrice).toFixed(2),
			rabat: rabatValue,
			saveAddress: saveAddress,
		};
		let response = await axios.post(beUrl + orderPlaceUrl, orderData);

		//const { session_url } = response.data;
		if (response.data.success) {
			localStorage.removeItem('cartData');
			mergeCartItems([]);
			navigate('/');

			if (!isAuthenticated) {
				setTimeout(() => {
					toast.success(customInfo.unauthenticatedAccpetPlaceOrder, {
						duration: 6000,
						position: 'bottom-center',
					});
				}, 1500);
			}

			//navigate(pagesLinks.orders);
			/* if (session_url) {
				//window.location.replace(session_url);
			} else {
				alert('musisz się zalogować, żeby dokonac płatności');
			} */
		} /* else if (response.data.success && orderData) {
			window.location.replace(session_url);
		} */ /* else {
			alert('musisz się zalogować, żeby dokonac płatności :((');
		} */
	};

	const navigate = useNavigate();

	const rabatValue = user?.rabat?.rabatValue ? user.rabat.rabatValue : 0;

	const rabatAmount = user?.rabat ? sumPrice * rabatValue : 0;

	const totalWithRabat = sumPrice - rabatAmount + deliveryPrice;

	const handleKeyDown = (e) => {
		if (e.key === '-' && e.target.value.length == 2) {
			return;
		}
		if (e.key !== 'Backspace') {
			if (e.target.value.length == 2) {
				setData((data) => ({ ...data, [e.target.name]: e.target.value + '-' }));
			}
		}
	};

	const handleKeyDownLockWhitespace = (e) => {
		if (e.keyCode == 32) {
			e.preventDefault();
			return;
			console.log('mail');
			console.log(e.target.name);
		}
		/* 		const name = e.target.name;
		const value = e.target.value;
		//capitalizeAfterWhitespace(value)
		allowOnlyOneWhitespace(value)
		//console.log(capitalizeAfterWhitespace(value));
		
		if (e.keyCode == 32) {
			if(e.target.name !== 'city'){
				console.log(e.target.name);

	
			//setData((data) => ({ ...data, [name]: String(e.target.value).charAt(0).toUpperCase() + String(e.target.value).slice(1).toLocaleLowerCase() }));
		}else{

		
		
		//setData((data) => ({ ...data, [e.target.name]: String(e.target.value).toLocaleLowerCase() }));

	
	} */
	};
	const handleEmailBlur = (e) => {
		if (!e.target.value.includes('@')) {
			setErrorMessage((errorMessage) => ({
				...errorMessage,
				[e.target.name]: 'Adres niepoprawny - brakuje @',
			}));
		} else {
			setErrorMessage('');
		}
	};

	return (
		<form onSubmit={placeOrder} className='placeOrder'>
			<div className='placeOrderLeft'>
				{netErr && <NetworkErrorText />}
				<p className='title'>{placeOrderData.title}</p>
				<div className='multiFiled'>
					<Input
						//icon={Mail}
						required
						className='input'
						name='firstName'
						onChange={onChangeHandler}
						value={data.firstName}
						type='text'
						placeholder={placeOrderData.firstName}
						errorMess={errorMessage.firstName}
					/>
					<Input
						required
						className='input'
						name='lastName'
						onChange={onChangeHandler}
						value={data.lastName}
						type='text'
						placeholder={placeOrderData.lastName}
						errorMess={errorMessage.lastName}
					/>
				</div>
				<Input
					required
					className='input'
					name='email'
					onChange={onChangeHandler}
					onKeyDown={handleKeyDownLockWhitespace}
					onBlur={handleEmailBlur}
					value={data.email}
					type='email'
					placeholder={placeOrderData.email}
					errorMess={errorMessage.email}
				/>
				<div className='multiFiled'>
					<Input
						required
						className='input'
						name='street'
						onChange={onChangeHandler}
						value={data.street}
						type='text'
						placeholder={placeOrderData.street}
						errorMess={errorMessage.street}
					/>
					<Input
						required
						className='input'
						name='numberStreet'
						onChange={onChangeHandler}
						value={data.numberStreet}
						type='text'
						placeholder={placeOrderData.numberStreet}
						errorMess={errorMessage.numberStreet}
					/>
				</div>
				<div className='multiFiled'>
					<Input
						required
						className='input'
						name='city'
						onChange={onChangeHandler}
						value={data.city}
						type='text'
						placeholder={placeOrderData.city}
						errorMess={errorMessage.city}
					/>
					<Input
						required
						className='input'
						name='zipCode'
						onChange={onChangeHandler}
						onKeyDown={(e) => handleKeyDown(e)}
						value={data.zipCode}
						type='text'
						maxLength={6}
						placeholder={placeOrderData.zipCode}
						errorMess={errorMessage.zipCode}
					/>
				</div>
				<Input
					required
					className='input'
					name='phone'
					onChange={onChangeHandler}
					value={data.phone}
					type='text'
					placeholder={placeOrderData.phone}
					errorMess={errorMessage.phone}
				/>
			</div>
			<div className='placeOrderRight'>
				<div className='cartTotal'>
					<h2>{placeOrderData.h2}</h2>
					<div>
						<div className='cartTotalDetails'>
							<p>{cartData.subtotal}</p>
							<p>
								{rabat ? (
									<span style={{ color: 'green', fontSize: '.8rem' }}>
										( - {rabat * 100}% rabatu){' '}
									</span>
								) : (
									<></>
								)}
								{(sumPrice - rabatAmount).toFixed(2)}
							</p>
						</div>
						<hr />
						<div className='cartTotalDetails'>
							<p>{cartData.delivery}</p>
							<p>{deliveryPrice}</p>
						</div>
						<hr />
						<div className='cartTotalDetails'>
							<b>{cartData.total}</b>
							<b>{totalWithRabat.toFixed(2)}</b>
						</div>
					</div>
					<Button type={'submit'} color={0} text={placeOrderData.checkout} />
				</div>
			</div>
		</form>
	);
};

export default PlaceOrder;
