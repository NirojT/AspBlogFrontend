import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toaster from "../../../global/toaster";
import { axios_auth, axios_auth_form } from "../../../global/config";

const BlogsUpdate = () => {
  const [update, setUpdate] = useState(false);
  const { BId, UId } = useParams();
  const [loading, setLoading] = useState(false);

  //for blog
  const [blogState, setBlogState] = useState({
    title: "",
    content: "",
    image: null,
    imageName: "",
  });

  console.log(blogState?.image);

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

  const handleBlogInputChange = (e) => {
    setBlogState({
      ...blogState,
      [e.target.name]: e.target.value,
    });
  };

  //for update
  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios_auth_form.put(`Blog/update/${BId}/${UId}`, {
        ...blogState,
        imageName: "",
      });

      if (res.data) {
        setUpdate(true);
        setToasterData({
          open: true,
          message: "blog updated successfully",
          severity: "success",
        });
        await axios_auth.get(`Blog/blogOfUser/${UId}`);
        setBlogState({
          ...blogState,
          title: "",
          content: "",
          image: null,
          
        });
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
          message: "An error occurred while updating blog.",
          severity: "error",
        });
      }
    }
  };

  const fetchBlogOfUser = async (Bid, Uid) => {
    try {
      const res = await axios_auth.get(`Blog/get/${Bid}/${Uid}`);

      if (res.data.data) {
        const blog = res.data.data;
        setBlogState({
          ...blogState,
          title: blog.title,
          content: blog.content,
          imageName: blog?.imageName,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (BId && UId) {
      fetchBlogOfUser(BId, UId);
    }
  }, [UId]);
  return (
    <>
      {" "}
      <Toaster data={toasterData} close={closeToaster} />
      <div className="flex justify-center p-3 font-extrabold text-3xl w-full">
        Update Blogs
      </div>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-2">
          <div className="w-[30em] h-[30em] border-[.2rem] rounded-lg border-black p-3 m-4">
            <form
              key={update ? "updateSuccess" : "updateFailure"}
              className="mt-8 space-y-6 "
              onSubmit={handleUpdate}
            >
              <div className="rounded-lg     flex flex-col gap-5 ">
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="input w-full"
                    placeholder="title"
                    value={blogState?.title}
                    onChange={handleBlogInputChange}
                  />
                </div>
                <div>
                  <input
                    id="content"
                    name="content"
                    type="text"
                    required
                    className="input w-full"
                    placeholder="content"
                    value={blogState?.content}
                    onChange={handleBlogInputChange}
                  />
                </div>
                <div>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="input w-full"
                    placeholder="image"
                    onChange={(e) => {
                      const url = URL.createObjectURL(e.target.files[0]);
                      setBlogState({
                        ...blogState,
                        imageName: url,
                        image: e.target?.files[0],
                      });
                    }}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-slate-400 p-2 rounded-lg hover:shadow-lg w-full "
                >
                  {loading ? "updating..." : "update"}
                </button>
              </div>
            </form>
          </div>
          <div className="">
            <img
              className="w-[40em] h-[40em] object-contain"
              src={blogState?.imageName}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsUpdate;
