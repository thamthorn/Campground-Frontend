"use client"

import config from '../utils/config';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

function RegisterForm() {
    const router = useRouter()

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [tel, setTel] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
        const payload = { 
            name,
            tel,
            email,
            password,
            role: "user"
        };

      // Send a POST request to the server to handle signup
      const response = await axios.post(`${config.api}/auth/register`, payload);
      
      if (response.data.success === true) {
        Swal.fire({
          title: 'Sign Up',
          text: 'Sign up successful.',
          timer: 2000
        });
        // Optionally redirect the user after successful signup
        setTimeout(() => {
            router.push('/api/auth/signin')
        }, 1000)
      } else {
        throw new Error("Sign Up failed.");
      }
    } catch (error:any) {
      Swal.fire({
        title: "Sign Up Error",
        text: error.response ? error.response.data.message : "An error occurred",
        timer: 2000
      });
      console.error("Sign Up Error:", error);
    }
  };

  return (
<div className="flex flex-col justify-center items-center h-screen">
    <h1 className="mt-14 text-4xl font-bold">Register User</h1>
    {/* <form className="mt-8 w-full max-w-md" onSubmit={onSubmit}> */}
    <div className="mt-8 w-full max-w-md">
        <div className="flex items-center justify-between my-2">
            <label className="w-1/3 text-right text-gray-700" htmlFor="Campname">Name</label>
            <input type="text" required id="name" name="name" placeholder="Name" className="input-field border-2 border-gray-200 rounded-sm" 
            onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className="flex items-center justify-between my-2">
            <label className="w-1/3 text-right text-gray-700 " htmlFor="address">Email</label>
            <input type="email" required id="email" name="email" placeholder="Email" className="input-field border-2 border-gray-200 rounded-sm" 
            onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className="flex items-center justify-between my-2">
            <label className="w-1/3 text-right text-gray-700" htmlFor="tel">Tel</label>
            <input type="text" required id="tel" name="tel" placeholder="Telephone Number" className="input-field border-2 border-gray-200 rounded-sm" 
            onChange={(e) => setTel(e.target.value)}/>
        </div>

        <div className="flex items-center justify-between my-2">
            <label className="w-1/3 text-right text-gray-700" htmlFor="price">Password</label>
            <input type="string" required id="price" name="password" placeholder="Password" className="input-field border-2 border-gray-200 rounded-sm"
            onChange={(e) => setPassword(e.target.value)}/>
        </div>


        <div className="flex flex-row justify-center">
        <button className="rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 mt-4 text-white items-center" onClick={handleSubmit}>Register</button>

        </div>
    </div>
        
    {/* </form> */}
    <h2  className="mt-5 text-sm text-center">If you already have account <Link href={"/api/auth/signin"} className="text-blue-600">Sign In</Link></h2>
</div>
  );
}

export default RegisterForm;
