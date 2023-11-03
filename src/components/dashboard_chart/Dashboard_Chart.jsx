// import React, { Component } from 'react';
// import Chart from 'react-apexcharts'

// class Donut extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {},
//       series: [44, 55, 41, 17, 15],
//       labels: ['A', 'B', 'C', 'D', 'E']
//     }
//   }

//   render() {

//     return (
//       <div className="donut">
//         <Chart options={this.state.options} series={this.state.series} type="donut" width="500" />
//       </div>
//     );
//   }
// }

// export default Donut;


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