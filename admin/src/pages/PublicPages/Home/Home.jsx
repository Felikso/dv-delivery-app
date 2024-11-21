import React, { useState, useEffect } from 'react'
import './Home.css'
import Header from '@/components/Header/Header'
import ExploreMain from '@/components/ExploreMain/ExplorerMain'
import ItemsDisplay from '@/components/ItemsDisplay/ItemsDisplay'

import { allCategoriesName } from '@/utils/variables'
import AppDownload from '@/components/AppDownload/AppDownload'

const Home = () => {

    const [category, setCategory] = useState(allCategoriesName);
    useEffect(() => {
      scrollToHash();
      // Other location checking and authority enforcing functions here
    }, [location]);
    
    /**
     * Check for a hash link in the React Router location and search children for a matching id
     */
    const scrollToHash = () => {
      if (location.hash) {
      let hash = location.hash.replace('#', '');
      const element = document.getElementById(hash);
      element?.scrollIntoView({
        behavior: 'smooth'
      });
      }
    }
  return (
    <>
        <Header />
        <ExploreMain category={category} setCategory={setCategory} />
        <ItemsDisplay category={category} />
        <AppDownload />
    
    </>
  )
}

export default Home