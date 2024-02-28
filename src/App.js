import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import BarChart from './components/BarChart'; 
import dataCsv from './HappinessToClimate.csv';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await d3.csv(dataCsv, d => {
        return {
          country: d.Country,
          happinessScore: +d.HappinessScore,
          sunshinePerYear: +d.AverageSunshine,
          averageTemperature: +d.AverageTemperature
        };
      });
      setData(data);
    };

    loadData();
  }, []);

  return (
    <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      {data.length > 0 ? (

          <BarChart data={data}/>

      ) : (
        <p>Loading data...</p>
      )}
      </div>
    </div>
  );
};

export default App;