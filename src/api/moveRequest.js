import { requestWithAuth } from "./config";

const moveRequest = async (token, body) => {
  return requestWithAuth(token).post("/api/adv/move/", body);
};

export default moveRequest;
