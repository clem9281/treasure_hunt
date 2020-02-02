import { useState, useEffect } from "react";
import { getCoordinatesFromString } from "../util";

export const usePositionFinder = (player, dimension, element) => {
  let [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const gameArea = document.querySelector(element);
    let height = gameArea.offsetHeight;
    let width = gameArea.offsetWidth;
    let [x, y] = getCoordinatesFromString(player.currentRoom.coordinates);
    if (player.currentRoom.coordinates) {
      setCenter({
        x: width / 2 - (x * dimension + dimension / 2),
        y: height / 2 + (y * dimension - dimension / 2)
      });
    }
  }, [dimension, element, player.currentRoom.coordinates]);
  return center;
};

export const useCoordinates = (obj, dimension) => {
  let [{ x, y }, setCoordinates] = useState({ x: null, y: null });
  useEffect(() => {
    let [x, y] = getCoordinatesFromString(obj.coordinates);
    setCoordinates({ x, y });
  }, [dimension, obj]);
  return { x, y };
};
