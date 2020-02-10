import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { movement } from "../actions";

import * as d3 from "d3";
import { getCoordinatesFromString } from "../util";
import { theme } from "./styledComponents/ThemeProvider";

const Rooms = ({ dimension, gutter, d3Data, links, movement, player }) => {
  const svgRef = useRef(null);
  //   once we finish creating the map, we'll have set up an svg group and domains for the x and y axes, rather than recreate those whenever we move the player we'll save them in state
  let [[xDomain, yDomain], setDomains] = useState([null, null]);
  let [group, setGroup] = useState(null);

  //   draw map
  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const rooms = d3.select("#rooms");
      // create margins and dimensions and scale functions, turn d3Data into an array
      let margin = { top: 40, right: 40, bottom: 40, left: 40 };
      let width = (dimension + gutter) * 31 - margin.left - margin.right;
      let height = (dimension + gutter) * 31 - margin.top - margin.bottom;
      let y = d3.scaleLinear().range([height, 0]);
      let x = d3.scaleLinear().range([0, width]);
      let arrData = d3.entries(d3Data);

      x.domain(
        d3.extent(arrData, function(d) {
          return d.value.coordinates.x;
        })
      );
      y.domain([
        d3.min(arrData, function(d) {
          return d.value.coordinates.y;
        }),
        d3.max(arrData, function(d) {
          return d.value.coordinates.y;
        })
      ]);
      //   create the corridors
      let g = svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke", theme.palette.success.light)
        .attr("style", "pointer-events: none;")
        .attr("stroke-width", dimension / 4)
        .attr("x1", function(d) {
          return x(arrData[d.source].value.coordinates.x) + dimension / 2;
        })
        .attr("y1", function(d) {
          return y(arrData[d.source].value.coordinates.y) + dimension / 2;
        })
        .attr("x2", function(d) {
          return x(arrData[d.target].value.coordinates.x) + dimension / 2;
        })
        .attr("y2", function(d) {
          return y(arrData[d.target].value.coordinates.y) + dimension / 2;
        });
      // create the rooms
      let div = rooms
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("text-align", "center")
        .style("width", "60px")
        .style("height", "28px")
        .style("padding", "2px")
        .style("font", "12px sans-serif")
        .style("background", theme.palette.info.dark)
        .style("border", "0px")
        .style("border-radius", "8px")
        .style("pointer-events", "none")
        .style("z-index", "1000");

      g.selectAll("dot")
        .data(arrData)
        .enter()
        .append("rect")
        .attr("width", dimension)
        .attr("height", dimension)
        .attr("id", function(d) {
          return d.key;
        })
        .attr("x", function(d) {
          return x(d.value.coordinates.x);
        })
        .attr("y", function(d) {
          return y(d.value.coordinates.y);
        })
        .attr("fill", function(d) {
          if (d.key === "467") {
            return theme.palette.secondary.dark;
          } else if (d.key === "1") {
            return theme.palette.error.dark;
          } else if (d.key === "55") {
            return theme.palette.info.dark;
          }
          return theme.palette.success.light;
        })

        .on("mouseover", function(d) {
          div
            .transition()
            .duration(200)
            .style("opacity", 0.9);
          div
            .html("Room: " + d.key + "<br/>")
            .style("left", d3.event.offsetX + "px")
            .style("top", d3.event.offsetY - 28 + "px");
        })
        .on("mouseout", function(d) {
          div
            .transition()
            .duration(500)
            .style("opacity", 0);
        });

      g.append("circle")
        .attr("fill", "#000")
        .attr("id", "player-marker")
        .attr("r", dimension / 4);
      setDomains([x, y]);
      setGroup(g);
    }
  }, [svgRef, d3Data, dimension, gutter, links]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (group) {
      group.selectAll("rect").each(function() {
        let current = d3.select(this);
        current.on("click", function(d, i) {
          movement(token, d["key"]);
        });
      });
    }
    return () => {
      d3.selectAll("rect").each(function() {
        let current = d3.select(this);
        current.on("click", null);
      });
    };
  }, [group, movement]);

  useEffect(() => {
    function update(node) {
      node
        .transition()
        .attr("cx", xDomain(playerX) + dimension / 2)
        .attr("cy", yDomain(playerY) + dimension / 2)
        .duration(500);
    }
    let [playerX, playerY] = getCoordinatesFromString(
      player.currentRoom.coordinates
    );
    if (svgRef.current && group && xDomain && yDomain) {
      let node = group.select("circle");
      update(node);
    }
  }, [dimension, group, xDomain, yDomain, player]);
  return (
    <StyledRooms id="rooms">
      <svg ref={svgRef}></svg>
    </StyledRooms>
  );
};

const mapDispatchToProps = { movement };
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  dimension: mapState.dimension,
  gutter: mapState.gutter,
  player: playerState,
  d3Data: mapState.d3Data,
  links: mapState.links
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);

export const StyledRooms = styled.div`
  display: block;
  background: transparent;
  position: relative;
  width: ${props => (props.width ? `${props.width}px` : "100%")};
  height: ${props => (props.height ? `${props.height}px` : "100%")};
  padding: 0;
  left: ${props => (props.left ? `${props.left}px` : 0)};
  top: ${props => !!props.top && `${props.top}px`};
  transition: left 0.3s, top 0.3s;
  transition-delay: 0.25s;
`;
