import React, { useState, useRef, useEffect } from 'react'
import ItemCard from '@/components/ItemCard/ItemCard'

import SearchBox from '@/components/SearchBox/SearchBox'
import './AuthPages.css'
import CategoryCard from '../../components/ItemCard/CategoryCard';
import CategoryList from '../../components/CategoryList/CategoryList';
import { useAdminStore } from '../../store/adminStore';

const AddPage = () => {

  const { imgState, setImgState } = useAdminStore();

	const [edit, setEdit] = useState(0);


  useEffect(()=>{
    console.log(imgState);
    
  },[imgState])
  



  return (
    <div className='addPage'>
      <div >
      <ItemCard  edit={imgState.item} setEdit={setEdit} add={true} />
      <div>
      <CategoryCard  edit={imgState.cat} setEdit={setEdit} add={true}/>
      <CategoryList />
      </div>
      </div>
      <SearchBox />
    </div>
  )
}

export default AddPage