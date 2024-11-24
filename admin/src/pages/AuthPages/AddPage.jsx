import React, { useState, useRef, useEffect } from 'react'
import ItemCard from '@/components/ItemCard/ItemCard'

import SearchBox from '@/components/SearchBox/SearchBox'
import './AuthPages.css'
import CategoryCard from '../../components/ItemCard/CategoryCard';
import CategoryList from '../../components/CategoryList/CategoryList';

const AddPage = () => {

	const [currentEl, setCurrentEl] = useState('')
  const [add, setAdd] = useState(false)
	const [edit, setEdit] = useState(false);
  const itemRef = useRef(null);
  const ref = useRef(null);

  const handleFocus = (e) =>{
    console.log(e.target);
    
  }

  useEffect(() => {
    const element = itemRef.current;
    console.log(currentEl);
    
    console.log(element); // 👈️ element here
  }, []);
  const element = itemRef.current;
  console.log(element);
	//		setCurrentEl(_id)
  return (
    <div className='addPage'>
      <div >
      <ItemCard ref={itemRef} onClick={handleFocus} edit={edit} setEdit={setEdit} setCurrentEl={setCurrentEl}/>
      <div>
      <CategoryCard  ref={ref} onClick={handleFocus} edit={!edit} setEdit={setEdit} setCurrentEl={setCurrentEl}/>
      <CategoryList />
      </div>
      </div>
      <SearchBox />
    </div>
  )
}

export default AddPage