import React, { useState, useRef, useEffect } from 'react'
import ItemCard from '@/components/ItemCard/ItemCard'

import SearchBox from '@/components/SearchBox/SearchBox'
import './AuthPages.css'
import CategoryCard from '../../components/ItemCard/CategoryCard';
import CategoryList from '../../components/CategoryList/CategoryList';

const AddPage = () => {

	const [edit, setEdit] = useState(false);
  


  const [imgState, setImgState] = useState({
    item: false,
    card: false,
    items: false
  })

  const delateFocus = (e) =>{
    console.log(e);
    setImgState({
      item: false,
      card: false,
      items: false
    })
    
  }

  return (
    <div className='addPage'>
      <div >
      <ItemCard delateFocus={delateFocus} edit={imgState.item} setImgState={setImgState} setEdit={setEdit} />
      <div>
      <CategoryCard   delateFocus={delateFocus} edit={imgState.card} setImgState={setImgState}  setEdit={setEdit}/>
      <CategoryList />
      </div>
      </div>
      <SearchBox />
    </div>
  )
}

export default AddPage