'use client'
import { useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


function Banner() {

  //state
  const [img, setImg] = useState(0)

  const router = useRouter();
  
  const imgList = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg'];

  const {data: session} = useSession()

  console.log(session?.user.token);

  return (
    <div className={styles.banner}
    onClick={() => setImg(img+1)}>
      <Image src={imgList[img % 4]}
      alt='cover'
      fill={true}
      objectFit='cover'
      style={{opacity: 0.6}}/>

      <div>
      <h1 className={styles.headerText}>Campground Service Center</h1>

      </div>

      
      <div className={styles.bannerText}>
        <h1 className='text-4xl font-medium'>About us</h1>
        <h3 className='text-xl font serif'>Escape the city and embrace nature at our Campground.</h3>
        
      </div>
      {
        session? <div className='z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl'>
          Welcome {session.user?.name}
        </div>:null
      }

      <button className='bg-white text-black-600 border border-black-500 text-5xl
      font-semibold py-2 px-2 m-2 rounded-lg z-30 absolute bottom-0 right-0 hover:bg-teal-900 hover:text-white hover:border-transparent'
      onClick={(e) => {e.stopPropagation(); router.push('/hospital')}}>Book Now!!</button>

      
    </div>
  )
}

export default Banner
