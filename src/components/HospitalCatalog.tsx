import Link from 'next/link'
import React from 'react'
import Card from './Card'

async function HospitalCatalog({hospitalsJson} : {hospitalsJson: Promise<HospitalJson>}) {

  const hospitalJsonReady = await hospitalsJson;

  return (
    <>
    <h3 className='text-center'>Explore {hospitalJsonReady.count} hospitals in our list</h3>
    {/* Explore {hospitalJsonReady.count} hospitals in our list */}
    <div style={{margin: '20px', display: 'flex',
    flexDirection: 'row', alignContent: 'space-around',justifyContent: 'space-around', flexWrap: 'wrap', padding: '10px'}}>
    {
      hospitalJsonReady.data.map((hospital: HospitalItem) => (
        <Link href={`/hospital/${hospital.id}`} className='w-1/5' key={hospital.id}>
          <div>
          <Card hospitalName={hospital.name} imgSrc={hospital.picture}/>

          </div>
        </Link>
      ))
    }
    </div>
    </>
  )
}

export default HospitalCatalog
