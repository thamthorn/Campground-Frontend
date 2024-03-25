import CardPanel from '@/components/CardPanel';
import HospitalCatalog from '@/components/HospitalCatalog';
import getHospitals from '@/libs/getHospitals';
import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';


function page() {
  
  const hospitals = getHospitals();

  return (
    <main>
      <h1 className='text-center text-4xl p-10'>Select your hospitals</h1>
      {/* <CardPanel /> */}
      <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
        <HospitalCatalog hospitalsJson={hospitals} />

      </Suspense>
    </main>
  )
}

export default page
