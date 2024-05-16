import { useNavigate } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
const APpBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-500 text-white p-4 flex justify-between">
      <button
        onClick={() => navigate("")}
        className="hover:bg-slate-700 px-3 py-2 rounded"
      >
        DashBoard
      </button>

      <button
        onClick={() => navigate("/admin/user")}
        className="hover:bg-slate-700 px-3 py-2 rounded"
        title="Accont"
      >
        <CgProfile size={30} />
        {localStorage.getItem("token") &&
          localStorage.getItem("name") &&
          localStorage.getItem("name")}
      </button>
    </div>
  );
};

export default APpBar;
