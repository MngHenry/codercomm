import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function AlertMsg() {
  return (
    <ToastContainer position="top-right" hideProgressBar={false} pauseOnHover>
      AlertMsg
    </ToastContainer>
  );
}

export default AlertMsg;
