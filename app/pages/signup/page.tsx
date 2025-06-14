'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState<any | string>(null);
    const [username, setUsername] = useState<any | string>(null);
    const [password, setPassword] = useState<any | string>(null);
    const [confPassword, setConfPassword] = useState<any | string>(null);

    const signUp = async() => {
        if(email && username && password && confPassword){
            if(password == confPassword){ // Check if password is equal to confirm password
                const response = await fetch('/api/signUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        username: username,
                        password: password,
                    })
                })

                console.log(response);
                const result = await response.json();
                if(result.error){
                    toast.error(result.error);
                }
                else{
                    sessionStorage.setItem('otp_mode',JSON.stringify(result.user_metadata));
                    router.push('/pages/otp');
                }
                console.log(result);
            }
            else{
                toast.error('Passwords do not match');
            }
        }
    }

    const inputHandler = (e:any | Event) => {
        const {value, name} = e.target;
        switch(name){
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confPassword':
                setConfPassword(value);
                break;
            case 'email':
                setEmail(value);
                break;
        }
    };

    const checkIfUserIsLoggedIn = async() => {
        const userSessionString:any | string = sessionStorage.getItem('user');
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
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='slide-up-fade-in flex flex-col w-full items-center'>
            <img className='w-[50%] h-[50%] sm:w-[20%] border-[3px] border-blue-400 rounded-full' src="/signup.gif" alt="" />
            <div className='flex flex-col items-center p-4'>
                <h1 className='text-2xl mb-2 text-center sm:text-3xl'>Sign Up</h1>
                <h1 className='text-gray-400 text-xs text-center sm:text-sm'>Start monitoring your Environment! Join now!</h1>
            </div>
            <div className='border-[2px] border-green-600 rounded-2xl w-[70%] sm:w-[40%] flex flex-col items-center p-4 mt-2 gap-1'>
                <div className='w-full flex items-center'>
                    <label className='w-[40%]' htmlFor="">Email:</label>
                    <input onChange={inputHandler} name='email' className='border border-gray-200 rounded-2xl w-[60%] px-1 py-2' type="email" />
                </div>
                <div className='w-full flex items-center'>
                    <label className='w-[40%]' htmlFor="">Username:</label>
                    <input onChange={inputHandler} name='username' className='border border-gray-200 rounded-2xl w-[60%] px-1 py-2' type="text" />
                </div>
                <div className='w-full flex items-center'>
                    <label className='w-[40%]' htmlFor="">Password:</label>
                    <input onChange={inputHandler} name='password' className='border border-gray-200 rounded-2xl w-[60%] px-1 py-2' type="password" />
                </div>
                <div className='w-full flex items-center'>
                    <label className='w-[40%]' htmlFor="">Confirm Password:</label>
                    <input onChange={inputHandler} name='confPassword' className='border border-gray-200 rounded-2xl w-[60%] px-1 py-2' type="password" />
                </div>
            </div>
            <button onClick={signUp} className='border-[2px] border-blue-600 rounded-2xl w-[70%] sm:w-[40%] mt-2 py-1 px-2 hover:cursor-pointer'>Create Account</button>
            <Link className='mt-2 border-[2px] border-red-600 rounded-2xl w-[70%] sm:w-[40%] px-2 py-1 text-center' href={'/pages/homepage'}>Cancel</Link>
        </div>
    </div>
  )
}
