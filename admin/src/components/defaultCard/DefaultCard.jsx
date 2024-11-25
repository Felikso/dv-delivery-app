import React, { useState } from 'react';
import './DefaultCard.css';
import { addData, categories, url, urlImg } from '@/utils/variables';
import { assets } from '@/assets/assets';
import { toast } from 'react-toastify';

const DefaultCard = ({ postData, fetchList, add = false, setCurrentEl, edit, updateDefaultItem, removeDefaultItem, setDefaultTrue, allowedImputs }) => {
	const { name, description, price, category, _id, img } = postData
		? postData
		: '';

	const [image, setImage] = useState(false);
	const [data, setData] = useState({
		name: name,
		description: description,
		price: price,
		category: category,
	});

	const onChangeHandler = (e) => {
		/*  e.preventDefault(); */
		const name = e.target.name;
		const value = e.target.value;
		setData((data) => ({ ...data, [name]: value }));
	};

	const handleEdit = (e) => {

		if (setCurrentEl) {
			setCurrentEl(_id);
		}
			setDefaultTrue(!edit);
		
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		if (window.confirm('czy na pewno chcesz edytować ten przedmiot?')) {
			const formData = new FormData();
			{ allowedImputs.includes('name')  && formData.append('name', data.name)};
			{ allowedImputs.includes('description')  && formData.append('description', data.description)};
			{ allowedImputs.includes('price')  && formData.append('price', Number(data.price))};
			{ allowedImputs.includes('category')  && formData.append('category', data.category)};
			{ allowedImputs.includes('image')  && formData.append('image', image)};
			{ _id && formData.append('id', _id)};
			
			const response = await updateDefaultItem(_id, formData);

			if (response.data.success) {
				if (!add) {
					await fetchList();
					setCurrentEl(false);
				} else {
					setData({
						name: '',
						description: '',
						price: '',
						category: categories[0],
					});
					setImage(false);
				}
				setDefaultTrue(false);
				toast.success(response.data.message);
			} else {
				toast.error(response.data.message);
			}
		}
	};

	const removeItem = async (itemId) => {
		const response = await removeDefaultItem(itemId);
		console.log(response);
		console.log(itemId);
		
		

		if (response.data.success) {
			toast.success(response.data.success);
		} else {
			toast.error(response.data.message);
		}
		await fetchList();
	};

	let allowEdit = edit ? 'allowEdit' : '';
	let disabled = edit ? '' : 'disabled';
	let imageId = edit ? 'image' : '';

	let placeholderImage = postData?.image
		? `${url}${urlImg}${postData.image}`
		: img
		? `${url}${urlImg}${postData.image}`
		: assets.upload_area;

	return (
		<form onSubmit={onSubmitHandler} className={`addForm ${allowEdit}`}>
			{!edit && (
				<p
					onClick={(e) => {
						if (window.confirm('na pewno chcesz usunąć przedmiot?')) {
							removeItem(_id);
							e.target.parentElement.classList.add('hidden');
						}
					}}
					className='itemDelete'
				>
					x
				</p>
			)}
			<div className='addDataBox'>
			{ allowedImputs.includes('image') &&<><div className={`addImgUpload flexCol ${disabled}`}>
					<p>{edit && (img ? 'zmień' : addData.addPhoto)}</p>
					<label htmlFor='image'>
						<img
							src={image ? URL.createObjectURL(image) : placeholderImage}
							alt={assets.upload_area}
						/>
					</label>
					<input
						className={`${disabled}`}
						onChange={(e) => setImage(e.target.files[0])}
						type='file'
						id={imageId}
						hidden
					/>
				</div></>}

				<div className='addData'>
					<div className='addItemName flexCol'>
					{ allowedImputs.includes('name') &&<><p>{addData.itemName}</p>
						<input
							className={`${disabled} input`}
							onChange={onChangeHandler}
							value={data.name}
							type='text'
							name='name'
							placeholder={addData.typeItemName}
						/></>}

						<p>{addData.itemDesc}</p>
						{ allowedImputs.includes('description') &&<><textarea
							className={`${disabled} input`}
							onChange={(e) => onChangeHandler(e)}
							value={data.description}
							name='description'
							rows='3'
							placeholder={addData.typeItemDesc}
						></textarea></>}
					</div>

					<div className='addCatPrice'>
					{ allowedImputs.includes('category') &&<><div className='addCat flexCol'>
							<p>{addData.itemCat}</p>
							<select
								className={`${disabled} input`}
								onChange={onChangeHandler}
								value={data.category}
								name='category'
							>
								{categories.map((item, i) => (
									<option key={i} value={item.replace(' ', '-')}>
										{item}
									</option>
								))}
							</select>
						</div></>}
						{ allowedImputs.includes('price') &&<><div className='addPrice flexCol'>
							<p>{addData.itemPrice}</p>
							<input
								className={`${disabled} input`}
								onChange={onChangeHandler}
								value={data.price}
								type='number'
								name='price'
								placeholder={addData.typeItemPrice}
							/>
						</div></>}
						{!(edit == 'unique') ? (
							<>
								<button onClick={handleEdit} className='addBtn' type='button'>
									{edit ? addData.breakEdit : addData.editBtn}
								</button>
							</>
						) : (
							<div></div>
						)}
						<button className={`addBtn ${disabled}`} type='submit'>
							{edit
								? edit == 'unique'
									? addData.addBtn
									: addData.acceptEdit
								: addData.addBtn}
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default DefaultCard;
