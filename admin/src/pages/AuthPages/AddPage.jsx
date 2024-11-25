import React, { useEffect } from 'react'
import SearchBox from '@/components/SearchBox/SearchBox'
import './AuthPages.css'
import CategoryList from '../../components/CategoryList/CategoryList';
import DefaultCard from '../../components/defaultCard/DefaultCard';
import { useAuthStore } from '@/store/authStore.js';
import { useAdminStore } from '../../store/adminStore';

const AddPage = () => {

  const { imgState } = useAdminStore();

	const { setItemTrue, setCatTrue, updateCategory, removeCategory, updateItem, removeItem } = useAdminStore();


  return (
    <div className='addPage'>
      <div >
      <DefaultCard  edit={imgState.item} add={true} updateDefaultItem={updateItem} removeDefaultItem={removeItem} setDefaultTrue={setItemTrue} allowedImputs={['name','description','category','price','image']} />
      <div>
      <DefaultCard  edit={imgState.cat}  add={true} updateDefaultItem={updateCategory} removeDefaultItem={removeCategory} setDefaultTrue={setCatTrue} allowedImputs={['name','image']}/>
      <CategoryList />
      </div>
      </div>
      <SearchBox />
    </div>
  )
}

export default AddPage