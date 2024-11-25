import React, { useState } from 'react';
import './ItemCard.css';
import {
	addData,
	url,
	urlImg,
} from '@/utils/variables';
import { assets } from '@/assets/assets';
import { toast } from 'react-toastify';
import { useAdminStore } from '@/store/adminStore.js';

const CategoryCard = ({ postData, add = false, edit,  setCurrentEl }) => {
	const { name, img, _id } = postData
		? postData
		: '';

	const { removeCategory, fetchCategoryList, updateCategory } = useAdminStore();
	const { imgState, setCatTrue } = useAdminStore();
	
	const [image, setImage] = useState(false);
	const [data, setData] = useState({
		name: name,
	});

	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setData((data) => ({ ...data, [name]: value }));
	};

	const handleEdit = (e) => {
        if(setCurrentEl){
			setCurrentEl(_id)
		}else{
            setCatTrue(!edit)
        }

	
	};


	const onSubmitHandler = async (e) => {
		e.preventDefault();

		if (window.confirm('czy na pewno chcesz edytować ten przedmiot?')) {


			const formData = new FormData();
			formData.append('name', data.name);
			formData.append('image', image);
			if (_id) {
				formData.append('id', _id);
			}
			const response = await updateCategory(_id, formData);
            console.log(response);
            

			if (response.data.success) {
				if (!add) {
					await fetchCategoryList();

				} else {
					setData({
						name: '',
					});
					setImage(false);
                    await fetchCategoryList();
				}
				setCatTrue(false);
				toast.success(response.data.message);
			} else {
				toast.error(response.data.message);
			}
		}
	};

	const removeCat = async (categoryId) => {
		const response = await removeCategory(categoryId);
        console.log(categoryId);
        console.log(response);
        
        

		if (response.data.success) {
			toast.success(response.data.message);
		} else {
			toast.error(response.data.message);
		}
		await fetchCategoryList();
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
			{!edit&&<p
				onClick={(e) => {
					if (window.confirm('na pewno chcesz usunąć przedmiot?')) {
						removeCat(_id);
						e.target.parentElement.classList.add('hidden');
					}
				}}
				className='itemDelete'
			>
				x
			</p>}
			<div className='addDataBox'>
				<div 			className={`addImgUpload flexCol ${disabled}`}>
					<p>{edit&&(img ? 'zmień' : addData.addPhoto)}</p>
					<label htmlFor='image'>
						<img
							src={image ? URL.createObjectURL(image) : placeholderImage}
							alt={assets.upload_area}
						/>
					</label>
					<input
						className={`${disabled}`}
						onChange={(e) => (
							setImage(e.target.files[0])
						)}
						type='file'
						id={imageId}
						hidden
					/>
				</div>

				<div className='addData'>
					<div className='addItemName flexCol'>
						<p>{addData.itemName}</p>
						<input
							className={`${disabled} input`}
							onChange={onChangeHandler}
							value={data.name}
							type='text'
							name='name'
							placeholder={addData.typeItemName}
						/>
					</div>
  
            {!(edit=='unique')?<>
              <button onClick={handleEdit} className='addBtn' type='button'>
							{edit?addData.breakEdit:addData.editBtn}
						</button>
            </>:<div></div>}
            <button className={`addBtn ${disabled}`} type='submit'>
            {edit?((edit=='unique')?addData.addBtn:addData.acceptEdit):addData.addBtn}
						</button>

					</div>
				</div>
			
		</form>
	);
};

export default CategoryCard;
