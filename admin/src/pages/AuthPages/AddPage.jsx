import React, { useState } from 'react'
import ItemCard from '@/components/ItemCard/ItemCard'

import SearchBox from '@/components/SearchBox/SearchBox'
import './AuthPages.css'
import CategoryCard from '../../components/ItemCard/CategoryCard';
import CategoryList from '../../components/CategoryList/CategoryList';

const AddPage = () => {

  const [edit, setEdit] = useState(false)

	const handleEdit = (e) => {
		setEdit(!edit);

	};
  return (
    <div className='addPage'>
      <div>
      <ItemCard handleEdit={handleEdit} edit={edit} setEdit={setEdit}/>
      <div>
      <CategoryCard handleEdit={handleEdit} edit={!edit} setEdit={setEdit}/>
      <CategoryList />
      </div>
      </div>
      <SearchBox />
    </div>
  )
}

export default AddPage