'use client'
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



function page() {
    
    return (
    <div className='h-[90vh] w-full bg-white'>
        <RegisterForm />
    </div>
    )
}

export default page
