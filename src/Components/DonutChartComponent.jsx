import React from 'react';
import ReactECharts from 'echarts-for-react';

const DonutChartComponent = ({ data, selectedArea }) => {
  const crimeTypes = {};
  data.forEach(d => {
    if (!crimeTypes[d.type]) {
      crimeTypes[d.type] = 1;
    } else {
      crimeTypes[d.type]++;
    }
  });

  const pieData = Object.keys(crimeTypes).map(type => ({
    value: crimeTypes[type],
    name: type
  }));

  const totalCrimes = pieData.reduce((sum, item) => sum + item.value, 0);
  const totalAreas = new Set(data.map(d => d.area)).size;

  const pieOptions = {
    title: {
      text: selectedArea ? `Crime Types in ${selectedArea}` : 'Crime Types in Areas',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Crime Types',
        type: 'pie',
        radius: ['40%', '70%'],
        data: pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          formatter: '{b}: {c}',
          fontSize: 12,
          fontWeight: 'bold',
          alignTo: 'labelLine'
        }
      }
    ],
    graphic: {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        text: `Total Areas: ${totalAreas}\nTotal Crimes: ${totalCrimes}`,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        fill: '#000'
      }
    }
  };

  return <ReactECharts option={pieOptions} style={{ height: '350px', width: '100%' }} />;
};

export default DonutChartComponent;
