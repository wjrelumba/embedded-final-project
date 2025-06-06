'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Otp() {
    const router = useRouter();
    const [otp, setOtp] = useState<any>(null);

    const inputHandler = (e:any) => {
        const {value} = e.target;
        setOtp(value);
    };

    const verifyOTP = async() => {
        if(otp){
            const response = await fetch('/api/verifyOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    otpValue: otp,
                })
            })

            const result = await response.json();
            console.log(result);
            if(result.success){
                router.push('/pages/dashboard');
            }
        } 
    }

  return (
    <div className='w-full h-screen flex justify-center items-center p-2'>
        <div className='border-[2px] border-gray-200 rounded-md w-full flex flex-col items-center'>
            <h1>Check your email for the OTP</h1>

            <div className='w-full flex p-2 justify-center gap-2'>
                <label htmlFor="">OTP:</label>
                <input onChange={inputHandler} className='border border-gray-200 rounded-md' type="text" />
            </div>

            <button onClick={verifyOTP}>Submit</button>
        </div>
    </div>
  )
}
