import React from 'react'
import './ExploreMain.css'
import { main_list } from '@/assets/assets' 

import { allCategoriesName, itemsMainData } from '@/utils/variables'


const ExploreMain = ({category, setCategory, menuRef}) => {

/*   if(Math.random() > 0.5){
    return new Error('Test error boundary')
  } */
  return (
    <div className='exploreMain' id='exploreMain' ref={menuRef}>
      <h1>{itemsMainData.h1}</h1>
      <p className='exploreMainList'>{itemsMainData.p}</p>
      <div className='exploreMainList'>
        {
          main_list.map((item, i)=>(
            <div
            onClick={()=>setCategory(prev=>prev===item.main_name?allCategoriesName:item.main_name)} 
            key={i} 
            className='exploreMainListItem'>
              <img
              className={category===item.main_name?'active':''} 
              src={item.main_image} 
              alt={item.main_name} 
              loading='lazy'
              width='100'
              height='100'
              />
              <p>{item.main_name}</p>
            </div>
          ))
        }
      </div>
      <hr />
    </div>
  )
}

export default ExploreMain