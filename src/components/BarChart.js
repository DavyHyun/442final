

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const [currentKey, setCurrentKey] = useState('sunshinePerYear');
  const svgRef = useRef();
  const width = 600, height = 400;
  const margin = { top: 20, right: 30, bottom: 60, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const switchDataset = () => {
    setCurrentKey(currentKey === 'sunshinePerYear' ? 'averageTemperature' : 'sunshinePerYear');
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.country))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[currentKey])])
      .range([innerHeight, 0]);

    // Update the axes groups or create them if they don't exist
   
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - margin.bottom})`);
    

    svg.select(".x-axis").call(d3.axisBottom(xScale));


      svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(525,${margin.top})`);
    

    // This is the key update for the Y-axis to prevent overlap
    svg.select(".y-axis")
      .transition().duration(1000)
      .call(d3.axisLeft(yScale));

    // Bars handling
    const g = svg.select("g.contents");
    if (g.empty()) {
      g = svg.append("g")
        .attr("class", "contents")
        // .attr("transform", `translate(0,0)`);
    }

    const bars = g.selectAll("rect")
      .data(data, d => d.country);

    bars.enter().append("rect")
        .attr("x", d => xScale(d.country))
        .attr("width", xScale.bandwidth())
        // .attr("y", innerHeight)
        // // .attr("height", 0)
      .merge(bars)
        .transition().duration(1000)
        .attr("y", d => yScale(d[currentKey]))
        .attr("height", d => innerHeight - yScale(d[currentKey]))
        .attr("fill", "steelblue");

    // bars.exit()
    //   .transition().duration(1000)
    //   .attr("y", innerHeight)
    //   .attr("height", 0)
    //   .remove();

  }, [currentKey, data, height, innerHeight, innerWidth, margin]);

  return (
    <div style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
      <h2>{currentKey}</h2>
      <svg style={{width: '100%'}}ref={svgRef} width={width} height={height}>
        <g className="contents"></g>
      </svg>
      <button onClick={switchDataset}>Switch Dataset</button>
    </div>
  );
};

export default BarChart;

// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const InteractiveBarChart = ({ data }) => {
//   const [currentKey, setCurrentKey] = useState('sunshinePerYear');
//   const svgRef = useRef();
//   const width = 600, height = 400;
//   const margin = { top: 20, right: 30, bottom: 60, left: 80 };
//   const innerWidth = width - margin.left - margin.right;
//   const innerHeight = height - margin.top - margin.bottom;

//   const switchDataset = () => {
//     setCurrentKey(currentKey === 'sunshinePerYear' ? 'averageTemperature' : 'sunshinePerYear');
//   };

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove(); // Clear SVG for redrawing
  
//     const xScale = d3.scaleBand()
//       .domain(data.map(d => d.country))
//       .range([0, innerWidth])
//       .padding(0.1);
  
//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d[currentKey])])
//       .range([innerHeight, 0]);
  
//     const g = svg.append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);
  
//     // Y-axis
//     g.append("g").call(d3.axisLeft(yScale));
  
//     // X-axis
//     g.append("g")
//       .attr("transform", `translate(0,${innerHeight})`)
//       .call(d3.axisBottom(xScale));
  
//     // Bind data to bars
//     const bars = g.selectAll(".bar")
//       .data(data, d => d.country);
  
//     // Enter new bars
//     bars.enter().append("rect")
//       .attr("class", "bar")
//       .attr("x", d => xScale(d.country))
//       .attr("y", innerHeight) // Start new bars from the bottom
//       .attr("height", 0) // Initial height for new bars is 0
//       .attr("width", xScale.bandwidth())
//       .attr("fill", "steelblue") // Static color for simplicity
//       // Transition for new bars
//       .transition().duration(2000)
//       .attr("y", d => yScale(d[currentKey]))
//       .attr("height", d => innerHeight - yScale(d[currentKey]));
  
//     // Update existing bars
//     bars.transition().duration(2000)
//       .attr("x", d => xScale(d.country))
//       .attr("y", d => yScale(d[currentKey]))
//       .attr("height", d => innerHeight - yScale(d[currentKey]))
//       .attr("width", xScale.bandwidth());
  
//     // Exit bars that are no longer in the data
//     bars.exit()
//       .transition().duration(2000)
//       .attr("y", innerHeight)
//       .attr("height", 0)
//       .remove();
  
//   }, [currentKey, data, innerHeight, innerWidth, margin.left, margin.top]);
  

//   return (
//     <>
//     <h2>{currentKey}</h2>
//       <svg ref={svgRef} width={width} height={height} />
//       <button onClick={switchDataset}>Switch Dataset</button>
//     </>
//   );
// };

// export default InteractiveBarChart;