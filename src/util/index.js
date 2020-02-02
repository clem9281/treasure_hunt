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

export const getCoordinatesFromString = str => {
  let x = Number(str.split(",")[0].slice(1));
  let yString = str.split(",")[1];
  let y = Number(yString.slice(0, yString.length - 1));
  return [x, y];
};

//   const randomPlayerColor = () => {
//     const colors = [
//       "#7f0000",
//       "#4a148c",
//       "#0d47a1",
//       "#e65100",
//       "#004d40",
//       "#1565c0"
//     ];
//     const random = Math.floor(Math.random() * (colors.length - 1));
//     setPlayerColor(colors[random]);
//   };

//   if (!roomIndex || !player) {
//     return (
//       <>
//         <ToastContainer />
//         <FullPageLoader />
//       </>
//     );
//   }
