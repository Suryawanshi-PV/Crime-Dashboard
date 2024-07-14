// src/Components/TableComponent.jsx

import React from 'react';
import { Table } from 'antd';

const TableComponent = ({ data }) => {
  const columns = [
    // { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Area', dataIndex: 'area', key: 'area' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Subtype', dataIndex: 'subtype', key: 'subtype' }
    
  ];

  return(
    <>
    <div className='table-container' style={{height:"500px",width:"35%", margin:'10px' ,overflow:"auto"}}>
    <div style={{textAlign:'center'}}><h5>Crime Data Table</h5></div>
    <Table dataSource={data} columns={columns} rowKey="id" />;
    </div>
    
    </>
  )
  

};

export default TableComponent;
