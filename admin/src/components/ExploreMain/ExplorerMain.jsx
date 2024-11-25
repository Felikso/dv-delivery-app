import React, { useEffect, useState } from 'react'
import './ExploreMain.css'
import { main_list } from '@/assets/assets' 

import { allCategoriesName, itemsMainData } from '@/utils/variables'
import { useItemStore } from '../../store/itemStore'


const ExploreMain = ({category, setCategory}) => {

/*   if(Math.random() > 0.5){
    return new Error('Test error boundary')
  } */
    const [list, setList] = useState([]);

    const { fetchCategoryList } = useItemStore();
  
  
    const fetchList = async () => {
      const response = await fetchCategoryList();
      if (response.data.success) {
        setList(response.data.data.reverse());
      } else {
        toast.error(errorMessage);
      }
    };
  
    useEffect(() => {
      fetchList();
    }, []);

  return (
    <div className='exploreMain' id='exploreMain'>
      <h1>{itemsMainData.h1}</h1>
      <p className='exploreMainList'>{itemsMainData.p}</p>
      <div className='exploreMainList'>
        {
          list.map((item, i)=>(
            <div
            onClick={()=>setCategory(prev=>prev===item.name?allCategoriesName:item.name)} 
            key={i} 
            className='exploreMainListItem'>
              <img
              className={category===item.name?'active':''} 
              src={import.meta.env.VITE_BACKEND_URL + '/images/' + item.image}
              alt={item.name} 
              loading='lazy'
              width='100'
              height='100'
              />
              <p>{item.name}</p>
            </div>
          ))
        }
      </div>
      <hr />
    </div>
  )
}

export default ExploreMain