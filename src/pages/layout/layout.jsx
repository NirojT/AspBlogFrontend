 
import { Outlet } from "react-router";
 import { useNavigate } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import { useEffect } from "react";
 

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('role')=="Admin"){
     navigate("/admin/");
    }
  }, []);

 

 
  return (
    <>
      <div className="flex ">
        <Sidebar />

        <div className="w-full overflow-x-hidden">
         

          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
