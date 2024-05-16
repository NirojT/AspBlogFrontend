/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from "react";
import PopularBlogCard from "./component/PopularBlogCard";
import PopularBloggerCard from "./component/PopularBloggerCard";
import {
  fetchBlogsAndUser,
  fetchNoOComments,
  fetchNoOCommentsByDate,
  fetchNoOfBlogs,
  fetchNoOfBlogsByDate,
  fetchNoOfReact,
  fetchNoOfReactByDate,
  fetchNoOfUsers,
 
} from "../helper";
import { useNavigate } from "react-router-dom";
import Toaster from "../../../global/toaster";

const DashBoard = () => {
  const [isDate, setIsDate] = useState(false);
  // toaster states
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
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [noOfBlogs, setNoOfBlogs] = useState(0);
  const [noOfComments, setNoOfComments] = useState(0);
  const [noOfUsers, setNoOfUsers] = useState(0);
  const [react, setReact] = useState({ upvote: 0, downvote: 0 });
  const [data, setData] = useState([]);
  const popularBlogs = [...(data?.blogs ?? [])];

  const popularBloggers = [...(data?.users ?? [])];
  console.log("object");
  //fetch section
  useEffect(() => {
    const fetchData = async () => {
      const b = await fetchNoOfBlogs();
      const c = await fetchNoOComments();
      const r = await fetchNoOfReact();
      const u = await fetchNoOfUsers();
      const populars = await fetchBlogsAndUser();

      setNoOfBlogs(b);
      setNoOfComments(c);
      setReact(r);
      setNoOfUsers(u);
      setData(populars);
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (startDate === "" || endDate === "") {
      setToasterData({
        open: true,
        message: "Please select start and end date",
        severity: "error",
      });
      return;
    }
    const b = await fetchNoOfBlogsByDate(startDate, endDate);
    const c = await fetchNoOCommentsByDate(startDate, endDate);
    const r = await fetchNoOfReactByDate(startDate, endDate);
  
    const populars = await fetchBlogsAndUser();

    setNoOfBlogs(b);
    setNoOfComments(c);
    setReact(r);
     
    setData(populars);
  };

  useEffect(() => {
    if (localStorage.getItem("role") !== "Admin") {
      navigate("/sign-in");
    }
  }, []);
  return (
    <div className="p-4 select-none">
      <Toaster data={toasterData} close={closeToaster} />
      <div className="mb-4">
        <div
          className="hover:bg-black hover:text-white shadow-lg hover:cursor-pointer"
          onClick={() => setIsDate((prev) => !prev)}
        >
          Select Date
        </div>
        {isDate && (
          <div className=" my-4">
            <label className="mr-2 font-bold">From:</label>
            <input type="date" onChange={(e) => setStartDate(e.target.value)} />
            <label className="ml-4 mr-2 font-bold"> To:</label>
            <input type="date" onChange={(e) => setEndDate(e.target.value)} />

            <button
              className="bg-black  text-white  rounded-lg hover:shadow-lg p-2  mx-4 "
              onClick={() => handleSearch()}
            >
              find
            </button>
          </div>
        )}
      </div>
      {/*no of  section*/}
      <div className="grid grid-cols-5 gap-3  ">
        {/*card start*/}
        <div className="  border-[.1px] border-[#F3CEFF] h-full  rounded-[1.8em] bg-[#F3CEFF]   transform transition-transform duration-300 ease-in-out hover:shadow-md  hover:scale-105  ">
          <div className="mt-[4em] mb-[3em] flex  justify-evenly  ">
            <div className="font-sans"> No. of Blogs</div>
          </div>
          <div className="font-sans flex justify-evenly mb-[5em]    ">
            <div className="font-bold text-[1.5em]  @[450px]:text-[1.2em] @[800px]:text-[1.7em] ">
              {noOfBlogs}
            </div>

            <div className="bg-green-300 text-[1em] opacity-0 ">s</div>
          </div>
        </div>
        {/*card end*/}
        {/*card start*/}
        <div className="  border-[.1px] border-[#F3CEFF] h-full  rounded-[1.8em] bg-[#F3CEFF]   transform transition-transform duration-300 ease-in-out hover:shadow-md  hover:scale-105  ">
          <div className="mt-[4em] mb-[3em] flex  justify-evenly  ">
            <div className="font-sans"> No. of Comments </div>
          </div>
          <div className="font-sans flex justify-evenly mb-[5em]    ">
            <div className="font-bold text-[1.5em]  @[450px]:text-[1.2em] @[800px]:text-[1.7em] ">
              {noOfComments}
            </div>

            <div className="bg-green-300 text-[1em] opacity-0 ">s</div>
          </div>
        </div>
        {/*card end*/}
        {/*card start*/}
        <div className="  border-[.1px] border-[#F3CEFF] h-full  rounded-[1.8em] bg-[#F3CEFF]   transform transition-transform duration-300 ease-in-out hover:shadow-md  hover:scale-105  ">
          <div className="mt-[4em] mb-[3em] flex  justify-evenly  ">
            <div className="font-sans"> No. of Upvote</div>
          </div>
          <div className="font-sans flex justify-evenly mb-[5em]    ">
            <div className="font-bold text-[1.5em]  @[450px]:text-[1.2em] @[800px]:text-[1.7em] ">
              {react?.upvote}
            </div>

            <div className="bg-green-300 text-[1em] opacity-0 ">s</div>
          </div>
        </div>
        {/*card end*/}
        {/*card start*/}
        <div className="  border-[.1px] border-[#F3CEFF] h-full  rounded-[1.8em] bg-[#F3CEFF]   transform transition-transform duration-300 ease-in-out hover:shadow-md  hover:scale-105  ">
          <div className="mt-[4em] mb-[3em] flex  justify-evenly  ">
            <div className="font-sans"> No. of Downvote </div>
          </div>
          <div className="font-sans flex justify-evenly mb-[5em]    ">
            <div className="font-bold text-[1.5em]  @[450px]:text-[1.2em] @[800px]:text-[1.7em] ">
              {react?.downvote}
            </div>

            <div className="bg-green-300 text-[1em] opacity-0 ">s</div>
          </div>
        </div>
        {/*card end*/}
        {/*card start*/}
        <div className="  border-[.1px] border-[#F3CEFF] h-full  rounded-[1.8em] bg-[#F3CEFF]   transform transition-transform duration-300 ease-in-out hover:shadow-md  hover:scale-105  ">
          <div className="mt-[4em] mb-[3em] flex  justify-evenly  ">
            <div className="font-sans"> No. of User </div>
          </div>
          <div className="font-sans flex justify-evenly mb-[5em]    ">
            <div className="font-bold text-[1.5em]  @[450px]:text-[1.2em] @[800px]:text-[1.7em] ">
              {noOfUsers}
            </div>

            <div className="bg-green-300 text-[1em] opacity-0 ">s</div>
          </div>
        </div>
        {/*card end*/}
      </div>
      {/*Top of  section*/}
      {/*blogs*/}
      <div className="text-center font-extrabold m-10">Top 10 Blogs</div>
      <div className="grid grid-cols-5 gap-3 max-h-[30em] overflow-auto ">
        {popularBlogs?.slice(0, 10)?.map((blog, index) => (
          <PopularBlogCard key={index} blog={blog} />
        ))}
      </div>
      {/*users*/}
      <div className="text-center font-extrabold m-10">Top 10 Users</div>
      <div className="grid grid-cols-5 gap-3 max-h-[30em] overflow-auto ">
        {popularBloggers?.map((blogger, index) => (
          <PopularBloggerCard key={index} blogger={blogger} />
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
