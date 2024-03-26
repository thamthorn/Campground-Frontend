import CardPanel from '@/components/CardPanel';
import CampgroundCatalog from '@/components/CampgroundCatalog';
import getCampgrounds from '@/libs/getCampgrounds';
import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';


function page() {
  
  const campgrounds = getCampgrounds();

  return (
    <main>
      <h1 className='text-center text-4xl p-10'>Select your campgrounds</h1>
      {/* <CardPanel /> */}
      <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
        <CampgroundCatalog campgroundsJson={campgrounds} />

      </Suspense>
    </main>
  )
}

export default page
