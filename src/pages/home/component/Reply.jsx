import { useCallback, useEffect, useState } from "react";
import ReplyCard from "./ReplyCard";
import {   useParams } from "react-router-dom";

import Toaster from "../../../global/toaster";
import { axios_auth, axios_noauth } from "../../../global/config";

const Reply = () => {
  
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

  const [editOpen, setEditOpen] = useState(false);

  const { CId, BId, UId } = useParams();
  const [data, setData] = useState([]);
  const [replyTo, setReplyTo] = useState();

  const [formState, setFormState] = useState({
    Id: CId,
    content: "",
    reacts: [],
  });

  const fetchComment = useCallback(async () => {
    const res = await axios_noauth.get(`Comment/get/${CId}/${BId}/${UId}`);
    if (res.data.data) {
      setData(res.data.data);
    }
  }, []);

  const [commentId, setCommentId] = useState([]);

  const handleShowReply = (comment) => {
    setReplyTo(comment);
    if (commentId.find((item) => item === comment.id)) {
      setEditOpen(!editOpen);
    } else {
      setCommentId([...commentId, comment?.id]);
      setEditOpen(true);
    }
  };

  const handleCreateComment = async () => {
    try {
      if (!localStorage.getItem("token")) {
        setToasterData({
          open: true,
          message: "please login",
          severity: "warning",
        });
        
        return;
      }
      if (!formState.content) {
        setToasterData({
          open: true,
          message: "cannot be empty",
          severity: "error",
        });
        return;
      }

      const res = await axios_auth.post(
        `Comment/reply/create/${BId}/${localStorage.getItem("id")}`,
        { ...formState }
      );

      if (res.data.message) {
        setToasterData({
          open: true,
          message: "replied",
          severity: "success",
        });
        setFormState({ content: "", reacts: [], Id: CId });
        setEditOpen(!editOpen);
        await fetchComment();
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
          message: "internal server error.",
          severity: "error",
        });
      }
    }
  };

  useEffect(() => {
    if (CId && BId && UId) {
      fetchComment();
      return;
    }
  }, [CId, BId, UId]);
  return (
    <div className=" flex justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster data={toasterData} close={closeToaster} />
      <div className="w-full  p-6 rounded-lg shadow-md max-h-[50em] overflow-y-scroll">
        <h2 className="text-lg font-bold mb-2 ml-3 text-center text-gray-900">
          Reply Section
        </h2>
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((item, index) => (
            <ReplyCard
              key={index}
              data={item}
              handleShowReply={handleShowReply}
            />
          ))}

        {editOpen && (
          <div className="mt-4 flex items-center space-x-2">
            <span className="font-bold text-gray-700">
              {replyTo?.appUser?.userName} {replyTo?.content}
            </span>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment();
                }
              }}
              type="text"
              value={formState.content}
              onChange={(e) =>
                setFormState({ ...formState, content: e.target.value })
              }
              placeholder="reply"
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reply;
