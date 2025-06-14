'use client';
import checkAccessLevel from '@/app/Functions/AccessLevelChecker';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const [accessLevel, setAccessLevel] = useState<any>(1);

    const goToHistory = () => {
        router.push('/pages/dashboard/logs');
    };

    const goToReadings = () => {
        router.push('/pages/dashboard');
    };

    const signOut = () => {
        sessionStorage.clear();
        router.push('/pages/homepage');
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
                setAccessLevel(checkAccessLevel());
            }
    }, []);
  return (
    <aside className="hidden sm:block sm:w-64 bg-gray-800 p-4 shadow-md">
        <div className="text-2xl mb-4"><span className='font-bold'>Server</span>Sense</div>
        <div className='w-full h-full flex flex-col gap-2'>
            <div
                onClick={goToReadings}
                className={`relative overflow-hidden transition-all w-full flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer ${
                pathname === '/pages/dashboard' ? 'text-black' : 'text-white'
                }`}
            >
                {pathname === '/pages/dashboard' && <div className="slide-in-bg" />}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-activity relative z-10"
                >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <button className="text-xs relative z-10">Readings</button>
            </div>

            {accessLevel == 2 && (
                <div
                    onClick={goToHistory}
                    className={`relative overflow-hidden transition-all w-full flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer ${
                    pathname === '/pages/dashboard/logs' ? 'text-black' : 'text-white'
                    }`}
                >
                    {pathname === '/pages/dashboard/logs' && <div className="slide-in-bg" />}
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-archive relative z-10"
                    >
                    <polyline points="21 8 21 21 3 21 3 8"></polyline>
                    <rect x="1" y="3" width="22" height="5"></rect>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                    </svg>
                    <button className="text-xs relative z-10">Reading Logs</button>
                </div>
            )}
            
            <div onClick={signOut} className='w-full flex items-center gap-1 px-2 py-1 hover:bg-red-700 transition-all rounded-full hover:cursor-pointer'>
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="feather feather-power"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                <button className="text-xs relative z-10">Log Out</button>
            </div>  
        </div>
        <h1 className='bottom-1 absolute text-xs text-gray-400'>&copy; AMACE, 2025</h1>
    </aside>
  )
}
