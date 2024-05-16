 
import { Outlet } from "react-router";
import SideBarAdmin from "./dashBoard/component/SideBarAdmin";
 
 
 

const AdminLayout = () => {
  //store
 

 
  return (
    <>
      <div className="flex ">
        <SideBarAdmin />

        <div className="w-full overflow-x-hidden">
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminLayout;
