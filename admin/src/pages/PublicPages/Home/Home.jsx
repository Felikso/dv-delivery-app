import React, { useState, useEffect, useRef } from 'react'
import './Home.css'
import Header from '@/components/Header/Header'
import ExploreMain from '@/components/ExploreMain/ExplorerMain'
import ItemsDisplay from '@/components/ItemsDisplay/ItemsDisplay'

import { allCategoriesName } from '@/utils/variables'
import AppDownload from '@/components/AppDownload/AppDownload'
import { useLocation } from 'react-router-dom'

const Home = () => {

    const [category, setCategory] = useState(allCategoriesName);
    const menuRef = useRef(null);
    const contactRef =useRef(null);
    const location = useLocation()

    
    useEffect(() => {
  
      // Other location checking and authority enforcing functions here
    }, [location]);
    
    /**
     * Check for a hash link in the React Router location and search children for a matching id
     */
 

 /*    useEffect( () => {
      // If `scrollToRef` points to an element, then scroll it into view.
      if( scrollToRef.current ) {
          // Get the height of the fixed nav bar.
          const navbarHeight = '80';//navbarRef.current.getBoundingClientRect().height;
          // Calculate the distance to be scrolled.
          const scrollPosY = scrollToRef.current.getBoundingClientRect().top - navbarHeight;
          // scroll away!
          window.scrollTo( 0, scrollPosY );            
      }
  }, []); */


    useEffect( () => { 
      if(!menuRef.current) return
      // If `scrollToRef` points to an element, then scroll it into view.
      if( location.hash =='#exploreMain' && menuRef.current.getBoundingClientRect() ) {
        console.log(menuRef);
        const scrollPosY = 600;
         menuRef.current.scrollIntoView()
         window.scrollTo( 0, scrollPosY )
        }
  }, [location]);

  return (
    <>
        <Header />
        <ExploreMain category={category} setCategory={setCategory} menuRef={menuRef}/>
        <ItemsDisplay category={category} />
        <AppDownload contactRef={contactRef}/>
    
    </>
  )
}

export default Home