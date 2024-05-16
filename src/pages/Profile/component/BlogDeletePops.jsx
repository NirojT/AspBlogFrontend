/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import Toaster from "../../../global/toaster";
import { axios_auth } from "../../../global/config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DeleteBlog = ({ data, open, setOpen, fetchBlogOfUser }) => {
  const [toasterData, setToasterData] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const closeToaster = (value) => {
    setToasterData({
      open: value,
      message: null,
      severity: undefined,
    });
  };

  const deleteBlog = async () => {
    console.log("object")
    try {
      const res = await axios_auth.delete(
        `Blog/delete/${data.id}/${data.user.id}`
      );

      if (res.data.message) {
        await fetchBlogOfUser(data.user.id);
        setToasterData({
          open: true,
          message: "res.data.message",
          severity: "success",
        });
        setOpen(false);
        return;
      }

      setToasterData({
        open: true,
        message: "something went wrong",
        severity: "error",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster data={toasterData} close={closeToaster} />
      <div style={{ width: "100%" }}>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: ".5em",
              padding: ".3em",
            }}
          >
            <div
              style={{
                height: "3em",
                width: "3em",

                borderRadius: "50%",
                padding: "1px",
              }}
            ></div>
            <span
              style={{
                color: "#585858",
                opacity: "0.8",
                fontSize: "1.07rem",
                fontWeight: "bold",
              }}
            ></span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{
                fontSize: ".9rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className="font-bold">
                Are you sure You Waana Delete {data?.title}?
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              marginBottom: "2px",
              paddingLeft: "3em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => deleteBlog()}
              style={{
                borderRadius: "5px",
                color: "red",

                hover: "backgroundColor:red",
                width: "8em",
                letterSpacing: "wider",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{
                borderRadius: "5px",
                color: "2e2e2e",
                backgroundColor: "#red-500",
                hover: "backgroundColor:#red-500/80",
                border: "none",
                width: "8em",
                letterSpacing: "wider",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default DeleteBlog;
