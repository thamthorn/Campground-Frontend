'use client'
import { removeBooking } from "@/redux/features/bookSlice"
import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
//name
//lastname
//citizen id
//hospital
//date

//if(noBooking) -> show 'No Vaccine Booking'
//add delete Button to delete from redux store

function BookingList() {
    const bookItems = useAppSelector((state: { bookSlice: { bookItems: any } }) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()
  return (
    <>
    {
        bookItems.length == 0 ? <h1 className="text-center m-16">No Booking</h1>
        : bookItems.map((bookItem:any) => (
            <div className="bg-slate-200 rounded px-8 mx-5 py-5 my-2" key={bookItem.id}>
                <div className="text-xl m-2">{bookItem.name +' '+ bookItem.surname}</div>
                <div className="text-md m-1">{bookItem.id}</div>
                <div className="text-sm m-1">{'Time: '+ bookItem.campground}</div>
                <div className="text-sm m-1">{'Booked at: '+ bookItem.bookDate}</div>
                <button className='block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
      shodow-sm text-white' name='Book Vaccine'
      onClick={() => dispatch(removeBooking(bookItem.id))}>Remove Booking</button>
            </div>
        ))
    }
    </>
  )
}

export default BookingList
