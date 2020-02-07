import { requestWithAuth } from "./config";

const statusRequest = async token => {
  return requestWithAuth(token).post("/api/adv/status/");
};

export default statusRequest;
