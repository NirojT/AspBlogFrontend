import logo from "../../../assets/Blog-intro.jpg";

import { IoMdNotificationsOutline } from "react-icons/io";
import { FaBlog } from "react-icons/fa6";
import { MdRememberMe } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

import LogOutClick from "./LogOutClick";
import { useEffect, useState } from "react";
import { useGlobalStore } from "../../../global/store";
import { axios_auth } from "../../../global/config";
import { SignalR } from "../../notification/component/SignalR";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const logOutClick = () => {
    setOpen(true);
  };
  const noti = useGlobalStore((state) => state.noti);

  const navigate = useNavigate();
  // for border
  const activeUrl = useGlobalStore((state) => state.activeUrl);
  const setActiveUrl = useGlobalStore((state) => state.setActiveUrl);
  //for user

  const [logos, setLogos] = useState(null);
  const fetchData = async () => {
    try {
      const id = localStorage.getItem("id");
      if (id) {
        const res = await axios_auth.get(`user/getByid/${id}`);
        if (res.data.data) {
          const user = res.data.data;
          setLogos(user?.imageName);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 w-[4em] h-screen bg-[#1F1F1F] p-4  text-gray-800 font-semibold text-xl border-r-2 border-gray-300  justify-between sticky top-0">
        <SignalR />
        <div className="flex flex-col   ">
          <div className="">
            <img
              src={logos ? logos : logo}
              alt=""
              className="rounded-[2rem] w-[2.4em]"
            />
          </div>
          <div
            className={`mt-[3em] px-[.4em] py-2 rounded-md cursor-pointer select-none delay-150 transition-[.5s] hover:opacity-100
            ${activeUrl === "dashboard" && "border  opacity-100"}`}
            title="dashboard"
            onClick={() => {
              setActiveUrl("dashboard");
              navigate("");
            }}
          >
            <FaBlog size={30} color="#FFFFFF" />
          </div>

          {localStorage.getItem("token") && (
            <div
              className={`mt-[1em] px-[.4em] py-2 rounded-md  cursor-pointer relative select-none delay-150 transition-[.5s] hover:opacity-100 ${
                activeUrl === "notification" &&
                "border border-white opacity-100"
              }`}
              title="notification"
              onClick={() => {
                setActiveUrl("notification");
                navigate("/notification");
              }}
            >
              <span className="absolute top-0 right-0   text-red-600 rounded-full px-1 font-semibold">
                {noti !== 0 && noti}
              </span>
              <IoMdNotificationsOutline
                size={30}
                color="#FFFFFF"
                className=""
              />
            </div>
          )}
          <div
            className={`mt-[1em] px-[.4em] py-2 rounded-md  cursor-pointer select-none delay-150 transition-[.5s] hover:opacity-100 ${
              activeUrl === "User" && "border border-white opacity-100"
            }`}
            title="User"
            onClick={() => {
              setActiveUrl("User");
              navigate("/user");
            }}
          >
            <MdRememberMe size={30} color="#FFFFFF" className="" />
          </div>
        </div>
        {localStorage.getItem("token") && (
          <div
            className={`px-[.4em] py-2 rounded-md cursor-pointer select-none delay-150 transition-[.5s] hover:opacity-100${
              activeUrl === "logout" && " border border-white opacity-100"
            }`}
            title="logout"
            onClick={() => logOutClick()}
          >
            <div className="">
              <SlLogout size={27} color="#FFFFFF" />
            </div>
          </div>
        )}
        {open && <LogOutClick open={open} setOpen={setOpen} />}
      </div>
    </>
  );
};

export default Sidebar;
