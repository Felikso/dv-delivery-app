import React, { useState, useEffect } from 'react';
import './Item.css';
import { assets } from '@/assets/assets';
import { currency, customInfo } from '@/utils/variables';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';

const Item = ({ item }) => {
	const [itemQuantity, setItemQuantity] = useState(0);
	const { _id, name, image, description, price } = item; //destructuring of props

	//const token = localStorage.getItem('token')


	const { addItemToCart, cartItems, decreaseQuantity } = useCartStore();

	const onDecreaseQuantity = async (itemId,userId) => {
		await decreaseQuantity(item._id);
		toast.error(customInfo.itemRemoved);
	};
	
	const onAddToCart = async (itemId, userId) => {
		await addItemToCart(item);
		toast.success(`${item.name} już w koszyku!`);
		
	};

	useEffect(() => {
		const iq = JSON.stringify(cartItems) === '{}' ? {quantity:0} : cartItems.filter((item) => item._id === _id);
		setItemQuantity(iq[0]?.quantity);
	}, [cartItems]);

	return (
		<div className='item'>
			<div className='itemImageContainer'>
				<img
					src={ import.meta.env.VITE_BACKEND_URL + '/images/' + image
					}
					alt={name}
					className='itemImage'
				/>
				{!itemQuantity /* !cartItems[_id] with that was error */ ? (
					<div className='animatedIcons'>
						<img
							className='add'
							onClick={onAddToCart}
							src={assets.add_icon_white}
							alt='dodaj'
						/>
					</div>
				) : (
					<div className='itemCounter'>
						<img
							onClick={onDecreaseQuantity}
							src={assets.remove_icon_red}
							alt='usuń'
						/>
						<p>{itemQuantity}</p>

						<img
							onClick={onAddToCart}
							src={assets.add_icon_green}
							alt='dodaj'
						/>
					</div>
				)}
			</div>
			<div className='itemInfo'>
				<div className='itemNameRating'>
					<p>{name}</p>
					<img src={assets.rating_stars} alt='ocena' />
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
