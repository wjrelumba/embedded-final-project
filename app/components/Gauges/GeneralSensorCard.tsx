'use client';
import { useState } from 'react'
import { Gauges } from './Gauge';

type ReadingValue = {
  temperature: number;
  humidity: number;
  smoke_gas: number;
}

export default function GeneralSensorCard( {
  readingValues, // Values
}: ReadingValue | any ) {
  const [importantDataValues] = useState(true);

  const parentClassname = 'w-full sm:h-full border-[2px] rounded-2xl p-2 border-gray-300 shadow-2xl';
  
  return (
    <div className='w-full text-white rounded-xl'>
      <div className='w-full flex'>
        <div className='flex flex-col items-center w-full sm:h-[35rem] mb-1'>
            {importantDataValues && (
            <>
                <div className='flex flex-col w-full items-center justify-center gap-1 sm:flex-row h-[100%]'>
                  <div className='w-full sm:flex sm:justify-center sm:w-[60%] sm:h-full sm:aspect-square'>
                    <Gauges.TemperatureGauge
                    allowed_temperature={{
                      normal: {
                        low: 10,
                        high: 27,
                      },
                      high: {
                        low: 28,
                        high: 35,
                      },
                      danger: {
                        low: 36,
                        high: 70,
                      }
                    }} 
                    temperature={readingValues.temperature}
                    parentClassname={parentClassname}
                    firstLimitText='Allowed Temperature'
                    secondLimitText='Too High Temperature!'
                    thirdLimitText='Danger Zone!'
                    gaugeType='radial'
                    />
                  </div>
                  <div className='w-full flex sm:flex-col sm:justify-center sm:w-[20%] sm:h-full gap-1'>
                    <Gauges.HumidityGauge 
                    allowed_humidity={{
                      normal: {
                        low: 10,
                        high: 50,
                      },
                      high: {
                        low: 51,
                        high: 60,
                      },
                      danger: {
                        low: 61,
                        high: 100,
                      }
                    }} 
                    humidity={readingValues.humidity}
                    parentClassname={'sm:w-[100%] w-1/2 border-[2px] rounded-2xl p-2 border-gray-300 shadow-2xl'}
                    firstLimitText='Allowed Humidity'
                    secondLimitText='Too High Humidity!'
                    thirdLimitText='Danger Zone!'
                    gaugeType='radial'
                    />
                    <Gauges.SmokeGasGauge
                    allowed_smoke_gas={{
                      threshold: 500
                    }}
                    smokeGas={readingValues.smoke_gas}
                    parentClassname={'sm:w-[100%] w-1/2 border-[2px] rounded-2xl p-2 border-gray-300 shadow-2xl'}
                    firstLimitText='No Smoke and Gas'
                    secondLimitText='Smoke and Gas Detected'
                    gaugeType='radial'
                    maximumValue={37}
                    minimunValue={10}
                    />
                  </div>  
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  )
}
