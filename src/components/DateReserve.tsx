'use client'
import { LocalizationProvider } from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {Select, MenuItem} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import SelectMenuItem from './SelectMenuItem'

function DateReserve({onChangeDate, onChangeCampground}: {onChangeDate: Function, onChangeCampground: Function}) {

  const [date, setDate] = useState<Dayjs | null>(null)
  const [campground, setCampground] = useState('');
  
  


  return (
    <div className='bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5
    flex flex-row justify-center'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className='bg-white' 
            value={date}
            onChange={(value) => {setDate(value) ; onChangeDate(value)}}/>
        </LocalizationProvider>
        <Select variant='standard' 
            id='campground' className='w-2/4 h-[2em]'
            value={campground}
            onChange={(e) => {setCampground(e.target.value) ; onChangeCampground(e.target.value)}}>
            {/* <MenuItem value={'Chula'}>Chulalongkorn Hospital</MenuItem>
            <MenuItem value={'Rajavithi'}>Rajavithi Hospital</MenuItem>
            <MenuItem value={'Thammasat'}>Thammasat University Hospital</MenuItem>
             */}
             <SelectMenuItem/>
        </Select>
      
    </div>
  )
}

export default DateReserve
