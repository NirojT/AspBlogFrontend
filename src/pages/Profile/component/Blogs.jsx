import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Toaster from "../../../global/toaster";

import { MdDelete } from "react-icons/md";
import DeleteBlog from "./BlogDeletePops";
import { axios_auth } from "../../../global/config";
import { FaEdit } from "react-icons/fa";

const Blogs = () => {
  const { UId } = useParams();
  const navigate = useNavigate();
  // delete states
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const handleDelete = (blog) => {
    setOpenDelete(true);
    setDeleteData(blog);
  };
  const [data, setData] = useState([]);
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

  const fetchBlogOfUser = async (id) => {
    try {
      const res = await axios_auth.get(`Blog/blogOfUser/${id}`);
console.log(res)
      if (res.data.data) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (UId) {
      fetchBlogOfUser(UId);
    }
  }, [UId]);

  return (
    <div className="flex flex-col p-4">
      <div className="text-center my-2 font-extrabold">Blogs</div>
      <Toaster data={toasterData} close={closeToaster} />
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-800 text-white">
                <tr className="text-white">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Content
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Added at
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((blog, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {blog?.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {blog?.content}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={blog?.imageName}
                          className="text-sm text-gray-500"
                        >
                          <img
                            className="w-[4em]"
                            src={blog?.imageName}
                            alt=""
                          />
                        </a>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {blog?.createdDate?.split("T")[0]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-5">
                          <FaEdit
                            color="green"
                            size={30}
                            className="cursor-pointer hover:bg-slate-300"
                            onClick={() =>
                              navigate(`/blogUpdate/${blog?.id}/${UId}`)
                            }
                          />
                          <MdDelete
                            color="red"
                            size={30}
                            className="cursor-pointer hover:bg-red-300"
                            onClick={() => handleDelete(blog)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <td colSpan={5} className="text-center">
                    No Blog Posted
                  </td>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DeleteBlog
        data={deleteData}
        open={openDelete}
        setOpen={setOpenDelete}
        fetchBlogOfUser={fetchBlogOfUser}
      />
    </div>
  );
};

export default Blogs;
