'use client'
import userRegister from "@/libs/userRegister"
import { FormEvent, useState } from "react";
function Register() {
    

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        let formData = new FormData(event.currentTarget)
        // console.log(formData)
        // let jsonObject = {};
        // for (let [key, value] of formData.entries()) {
        //     jsonObject[key] = value;
        // }

        // console.log(jsonObject);
        const response = await userRegister(formData)
     
        // Handle response if necessary
        const data = await response.json()
        console.log(data);
        // ...
      }

    

    return (

    <div className="flex flex-col justify-center items-center h-screen">
    <h1 className="mt-14 text-4xl font-bold">Register User</h1>
    <form className="mt-8 w-full max-w-md" onSubmit={onSubmit}>
        <div className="flex items-center justify-between my-2">
            <label className="w-1/3 text-right text-gray-700" htmlFor="Campname">Name</label>
            <input type="text" required id="name" name="name" placeholder="Name" className="input-field border-2 border-gray-200 rounded-sm" 
            />
        </div>

        <div className="flex items-center justify-between my-2">
            <label className="w-1/3 text-right text-gray-700 " htmlFor="address">Email</label>
            <input type="text" required id="email" name="email" placeholder="Email" className="input-field border-2 border-gray-200 rounded-sm" 
            />
        </div>

        <div className="flex items-center justify-between my-2">
            <label className="w-1/3 text-right text-gray-700" htmlFor="tel">Tel</label>
            <input type="text" required id="tel" name="tel" placeholder="Telephone Number" className="input-field border-2 border-gray-200 rounded-sm" 
            />
        </div>

        <div className="flex items-center justify-between my-2">
            <label className="w-1/3 text-right text-gray-700" htmlFor="price">Password</label>
            <input type="string" required id="price" name="password" placeholder="Password" className="input-field border-2 border-gray-200 rounded-sm"
            />
        </div>


        <div className="flex flex-row justify-center">
        <button className="rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 mt-4 text-white items-center" type="submit">Register</button>

        </div>
    </form>
</div>

  )
}

export default Register
