"use client"

import React, { useEffect, useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl} from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '@/utils/config';
import { useRouter } from 'next/navigation';
import getCampground from '@/libs/getCampground';
import { CampgroundItem } from '../../../../interface';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Image from 'next/image';
import Loading from '@/components/Loading';


function BookingPage({params}:{params:{cid:string}}) {
    const [loading, setLoading] = useState<boolean>(true)
    const [campground, setCampground] = useState<CampgroundItem>({
      _id: "",
      name: "",
      address: "",
      tel: "",
      price: 0,
      rating: 0,
      picture: ""
    });

    const [date, setDate] = useState<Date | null>(null);

    const router = useRouter()

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

    const handleBooking = async () => {
        try {
            if (date) {
                const formattedDate: string = date.toISOString();
                const payload = {
                    apptDate: formattedDate
                };

                const response = await axios.post(`${config.api}/campgrounds/${params.cid}/booking`,payload, config.headers());

                if (response.data.success) {
                    Swal.fire({
                        title: "Confirmed",
                        text: "Booked successfully",
                        timer: 2000
                    });

                    router.push("/mybooking")
                } else {
                    throw new Error(response.data.message);
                }
            } else {
                throw new Error("Please select a date.");
            }
        } catch (error: any) {
            if (error.response.data.message === "Not authorize to access this route") {
                Swal.fire({
                    title: "Authorized failed",
                    text: "Please login before booking a campground",
                    timer: 2000
                })

                setTimeout(() => {
                    router.push("/signin")
                }, 500)
            } else {
                Swal.fire({
                    title: "Error",
                    text: error.response.data.message,
                    timer: 2000
                });
            }
        }
    };

    return (
        <>
        {
            loading?(
                <Loading/>
            ):(
                <div className='bg-white mt-[10vh] justify-between items-center p-0 m-0 w-screen h-[90vh]'>
                <div className="flex flex-col md:flex-row px-12">
                    <Image src={campground.picture} alt="Campground Image" width={0} height={0} sizes="100vw" className="w-full h-[30vh] md:w-[30%] md:h-auto"></Image>

                <div className="md:w-[70%] md:h-auto text-gray-400 pt-[5%] md:px-5 text-left">
                    <p className='text-[36px] md:text-[48px] pt-6 text-gray-600'>Book Your Rest</p>

                                
                            <div>
                                <h2 className='text-[18px] text-gray-500'>{campground.name}</h2>
                                <div className="text-[16px]  mt-12">{'Adress: '+campground.address}</div>
                                {/* <div className="text-[16px] "><LocalPostOfficeIcon/> {campground.postalcode}</div> */}
                                <div className="text-[16px]"><LocalPhoneIcon/> {campground.tel}</div>
                                <div className="text-[16px]"> {campground.price.toString()}</div>
                                <div className="text-[16px]"> {campground.rating.toString()}</div>

                            </div>
                        
                            <form className="card-body">
                                <FormControl>
                                    <label className="label">
                                    <span className='label-text text-[16px]'>Book Date</span>
                                    </label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            value={date}
                                            onChange={handleDateChange}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                                <div className="form-control mt-6">
                                    <button className="hover:bg-gray-400 hover:text-white text-gray-400 py-1 px-4 border border-gray-400" type="button" onClick={handleBooking}>Confirm</button>
                                </div>
                            </form>            
                        </div>
                    </div>
                </div>
            )
        }
        </>
       
            
    );
}

export default BookingPage;