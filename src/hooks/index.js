import { useState, useEffect } from "react";

export const usePositionFinder = (player, dimension, element) => {
  let [center, setCenter] = useState({ x: null, y: null });

  useEffect(() => {
    const gameArea = document.querySelector(element);
    let height = gameArea.offsetHeight;
    let width = gameArea.offsetWidth;
    if (player.room) {
      setCenter({
        x: width / 2 - (player.room.x * dimension + dimension / 2),
        y: height / 2 - (player.room.y * dimension + dimension / 2)
      });
    }
  }, [dimension, element]);

  return center;
};
