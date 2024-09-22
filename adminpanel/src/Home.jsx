import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';


function Home() {
     const dataset = [
        { month:'Jan', seoul: 30 },
        { month: 'Feb', seoul: 25 },
        { month: 'Mar', seoul: 40 },
        { month: 'Apr', seoul: 50 },
        { month: 'May', seoul: 60 },
        { month: 'June', seoul: 70 },
        { month: 'July', seoul: 100 },
        { month: 'Aug', seoul: 90 },
        { month: 'Sept', seoul: 50 },
        { month: 'Oct', seoul: 40 },
        { month: 'Nov', seoul: 30 },
        { month: 'Dec', seoul: 20 },
      ];
      
       const valueFormatter = (value) => {
        return `${value}°C`; // Format temperature with a degree symbol
      };
      const chartSetting = {
        xAxis: [
          {
            label: 'rainfall (mm)',
          },
        ],
        width: 1000,
        height: 500,
      };
  return (
    <main className='main-container'>

           


       <div class="m-10 grid gap-5 sm:grid-cols-3 mx-auto max-w-screen-lg">
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 rounded-xl bg-blue-50 p-4 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
    </svg>
    <p class="mt-4 font-medium">Sessions</p>
    <p class="mt-2 text-xl font-medium">
      23.4k
      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </p>
    <span class="text-xs text-gray-400">+4.9%</span>
  </div>
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 rounded-xl bg-rose-50 p-4 text-rose-300" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
    </svg>
    <p class="mt-4 font-medium">Users</p>
    <p class="mt-2 text-xl font-medium"> 
      23.4k
      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </p>
    <span class="text-xs text-gray-400">+4.9%</span>
  </div>
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 rounded-xl bg-green-50 p-4 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p class="mt-4 font-medium">Revenue</p>
    <p class="mt-2 text-xl font-medium">
      $23.4k
      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </p>
    <span class="text-xs text-gray-400">+4.9%</span>
  </div>
</div>
<div class="m-10 grid gap-5 sm:grid-cols-3  mx-auto max-w-screen-lg">
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 rounded-xl bg-blue-400 p-4 text-white" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
    </svg>
    <p class="mt-4 font-medium">Sessions</p>
    <p class="mt-2 text-xl font-medium">
      23.4k
      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </p>
    <span class="text-xs text-gray-400">+4.9%</span>
  </div>
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 rounded-xl bg-rose-400 p-4 text-white" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
    </svg>
    <p class="mt-4 font-medium">Users</p>
    <p class="mt-2 text-xl font-medium">
      23.4k
      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </p>
    <span class="text-xs text-gray-400">+4.9%</span>
  </div>
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 rounded-xl bg-green-400 p-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p class="mt-4 font-medium">Revenue</p>
    <p class="mt-2 text-xl font-medium">
      $23.4k
      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </p>
    <span class="text-xs text-gray-400">+4.9%</span>
  </div>
</div>
  <hr></hr>
        {/* numri i artauction */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '100px auto' }} className='charts'>
        <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      width={500}
      height={300}
    />
        {/* numri i kategorive */}

<PieChart
  series={[
    {
      data: [
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
      ],
    },
  ]}
  width={400}
  height={200}
/>


        </div>
        <hr></hr>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '100px auto' }} className='barchartEndSection'>
  <BarChart
    dataset={dataset}
    yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
    series={[{ dataKey: 'seoul', label: 'Seoul Rainfall', valueFormatter }]}
    layout="horizontal"
    {...chartSetting}
  />
</div>

    </main>
  )
}

export default Home
