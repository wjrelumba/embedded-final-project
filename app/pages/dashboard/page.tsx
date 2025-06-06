'use client';
import GeneralSensorCard from '@/app/components/Gauges/GeneralSensorCard';
import React, { useEffect, useState } from 'react'

export default function Dashboard() {
    const [dataReadings, setDataReadings] = useState<any[]>([]);
    const [startMonitoring, setStartMonitoring] = useState<boolean>(false);

    const fetchDataFromApi = async() => {
        const response = await fetch('/api/fetchData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            console.log(response);
            const result = await response.json();

            console.log(result);
            setDataReadings(result);
    };

    const startMonitoringFunc = () => {
        setStartMonitoring(!startMonitoring);
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (startMonitoring) {
            // Immediately fetch once
            fetchDataFromApi();

            // Start polling
            intervalId = setInterval(() => {
            fetchDataFromApi();
            }, 5000);
        }

        // Cleanup on stop or unmount
        return () => {
            if (intervalId !== null) {
            clearInterval(intervalId);
            }
        };
    }, [startMonitoring]);

  return (
    <div className='w-full h-screen flex flex-col items-center px-2'>
        {/* <div className='w-full flex flex-col items-center'>
            <h1 className='text-xl'>Readings</h1>
        </div> */}
        
        {dataReadings ? (
            <div className='w-full flex flex-col p-2'>
                {dataReadings && dataReadings.length > 0 ? (
                    <div>
                        <GeneralSensorCard readingValues={
                            {
                                temperature: dataReadings[0].temp_value,
                                humidity: dataReadings[0].humid_value,
                                smoke_gas: dataReadings[0].smoke_gas_value,
                            }
                        }/>
                    </div>
                ) : (
                    <div>
                        <GeneralSensorCard readingValues={
                            {
                                temperature: 0,
                                humidity: 0,
                                smoke_gas: 0,
                            }
                        }/>
                    </div>
                )}
                
                <div className='w-full sm:ml-[7rem]'>
                    <button className={`${startMonitoring ? 'border-[2px] border-red-600' : 'border-[2px] border-green-600'} px-2 py-1 rounded-2xl w-full sm:w-1/4`} onClick={startMonitoringFunc}>{startMonitoring ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pause w-full text-center"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play w-full text-center"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    }</button>
                </div>
                
            </div>
        ) : (
            <>
            </>
        )}
    </div>
  )
}
