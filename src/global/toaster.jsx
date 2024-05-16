/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
import { Snackbar } from "@mui/material";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";


const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function TransitionUp(props) {
  return <Slide {...props} direction="left" />;
}

const Toaster = ({ data, close }) => {
  const handleClose = () => {
    close(false);
  };

  return (
    <div>
      <Snackbar
        open={data?.open}
        autoHideDuration={8000}
        onClose={handleClose}
        sx={{
          display: data?.open ? "block" : "none",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={TransitionUp}
        key={TransitionUp ? TransitionUp.name : ""}
      >
        <Alert onClose={handleClose} severity={data?.severity}>
          {data?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toaster;
