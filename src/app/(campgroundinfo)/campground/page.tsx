'use client'
import CardPanel from '@/components/CardPanel';
import CampgroundCatalog from '@/components/CampgroundCatalog';
import getCampgrounds from '@/libs/getCampgrounds';
import { LinearProgress } from '@mui/material';
import { Suspense, useEffect, useState } from 'react';


function page() {
  const [campgrounds, setCampgrounds] = useState(null);
  const [loading, setLoading] = useState(true);
  
  

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const data = await getCampgrounds();
        setCampgrounds(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campgrounds:', error);
        setLoading(false);
      }
    };

    fetchCampgrounds();
  }, []);

  

  return (
    <main>
      <h1 className='text-center text-4xl p-10 m-12'>Select your campgrounds</h1>
      <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CampgroundCatalog campgroundsJson={campgrounds} />
        )}
      </Suspense>
    </main>
  )
}

export default page
