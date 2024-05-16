/* eslint-disable react/prop-types */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
 

 
 
import { useNavigate } from "react-router-dom";
 

import { BiLogOut } from "react-icons/bi";
import { useGlobalStore } from "../../../global/store";
import Toaster from "../../../global/toaster";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LogOutClick = ({
  open,
  setOpen,
} ) => {
  const navigate = useNavigate();
  const setUser = useGlobalStore((state ) => state.setUser);

  // states
  const [loading, setLoading] = React.useState(false);
  // toaster states
  const [toasterData, setToasterData] =
    React.useState  
  (  {
      open: false,
      message: "",
      severity: undefined,
    })
  // Close Toaster
  const closeToaster = (value ) => {
    setToasterData({
      open: value,
      message: null,
      severity: undefined,
    });
  };

  const confirmLogOut = async () => {
    try {
      setLoading(true);
      localStorage.clear();
      setToasterData({
        open: true,
        message: "log out success ",
        severity: "success",
      });
      setUser({ token: "", role: "" });
      navigate("/sign-in");

      return;
    } catch (error) {
      setToasterData({
        open: true,
        message: "Something error ",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <Toaster data={toasterData} close={closeToaster} />;
      <div className="w-full">
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className="relative flex flex-col items-center mt-[.5em] space-y-[.3em]">
            <BiLogOut className="" size={50} />

            <span className="text-black text-[1.07rem] font-bold ">
              You are about to Log Out!
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="text-[.9rem] text-center flex flex-col">
              <span className="text-black text-[1.07rem] font-semibold">
                Are you sure?
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="mb-2 px-[3em] w-full     ">
            <button
              onClick={() => confirmLogOut()}
              className="rounded btn text-[#fff]   hover:bg-[#585858] w-[8em] tracking-wider mr-[3em] bg-red-800"
            >
              {loading ? "LogginOut..." : "LogOut"}
            </button>
            <button
              className="rounded btn text-[#fff]  bg-slate-400 hover:bg-slate-500/80 border-none w-[8em] tracking-wider mr-[10em]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default LogOutClick;
