/* eslint-disable react/prop-types */
import { useState } from "react";
import CommentCard from "./CommentCard";
import Toaster from "../../../global/toaster";
 
import { axios_auth } from "../../../global/config";

const Comment = ({
  post,
  handleCommentClick,
  data,
  fetchData,
  setData,
  fetchNoti,
}) => {
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

  const [formState, setFormState] = useState({
    content: "",
    reacts: [],
  });

  const handleCreateComment = async (e) => {
    try {
      if (e.key === "Enter") {
        if (!localStorage.getItem("token")) {
          setToasterData({
            open: true,
            message: "please login  ",
            severity: "warning",
          });

          return;
        }
        if (!formState.content) {
          setToasterData({
            open: true,
            message: "please write something",
            severity: "error",
          });
          return;
        }

        const res = await axios_auth.post(
          `Comment/create/${post.id}/${localStorage.getItem("id")}`,
          formState
        );

        if (res.data.message) {
          setToasterData({
            open: true,
            message: "commented",
            severity: "success",
          });
          setFormState({ content: "", reacts: [] });
          await handleCommentClick();
          await fetchNoti();
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        // If the error response contains an error message, show it in the toaster
        setToasterData({
          open: true,
          message: error.response.data.error,
          severity: "error",
        });
      } else {
        // If the error response does not contain an error message, show a generic error message
        setToasterData({
          open: true,
          message: "An error occurred while commenting.",
          severity: "error",
        });
      }
    }
  };
  return (
    <>
      <Toaster data={toasterData} close={closeToaster} />
      <div className="max-h-[30em] overflow-auto">
        <h2 className="text-lg font-bold mb-2 ml-3">Comments</h2>

        <div className="bg-gray-200 rounded-lg p-2 flex-1">
          <p>
            <strong>post a comment</strong>
          </p>
          <input
            onKeyDown={handleCreateComment}
            className="w-full mt-2"
            type="text"
            value={formState.content}
            onChange={(e) =>
              setFormState({ ...formState, content: e.target.value })
            }
          />
        </div>

        {Array.isArray(data) &&
          data.length > 0 &&
          data
            .filter((i) => i?.referenceCommentId === null)
            .map((comment, index) => (
              <CommentCard
                key={index}
                comment={comment}
                post={post}
                fetchData={fetchData}
                setData={setData}
                fetchNoti={fetchNoti}
              />
            ))}
      </div>
    </>
  );
};

export default Comment;
