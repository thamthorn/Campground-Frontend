'use client'
import BookingList from "@/components/BookingList"
import config from '@/utils/config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookingItem , UserRole , BookingListJSON , UserJSON,DeleteJSON} from "../../../interface";
import { fetchData } from "next-auth/client/_utils";

function page() {
  const [bookingList, setBookingList] = useState<BookingItem[]>([{
    _id: '',
    apptdate: '',
    user:{
      _id: '',
      name: ''
    },
    campground:{
      _id: '',
      name: '',
      address: '',
      tel: '',
      id: '',
    },
    createdAt:'',
    __v: ''
  }]);

  const [user, setUser] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter();

  useEffect(() => {
    setLoading(true)
    fetchData()
    fetchUserRole()
  },[]);

  const fetchData = async () => {
    try{
      const response = await axios.get<BookingListJSON>(`${config.api}/booking`, config.headers());
      console.log(response.data)
      if (response.data.success === true) {
        setBookingList(response.data.data);
        setLoading(false)
      }
    }
    catch (err:any){
      console.log(err.message);
    }
  };

  const fetchUserRole = async () => {
    try{
      const response = await axios.get<UserJSON>(`${config.api}/auth/me`, config.headers());
      if (response.data.success === true) {
        setUser(response.data.data.role)
        setLoading(false)

      } else {
        throw new Error(response.data.message)
      }
    }
    catch(err:any) {
      if(err.message==="Request failed with status code 401"){
        console.log(err.message)

        setTimeout(() => {
          router.push("/signin")
        }, 1000)
      }
      else{
        router.push("/")
      }
      console.log(err.message)
    
    }





    // return (
    //   <main className="m-16">
    //       <BookingList></BookingList>
    //   </main>
    // )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { month: '2-digit' as const, day: '2-digit' as const, year: 'numeric' as const };
    return date.toLocaleDateString(undefined, options);
  };

  const handleDelete = async (bid: string) => {
    const confirmed = confirm("Are you sure to delete this booking?");
    if (confirmed) {
      try {
        const response = await axios.delete<DeleteJSON>(`${config.api}/bookings/${bid}`, config.headers());
        if (response.data.success === true) {
          // Delete target item from array bookingList
          setBookingList(prevList => prevList.filter(item => item._id !== bid));
        }
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return(
    <>
      <div className='container mx-auto lg:w-1/2 min-h-screen px-10 lg:px-0 pt-10'>
        <h2 className='text-center text-gray-600 text-[36px] md:text-[48px] py-4'>All Booking History</h2>

        {
          bookingList.length === 0 ? (
            <div className="border border-gray-200 p-4 px-8 mt-4  hover:bg-gray-100  bg-white block text-left">
              <p className='font-semibold mt-1'>Booking in history is empty.</p>
              <button className="hover:bg-gray-400 hover:text-white text-gray-400 my-2 py-1 px-4 border border-gray-400" onClick={(e)=>{e.stopPropagation; router.push("/campground")}}>make new booking</button>
            </div>
          ) : ''
        }

{bookingList.map((booking) => (
              <div key={booking._id} className="border border-gray-200 p-4 px-8 mt-4  hover:bg-gray-100  bg-white block text-left">
                <h2 className='text-gray-600 text-lg'>{booking.user.name}</h2>
                
                
                <p className='text-gray-400 my-2'>
                  {formatDate(booking.apptdate)}
                </p>

              
            

                <button className="hover:bg-gray-400 hover:text-white text-gray-400 m-2 py-1 px-4 border border-gray-400"
                  onClick={() => handleDelete(booking._id)}
                >Delete</button>
              </div>
            ))}
      </div>
      
      

    </>
  )
  


}

export default page
