import React, { useEffect, useState } from 'react';
import './AuthPages.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
	url,
	orderStatus,
	urlRemoveOrder,
	ordersTitle,
	myOrdersData,
} from '@/utils/variables.jsx';
import { assets } from '@/assets/assets.js';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import { currency } from '../../utils/variables';

const OrdersPage = () => {


	const [orders, setOrders] = useState([]);

	const fetchAllOrders = async () => {
		const response = await axios.get(url + '/api/order/list');
		if (response.data.success) {
			setOrders(response.data.data);
		} else {
			toast.error('error');
		}
	};

	const statusHandler = async (e, orderId) => {
		const response = await axios.post(url + '/api/order/status', {
			orderId,
			status: e.target.value,
		});
		if (response.data.success) {
			await fetchAllOrders();
		}
	};

	const removeOrder = async (itemId) => {
		const response = await axios.post(`${url}${urlRemoveOrder}`, {
			orderId: itemId,
		});
		await fetchAllOrders();
		if (response.data.success) {
			toast.success(response.data.success);
		} else {
			toast.error(errorMessage);
		}
	};

	useEffect(() => {
		fetchAllOrders();
	}, []);
	return (
		<div className='order add'>
			<h3>{ordersTitle}</h3>
			<div className='orderList'>
				<div className={`orderItem`}>
					<b>{myOrdersData.quantityTitle}</b>
					<b>{myOrdersData.orderTitle}</b>
					<b>{myOrdersData.priceTitle}</b>
					<b>{myOrdersData.purchaserTitle}</b>
					<b>{myOrdersData.addressTitle}</b>
					<b>{myOrdersData.statusTitle}</b>
					<b>{myOrdersData.deleteTitle}</b>
				</div>

				{orders.map((item, i) => (
					<div key={i} className='orderItem'>
						<div className='flexCol orderItemQuantity'>
							<img src={assets.parcel_icon} alt={assets.parcel_icon} />
							<p>{item.items.length}</p>
						</div>

						<p className='orderItemItem'>
							{item.items.map((it, x) => {
								if (x === item.items.length - 1) {
									return it.name + ' x ' + it.quantity;
								} else {
									return it.name + ' x ' + it.quantity + ', ';
								}
							})}
						</p>
						<p className='featuredText'>{item.amount.toFixed(2)} {currency}</p>
						<div>
							<p className='orderItemName'>
								{item.address.firstName + ' ' + item.address.lastName}
							</p>
							<p>
								<a
									href={`tel:${item.address.phone}`}
									className='orderItemPhone featuredText'
								>
									{item.address.phone}
								</a>
							</p>
							<p>
								<a 
									href={`mailto:${item.address.email}`}
									className='orderItemPhone featuredText'
								>
									{item.address.email}
								</a>
							</p>
						</div>

						<div className='orderItemAddress'>
							<p>{item.address.street + ', '}</p>
							<p>{item.address.city}</p>
							<p>{item.address.zipCode}</p>
						</div>

						<CustomSelect
							onChange={(e) => statusHandler(e, item._id)}
							value={item.status}
							options={orderStatus}
						/>

						<img
							className='cross'
							src={assets.rabish_icon}
							alt='usuń'
							onClick={() => removeOrder(item._id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrdersPage;
