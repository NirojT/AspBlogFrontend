/* eslint-disable react/prop-types */

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Toaster from "../../../global/toaster";
import { axios_auth, axios_noauth } from "../../../global/config";
import { AiFillDelete } from "react-icons/ai";
import DeleteComment from "./DeleteComment";
const CommentCard = ({ comment, post, fetchData, setData, fetchNoti }) => {
  const [loading, setLoading] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [content, setcontent] = useState(comment?.content);
  const navigate = useNavigate();
  const [reactors, setreactors] = useState([]);

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = () => {
    setOpenDelete(true);
  };
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
  const [reactData, setreactData] = useState({
    type: "",
    userId: localStorage.getItem("id") ?? "",
    blogId: post.id,
    isInBlog: false,
    commentId: comment?.id,
  });

  const handlereactClick = async (type, id) => {
    if (!localStorage.getItem("token")) {
      setToasterData({
        open: true,
        message: "please login",
        severity: "warning",
      });
      setLoading(false);
      setLoadingNext(false);

      return;
    }
    if (type === "upvote") setLoading(true);
    if (type === "downvote") setLoadingNext(true);

    setreactData((prevreactData) => ({
      ...prevreactData,
      type: type,
    }));

    //if same user and same comment same type of react is already present then delete the react
    if (comment?.id === id && comment?.reacts && comment?.reacts.length > 0) {
      const matchingreact = comment?.reacts?.find(
        (react) =>
          react?.user?.email === localStorage.getItem("email") &&
          react?.type === type
      );

      if (matchingreact) {
        console.log("same type of react is already present");
        //delete
        try {
          const res = await axios_noauth.delete(
            `react/delete/${matchingreact.id}?userId=${reactData?.userId}&blogId=${reactData?.blogId}&commentId=${reactData?.commentId}`
          );

          if (res.data.message) {
            setToasterData({
              open: true,
              message: "removed",
              severity: "success",
            });
            setLoading(false);
            setLoadingNext(false);
            await fetchData();
            await fetchNoti();
          }
        } catch (error) {
          console.log(error);
        }

        return;
      }

      //end if
    }

    try {
      const res = await axios_noauth.post(`react/create`, {
        ...reactData,
        type: type,
      });

      if (res.data.message) {
        setToasterData({
          open: true,
          message: reactData?.type === "upvote" ? "upvoted" : "downvoted",
          severity: "success",
        });
        setLoading(false);
        setLoadingNext(false);
        await fetchData();
        await fetchNoti();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    content: content,
    reacts: [],
  };
  const handleShowEdit = (id) => {
    if (comment.id === id) {
      setEditOpen(!editOpen);
    }
  };
  const handleKeyDown = async (e, id) => {
    if (e.key === "Enter") await handleEdit(id);
  };
  const handleEdit = async (id) => {
    try {
      const res = await axios_auth.put(
        `Comment/update/${id}/${post?.id}/${localStorage.getItem("id")}`,
        { ...data }
      );

      console.log(res);
      if (res.data.message) {
        setToasterData({
          open: true,
          message: "updated",
          severity: "success",
        });
        setEditOpen(!editOpen);
        await fetchData();
      }
    } catch (error) {
      console.log(error);
      setToasterData({
        open: true,
        message: error.response.data.error,
        severity: "error",
      });
    }
  };

  //for showing reacters
  const showreacters = (comment, type) => {
    const reacters = comment.reacts?.filter(
      (react) => react?.isInBlog === false && react?.type === type
    );

    const names = reacters?.map((react) => react?.user?.userName);
    setreactors(names);
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <Toaster data={toasterData} close={closeToaster} />
      <div className="flex items-start space-x-2 mt-4">
        <img
          className="w-10 h-10 rounded-full"
          src={comment?.user?.imageName}
          alt={comment?.user?.userName}
        />
        <div className="bg-black rounded-lg p-2 flex-1">
          <p className="text-white">
            <strong>{comment?.user?.name}</strong>
          </p>

          <p className="text-white">{comment?.content}.</p>
          {editOpen && (
            <div className="text-white rounded-lg p-2 flex-1">
              <input
                onKeyDown={(e) => handleKeyDown(e, comment.id)}
                className="w-full text-black mt-2"
                type="text"
                value={content}
                onChange={(e) => setcontent(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="ml-12 mt-2 flex items-center space-x-1">
        <button
          className={`px-3 py-1 ${
            comment?.reacts &&
            comment?.reacts?.length > 0 &&
            comment?.reacts?.find(
              (react) =>
                react?.user?.email === localStorage.getItem("email") &&
                react?.type === "upvote"
            )
              ? "bg-green-500"
              : ""
          } rounded-full mr-2`}
          onClick={() => handlereactClick("upvote", comment?.id)}
        >
          {loading ? "loading" : "Upvote"}
        </button>
        <div
          className="hover:border-b-2 border-black hover:cursor-pointer b  "
          onClick={() => showreacters(comment, "upvote")}
        >
          {
            comment.reacts?.filter(
              (react) => react?.isInBlog === false && react?.type === "upvote"
            ).length
          }
        </div>
        <button
          className={`px-3 py-1 ${
            comment?.reacts?.find(
              (react) =>
                react?.user?.email === localStorage.getItem("email") &&
                react?.type === "downvote"
            )
              ? "bg-red-500"
              : ""
          } rounded-full mr-2`}
          onClick={() => handlereactClick("downvote", comment?.id)}
        >
          {loadingNext ? "loading" : "Downvote"}
        </button>
        <div
          className="hover:border-b-2 border-black hover:cursor-pointer b  "
          onClick={() => showreacters(comment, "downvote")}
        >
          {
            comment.reacts?.filter(
              (react) => react?.isInBlog === false && react?.type === "downvote"
            ).length
          }
        </div>
        <button
          className="text-blue-500 hover:text-blue-300 w-full text-end"
          onClick={() =>
            navigate(`/reply/${comment?.id}/${post?.id}/${comment?.user?.id}`)
          }
        >
          Reply
        </button>
        <div className="flex justify-end">
          {comment?.user?.email === localStorage.getItem("email") && (
            <div
              className="cursor-pointer hover:text-blue-300 text-blue-500   hover:border-black"
              onClick={() => handleShowEdit(comment?.id)}
            >
              edit
            </div>
          )}
        </div>
        <div className="flex justify-end">
          {comment?.user?.email === localStorage.getItem("email") && (
            <div
              className="cursor-pointer hover:text-blue-300 text-blue-500   hover:border-black"
              onClick={() => handleDelete()}
            >
              <AiFillDelete className="" size={20} color="red" />
            </div>
          )}
        </div>
      </div>
      {/*for reacted by card section*/}
      {reactors?.length > 0 && (
        <div className="flex  gap-2">
          <div className="text-sm text-black ml-[4em] font-bold">
            {" "}
            reacted by :{" "}
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
      <DeleteComment
        setData={setData}
        open={openDelete}
        setOpen={setOpenDelete}
        comment={comment}
        post={post}
      />
    </div>
  );
};

export default CommentCard;
