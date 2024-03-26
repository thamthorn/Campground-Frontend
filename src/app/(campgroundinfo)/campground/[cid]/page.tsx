import React from 'react'
import Image from 'next/image'
import getHospital from '@/libs/getCampground';
import CardPanel from '@/components/CardPanel';
import Link from 'next/link';


async function hospitalDetailPage({params} : {params: {hid: string}}) {

    // const hospitalMap = new Map();
    // hospitalMap.set('001', {name: 'Chulalongkorn Hospital', image: '/img/chula.jpg'})
    // hospitalMap.set('002', {name: 'Rajavithi Hospital', image: '/img/rajavithi.jpg'})
    // hospitalMap.set('003', {name: 'Thammasat University Hospital', image: '/img/thammasat.jpg'})

    const hospitalDetail = await getHospital(params.hid);

  return (
    <main className='text-center p-5'>
        <h1 className='text-lg font-medium'>{hospitalDetail.data.name}</h1>
        <div className='flex flex-row my-5'>
            <Image src={hospitalDetail.data.picture}
            alt='hospitalPic'
            width={0}
            height={0}
            sizes='100vh'
            className='rounded-lg w-[30%] bg-black'/>
            <div className='flex flex-col justify-evenly text-md mx-5 text-left'>
              <div>{'Address: ' + hospitalDetail.data.address + ', ' + hospitalDetail.data.district + ', ' + hospitalDetail.data.province}</div>
              <div>{'Postalcode: ' + hospitalDetail.data.postalcode}</div>
              <div>{'Tel.No: ' + hospitalDetail.data.tel}</div>
            </div>

            {/* <Link href={`reservation?id=${params.hid}&name=${hospitalDetail.data.name}`}>
            <button className='block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
      shodow-sm text-white' name='Book Vaccine'>Book Vaccine</button>
            </Link> */}
        </div>

        
    </main>
  )
}

export default hospitalDetailPage
