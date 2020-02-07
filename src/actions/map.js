export const LOADED_MAP = "LOADED_MAP";

export const loadMap = (mapDict, d3Data, links) => {
  return {
    type: LOADED_MAP,
    payload: { mapDict, d3Data, links }
  };
};
