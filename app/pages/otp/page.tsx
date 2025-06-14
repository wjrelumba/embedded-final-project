'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Otp() {
    const router = useRouter();
    const [otp, setOtp] = useState<any | string>(null);
    const userMetadataString:any = sessionStorage.getItem('otp_mode');
    const userMetadata = JSON.parse(userMetadataString);

    const inputHandler = (e:any | Event) => {
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
                    userMetadata,
                })
            })

            const result = await response.json();
            console.log(result);
            if(result.username){
                sessionStorage.clear();
                sessionStorage.setItem('user', JSON.stringify(result));
                router.push('/pages/dashboard');
            }
        } 
    }

  return (
    <div className='w-full h-screen flex justify-center items-center p-2'>
        <div className='border-[2px] border-gray-200 rounded-md w-full flex flex-col items-start p-2'>
            <h1 className='mb-5'>Check your email for the OTP</h1>

            <div className='w-full flex gap-2'>
                <label htmlFor="">OTP:</label>
                <input onChange={inputHandler} className='border border-gray-200 rounded-md px-2' type="text" />
                <button onClick={verifyOTP}>Submit</button>
            </div>
        </div>
    </div>
  )
}
