import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import courtSvg from '../images/court.jpg';
import './BasketballCourt.css';

const svgWidth = 500;
const svgHeight = 472;

const scaleX = d3.scaleLinear()
  .domain([-1, 49])
  .range([0, svgWidth]);

const scaleY = d3.scaleLinear()
  .domain([-2, 48])
  .range([0, svgHeight]);
const aggregateShots = (data) => {
    const aggregated = {};
  
    data.forEach(shot => {
// Round the shot location to the nearest grid point
      const roundedX = Math.round(scaleX(shot.x));
      const roundedY = Math.round(scaleY(shot.y));
      const key = `${roundedX}-${roundedY}`;
  
      if (!aggregated[key]) {
        aggregated[key] = { count: 1, x: roundedX, y: roundedY, made: shot.made };
      } else {
        aggregated[key].count += 1;
        }
    });
  
    return Object.values(aggregated); // Convert aggregated shots object back to an array
  };
  
const BasketballCourt = ({ data }) => {
const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
  
    svg.append('image')
      .attr('href', courtSvg)
      .attr('width', svgWidth)
      .attr('height', svgHeight);
    
  if (!data || data.length === 0 || data.some(d => Object.keys(d).length === 0)) return;
    const aggregatedData = aggregateShots(data);
  
    // Determine the range of shot counts to scale circle sizes dynamically
    const maxCount = d3.max(aggregatedData, d => d.count);
    const radiusScale = d3.scaleSqrt().domain([1, maxCount]).range([2, 20]); // Min and max circle sizes
  

    // Draw circles based on aggregated data
    aggregatedData.forEach(d => {
      svg.append("circle")
        .attr("cx", d.x)
        .attr("cy", d.y)
        .attr("r", 2)
        .attr("fill", d.made ? "green" : "red") // Example: using last shot's outcome for color
        .attr("opacity", 0.7);
    });
  }, [data]);
  

  return (
    <div className="container">
      <div style={{ position: 'relative', height: svgHeight, width: svgWidth }}>
        <svg ref={svgRef} width={svgWidth} height={svgHeight} style={{ position: 'absolute', top: 0, left: 0 }}></svg>
      </div>
      {/* Tooltip or player stats divs can go here */}
    </div>
  );
};

export default BasketballCourt;
