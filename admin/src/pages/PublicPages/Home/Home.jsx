import React, { useState, useEffect, useRef, Suspense } from 'react'
import './Home.css'
import Header from '@/components/Header/Header'
//import ExploreMain from '@/components/ExploreMain/ExplorerMain'
import ItemsDisplay from '@/components/ItemsDisplay/ItemsDisplay'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/components/ErrorBoundary/ErrorBoundary'
const ExploreMain = React.lazy(()=>import('@/components/ExploreMain/ExplorerMain'))

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
    

    useEffect( () => { 
      if(!menuRef.current) return
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
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => navigate('/')}
          >
        <Suspense fallback={<div>loading...</div>}>
        <ExploreMain category={category} setCategory={setCategory} menuRef={menuRef}/>
        </Suspense>
        </ErrorBoundary>
        <ItemsDisplay category={category} />
        <AppDownload contactRef={contactRef}/>
    
    </>
  )
}

export default Home