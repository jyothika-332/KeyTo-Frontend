import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';


function Donut({ series_data}) {
    const chartData = {
        options: {
          labels: ['Total Property', 'Sold Property', 'For Sale', 'For Rent'],
        },
        series: series_data ? series_data : [0,0,0,0],
      };
  return (
    
    <div className="donut-chart">
    <ReactApexChart options={chartData.options} series={chartData.series} type="donut" width="380" />
  </div>
  )
}

export default Donut