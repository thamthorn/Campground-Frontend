'use client'
import userRegister from "@/libs/userRegister";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



function page() {
    const router = useRouter()

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [tel, setTel] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    

    const onSubmit = async () => {
        if (name && email && tel && password) {
            const userRegisterJson = JSON.parse(JSON.stringify({name: name, email: email, tel: tel, password: password}))
            const res = await userRegister(userRegisterJson, Role.User);
                
                if (res.success) {
                    router.push("/")
                } else {
                    alert("Failed to register")
                }

        } else alert("Please fill in all fields")
    }

    

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
        <button className="rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 mt-4 text-white items-center" onClick={onSubmit}>Register</button>

        </div>
    </div>
        
    {/* </form> */}
    <h2  className="mt-5 text-sm text-center">If you already have account <Link href={"/api/auth/signin"} className="text-blue-600">Sign In</Link></h2>
</div>

  )
}

export default page
