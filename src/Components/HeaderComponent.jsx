import React, { useState, useEffect } from "react";
import { Select, Button, Drawer } from "antd";
import { crimeTypes, crimeSubTypes, crimeData } from "./Data";

const { Option } = Select;

const HeaderComponent = ({ onApply, onReset }) => {
  const [selectedCrimeType, setSelectedCrimeType] = useState(null);
  const [subTypes, setSubTypes] = useState([]);
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1000);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCrimeTypeChange = (value) => {
    setSelectedCrimeType(value);
    setSelectedSubType(null);
    setSubTypes(crimeSubTypes[value] || []);
  };

  const handleSubTypeChange = (value) => {
    setSelectedSubType(value);
  };

  const handleAreaChange = (value) => {
    setSelectedArea(value);

    const filteredCrimeTypes = crimeData.filter((crime) => crime.area === value);

    setSelectedCrimeType(null);
    setSubTypes([]);

    if (filteredCrimeTypes.length > 0) {
      setSubTypes(crimeSubTypes[filteredCrimeTypes[0]] || []);
    }
  };

  const handleApply = () => {
    onApply({
      type: selectedCrimeType,
      subType: selectedSubType,
      area: selectedArea,
    });
    setDrawerVisible(false); // Close drawer on apply
  };

  const handleReset = () => {
    setSelectedCrimeType(null);
    setSelectedSubType(null);
    setSelectedArea(null);
    setSubTypes([]);
    onReset();
    setDrawerVisible(false); // Close drawer on reset
  };

  const renderFilters = () => (
    <>
      <Select
        placeholder="Select Area"
        style={{ width: "20%", marginLeft: "20px" }}
        onChange={handleAreaChange}
        value={selectedArea}
      >
        {Array.from(new Set(crimeData.map((crime) => crime.area))).map(
          (area, index) => (
            <Option key={index} value={area}>
              {area}
            </Option>
          )
        )}
      </Select>
      <Select
        placeholder="Select Crime Type"
        style={{ width: "20%", marginLeft: "20px" }}
        onChange={handleCrimeTypeChange}
        value={selectedCrimeType}
        disabled={!selectedArea}
      >
        {crimeTypes.map((type) => (
          <Option key={type.value} value={type.value}>
            {type.label}
          </Option>
        ))}
      </Select>
      <Select
        placeholder="Select Crime Sub Type"
        style={{ width: "20%", marginLeft: "20px" }}
        value={selectedSubType}
        disabled={!selectedCrimeType}
        onChange={handleSubTypeChange}
      >
        {subTypes.map((subType) => (
          <Option key={subType.value} value={subType.value}>
            {subType.label}
          </Option>
        ))}
      </Select>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="primary" onClick={handleApply} style={{ marginLeft: "20px" }}>
          Apply
        </Button>
        <Button style={{ marginLeft: "20px" }} onClick={handleReset}>
          Reset
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h3>Crime Dashboard</h3>
      </div>
      {isMobile ? (
        <>
          <div
            style={{
              background: "#f0f2f5",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
            }}
          >
            <Button type="primary" onClick={() => setDrawerVisible(true)}>
              Menu
            </Button>
          </div>
          <Drawer
            title="Crime Dashboard Filters"
            placement="right"
            closable={true}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
          >
            {renderFilters()}
          </Drawer>
        </>
      ) : (
        <div
          style={{
            background: "#f0f2f5",
            height: "60px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {renderFilters()}
        </div>
      )}
    </>
  );
};

export default HeaderComponent;
