import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import { connect } from "react-redux";

import { Paper } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";

import Cooldown from "./Cooldown";

import { movement } from "../actions";

import * as d3 from "d3";
import { getCoordinatesFromString } from "../util";
import { theme } from "./styledComponents/ThemeProvider";
import { toast } from "react-toastify";
import { Tooltip } from "@material-ui/core";

const Map = ({
  dimension,
  gutter,
  playerColor,
  d3Data,
  links,
  player,
  movement,
  mapDict
}) => {
  const svgRef = useRef(null);
  let [[xDomain, yDomain], setDomains] = useState([null, null]);
  let [group, setGroup] = useState(null);
  let token = localStorage.getItem("token");

  let move = useCallback(
    e => {
      if (player.isCoolingDown) {
        toast.info(`You can't move while you are cooling down`);
      } else {
        movement(
          token,
          player.currentRoom,
          mapDict,
          e,
          player.willPickUp,
          player
        );
      }
    },
    [mapDict, movement, player, token]
  );

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
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
      let div = svg
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0)
        .style("text-align", "center")
        .style("width", "60px")
        .style("height", "28px")
        .style("padding", "2px")
        .style("font", "12px sans-serif")
        .style("background", "lightsteelblue")
        .style("border", "0px")
        .style("border-radius", "8px")
        .style("pointer-events", "none");

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
          console.log("here");
          div
            .transition()
            .duration(200)
            .style("opacity", 0.9);
          div
            .html(d.key + "<br/>")
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
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
    // this useEffect is still getting called every time we change the player state
    if (group) {
      group.selectAll("rect").each(function() {
        let current = d3.select(this);
        current.on("click", function(d, i) {
          move(d["key"]);
        });
      });
    }
  }, [group, move]);

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
    <StyledParent>
      <Cooldown />
      <GameArea id="game-area">
        <StyledRooms id="rooms">
          <svg ref={svgRef}></svg>
        </StyledRooms>
      </GameArea>
    </StyledParent>
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);
export const GameArea = styled(Paper)`
  box-shadow: none;
  padding: 0;
  height: 100%;
  border: 3px solid ${yellow[700]};
  position: relative;
  overflow: scroll;
  max-height: 500px;
`;

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
export const StyledParent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// export const Tooltip = styled.div`
//   position: absolute;
//   text-align: center;
//   width: 60px;
//   height: 28px;
//   padding: 2px;
//   font: 12px sans-serif;
//   background: lightsteelblue;
//   border: 0px;
//   border-radius: 8px;
//   pointer-events: none;
// `;
