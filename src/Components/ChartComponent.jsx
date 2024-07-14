// src/Components/ChartComponent.jsx

import React, { useState,useEffect } from 'react';
import DonutChartComponent from './DonutChartComponent';
import BarChartComponent from './BarChartComponent';

const ChartComponent = ({ data }) => {

  const [selectedArea, setSelectedArea] = useState(null);
  useEffect(() => {
    // Check if all items in the data have the same area
    const areas = Array.from(new Set(data.map(d => d.area)));
    if (areas.length === 1) {
      setSelectedArea(areas[0]);
    } else {
      setSelectedArea(null);
    }
  }, [data]);


  return (
    <div>
    
      <div className='donut-bar-container' style={{ display: "flex" }}>
        <div className='donut-container' style={{ width: '50%',margin:"2%"  }}>
          <DonutChartComponent data={data} selectedArea={selectedArea} />
        </div>
        <div className='bar-container' style={{ width: '45%',margin:"2%" }}>
          <BarChartComponent data={data} selectedArea={selectedArea}  />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
