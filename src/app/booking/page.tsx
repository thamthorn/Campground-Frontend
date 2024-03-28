'use client'
import DateReserve from '@/components/DateReserve'
import React, { useState } from 'react'
import { Select, TextField } from '@mui/material'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import getUserProfile from '@/libs/getUserProfile'

import { useSearchParams } from 'next/navigation'
import dayjs, { Dayjs } from 'dayjs'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'

import { addBooking } from '@/redux/features/bookSlice'
import getCampgrounds from '@/libs/getCampgrounds'
// import { BookingItem } from '../../../interface'


function page() {

  const dispatch = useDispatch<AppDispatch>()

  const makeBooking = () => {
    if(name && lastName && citizenId && campground && date) {
      const item: BookingItem = {
        name: name,
        surname: lastName,
        id: citizenId,
        campground: campground,
        bookDate: dayjs(date).format("YYYY/MM/DD")
      }

      dispatch(addBooking(item))

      setName('');
    setLastName('');
    setCitizenId('');
    setCampground('');
    setDate(null);

    }
    
  }
  

  // const session = await getServerSession(authOptions);
  // if(!session || !session.user.token) return null

  // const profile = await getUserProfile(session.user.token)
  // var createAt = new Date(profile.data.createdAt);

  const [name, setName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [citizenId, setCitizenId] = useState<string | null>(null);
  const [campground, setCampground] = useState<string | null>(null)
  const [date, setDate] = useState<Dayjs | null>(null);

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

      <TextField name='Name' label='Name' variant='standard' onChange={(e) => {setName(e.target.value)}}></TextField>
      <TextField name='Lastname' label='Lastname' variant='standard' onChange={(e) => {setLastName(e.target.value)}}></TextField>
      <TextField name='Citizen ID' label='Campground Name' variant='standard' onChange={(e) => {setCitizenId(e.target.value)}}></TextField>


      <DateReserve onChangeDate={(value: Dayjs) => { setDate(value) } } onChangeCampground={(value: string) => { setCampground(value) } }/>
      
      <button className='block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
      shodow-sm text-white' name='Book Vaccine'
      onClick={makeBooking}>Book Campground</button>
    </main>
  )
}

export default page
