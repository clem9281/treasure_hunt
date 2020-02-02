export const LOADED_MAP = "LOADED_MAP";

export const loadMap = mapDict => {
  return {
    type: LOADED_MAP,
    payload: mapDict
  };
};
