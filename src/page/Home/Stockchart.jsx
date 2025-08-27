import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    lable: "1 Day",
    value: 1
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    lable: "1 Week",
    value: 7
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    lable: "1 Month",
    value: 30
  }
];
const Stockchart = () => {
    const [activeLable,setActiveLable]=useState("1 Day");
    const series = [
        {
            data: [[1753340964625, 117421.547124283],
            [1753344544829, 118297.590775401],
            [1753348159800, 118813.743041118],
            [1753351769182, 118626.886047475],
            [1753354832882, 118306.154419748],
            [1753358635511, 118706.265286137],
            [1753362249030, 118485.748746552],
            [1753365864228, 118430.68295554],
            [1753369493733, 118859.5775591],
            [1753373060106, 119161.397404239],
            [1753376876505, 118633.228027836],
            [1753380265533, 119212.307705836],
            [1753384159079, 119129.477206631],
            [1753387773253, 119020.793578091],
            [1753391335337, 118788.015315909],
            [1753394972133, 118633.71224119],
            [1753398549731, 118328.214410844],
            [1753402144870, 118374.126692692],
            [1753405778465, 117716.030144216],
            [1753409316425, 117363.917529113],
            [1753412940317, 116416.86890279],
            [1753416496874, 115457.883059185],
            [1753419780450, 115944.698068696],
            [1753423301801, 115525.70059247],
            [1753427026144, 115312.959079447],
            [1753430697121, 115183.7906998],
            [1753434272681, 115198.341297082],
            [1753437894471, 115616.056033742],
            [1753441615828, 116397.613942929],
            [1753444845105, 116570.577271289],
            [1753448533682, 116149.099157956],
            [1753452289809, 116111.257106211],
            [1753455895895, 115190.247903262],
            [1753459755270, 115789.538421141],
            [1753463349438, 116091.439336672],
            [1753466921463, 116140.321538992],
            [1753470564756, 116519.049096792],]
        }]
    const options = {
  chart: {
    id: "area-datetime",
    type: "area",
    height: 450,
    zoom: { autoScaleYaxis: true },
  },
  dataLabels: {
    enabled: false,   // 👈 isko yaha likhna hai, chart ke andar nahi
  },
  xaxis: {
    type: "datetime",
    tickAmount: 6,
  },
  colors: ["#758AA2"],
  markers: {
    colors: ["#fff"],
    strokeColor: "#fff",
    size: 0,
    strokeWidth: 1,
    style: "hollow",
  },
  tooltip: {
    theme: "dark",
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9, 
      stops: [0, 100],
    },
  },
  grid: {
    borderColor: "#47535E",
    strokeDashArray: 4,
    show: true,
  },
};
const handleActiveLable=(val) => {
    setActiveLable(val);
}
    return (
        <div>
            <div className='flex gap-1'>
                {timeSeries.map((item,index)=><Button 
                variant={activeLable==item.lable?"default":"outline"}
                onClick={()=>handleActiveLable(item.lable)}
                 key={index}>
                   { item.lable}
                </Button>)}
            </div>
        <div id="chart-timelines">
            <ReactApexChart
            options={options}
            series={series}
            height={450}
            width="100%"
           type="area"
            />
        </div>
        </div>
    )
}

export default Stockchart