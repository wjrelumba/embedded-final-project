'use client';
import React, { useState } from 'react'

export default function History() {
    // Input states
    const [monthSelected, setMonthSelected] = useState<any>(1);
    const [daySelected, setDaySelected] = useState<any>(1);
    const [yearSelected, setYearSelected] = useState<any>(2025);

    const [dataReadings, setDataReadings] = useState<any[]>([]);

    const [shownReadings, setShownReadings] = useState<any[]>([]);

    function formatDateString(isoString: string): string {
        const date = new Date(isoString);

        const monthMap: { [key: number]: string } = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December",
        };

        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        return `${monthMap[month]} ${day}, ${year}`;
    };

    const fetchFilteredData = async() => {
        const response = await fetch('/api/fetchData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                year: yearSelected,
                month: monthSelected,
                day: daySelected,
            })
        })
            const result = await response.json();
            console.log(result);
            setDataReadings(result);
            setShownReadings(result);
    }

    const monthlyOptions = () => (
        <>
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
        </>
    );

    const dayOptions = () => {
        if(monthSelected){
            if(monthSelected == 1 || monthSelected == 3 || monthSelected == 5 || monthSelected == 7 || monthSelected == 8 || monthSelected == 10 || monthSelected == 12){
                return Array.from({length: 31}).map((_, index:number) => (
                    <option key={index} value={index + 1}>{index + 1}</option>
                ))
            }
            else if(monthSelected == 2){
                return Array.from({length: 28}).map((_, index:number) => (
                    <option key={index} value={index + 1}>{index + 1}</option>
                ))
            }
            else {
                return Array.from({length: 30}).map((_, index:number) => (
                    <option key={index} value={index + 1}>{index + 1}</option>
                ))
            }
        }
    }

    const yearOptions = () => (
        <>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
            <option value={2028}>2028</option>
            <option value={2029}>2029</option>
        </>
    );

    const setShownReadingsFunc = (quantity: number) => {
        if(dataReadings){
            if(quantity > 0){
                const tempArray = dataReadings.filter((_, index) => index < quantity);
                setShownReadings(tempArray);
            }
            else{
                setShownReadings(dataReadings);
            }
        };
    };

    const inputHandler = (e:any) => {
      const {value, name} = e.target;

      switch(name){
            case 'monthSelect':
                setMonthSelected(value);
                break;
            case 'daySelect':
                setDaySelected(value);
                break;
            case 'yearSelect':
                setYearSelected(value);
                break;
            case 'quantity':
                setShownReadingsFunc(value);
                break;
      };
  };
  return (
    <div className='w-full h-screen flex flex-col items-center'>
        <img className='w-[30%] sm:w-[15%] rounded-full border-[3px] border-blue-400 mb-2' src="/history.gif" alt="" />

        <div className='w-full flex flex-col items-center sm:flex-row gap-2 sm:justify-center sm:items-center p-2'>

            <div className='w-full border-[2px] border-gray-200 px-2 p-1 flex flex-col gap-6 rounded-md mb-2 sm:h-[20rem]'>
                <h1>Find Readings by Date</h1>
                <div className='w-full grid grid-cols-3 gap-2'>
                    <select onChange={inputHandler} className='text-gray-400 border-[2px] border-gray-100 rounded-lg p-2' name="monthSelect" id="" value={monthSelected}>
                        {monthlyOptions()}
                    </select>
                    <select onChange={inputHandler} className='text-gray-400 border-[2px] border-gray-100 rounded-lg p-2' name="daySelect" id="" value={daySelected}>
                        {dayOptions()}
                    </select>
                    <select onChange={inputHandler} className='text-gray-400 border-[2px] border-gray-100 rounded-lg p-2' name="daySelect" id="" value={yearSelected}>
                        {yearOptions()}
                    </select>
                    {shownReadings && shownReadings.length > 0 && (
                        <input name='quantity' onChange={inputHandler} className='text-gray-400 border-[2px] border-gray-100 rounded-lg p-2 text-center col-span-3 mt-5' type="number" placeholder='Number of readings to show'/>
                    )}
                </div>

                <div className='w-full flex justify-center'>
                    <button onClick={fetchFilteredData} className='w-1/2 mb-2 sm:mb-0 sm:w-1/4 rounded-full px-2 py-1 border-[2px] border-blue-600 hover:cursor-pointer'>Fetch Data</button>
                </div>
            </div>
        
            <div className='w-full border-[2px] border-gray-200 px-2 p-1 flex flex-col gap-2 rounded-md mb-2 h-[20rem] text-xs'>
                <div className='grid grid-cols-4 font-bold mb-4 sm:justify-items-center'>
                    <div>
                        Temperature (°C)
                    </div>
                    <div>
                        Humidity (%)
                    </div>
                    <div>
                        Smoke and Gas
                    </div>
                    <div>
                        Date Collected
                    </div>
                </div>
                <div className='w-full h-[15rem] overflow-scroll'>
                    {(shownReadings && shownReadings.length > 0) && shownReadings.map((data:any, index:number) => (
                        <div key={index} className='grid grid-cols-4 sm:justify-items-center'>
                            <div>
                                <h1>{data.temp_value}</h1>
                            </div>
                            <div>
                                <h1>{data.humid_value}</h1>
                            </div>
                            <div>
                                <h1>{data.smoke_gas_value}</h1>
                            </div>
                            <div>
                                <h1>{formatDateString(data.date_collected)}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    </div>
  )
}
