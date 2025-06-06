'use client';
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Header() {
    const pathname = usePathname();

    const getNameForPath = () => {
        if(pathname == '/pages/dashboard'){
            return 'Sensor Readings'
        }
        if(pathname == '/pages/dashboard/logs'){
            return 'Reading Logs'
        }
    }
  return (
    <div className='w-full h-[3rem]'>
        <div className='w-full h-full flex justify-center items-center sm:bg-gray-800'>
            <h1 className='text-xl text-white'>{getNameForPath()}</h1>
        </div>
    </div>
  )
}
