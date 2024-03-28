"use client";

import config from "@/utils/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  BookingItem,
  UserRole,
  BookingListJSON,
  UserJSON,
  DeleteJSON,
} from "../../../interface";
import Loading from "@/components/Loading";

function MyBookingPage() {
  const [bookingList, setBookingList] = useState<BookingItem[]>([
    {
      _id: "",
      apptDate: "",
      user: {
        _id: "",
        name: "",
      },
      campground: {
        _id: "",
        name: "",
        address: "",
        tel: "",
        rating: 0,
        price: 0,
      },
    },
  ]);
  const [user, setUser] = useState<UserRole>(Object);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchUserRole();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<BookingListJSON>(
        `${config.api}/booking`,
        config.headers()
      );
      if (response.data.success === true) {
        setBookingList(response.data.data);
        setLoading(false);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const fetchUserRole = async () => {
    try {
      const response = await axios.get<UserJSON>(
        `${config.api}/auth/me`,
        config.headers()
      );
      if (response.data.success === true) {
        setUser(response.data.data);
        setLoading(false);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err: any) {
      if (err.message === "Request failed with status code 401") {
        Swal.fire({
          title: "Authorized failed",
          text: "Please login before booking a campground",
          timer: 2000,
        });

        setTimeout(() => {
          router.push("/signin");
        }, 500);
      } else {
        Swal.fire({
          title: "Error",
          text: err.message,
          timer: 2000,
        });
        router.push("/");
      }
      console.log(err.message);
    }
  };

  // Function to format the booking date to show only the date part
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = {
      month: "2-digit" as const,
      day: "2-digit" as const,
      year: "numeric" as const,
    };
    return date.toLocaleDateString(undefined, options);
  };

  const handleEditClick = (bid: string, cid: string) => {
    Swal.fire({
      title: "Edit Confirmation",
      text: "Are you sure to edit this booking",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Edit",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const response = await axios.delete<DeleteJSON>(
            `${config.api}/booking/${bid}`,
            config.headers()
          );
          if (response.data.success === true) {
            // Swal.fire({
            //   title: "Deleted Booking",
            //   text: "Booking has been deleted.",
            //   timer: 2000
            // })

            // delete target item from array bookingList
            setBookingList((prevList) =>
              prevList.filter((item) => item._id !== bid)
            );
            router.push(`/booking/${cid}`);
          }
        } catch (err) {
          Swal.fire({
            title: "Edit Error",
            text: `edut failed: ${err}`,
            timer: 2000,
          });
        }
      }
    });
  };

  const handleDelete = (bid: string) => {
    Swal.fire({
      title: "Delete Confirmation",
      text: "Are you sure to delete this booking",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const response = await axios.delete<DeleteJSON>(
            `${config.api}/booking/${bid}`,
            config.headers()
          );
          if (response.data.success === true) {
            Swal.fire({
              title: "Deleted Booking",
              text: "Booking has been deleted.",
              timer: 2000,
            });

            // delete target item from array bookingList
            setBookingList((prevList) =>
              prevList.filter((item) => item._id !== bid)
            );
          }
        } catch (err) {
          Swal.fire({
            title: "Deleting Error",
            text: `delete failed: ${err}`,
            timer: 2000,
          });
        }
      }
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-[90vh] w-full mt-[10vh]">
          <div className="container mx-auto lg:w-1/2 min-h-screen px-10 lg:px-0 pt-10">
            <p className="text-center text-gray-600 text-[36px] md:text-[48px] py-4">
              All Booking History
            </p>

            {bookingList.length === 0 ? (
              <div className="border border-gray-200 p-4 px-8 mt-4  hover:bg-gray-100  bg-white block text-left">
                <p className="font-semibold mt-1">
                  Booking in history is empty.
                </p>
                <button
                  className="hover:bg-gray-400 hover:text-white text-gray-400 my-2 py-1 px-4 border border-gray-400"
                  onClick={(e) => {
                    e.stopPropagation;
                    router.push("/campground");
                  }}
                >
                  make new booking
                </button>
              </div>
            ) : (
              ""
            )}

            {bookingList.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-row border border-yellow-300 p-4 px-8 mt-4 hover:bg-red-50 bg-white rounded-lg"
              >
                <div className="w-1/2 pr-4">
                  <h2 className="text-gray-600 text-lg font-semibold">
                    {booking.campground.name}
                  </h2>
                  <p className="text-gray-500 my-2">
                    <LocationOnIcon className="inline-block text-yellow-400 mr-2" />{" "}
                    {booking.campground.address}
                  </p>
                  <p className="text-gray-500 my-2">
                    <LocalPhoneIcon className="inline-block text-green-500 mr-2" />{" "}
                    {booking.campground.tel}
                  </p>
                  <p className="text-gray-500 my-2">
                    <CalendarMonthIcon className="inline-block text-gray-400 mr-2" />{" "}
                    {formatDate(booking.apptDate)}
                  </p>
                  {user.role === "admin" && (
                    <p className="text-gray-700 my-2">
                      <PersonIcon className="inline-block text-blue-400 mr-2" />{" "}
                      {booking.user.name}
                    </p>
                  )}
                </div>
                <div className="w-1/2 flex justify-end items-center">
                  <button
                    className="hover:bg-green-200 hover:text-black text-gray-400 m-2 py-1 px-4 border border-gray-400 rounded-md"
                    onClick={() =>
                      handleEditClick(booking._id, booking.campground._id)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="hover:bg-red-400 hover:text-black text-gray-400 m-2 py-1 px-4 border border-black-400 rounded-md"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MyBookingPage;
