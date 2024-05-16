import { TablePagination } from "@mui/material";
import BlogCard from "./component/BlogCard";
import { useEffect, useState } from "react";
import { styled } from "@mui/system";

import { axios_noauth } from "../../global/config";
import { useGlobalStore } from "../../global/store";

const StyledTablePagination = styled(TablePagination)({
  backgroundColor: "#1a202c", // Dark background for contrast
  color: "#a0aec0", // Light text for readability
  borderRadius: "8px", // Rounded corners for a softer look
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Subtle shadow for depth
  "& .MuiTablePagination-select": {
    // Style the select element
    color: "#a0aec0", // Light text for readability
  },
  "& .MuiIconButton-root": {
    // Style the button elements
    color: "#a0aec0", // Light text for readability
  },
});

const Home = () => {
  const setNoti = useGlobalStore((state) => state.setNoti);

  const fetchNoti = async () => {
    try {
      const userId = localStorage.getItem("id") ?? "";

      const res = await axios_noauth.get(
        `Notification/getNotification/${userId}`
      );

      if (res.data.data) {
        setNoti((res.data.data ?? [])?.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //store

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [length, setLength] = useState(0);
  const [search, setSearch] = useState("");
  // handlers
  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    await fetchData();
  };

  const handleChangePage = async (event, newPage) => {
    console.log("hiii");
    event;
    setPage(newPage);

    await fetchData();
  };

  const fetchData = async () => {
    try {
      // const res = await axios_noauth.get(`Blog/getAll`
      // );

      const res = await axios_noauth.get(
        `Blog/getBlogPagination?pageSize=${rowsPerPage}&pageNumber=${page}`
      );

      if (res.data.data) {
        setData(res.data.data);
        setFilteredData(res.data.data);
        setLength(res.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = async (e) => {
    const sort = e.target.value;
    try {
      let sortedData;
      if (sort === "random") {
        const res = await axios_noauth.get(`Blog/get-all`);
        sortedData = res.data.data;
      }
      if (sort === "recency") {
        const res = await axios_noauth.get(`Blog/getRecentBlog`);
        sortedData = res.data.data;
      }
      if (sort === "popularity") {
        const res = await axios_noauth.get(`Blog/getBlogPopular`);
        sortedData = res.data.data && res.data.data.blogs;
      }
      setPage(0); // Reset pagination

      setFilteredData(sortedData); // Update filteredData with sorted data
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async () => {
    try {
      const res = await axios_noauth.get(`Blog/search?title=${search}`);
      if (res.data.data) {
        setFilteredData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetch data
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    // fetch data

    fetchData();

    setLength(data?.length);
  }, []);

  return (
    <>
      <div className=" flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end gap-3  w-full ">
          <div className="p-2 bg-black  rounded-lg">
            {/*search section*/}
            <div className="">
              <div className="font-bold text-white">Search</div>
              <div className="">
                <input
                  className="border-2 border-black"
                  type="text"
                  placeholder="search "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
              </div>
            </div>
            {/*sorting section*/}
            <div className="">
              <div className="font-extrabold text-2xl text-white"> Sorting</div>
              <select name="sort" id="sort" onChange={handleSort}>
                <option disabled>Sort</option>
                <option value="recency">Recency</option>
                <option value="random">Random</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
        </div>

        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md md:max-w-lg lg:md:max-w-[70em]">
          <div className="text-center">Blogs</div>
          {Array.isArray(filteredData) && filteredData?.length > 0 ? (
            filteredData?.map((post, index) => (
              <BlogCard
                key={index}
                post={post}
                fetchBlogs={fetchData}
                fetchNoti={fetchNoti}
              />
            ))
          ) : (
            <div className="  w-full justify-center flex">
              No Blog Posted Yet 🤷‍♀️
            </div>
          )}
        </div>

        <StyledTablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default Home;
