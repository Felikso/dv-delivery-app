import React, { useEffect, useState } from 'react';
import {
	Mail,
	Lock,
	UserCheck,
	UserPlus,
	MapPinHouse,
	Milestone,
	LandPlot,
	TowerControl,
	PhoneCall,
} from 'lucide-react';
import './PlaceOrder.css';
import {
	cartData,
	placeOrderData,
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

const PlaceOrder = ({ rabat }) => {
	const { user, isAuthenticated, netErr, beUrl } = useAuthStore();

	const navigate = useNavigate();

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

		if (e.target.value.length === e.target.maxLength) {
			setErrorMessage((errorMessage) => ({
				...errorMessage,
				[name]: 'Przekroczono limit znaków',
			}));
			e.target.value = e.target.value.slice(0, e.target.maxLength - 1);
		} else {
			setErrorMessage('');
		}

		if (e.target.name == 'zipCode') {
			setData((data) => ({
				...data,
				[name]: e.target.value.replace(/[^0-9-]/g, ''),
			}));
		} else if (e.target.name === 'email') {
			if (e.target.value.includes('@')) {
				setErrorMessage('');
			}
			setData((data) => ({
				...data,
				[name]: e.target.value.replace(
					/[^0-9^a-zA-ZąęóńćĆśŚżŻźŹłŁ\.\-\@/]/g,
					''
				),
			}));
		}else if (e.target.name == 'phone') {
			setData((data) => ({
				...data,
				[name]: e.target.value.replace(/[^0-9]/g, ''),
			}));
		} else if (e.target.name === 'numberStreet') {
			console.log('dsdf');

			setData((data) => ({
				...data,
				[name]: e.target.value.replace(
					/[^0-9^a-zA-ZąęóńćĆśŚżŻźŹłŁ\.\-\/]/g,
					''
				),
			}));
		} else {
			let newString = '';
			if (e.target.name === 'email') {
				if (e.target.value.includes('@')) {
					setErrorMessage('');
				}
				newString = e.target.value;
				newString.replace(' ', '');
			} else {
				const upperSpecialChart = (value, char, toLower = true) => {
					let newArr = [];
					value.split(char).map((str) => {
						let string = toLower
							? String(str).slice(1).toLocaleLowerCase()
							: String(str).slice(1);
						newArr.push(String(str).charAt(0).toUpperCase() + string);
					});
					newString = newArr.join(char);
					return newString;
				};
				newString = upperSpecialChart(e.target.value, ' ');

				if (newString.includes('-')) {
					newString = upperSpecialChart(newString, '-', false);
				}
			}

			//(/[\s-]+/) white space + hyper

			setData((data) => ({
				...data,
				[name]: newString
					.replace('  ', ' ')
					.replace(/[^a-zA-ZąęóńćĆśŚżŻźŹłŁ\- ]/g, ''),
			}));
		}
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
		}
	};


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
		}
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
						icon={UserCheck}
						required
						name='firstName'
						onChange={onChangeHandler}
						value={data.firstName}
						type='text'
						maxLength={20}
						placeholder={placeOrderData.firstName}
						errorMess={errorMessage.firstName}
					/>
					<Input
						icon={UserPlus}
						required
						name='lastName'
						onChange={onChangeHandler}
						value={data.lastName}
						type='text'
						maxLength={30}
						placeholder={placeOrderData.lastName}
						errorMess={errorMessage.lastName}
					/>
				</div>
				<Input
					icon={Mail}
					required
					name='email'
					onChange={onChangeHandler}
					onKeyDown={handleKeyDownLockWhitespace}
					onBlur={handleEmailBlur}
					value={data.email}
					type='email'
					maxLength={45}
					placeholder={placeOrderData.email}
					errorMess={errorMessage.email}
				/>
				<div className='multiFiled'>
					<Input
						icon={Milestone}
						required
						name='street'
						onChange={onChangeHandler}
						value={data.street}
						type='text'
						maxLength={45}
						placeholder={placeOrderData.street}
						errorMess={errorMessage.street}
					/>
					<Input
						icon={MapPinHouse}
						required
						name='numberStreet'
						onChange={onChangeHandler}
						value={data.numberStreet}
						type='text'
						maxLength={10}
						placeholder={placeOrderData.numberStreet}
						errorMess={errorMessage.numberStreet}
					/>
				</div>
				<div className='multiFiled'>
					<Input
						icon={TowerControl}
						required
						name='city'
						onChange={onChangeHandler}
						value={data.city}
						type='text'
						maxLength={40} //Wólka Sokołowska k. Wólki Niedźwiedzkiej
						placeholder={placeOrderData.city}
						errorMess={errorMessage.city}
					/>
					<Input
						icon={LandPlot}
						required
						name='zipCode'
						onChange={onChangeHandler}
						onKeyDown={(e) => handleKeyDown(e)}
						value={data.zipCode}
						type='text'
						maxLength={7}
						placeholder={placeOrderData.zipCode}
						errorMess={errorMessage.zipCode}
					/>
				</div>
				<Input
					icon={PhoneCall}
					required
					name='phone'
					onChange={onChangeHandler}
					value={data.phone}
					type='text'
					maxLength={10}
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
