import { toast } from "react-toastify";

export const handleFormErrors = err => {
  if (err.response && err.response.data && err.response.status === 400) {
    for (let key of Object.keys(err.response.data)) {
      toast.error(`${key}: ${err.response.data[key]}`);
    }
  } else {
    console.log(err);
    toast.error(`Something went wrong`);
  }
};

export { requestWithAuth } from "./config";
