import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Toaster from "../../global/toaster";
import DeleteUserPops from "./component/DeleteUserPops";
import { axios_auth, axios_auth_form } from "../../global/config";
import UpdateUser from "./component/UpdateUser";
import CreateBlog from "./component/createPost";
import { AiFillDelete } from "react-icons/ai";

const User = () => {
  // delete states
  const [openDelete, setOpenDelete] = useState(false);
  const [action, setAction] = useState(false);
  const [actionType, setActionType] = useState("");

  const handleDelete = () => {
    setOpenDelete(true);
  };
  const [update, setUpdate] = useState(false);
  const [post, setPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    id: "",
    userName: "",
    email: "",
    password: "",
  });

  //for blog
  const [blogState, setBlogState] = useState({
    title: "",
    content: "",
    image: null,
  });

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

  const fetchData = async () => {
    try {
      const id = localStorage.getItem("id");
      if (id) {
        const res = await axios_auth.get(`user/getByid/${id}`);
        if (res.data.data) {
          const user = res.data.data;
          setFormState({
            ...formState,
            userName: user?.userName,
            email: user?.email,
            id: user?.id,
          });
        }
      }
    } catch (error) {
      setToasterData({
        open: true,
        message: "failed to fetch data",
        severity: "error",
      });
    }
  };

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlogInputChange = (e) => {
    setBlogState({
      ...blogState,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios_auth.put(
        `user/update/${formState.id}`,
        formState
      );
      if (res.data) {
        setUpdate(true);
        setToasterData({
          open: true,
          message: "user updated successfully",
          severity: "success",
        });

        await fetchData();
        setFormState({ ...formState, password: "" });
        setLoading(false);
      }
    } catch (error) {
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
          message: "An error occurred while registering user.",
          severity: "error",
        });
      }
    }
  };
  const handleBlogPost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios_auth_form.post(
        `Blog/create/${formState.id}`,
        blogState
      );
      if (res.data) {
        setPost(true);
        setToasterData({
          open: true,
          message: "Blog created successfully",
          severity: "success",
        });
        localStorage.setItem("email", formState.email);

        await fetchData();
        setBlogState({ ...blogState, title: "", content: "", image: null });
        setLoading(false);
      }
    } catch (error) {
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
          message: "An error occurred while creating blog.",
          severity: "error",
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/sign-in");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  bg-slate-200 py-4 px-2 sm:px-6 lg:px-7">
      <Toaster data={toasterData} close={closeToaster} />
      <div className="mt-5 w-[70em]    p-2 rounded-xl shadow-md md:max-w-lg lg:md:max-w-[70em] max-h-[40em]  ">
        <div className="flex justify-end text-2xl font-extrabold mr-10 ">
          <div className="border-b-2 border-slate-400"> User Info</div>
        </div>
        <div className="flex justify-end">
          <div className="">
            <div className="font-bold">
              UserName:{formState?.userName ?? "test"}
            </div>
            <div className="font-bold">
              email:{formState?.email ?? "test@gmail.com"}
            </div>
          </div>
        </div>
        <div className="flex justify-end"></div>
        <h2
          className="mt-10 text-center text-3xl font-extrabold text-gray-900
        border-b-2 border-slate-400"
        >
          <div
            className="rounded-md hover:cursor-pointer hover:bg-slate-300 bg-black  border-2 text-white  cursor-pointer"
            onClick={() => {
              setAction(!action);
              setActionType("");
            }}
          >
            Action
          </div>
        </h2>
        {action && (
          <div className="w-full flex justify-center gap-10 my-4">
            <button
              className="bg-slate-300 p-2 hover:shadow-lg rounded-lg"
              onClick={() => setActionType("p")}
            >
              Profile
            </button>
            <button
              className="bg-slate-300 p-2 hover:shadow-lg rounded-lg"
              onClick={() => setActionType("b")}
            >
              Blog
            </button>
          </div>
        )}
        {action && actionType === "p" && (
          <div>
            <button
              title="delete user"
              className=" w-full   flex justify-end"
              onClick={() => handleDelete()}
            >
              <AiFillDelete className="" size={30} color="red" />
            </button>
            <UpdateUser
              loading={loading}
              update={update}
              formState={formState}
              handleInputChange={handleInputChange}
              handleUpdate={handleUpdate}
            />
          </div>
        )}
        {action && actionType === "b" && (
          <div>
            <CreateBlog
              loading={loading}
              formState={formState}
              setBlogState={setBlogState}
              post={post}
              blogState={blogState}
              handleBlogInputChange={handleBlogInputChange}
              handleBlogPost={handleBlogPost}
            />
          </div>
        )}
      </div>
      <DeleteUserPops open={openDelete} setOpen={setOpenDelete} />
    </div>
  );
};
export default User;
