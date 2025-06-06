'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Homepage() {
    const router = useRouter();

    const goToLogin = () => {
        router.push('/pages/login');
    };

    const goToSignup = () => {
        router.push('/pages/signup');
    }

    const checkIfUserIsLoggedIn = async() => {
        const userSessionString:any = sessionStorage.getItem('user');
        if(!userSessionString) return;
        const userSession = JSON.parse(userSessionString);
        console.log(userSession);
        const response = await fetch('/api/checkIfLoggedIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userSession.user_id,
            })
        })
    
        const result = await response.json();
        if(result.success){
            router.push('/pages/dashboard');
        }
    };
          
    useEffect(() => {
        checkIfUserIsLoggedIn();
    },[]);
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center'>
            <img className='w-[75%] h-[75%] sm:w-[28%] sm:h-[28%] mb-2' src="/server_sense.png" alt="" />
            <h1 className='text-xs sm:text-sm text-center w-[75%] sm:w-[30%] text-gray-500'>IoT-based monitoring is no longer the future, it’s the standard. With real-time data at your fingertips, you can track, analyze, and respond instantly to critical changes. Join us today and experience the power of smart, connected monitoring like never before!</h1>
            <div className='w-full h-full flex justify-center gap-1 items-center mt-5'>
                <button onClick={goToLogin} className='w-[9rem] sm:w-[12rem] border-[2px] border-blue-600 rounded-2xl px-1 sm:py-2 py-1 font-bold text-blue-600 hover:cursor-pointer hover:bg-blue-600 hover:text-black transition-all'>Login</button>
                <button onClick={goToSignup} className='w-[9rem] sm:w-[12rem] border-[2px] border-green-600 rounded-2xl px-1 sm:py-2 py-1 font-bold text-green-600 hover:cursor-pointer hover:bg-green-600 hover:text-black transition-all'>Signup</button>
            </div>
        </div>
    </div>
  )
}
