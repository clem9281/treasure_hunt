import { requestWithAuth } from "./config";

const roomInfoRequest = async token => {
  return requestWithAuth(token).get("/api/adv/init/");
};

export default roomInfoRequest;
