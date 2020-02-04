import { requestWithAuth } from "./config";

const pickupRequest = async (token, body) => {
  return requestWithAuth(token).post("/api/adv/take/", body);
};

export default pickupRequest;
