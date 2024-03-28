'use client'
import RegisterForm from "@/components/RegisterForm";
import userRegister from "@/libs/userRegister";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



function page() {
    
    return (
    <div className='h-[90vh] w-full'>
        <RegisterForm />
    </div>
    )
}

export default page
