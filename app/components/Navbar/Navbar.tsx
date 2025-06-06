'use client';
import checkAccessLevel from '@/app/Functions/AccessLevelChecker';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const accessLevel = checkAccessLevel();

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

  return (
    <div className={`${accessLevel && accessLevel == 2 ? 'w-full sm:w-1/4' : 'w-1/2'} h-[3.5rem] mt-2 p-2 sticky bottom-0 sm:hidden`}>
      <div className="bg-gradient-to-r from-gray-800 to-blue-900 rounded-full h-full relative">
        <div className={"w-full flex h-full items-center px-2 transition-all relative gap-1"}>
          <div
            onClick={goToReadings}
            className={`relative overflow-hidden transition-all ${accessLevel && accessLevel == 2 ? 'w-1/2' : 'w-full'} flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer ${
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
            {pathname === '/pages/dashboard' && (
              <button className="text-xs relative z-10">Readings</button>
            )}
          </div>

            {accessLevel == 2 && (
              <div
                onClick={goToHistory}
                className={`relative overflow-hidden transition-all w-1/2 flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer ${
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
                {pathname === '/pages/dashboard/logs' && (
                  <button className="text-xs relative z-10">Reading Logs</button>
                )}
              </div>
            )}
          <div onClick={signOut} className='w-[2rem]'>
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
            className="feather feather-power bg-red-600 rounded-full p-1 h-full w-full"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
