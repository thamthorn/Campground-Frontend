import React from 'react'
import Image from 'next/image'
import getCampground from '@/libs/getCampground';
import CardPanel from '@/components/CardPanel';
import Link from 'next/link';
import { Rating } from '@mui/material';


async function campgroundDetailPage({params} : {params: {cid: string}}) {

    // const hospitalMap = new Map();
    // hospitalMap.set('001', {name: 'Chulalongkorn Hospital', image: '/img/chula.jpg'})
    // hospitalMap.set('002', {name: 'Rajavithi Hospital', image: '/img/rajavithi.jpg'})
    // hospitalMap.set('003', {name: 'Thammasat University Hospital', image: '/img/thammasat.jpg'})

    const campgroundDetail = await getCampground(params.cid);

  return (
    <main className='text-center p-5 m-12'>
        <h1 className='text-lg font-medium'>{campgroundDetail.data.name}</h1>
        <div className='flex flex-row my-5'>
            <Image src={campgroundDetail.data.picture}
            alt='campgroundlPic'
            width={0}
            height={0}
            sizes='100vh'
            className='rounded-lg w-[30%] bg-black'/>
            <div className='flex flex-col justify-evenly text-md mx-5 text-left'>
              <div className='text-black font-bold'>{'Address: ' + campgroundDetail.data.address}</div>
              <div className='text-black'>{'Price: ' + campgroundDetail.data.price}</div>
              <div className='text-black'>{'Tel.No: ' + campgroundDetail.data.tel}</div>
              <Rating className='my-1' name="read-only" value={parseInt(campgroundDetail.data.rating.toString())} readOnly />

              <Link href={`/booking/${params.cid}`}>
                <button className='block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                shodow-sm text-white' name='Book Campground'>Book Campground</button>
            </Link>
            </div>

        
        </div>

        
    </main>
  )
}

export default campgroundDetailPage
