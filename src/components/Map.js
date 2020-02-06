import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { connect } from "react-redux";

import { Paper } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";

import Player from "./Player";
import Room from "./Room";
import Cooldown from "./Cooldown";

import { movement } from "../actions";

import { usePositionFinder } from "../hooks";

import * as d3 from "d3";

const data = {
  "17": {
    coordinates: {
      x: 63,
      y: 58
    },
    connections: {
      n: 24,
      e: 42,
      w: 11
    }
  },
  "24": {
    coordinates: {
      x: 63,
      y: 59
    },
    connections: {
      s: 17
    }
  },
  "42": {
    coordinates: {
      x: 64,
      y: 58
    },
    connections: {
      n: 44,
      s: 80,
      e: 118,
      w: 17
    }
  },
  "44": {
    coordinates: {
      x: 64,
      y: 59
    },
    connections: {
      s: 42
    }
  },
  "118": {
    coordinates: {
      x: 65,
      y: 58
    },
    connections: {
      e: 137,
      w: 42
    }
  },
  "137": {
    coordinates: {
      x: 66,
      y: 58
    },
    connections: {
      w: 118
    }
  }
};

// const data = [
//   {
//     date: 2009,
//     wage: 7.25
//   },
//   {
//     date: 2008,
//     wage: 6.55
//   },
//   {
//     date: 2007,
//     wage: 5.85
//   },
//   {
//     date: 1997,
//     wage: 5.15
//   },
//   {
//     date: 1996,
//     wage: 4.75
//   },
//   {
//     date: 1991,
//     wage: 4.25
//   },
//   {
//     date: 1981,
//     wage: 3.35
//   },
//   {
//     date: 1980,
//     wage: 3.1
//   },
//   {
//     date: 1979,
//     wage: 2.9
//   },
//   {
//     date: 1978,
//     wage: 2.65
//   }
// ];

const Map = ({ dimension, gutter, playerColor, mapDict, player, movement }) => {
  let center = usePositionFinder(player, dimension, "#game-area");
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      let rooms = document.querySelector("#rooms");
      let heightOfRooms = rooms.offsetHeight;
      let widthOfRooms = rooms.offsetWidth;
      const svg = d3.select(svgRef.current);
      console.log({ widthOfRooms, heightOfRooms });
      let margin = { top: 20, right: 30, bottom: 30, left: 40 };
      let width = widthOfRooms - margin.left - margin.right;
      let height = heightOfRooms - margin.top - margin.bottom;
      let y = d3.scaleLinear().range([height, 0]);
      let x = d3.scaleLinear().range([0, width]);
      let arrData = d3.entries(data);
      console.log(arrData);
      x.domain(
        d3.extent(data, function(d) {
          return d.value.coordinates.x;
        })
      );
      y.domain([
        0,
        d3.max(data, function(d) {
          return d.value.coordinates.y;
        })
      ]);
      let valueline = d3
        .line()
        .x(function(d) {
          return x(d.value.coordinates.x);
        })
        .y(function(d) {
          return y(d.value.coordinates.y);
        });
      svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var path = svg
        .selectAll("dot")
        .data(arrData)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", function(d) {
          console.log(d);
          return x(d.value.coordinates.x);
        })
        .attr("cy", function(d) {
          return y(d.value.coordinates.y);
        })
        .attr("stroke", "#32CD32")
        .attr("stroke-width", 1.5)
        .attr("fill", "#FFFFFF");
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      svg.append("g").call(
        d3.axisLeft(y).tickFormat(function(d) {
          return "$" + d3.format(".2f")(d);
        })
      );
    }
  }, [svgRef]);
  const createMap = () => {};
  return (
    <GameArea id="game-area">
      <Cooldown />
      <StyledRooms
        // left={center.x}
        // top={center.y}
        id="rooms"
        // height={height}
        // width={width}
      >
        <svg ref={svgRef}></svg>
        {/* <Player
          dimension={dimension}
          player={player}
          playerColor={playerColor}
          gutter={gutter}
        /> */}
        {/* {mapDict &&
          Object.keys(mapDict).map(room => {
            return (
              <Room
                //   red={room === player.room.title}
                room={mapDict[room]}
                key={room}
                dimension={dimension}
                gutter={gutter}
                player={player}
                move={movement}
                mapDict={mapDict}
              />
            );
          })} */}
        {/* </FakeDiv> */}
      </StyledRooms>
    </GameArea>
  );
};

const mapDispatchToProps = { movement };
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  dimension: mapState.dimension,
  gutter: mapState.gutter,
  player: playerState
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
