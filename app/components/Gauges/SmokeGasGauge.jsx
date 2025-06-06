import React from 'react'
import GaugeComponent from 'react-gauge-component'

export default function SmokeGasGauge( {
    allowed_smoke_gas, // Allowed Smoke and Gas
    smokeGas, // Smoke gas reading
    parentClassname, // Classname for parent div
    maximumValue = 2, // Gauge's maximum value
    minimunValue = 0, // Gauge's minimum value
    firstLimitText = 'Normal', // The message on the first limit
    secondLimitText = 'High', // The message on the second limit
    thirdLimitText = null, // The message on the third limit
    gaugeType = 'radial', // Determines the gauge type
    textSize = '50px', // Determine the size of the text
    colorFill = '#d5d5d5', // Set the color of the text
    arrowColor = '#616161'
} ) {
    console.log(smokeGas);
  return (
    <div className={parentClassname}>
        <div className='grid grid-cols-2 items-center'>
            <h1 className='text-xs'>Smoke/Gas</h1>
            <h1 className={`text-xs text-white rounded-md p-1 text-center ${smokeGas >= allowed_smoke_gas.threshold ? 'bg-red-600' : 'bg-blue-600'}`}>{smokeGas >= allowed_smoke_gas.threshold ? 'Detected' : 'None'}</h1>
        </div>
        <GaugeComponent
            type={gaugeType}
            arc={{
            width: 0.2,
            cornerRadius: 3,
            subArcs: [
                {
                limit: allowed_smoke_gas.threshold,
                color: '#00a2ff',
                // showTick: true,
                tooltip: {
                    text: firstLimitText
                },
                },
                {
                color: '#ff0000',
                tooltip: {
                    text: secondLimitText
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
                formatTextValue: value => '',
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
            value={smokeGas ? (smokeGas > allowed_smoke_gas.threshold) ? (allowed_smoke_gas.threshold * 1.25) : (allowed_smoke_gas.threshold * 0.75) : 0}
            minValue={allowed_smoke_gas.threshold ? allowed_smoke_gas.threshold - (allowed_smoke_gas.threshold/2) : 0}
            maxValue={allowed_smoke_gas.threshold ? allowed_smoke_gas.threshold + (allowed_smoke_gas.threshold/2) : 100}
        />
    </div>
  )
}
