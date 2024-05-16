/* eslint-disable react/prop-types */
import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { axios_auth } from "../../../global/config";
import Toaster from "../../../global/toaster";

``;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteComment = ({ open, setOpen, comment, post, setData }) => {
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
  const fetchData = async () => {
    try {
      const res = await axios_auth.get(`Comment/getCommentofBlog/${post?.id}`);
      if (res.data.data) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async () => {
    try {
      const res = await axios_auth.delete(
        `Comment/delete/${comment?.id}/${post?.id}/${comment?.user.id}`
      );

      if (res.data.message) {
        setToasterData({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        setOpen(false);
        fetchData();

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
                Are you sure You Wanaa delete Comment?
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
              onClick={() => deleteComment()}
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

export default DeleteComment;
