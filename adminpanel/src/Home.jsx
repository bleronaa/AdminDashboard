import React, { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import axiosInstance from './Axios';


function Home() {

      
  
      const chartSetting = {
        xAxis: [
          {
            label: 'Number of art items',
          },
        ],
        width: 1000,
        height: 500,
      };

      const [dashboardData, setDashboardData] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);
  
      useEffect(() => {
          const fetchDashboardData = async () => {
              try {
                  const response = await axiosInstance.get('/Dashboard/getDashboardData');
                  console.log(response)
                  setDashboardData(response.data);
                  // toastr.success('Dashboard data loaded successfully');
              } catch (error) {
                  console.error('Error fetching dashboard data:', error);
                  setError(error);
                  toastr.error('Failed to load dashboard data');
              } finally {
                  setIsLoading(false);
              }
          };
  
          fetchDashboardData();
      }, []);
  
      if (isLoading) {
          return <div>Loading...</div>;
      }
  
      if (error) {
          return <div>Error fetching data: {error.message}</div>;
      }
  
      const auctionMonths = dashboardData.artAuctionCount.map(item => item.month);
      const auctionCounts = dashboardData.artAuctionCount.map(item => item.count);
      const pieChartData = dashboardData.categoryCount.map((item, index) => ({
        id: index, // Unique ID for each category
        value: item.count, // Count for the pie slice
        label: item.name,  // Name for the pie slice label
      }));


      const dataset = dashboardData.artItemAuctionCount.map(item => ({
        month: item.month,   // Assuming `Month` exists in your data
        seoul: item.count    // Assuming `Count` exists in your data
      }));
        // Log the values to the console for debugging
console.log('Auction Months:', auctionMonths);
console.log('Auction Counts:', auctionCounts);
  return (
    <main className='main-container'>

           


       <div class="m-10 grid gap-5 sm:grid-cols-3 mx-auto max-w-screen-lg">
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 rounded-xl bg-blue-50 p-4 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
    </svg>
    <p class="mt-4 font-medium">Published Auctions</p>
    <p class="mt-2 text-xl font-medium">
      {dashboardData.publishedAuction}
      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </p>
  </div>
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 rounded-xl bg-rose-50 p-4 text-rose-300" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
    </svg>
    <p class="mt-4 font-medium">Clients</p>
    <p class="mt-2 text-xl font-medium"> 
    {dashboardData.allClients}

      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </p>
  </div>
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 rounded-xl bg-green-50 p-4 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p class="mt-4 font-medium">Total Amount of Bids</p>
    <p class="mt-2 text-xl font-medium">
    {dashboardData.totalBidsAmount } $

      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </p>
  </div>
</div>
<div class="m-10 grid gap-5 sm:grid-cols-3  mx-auto max-w-screen-lg">
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 rounded-xl bg-red-500 p-4 text-white" viewBox="0 0 24 24" fill="currentColor">
  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 011.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
</svg>

    <p class="mt-4 font-medium">UnApproved Art Items</p>
    <p class="mt-2 text-xl font-medium">
    {dashboardData.unApprovedArtItems }

      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </p>
  </div>
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 rounded-xl bg-green-500 p-4 text-white" viewBox="0 0 24 24" fill="currentColor">
  <path fillRule="evenodd" d="M10 18a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 15.586l8.293-8.293a1 1 0 011.414 1.414l-9 9A1 1 0 0110 18z" clipRule="evenodd" />
</svg>

    <p class="mt-4 font-medium">Approved Art Items</p>
    <p class="mt-2 text-xl font-medium">
    {dashboardData.approvedArtItems }
      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </p>
  </div>
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 rounded-xl bg-orange-500 p-4 text-white" fill="currentColor" viewBox="0 0 24 24">
  <path d="M10 2h4a1 1 0 010 2h-1.67l-.6 4H14a1 1 0 010 2h-2.6l-.6 4H12a1 1 0 010 2h-4a1 1 0 010-2h1.67l.6-4H10a1 1 0 010-2h2.6l.6-4H12a1 1 0 010-2h4-6z" />
</svg>

    <p class="mt-4 font-medium">Total Bids</p>
    <p class="mt-2 text-xl font-medium">
    {dashboardData.totalBids }

      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </p>
  </div>
</div>
  <hr></hr>
        {/* numri i artauction */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '100px auto' }} className='charts'>
          <h2>Number of Auction/Month</h2>
        <LineChart
                            xAxis={[{ data: auctionMonths }]}  // Using months for xAxis
                            series={[
                                {
                                    data: auctionCounts,  // Using counts for the series data
                                },
                            ]}
                            width={500}
                            height={300}
                        />
        {/* numri i kategorive */}
        <div style={{borderLeft:'2px solid grey;', width:'1px',backgroundColor:'grey' , height: '350px',margin:'0px 10px'}} class="vertical-line"></div>
        <h2>Most Used Categories</h2>
        <PieChart
  series={[
    {
      data: pieChartData,  // Use the mapped data here
    },
  ]}
  width={400}
  height={200}
/>

        </div>
        <hr></hr>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '100px auto' }} className='barchartEndSection'>
          <h2></h2>
  <BarChart
    dataset={dataset}
    yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
    series={[{ dataKey: 'seoul', label: 'Art Items/Month ' }]}
    layout="horizontal"
    {...chartSetting}
  />
</div>

    </main>
  )
}

export default Home
