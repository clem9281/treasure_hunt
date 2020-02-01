import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Menu from "./Menu";

import FullPageLoader from "./FullPageLoader";
import LinkToast from "./LinkToast";

import { requestWithAuth } from "../util";

toast.configure({
  autoClose: 5000,
  draggable: false,
  closeOnClick: false
});

// beginning to change into hooks
export default function WorldPage() {
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
  return (
    <main>
      <Menu></Menu>
      <ToastContainer />
      <div>
        <h1>Here Begins Our World</h1>
      </div>
    </main>
  );
}
