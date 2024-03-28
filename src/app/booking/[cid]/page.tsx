'use client'
import DateReserve from '@/components/DateReserve'
import React, { useEffect, useState } from 'react'
import { Select, TextField } from '@mui/material'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import getUserProfile from '@/libs/getUserProfile'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useSearchParams } from 'next/navigation'
import dayjs, { Dayjs } from 'dayjs'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import config from '@/utils/config'
import { addBooking } from '@/redux/features/bookSlice'
import getCampgrounds from '@/libs/getCampgrounds'
import { CampgroundItem } from '../../../../interface'
import { BookingItem } from '../../../../interface'
import { useRouter } from 'next/navigation'
import getCampground from '@/libs/getCampground'
import axios from 'axios'
import {FormControl} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function page({params}:{params:{cid:string}}) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [name, setName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [citizenId, setCitizenId] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [campground, setCampground] = useState<CampgroundItem>({
    _id: '',
    name: '',
    address: '',
    tel: '',
    price:0,
    rating:0,
    picture: '',
    __v: 0,
    id:''});

    
    useEffect(() => {
      setLoading(true)
      fetchData();
  }, []);

  const fetchData = async () => {
    try {
        //const response: CampgroundJson = await getCampground(params.cid);
        const campgroundDetail = await getCampground(params.cid);
        setCampground(campgroundDetail.data);
        setLoading(false)
    } catch (err) {
        console.log("Error: ", err);
    }
  };

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
  };
  // const dispatch = useDispatch<AppDispatch>()

  const handleBooking = async () => {
    try{
      if(date){
        const formattedDate: string = date.toISOString();
        const payload = {
          bookDate : formattedDate
        };
        const response = await axios.post(`${config.api}/campgrounds/${params.cid}/bookings`,payload, config.headers());

        if(response.data.success){
          router.push("/mybooking")
        }
        else{
          throw new Error(response.data.message)
        }
      }
      else{
        throw new Error("Please select a date.");
      }
    }
    catch(error:any){
      if(error.response.data.message === "Not authorize to access this route"){
        setTimeout(() => {
          router.push("/signin")
        }, 500)
      }
      else{
        
      }
    }
  }

  // const makeBooking = () => {
  //   if(name && lastName && citizenId && campground && date) {
  //     const item: BookingItem = {
  //       name: name,
  //       surname: lastName,
  //       id: citizenId,
  //       campground: campground,
  //       bookDate: dayjs(date).format("YYYY/MM/DD")
  //     }

  //     dispatch(addBooking(item))
  //     alert('booking complete')
  //   }
    
  // }
  

  // const session = await getServerSession(authOptions);
  // if(!session || !session.user.token) return null

  // const profile = await getUserProfile(session.user.token)
  // var createAt = new Date(profile.data.createdAt);

  
  
  return (
    <main className='w-[100%] flex flex-col items-center space-y-4 m-16'>
      <div className='text-xl font-medium'>
        Campground Booking
      </div>
      {/* <div className='bg-slate-100 rounded-lg'>
      <div className='text-2xl text-center'>{profile.data.name}</div>
      <table className='table-auto border-separate border-spacing-2'>
        <tbody>
        <tr><td>Email</td><td>{profile.data.email}</td></tr>
        <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
        <tr><td>Member Since</td><td>{createAt.toString()}</td></tr>
        </tbody>
      </table>

      </div> */}
      <div>
        <h3 className='text-[18px] text-gray-500'>{campground.name}</h3>
        <div className="text-[16px]  mt-12">{campground.address}</div>
        <div className='text-[16px]  mb-12'>{campground.tel}</div>
        
      </div>

      <form className='card-body'>
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={date} onChange={handleDateChange}/>
          </LocalizationProvider>
        </FormControl>
        <div className="form-control mt-6">
          <button className="hover:bg-gray-400 hover:text-white text-gray-400 py-1 px-4 border border-gray-400" type="button" onClick={handleBooking}>Confirm</button>
        </div>
      </form>
      
      {/* <DateReserve onChangeDate={(value: Dayjs) => { setDate(value) } } onChangeCampground={(value: string) => { setCampground(value) } }/>
      
      <button className='block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
      shodow-sm text-white' name='Book Vaccine'
      onClick={makeBooking}>Book Campground</button> */}
    </main>
  )
}

export default page


