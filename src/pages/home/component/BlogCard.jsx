/* eslint-disable react/prop-types */

import { useState } from "react";

import Comment from "./Comment";

import Toaster from "../../../global/toaster";
import { axios_noauth } from "../../../global/config";
const BlogCard = ({ post, fetchBlogs, fetchNoti }) => {
  const [loading, setLoading] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [reactors, setReactors] = useState([]);
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
  const [showComments, setShowComments] = useState(false);
  const [reactData, setReactData] = useState({
    type: "",
    userId: localStorage.getItem("id") ?? "",
    blogId: post.id,
    commentId: "",
  });
  const [reactDataCreate, setReactDataCreate] = useState({
    type: "",
    userId: localStorage.getItem("id") ?? "",
    BlogId: post?.id,
    commentId: null,
    isInBlog: true,
  });
  const fetchData = async () => {
    try {
      const res = await axios_noauth.get(
        `Comment/getCommentofBlog/${post?.id}`
      );
      if (res.data.data) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toggleComments = () => {
    setShowComments(!showComments);
    handleCommentClick();
  };
  const [data, setData] = useState([]);

  const handleCommentClick = async () => {
    try {
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReactClick = async (type) => {
    if (!localStorage.getItem("token")) {
      setToasterData({
        open: true,
        message: "please Login",
        severity: "warning",
      });
      return;
    }
    if (type === "upvote") setLoading(true);
    if (type === "downvote") setLoadingNext(true);
    setReactData((prevReactData) => ({
      ...prevReactData,
      type: type,
    }));
    setReactDataCreate((prevReactData) => ({
      ...prevReactData,
      type: type,
    }));

    //if same user and same type of react is already present then delete the react
    const matchingReact = post?.react?.find(
      (react) =>
        react?.user?.email === localStorage.getItem("email") &&
        react?.type === type
    );

    if (matchingReact) {
      console.log("same type of react is already present");
      //delete
      try {
        const res = await axios_noauth.delete(
          `React/delete/${matchingReact.id}?userId=${reactData?.userId}&blogId=${reactData?.blogId}&commentId=${reactData?.commentId}`
        );

        if (res.data.message) {
          setToasterData({
            open: true,
            message: "removed",
            severity: "success",
          });
          setLoading(false);
          setLoadingNext(false);
          await fetchBlogs();
        }
      } catch (error) {
        console.log(error);
      }

      return;
    }

    try {
      const res = await axios_noauth.post(`React/create`, {
        ...reactDataCreate,
        type: type,
      });

      if (res.data.message) {
        setToasterData({
          open: true,
          message: reactDataCreate?.type === "upvote" ? "upvoted" : "downvoted",
          severity: "success",
        });
        await fetchNoti();
        setLoading(false);
        setLoadingNext(false);
        await fetchBlogs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //for showing reacters
  const showReacters = (post, type) => {
    const reacters = post.react?.filter(
      (react) => react?.isInBlog && react?.type === type
    );
    const names = reacters?.map((react) => react?.user?.userName);
    setReactors(names);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <Toaster data={toasterData} close={closeToaster} />
      <div className="uppercase tracking-wide text-sm text-white  bg-slate-800 font-semibold flex justify-center   ">
        {post?.user?.userName} Posted
      </div>
      <div className="flex justify-center   mt-1 text-lg leading-tight font-medium text-black  ">
        title: {post?.title}
      </div>
      <div className=" ">
        <div className=" ">
          <a href={post?.imageName}>
            <img
              className="h-[5em] w-[5em] object-cover  "
              src={post?.imageName}
              alt={post?.title}
            />
          </a>
        </div>
        <div className="p-8">
          <p className="mt-2 text-gray-500">{post.description}</p>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex gap-3">
        <button
          className={`hover:bg-slate-400 px-3 py-1 ${
            post.react?.find(
              (react) =>
                post.comments === null &&
                react?.isInBlog &&
                react?.user?.email === localStorage.getItem("email") &&
                react?.type === "upvote"
            )
              ? "bg-green-500"
              : ""
          } rounded-full mr-2`}
          onClick={() => handleReactClick("upvote")}
        >
          {loading ? "loading" : "Upvote"}
        </button>
        <div
          className="hover:border-b-2 border-black hover:cursor-pointer b  "
          onClick={() => showReacters(post, "upvote")}
        >
          {
            post.react?.filter(
              (react) => react?.isInBlog && react?.type === "upvote"
            ).length
          }
        </div>

        <button
          className={`hover:bg-slate-400 px-3 py-1 ${
            post.react?.find(
              (react) =>
                post.comments === null &&
                react?.isInBlog &&
                react?.user?.email === localStorage.getItem("email") &&
                react?.type === "downvote"
            )
              ? "bg-red-500"
              : ""
          } rounded-full mr-2`}
          onClick={() => handleReactClick("downvote")}
        >
          {loadingNext ? "loading" : "Downvote"}
        </button>
        <div
          className="hover:border-b-2 border-black hover:cursor-pointer b  "
          onClick={() => showReacters(post, "downvote")}
        >
          {
            post.react?.filter(
              (react) => react?.isInBlog && react?.type === "downvote"
            ).length
          }
        </div>

        <button
          className={`ml-10 px-3 py-1 hover:bg-slate-400 text-black rounded-full`}
          onClick={toggleComments}
        >
          Comments
        </button>
      </div>
      {/*for reacted by card section*/}
      {reactors?.length > 0 && (
        <div className="flex  gap-2">
          <div className="text-sm text-black ml-2 font-bold">
            {" "}
            Reacted by :{" "}
          </div>
          <div className="flex gap-2">
            {reactors.map((reactor, index) => (
              <div key={index} className="text-sm text-black">
                {reactor}
              </div>
            ))}
          </div>
        </div>
      )}
      {showComments && (
        <Comment
          post={post}
          handleCommentClick={handleCommentClick}
          data={data}
          fetchData={fetchData}
          setData={setData}
          fetchNoti={fetchNoti}
        />
      )}
    </div>
  );
};

export default BlogCard;
