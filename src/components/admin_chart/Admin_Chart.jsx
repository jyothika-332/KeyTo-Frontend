import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';


function Donut2({ series_data}) {
    const chartData = {
        options: {
          labels: ['Total Sold','Pending', 'For Rent','For Sale'],
        },
        series: series_data ? series_data : [0,0,0,0],
      };
  return (
    
    <div className="donut-chart">
    <ReactApexChart options={chartData.options} series={chartData.series} type="donut" width="350" />
  </div>
  )
}

export default Donut2