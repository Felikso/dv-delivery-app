import React, { useState, useEffect } from 'react';
import './Item.css';
import { assets } from '@/assets/assets';
import { currency, customInfo } from '@/utils/variables';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';

const Item = ({ item, time }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setTimeout(() => setMounted(true), time);
	});
	const [itemQuantity, setItemQuantity] = useState(0);
	const { _id, name, image, description, price } = item;

	const { addItemToCart, cartItems, decreaseQuantity } = useCartStore();

	const onDecreaseQuantity = async (itemId, userId) => {
		await decreaseQuantity(item._id);
		toast.error(customInfo.itemRemoved);
	};

	const onAddToCart = async (itemId, userId) => {
		await addItemToCart(item);
		toast.success(`${item.name} już w koszyku!`);
	};

	useEffect(() => {
		const iq =
			JSON.stringify(cartItems) === '{}'
				? { quantity: 0 }
				: cartItems.filter((item) => item._id === _id);
		setItemQuantity(iq[0]?.quantity);
	}, [cartItems]);

	return (
		mounted && <div className='item FIAnim'>
			<div className='itemImageContainer FIAnim'>
				<img
					src={import.meta.env.VITE_BACKEND_URL + '/images/' + image}
					alt={name}
					className='itemImage'
												height='200'
							width='300'
				/>
				{!itemQuantity ? (
					<div className='animatedIcons'>
						<img
							className='add'
							onClick={onAddToCart}
							src={assets.add_icon_white}
							alt='dodaj'
							height='35'
							width='35'
						/>
					</div>
				) : (
					<div className='itemCounter FIAnim'>
						<img
							onClick={onDecreaseQuantity}
							src={assets.remove_icon_red}
							alt='usuń'
														height='35'
							width='35'
						/>
						<p>{itemQuantity}</p>

						<img
							onClick={onAddToCart}
							src={assets.add_icon_green}
							alt='dodaj'
														height='35'
							width='35'
						/>
					</div>
				)}
			</div>
			<div className='itemInfo FIAnim'>
				<div className='itemNameRating'>
					<p>{name}</p>
					<img src={assets.rating_stars} alt='ocena' 							height='12'
							width='70' />
				</div>
				<p className='itemDesc'>{description}</p>
				<p className='itemPrice'>
					{price} {currency}
				</p>
			</div>
		</div>
	);
};

export default Item;
