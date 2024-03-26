import { getServerSession } from 'next-auth'
import TopmenuItem from './TopmenuItem'
import styles from './topmenu.module.css'
import Image from 'next/image'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import { Link } from '@mui/material'
import Link from 'next/link';
import getUserProfile from '@/libs/getUserProfile'

async function TopMenu() {

  const session = await getServerSession(authOptions);
  console.log(session)

  // const profile = await getUserProfile(session.user.token)

  return (
    <div className={styles.menucontainer}>
      <div className='flex flex-row absolute left-0 h-full'>
    {
      session? <Link href="/api/auth/signout"><div className='flex items-center left-0 h-full px-2 
       right-0 text-cyan-600 text-sm'>Sign-Out of {session.user?.user.name}</div></Link>
      :<Link href="/api/auth/signin"><div className='flex items-center right-0 h-full px-2 left-0 text-cyan-600 text-sm'>Sign-in</div></Link>
      }
      <TopmenuItem title='MyBooking' pageRef='/mybooking'/>
      
    </div>

      <TopmenuItem title='Booking' pageRef='/booking' />
      <Link href={'/'}>
      <Image src={'/img/campgroundLogo.jpg'}
      className={styles.logoimg}
      alt='logo'
      width={0}
      height={0}
      sizes='10vh'/>
      </Link>
    </div>
  )
}

export default TopMenu
