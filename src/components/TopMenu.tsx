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
import { IconMenu2, IconX } from '@tabler/icons-react';


function TopMenu() {
  const router = useRouter()

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);



    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Update isLoggedIn based on token presence

        const handleResize = () => {
          setIsMobile(window.innerWidth < 768); // Example breakpoint at 768px
        };
    
        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial state
    
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoggedIn]);

    const handleSignOut = () => {

      Swal.fire({
          title: "Log Out Confirmation",
          text: "Are you sure to log out ?",
          showCancelButton: true,
          confirmButtonText: "Logout",
          cancelButtonText: "Cancel"
      }).then(async (result: { isConfirmed: any; }) => {
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
      setMenuOpen(false)
  }

  const handleRegister = async () => {
    // Register logic
    router.push('/register');
    setMenuOpen(false)
}

  const toggleMenu = () => {
    setMenuOpen(true)
  }
  
  // const profile = await getUserProfile(session.user.token)

  return (
    <div className={styles.menucontainer}>
    {
      isMobile ? 
      <div className='flex flex-row absolute left-0 h-full items-center ml-2'
       onClick={toggleMenu}>
        <IconMenu2 stroke={2} color='gray' />
      </div>
      :
      <div className='flex flex-row absolute left-0 h-full'>
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
      <TopmenuItem title='Home' pageRef='/' onClick={() => setMenuOpen(false)}/>
      <TopmenuItem title='MyBooking' pageRef='/mybooking' onClick={() => setMenuOpen(false)}/>
    </div>

    }
      {menuOpen && (
        <div className='fixed inset-0 bg-white z-50 flex flex-col items-center justify-center'>
          <IconX stroke={2} color='gray' style={{position: 'absolute', left: 20, top: 20}} onClick={() => setMenuOpen(false)}/>
          <div>
            {isLoggedIn ? (
                <button onClick={handleSignOut} className="m-[5px] px-4 py-1 text-gray-500 hover:text-[#059669] text-center text-[12px] md:text-[14px]">
                    Sign Out
                </button>
            ) : (
              <div className='flex flex-col justify-center'>
                <button onClick={handleSignIn} className="m-[5px] px-4 py-1 text-gray-500 hover:text-[#059669] text-center text-[12px] md:text-[14px]">
                    Sign In
                </button>
                <button onClick={handleRegister} className="m-[5px] px-4 py-1 text-gray-500 hover:text-[#059669] text-center text-[12px] md:text-[14px]">
                    Register
                </button>
              </div>
            )}
            <div className='flex flex-col gap-3 mt-2'>
            <TopmenuItem title='Home' pageRef='/' onClick={() => setMenuOpen(false)}/>
            <TopmenuItem title='MyBooking' pageRef='/mybooking' onClick={() => setMenuOpen(false)}/>
            </div>
            
          </div>
          
        </div>
      )}
      
      <TopmenuItem title='Profile' pageRef='/profile' onClick={() => setMenuOpen(false)}/>
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
