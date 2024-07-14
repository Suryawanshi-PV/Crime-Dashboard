import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const BarChartComponent = ({ data ,selectedArea}) => {
  let barData = {};

  if (selectedArea) {
    // If an area is selected, show subArea within that area
    data.forEach(d => {
      if (d.area === selectedArea) {
        if (!barData[d.subArea]) {
          barData[d.subArea] = 1;
        } else {
          barData[d.subArea]++;
        }
      }
    });
  } else {
    // Otherwise, show data for all areas
    data.forEach(d => {
      if (!barData[d.area]) {
        barData[d.area] = 1;
      } else {
        barData[d.area]++;
      }
    });
  }

  const barLabels = Object.keys(barData);
  const barValues = barLabels.map(label => barData[label]);

  const barOptions = {
    title: {
      text: selectedArea ? `Crime Areas in ${selectedArea}` : 'Crime Areas',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: barLabels,
      axisLabel: {
        show: true, // Ensure axis labels are shown
        interval: 0, // Show all labels
        rotate: 45, // Rotate labels for better readability if needed
        // Other axis label properties can be added as needed
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: barValues,
        type: 'bar'
      }
    ]
  };

  return <ReactECharts option={barOptions} style={{ height: '400px', width: '100%' }} />;
};

export default BarChartComponent;
