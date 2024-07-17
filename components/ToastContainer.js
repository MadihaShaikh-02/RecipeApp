import React, { forwardRef } from "react";
import Toast from "react-native-toast-message";

const ToastContainer = forwardRef((props, ref) => <Toast ref={ref} {...props} />);

export default ToastContainer;
