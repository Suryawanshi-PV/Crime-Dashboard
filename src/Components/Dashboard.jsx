import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import HeaderComponent from './HeaderComponent';
import TableComponent from './TableComponent';
import ChartComponent from './ChartComponent';
import MapComponent from './MapComponent';
import { crimeData } from './Data';

const Dashboard = () => {
  const [filteredData, setFilteredData] = useState(crimeData);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleReset = () => {
    setFilteredData(crimeData);
  };

  const handleApply = (filter) => {
    const { type, subType, area } = filter;
    const data = crimeData.filter(
      (crime) =>
        (!area || crime.area === area) &&
        (!type || crime.type === type) &&
        (!subType || crime.subtype === subType)
    );
    setFilteredData(data);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ height: '100%' }}>
      <Modal
        title="Under Development"
        visible={isModalVisible}
        onOk={handleOk}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <p> This site is currently under development and will be improved gradually. 
        For an optimal experience, please access the dashboard using a laptop or desktop.</p>
      </Modal>
      <HeaderComponent onApply={handleApply} onReset={handleReset} />
      <div className="Table-Map-container" style={{ display: 'flex' }}>
        <TableComponent data={filteredData} />
        <MapComponent data={filteredData} />
      </div>
      <ChartComponent data={filteredData} />
    </div>
  );
};

export default Dashboard;
