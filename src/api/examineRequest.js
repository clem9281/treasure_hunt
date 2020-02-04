import { requestWithAuth } from "./config";

const examineRequest = async (token, body) => {
  return requestWithAuth(token).post("/api/adv/examine/", body);
};

export default examineRequest;
