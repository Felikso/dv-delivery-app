import React, { useState, useRef, useEffect } from 'react'
import ItemCard from '@/components/ItemCard/ItemCard'

import SearchBox from '@/components/SearchBox/SearchBox'
import './AuthPages.css'
import CategoryCard from '../../components/ItemCard/CategoryCard';
import CategoryList from '../../components/CategoryList/CategoryList';

import DefaultCard from '../../components/defaultCard/DefaultCard';

import { useAuthStore } from '@/store/authStore.js';
import { useAdminStore } from '../../store/adminStore';

const AddPage = () => {

  const { imgState, setImgState } = useAdminStore();

  useEffect(()=>{
    console.log(imgState);
    
  },[imgState])
  
	const { removeAuthItem, updateAuthItem } = useAuthStore();

	const {  setItemTrue, setCatTrue, updateCategory, removeCategory,  } = useAdminStore();


  return (
    <div className='addPage'>
      <div >
      <DefaultCard  edit={imgState.item} add={true} updateDefaultItem={updateAuthItem} removeDefaultItem={removeAuthItem} setDefaultTrue={setItemTrue} allowedImputs={['name','description','category','price','image']} />
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