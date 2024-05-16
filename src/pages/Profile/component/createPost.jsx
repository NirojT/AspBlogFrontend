/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

 

const CreateBlog = ({
  loading,
  formState,
  post,
  blogState,
  setBlogState,
  handleBlogInputChange,
  handleBlogPost,
}) => {
  const navigate=useNavigate();
    console.log(formState.id);
  return (
    <div>
      <div className="flex justify-between mt-8">
        <div className="text-3xl font-extrabold text-gray-900">Create Blog</div>
        <div
          className="hover:bg-slate-300 cursor-pointer border p-2"
          onClick={() => {
            const user_id = formState?.id;
            console.log(user_id)
            user_id && navigate(`/blogs/${user_id}`);
          }}
        >
          Blogs
        </div>
      </div>
      <form
        key={post ? "postSuccess" : "postFailure"}
        className="mt-8 space-y-6"
        onSubmit={handleBlogPost}
      >
        <div className="rounded-md shadow-sm grid grid-flow-col gap-5">
          <div>
            <label htmlFor="title" className="sr-only">
              title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="input w-full"
              placeholder="title"
              value={blogState.title}
              onChange={handleBlogInputChange}
            />
          </div>
          <div>
            <label htmlFor="content" className="sr-only">
              content
            </label>
            <input
              id="content"
              name="content"
              type="text"
              required
              className="input w-full"
              placeholder="content"
              value={blogState.content}
              onChange={handleBlogInputChange}
            />
          </div>
          <div>
            <label htmlFor="image" className="sr-only">
              image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              required
              className="input w-full"
              placeholder="image"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                setBlogState({
                  ...blogState,
                  image: selectedFile,
                });
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-slate-300 p-2 rounded-lg hover:shadow-lg w-full"
        >
          {loading ? "Creating":"Create"} 
        </button>
      </form>
    </div>
  );
};

export default CreateBlog