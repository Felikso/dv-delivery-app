import React, {  useEffect, useState } from 'react';
import './MyOrders.css';

import {
	userOrdersUrl,
	myOrdersData,
	currency,
} from '@/utils/variables.jsx';
import { assets } from '@/assets/assets.js';
import axios from 'axios';
import Button from '@/components/Button/Button.jsx';
import toast from 'react-hot-toast';
import NetworkErrorText from '@/components/NetworkErrorText/NetworkErrorText.jsx';
import CodeVerifikator from '@/components/CodeVeryfikator/CodeVerifikator.jsx';
import { useAuthStore } from '@/store/authStore.js';

const MyOrders = () => {

	const { isAuthenticated, error, isLoading, beUrl, netErr, user } = useAuthStore();

	const [data, setData] = useState([]);
	const [codeId, setCodeId] = useState(['', '', '', '', '', '']);

	const fetchOrders = async () => {
		const response = await axios.post(
			beUrl + userOrdersUrl,
			{ codeId: codeId.join(""),
				userId: userOrdersUrl._id
			 },
		);
		
		setData(response.data.data);

		toast.success(myOrdersData.refreshInfo);
	};

	//const dateStr = "2024-11-05T11:02:04.941+00:00";
	const convertDate = (dateStr) => {
		const date = new Date(dateStr);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
		const year = date.getFullYear();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
		return formattedDate;
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		const verificationCode = codeId.join("");
		fetchOrders(verificationCode);

	};


	useEffect(() => {
		
		//if (isAuthenticated) {
			fetchOrders();
		//}
		if (codeId.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [codeId]);
	let btn = 0;
	let countBtn = 2; // the number by which the button will change color


	return (
		<div className='myOrders'>
			{netErr && <NetworkErrorText />}

			{!data?.length ? (
				<CodeVerifikator
					handleSubmit={handleSubmit}
					title={'wprowadź kod z maila, żeby potwierdzić złożone zamówienie'}
					isLoading={isLoading}
					error={error}
					code={codeId}
					setCode={setCodeId}
				/>
			) : (
				<>
					<h2>{myOrdersData.title}</h2>
					<h4>
						{myOrdersData.quantity}: {data.length}
					</h4>
					<div className='container'>
						<div className={`myOrdersOrder ${scroll ? '' : 'fixedNav'}`}>
							<b>{myOrdersData.iconTitle}</b>
							<b>{myOrdersData.orderTitle}</b>
							<b>{myOrdersData.priceTitle}</b>
							<b>{myOrdersData.quantityTitle}</b>
							<b>{myOrdersData.statusTitle}</b>
							<b>{myOrdersData.refreshTitle}</b>
						</div>
						{data.map((item, i) => {
							if (btn > countBtn - 2) {
								btn = 0;
							} else {
								btn++;
							}
							return (
								<div key={i} className='myOrdersOrder'>
									<img src={assets.parcel_icon} alt='' className='myOrderImg' />
									<p>
										{item.items.map((it, x) => {
											if (x === item.items.length - 1) {
												return it.name + ' x ' + it.quantity;
											} else {
												return it.name + ' x ' + it.quantity + ', ';
											}
										})}
									</p>
									<span>
										{item.amount.toFixed(2)} {currency}
										<br/>
										<br/>
										{item.rabat > 0 ? '( -' + Math.floor(item.rabat * 100) + '% )' : ''}
									</span>
									<span>{item.items.length}</span>
									<div>
										<p className='myOrdersDate'>{convertDate(item.date)}</p>
										<p>
											<b>{item.status}</b>
										</p>
									</div>
									<Button
										allHeightWidth={'80px'}
										icon={assets.refresh_icon}
										color={btn}
										onClick={fetchOrders}
									/>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default MyOrders;
