import React from 'react'
import GaugeComponent from 'react-gauge-component'

export default function HumidityGauge( {
    allowed_humidity, // Allowed humidity
    humidity, // Humidity reading
    parentClassname, // Classname of Parent div
    maximumValue = 37, // Gauge's maximum value
    minimunValue = 10, // Gauge's minimum value
    firstLimitText = 'Normal', // The message on the first limit
    secondLimitText = 'High', // The message on the second limit
    thirdLimitText = '', // The message on the third limit
    gaugeType = 'radial', // Determines the gauge type
    textSize = '50px', // Determine the size of the text
    colorFill = '#d5d5d5', // Set the color of the text
    arrowColor = '#616161',
} ) {
  return (
    <div className={parentClassname}>
        <div className='grid grid-cols-2 items-center'>
            <h1 className='text-xs'>Humidity</h1>
            <h1 className={`text-xs text-white rounded-md p-1 text-center ${(humidity >= allowed_humidity.normal.high && humidity <= allowed_humidity.high.high) ? 'bg-orange-600' : humidity >= allowed_humidity.high.high ? 'bg-red-600' : 'bg-blue-600'}`}>{(humidity >= allowed_humidity.normal.high && humidity <= allowed_humidity.high.high) ? 'High' : humidity > allowed_humidity.high.high ? 'Danger' : 'Normal'}</h1>
        </div>
        <GaugeComponent
            type={gaugeType}
            arc={{
            width: 0.2,
            cornerRadius: 3,
            subArcs: [
                {
                limit: allowed_humidity.normal.high,
                color: '#00a2ff',
                // showTick: true,
                tooltip: {
                    text: firstLimitText
                },
                },
                {
                limit: allowed_humidity.high.high,
                color: '#ff8f00',
                tooltip: {
                    text: secondLimitText
                }
                },
                {
                limit: allowed_humidity.danger.high,
                color: '#ff0000',
                tooltip: {
                    text: thirdLimitText
                }
                }
            ]
            }}
            pointer={{
            type: 'needle',
            color: arrowColor,
            length: 0.70,
            width: 10,
            // elastic: true,
            }}
            labels={{
            valueLabel: { 
                formatTextValue: value => value + '%',
                style: {
                fontSize: textSize,
                color: "#808080",
                fill: colorFill, 
                }
            },
            tickLabels: {
                hideMinMax: true,
            }
            }}
            value={humidity ? humidity : 0}
            minValue={allowed_humidity.normal.low}
            maxValue={allowed_humidity.danger.high}
        />
    </div>
  )
}
