import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import courtSvg from '../images/court.jpg'; // This should be the path to your SVG file.
import './BasketballCourt.css'

const svgWidth = 500; // Width of the SVG element, adjust as needed
const svgHeight = 472; // Height of the SVG element, adjust as needed

// Adjust the domain if your data points are in a different scale
const scaleX = d3.scaleLinear()
  .domain([0, 50]) // Basketball court length in feet
  .range([0, svgWidth]); // SVG width in pixels

const scaleY = d3.scaleLinear()
  .domain([0, 50]) // Basketball court width in feet
  .range([0, svgHeight]); // SVG height in pixels, inverted for SVG coordinates

const BasketballCourt = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Make sure the SVG is cleared out before adding new elements
    svg.selectAll("*").remove();

    // Load the basketball court image
    svg.append('image')
      .attr('href', courtSvg)
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    // Add the shots as circles
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => scaleX(d.x))
      .attr("cy", d => scaleY(d.y))
      .attr("r", 5) // Radius of the shots
      .attr("fill", d => d.made ? "green" : "red") // Color based on whether the shot was made
      .on("mouseover", (event, d) => {
        console.log(d)
        let [fname, lname] = d.player.split(' ')
        d3.select(".tooltip").html('Team: ' + d.team + '<br>Player: ' + d.player + '<br>Distance: ' + d.distance + '<br>Made: ' + d.distance);
        fetch(`https://www.balldontlie.io/api/v1/players?search=${fname}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(j => {
            j.data.forEach(item => {
              if (item.first_name === fname && item.last_name === lname) {
                console.log(item)
                d3.select(".playerStats").html('Name: ' + fname + ' ' + lname + '<br>Position: ' + item.position + '<br>Height: ' + item.height_feet + '\'' + item.height_inches + '"<br>Weight: ' + item.weight_pounds + ' lbs<br>Team: ' + item.team.full_name)
              }
            });
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
      });

  }, [data]); // Re-run the effect when data changes

  return (
    <>
      {/* <h2>Basketball Court Visualization</h2> */}
      <div className="container">
        <div className="playerStats" width='30%'></div>
        <div style={{ position: 'relative', height: '472px', width: '500px' }}>
          <svg ref={svgRef} width={svgWidth} height={svgHeight} style={{ position: 'absolute', top: 0, left: 0 }}></svg>
        </div>
        <div className="tooltip"></div>
      </div>
    </>
  );
};

export default BasketballCourt;
