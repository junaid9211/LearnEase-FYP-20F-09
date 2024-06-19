import React from 'react'
import HeatmapGrid from 'react-heatmap-grid';
const data = [
    { x: 0, y: 0, value: 10 },
    { x: 1, y: 0, value: 20 },
    { x: 2, y: 0, value: 30 },
    { x: 3, y: 0, value: 40 },
    { x: 0, y: 1, value: 50 },
    { x: 1, y: 1, value: 60 },
    { x: 2, y: 1, value: 70 },
    { x: 3, y: 1, value: 80 },
    // Add more data points as needed
  ];
  
  const colors = ['#00ff00', '#ffff00', '#ff9900', '#ff0000'];
  const minValue = 0;
  const maxValue = 100;
  

const MonitorProgress = () => {
  return (
    <div style={{ width: '500px', height: '300px' }}>
    <HeatmapGrid
      data={data}
      xLabels={['X1', 'X2', 'X3', 'X4']}
      yLabels={['Y1', 'Y2']}
      squares
      height={20}
      xLabelWidth={60}
      onClick={(x, y) => alert(`Clicked on (${x}, ${y})`)}
      cellStyle={(background, value, min, max, data, x, y) => ({
        background: colors[Math.floor((value - minValue) / ((maxValue - minValue) / 4))],
        fontSize: '11px',
        color: '#333',
      })}
      cellRender={value => value && <div>{value}</div>}
    />
  </div>
);
};

export default MonitorProgress

