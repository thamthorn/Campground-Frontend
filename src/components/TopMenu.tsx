'use client'
import { useRouter } from 'next/navigation';
import TopmenuItem from './TopmenuItem'
import styles from './topmenu.module.css'
import Image from 'next/image'
// import { Link } from '@mui/material'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '@/utils/config';


function TopMenu() {
  const router = useRouter()

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Update isLoggedIn based on token presence
    }, []);

    const handleSignOut = () => {

      Swal.fire({
          title: "Log Out Confirmation",
          text: "Are you sure to log out ?",
          showCancelButton: true,
          confirmButtonText: "Logout",
          cancelButtonText: "Cancel"
      }).then(async (result) => {
          if (result.isConfirmed) {
              const response = await axios.get(`${config.api}/auth/logout`)
              console.log(response)
              if (response.data.success === true) {

                  if (typeof window !== 'undefined') {
                      // clear token from browser
                      localStorage.removeItem('token')
                  }

                  setIsLoggedIn(!isLoggedIn)

                  Swal.fire({
                      title: "Log Out",
                      text: "log out successfully",
                      timer: 1500
                  })

                  router.push('/')
              }
          }
      })
  }
  const handleSignIn = async () => {
      // Sign in logic
      // After successful sign-in:
      router.push('/signin');
  }

  const handleRegister = async () => {
    // Register logic
    router.push('/register');
}
  
  // const profile = await getUserProfile(session.user.token)

  return (
    <div className={styles.menucontainer}>
      <div className='flex flex-row absolute left-0 h-full'>
    {/* {
      session? <Link href="/api/auth/signout"><div className='flex items-center left-0 h-full px-2 
       right-0 text-cyan-600 text-sm'>Sign-Out of {session.user?.user.name}</div></Link>
      :<div className='flex m-2'>
      <Link href="/api/auth/signin"><div className='flex items-center right-0 h-full px-2 left-0 text-cyan-600 text-sm'>Log-in</div></Link>
      <Link href="api/auth/register" className='flex items-center right-0 h-full px-2 left-0 text-cyan-600 text-sm'>Register</Link>
      </div>
      } */}
      {isLoggedIn ? (
                    <button onClick={handleSignOut} className="m-[5px] px-4 py-1 text-gray-500 hover:text-[#059669] text-center text-[12px] md:text-[14px]">
                        Sign Out
                    </button>
                ) : (
                  <div className='flex flex-row justify-center'>
                    <button  onClick={handleSignIn} className="m-[5px] px-4 py-1 text-gray-500 hover:text-[#059669] text-center text-[12px] md:text-[14px]">
                        Sign In
                    </button>
                    <button  onClick={handleRegister} className="m-[5px] px-4 py-1 text-gray-500 hover:text-[#059669] text-center text-[12px] md:text-[14px]">
                        Register
                    </button>
                  </div>
                )}

      <TopmenuItem title='MyBooking' pageRef='/mybooking'/>
      
    </div>

      <TopmenuItem title='Profile' pageRef='/booking/manage' />
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
