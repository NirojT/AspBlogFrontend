import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/auth/Login";
import Layout from "./pages/layout/layout";
import Home from "./pages/home/Home";

import Reply from "./pages/home/component/Reply";

import AdminLayout from "./pages/admin/layout";
import Account from "./pages/admin/user";
import DashBoard from "./pages/admin/dashBoard/DashBoard";
import Blogs from "./pages/Profile/component/Blogs";
import BlogsUpdate from "./pages/Profile/component/BlogsUpdate";
 

import Notification from "./pages/notification/Notification";
import User from "./pages/Profile/User";
 
import UpdateUserForm from "./pages/admin/dashBoard/UpdateAccount";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="sign-in" element={<Login />} />
        <Route path="" element={<Home />} />
        <Route path="reply/:CId/:BId/:UId" element={<Reply />} />
        <Route path="notification" element={<Notification />} />
        <Route path="user" element={<User />} />
        <Route path="blogs/:UId" element={<Blogs />} />
        <Route path="blogUpdate/:BId/:UId" element={<BlogsUpdate />} />

        <Route path="logout" element={<Login />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<DashBoard />} />
        <Route path="user" element={<Account />} />
        <Route path="update" element={<UpdateUserForm />} />
      </Route>
    </Routes>
  );
};

export default App;
