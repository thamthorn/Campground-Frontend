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
            <MenuItem value={'16:00-16:30'}>16:00-16:30</MenuItem>
            <MenuItem value={'16:30-17:00'}>16:30-17:00</MenuItem>
            <MenuItem value={'17:00-17:30'}>17:00-17:30</MenuItem>
            <MenuItem value={'17:00-17:30'}>17:30-18:00</MenuItem>
            <MenuItem value={'17:00-17:30'}>18:00-18:30</MenuItem>
            <MenuItem value={'17:00-17:30'}>18:30-19:00</MenuItem>
             
        </Select>

    </div>
  )
}

export default DateReserve