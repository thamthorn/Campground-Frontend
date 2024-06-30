'use client'
import { useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation';


function Banner() {

  //state
  const [img, setImg] = useState(0)

  const router = useRouter();
  
  const imgList = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg'];



  return (
    <div className='block p-5 m-0 w-full h-[80vh] relative'
    onClick={() => setImg(img+1)}>
      <Image src={imgList[img % 4]}
      alt='cover'
      fill={true}
      objectFit='cover'
      style={{opacity: 0.6}}/>

      <div>
      <h1 className='relative top-12 text-3xl text-center font-semibold font-mono text-black'>Campground Service Center</h1>

      </div>

      
      <div className='relative top-12 z-20 text-center m-10'>
        <h3 className='text-xl font serif text-black'>Escape the city and embrace nature at our Campground.</h3>
        
      </div>


      <button className='bg-white text-black-600 border border-black-500 text-5xl
      font-semibold py-2 px-2 m-2 rounded-lg z-20 absolute bottom-0 right-0 hover:bg-teal-900 hover:text-white hover:border-transparent text-black'
      onClick={(e) => {e.stopPropagation(); router.push('/campground')}}>Book Now!!</button>
      

      
    </div>
  )
}

export default Banner
