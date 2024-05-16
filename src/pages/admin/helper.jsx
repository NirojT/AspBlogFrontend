import { axios_auth, axios_noauth } from "../../global/config";

export const fetchNoOfBlogs = async () => {
  try {
    const res = await axios_auth.get("Blog/get-count");

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchNoOComments = async () => {
  try {
    const res = await axios_auth.get("Comment/get-count");

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchNoOfReact = async () => {
  try {
    const res = await axios_auth.get("React/get-count");

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchNoOfUsers = async () => {
  try {
    const res = await axios_auth.get("user/get-count");

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

//bloggers and blogs
export const fetchBlogsAndUser = async () => {
  try {
    const res = await axios_noauth.get(`Blog/getBlogPopular`);
 
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
/////////////////////////////////
//now use date to be fetched
export const fetchNoOfBlogsByDate = async (from, to) => {
  try {
    const res = await axios_auth.get(
      `Blog/get-countByDate?from=${from}&to=${to}`
    );

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchNoOCommentsByDate = async (from, to) => {
  try {
    const res = await axios_auth.get(
      `Comment/get-countByDate?from=${from}&to=${to}`
    );

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchNoOfReactByDate = async (from, to) => {
  try {
    const res = await axios_auth.get(
      `React/get-countByDate?from=${from}&to=${to}`
    );

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
 
