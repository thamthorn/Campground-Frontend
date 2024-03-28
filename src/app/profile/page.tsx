"use client";
import { useEffect, useState } from "react";
import getUserProfile from "../../libs/getUserProfile";
import { UserJSON } from "../../../interface";
import axios from "axios";
import Swal from "sweetalert2";
import config from "@/utils/config";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<UserJSON | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get<UserJSON>(
        `${config.api}/auth/me`,
        config.headers()
      );
      if (response.data.success === true) {
        setUser(response.data);
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

  return (
    <main>
      {user ? (
        <div className="fixed inset-0 flex justify-center items-center bg-white">
          <div className="p-6 bg-[#F7F6BB] rounded-lg shadow-md text-lg hover:shadow-lg transition duration-300 w-full max-w-xl">
            <h1 className="text-3xl font-semibold mb-4">Your Profile</h1>
            <div className="border-b border-gray-200 mb-4"></div>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Name:</span> {user.data.name}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span> {user.data.email}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Tel:</span> {user.data.tel}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Role:</span> {user.data.role}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </main>
  );
}
