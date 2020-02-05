export const IS_COOLING_DOWN = "IS_COOLING_DOWN";
export const COOLDOWN_COMPLETE = "COOLDOWN_COMPLETE";
export const HAS_COOLDOWN_ERROR = "HAS_COOLDOWN_ERROR";

export const wait = cooldown => {
  return async dispatch => {
    dispatch({ type: IS_COOLING_DOWN });
    return new Promise(resolve =>
      setTimeout(() => {
        dispatch({ type: COOLDOWN_COMPLETE });
        resolve();
      }, cooldown * 1000)
    );
  };
};
