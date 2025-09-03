import { Button } from '@/components/ui/button';
import { fetchMarketChart } from '@/State/Coin/Action';
import { store } from '@/State/Store';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux';

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
  },
  {
    keyword: "DIGITAL_CURRENCY_YEARLY",
    key: "Yearly Time Series",
    lable: "1 Year",
    value: 365
  }
];
const Stockchart = ({coinId}) => {
  const dispatch=useDispatch()
    const [activeLable,setActiveLable]=useState(timeSeries[0]);
    const {coin}=useSelector(store=>store)

    const series = [
        {
            data: coin.marketChart.data,
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
useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (coinId && token) {
    dispatch(fetchMarketChart({ coinId, days: activeLable.value, jwt: token }));
  }
}, [dispatch, coinId, activeLable]);
    return (
        <div>
            <div className='flex gap-1'>
                {timeSeries.map((item,index)=><Button 
                variant={activeLable.lable==item.lable?"default":"outline"}
                onClick={()=>handleActiveLable(item)}
                 key={item.lable}>
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