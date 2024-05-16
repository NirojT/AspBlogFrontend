import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
const AppBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-500 text-white p-4 flex justify-between">
      <button
        onClick={() => navigate("")}
        className="hover:bg-slate-700 px-3 py-2 rounded"
      >
        Home
      </button>
      {localStorage.getItem("token") && (
        <button
          onClick={() => navigate("/notification")}
          className="hover:bg-slate-700 px-3 py-2 rounded"
          title="Notication"
        >
          <IoMdNotificationsOutline size={30} />
        </button>
      )}

      <button
        onClick={() => navigate("/profile")}
        className="hover:bg-slate-700 px-3 py-2 rounded"
        title="Profile"
      >
        <div className="flex gap-3">
          <CgProfile size={30} />
          {localStorage.getItem("token") &&
            localStorage.getItem("name") &&
            localStorage.getItem("name")}
        </div>
      </button>
    </div>
  );
};

export default AppBar;
