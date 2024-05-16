/* eslint-disable react/prop-types */

import { useState } from "react";
import Toaster from "../../../global/toaster";
import { useNavigate } from "react-router-dom";
import { axios_noauth } from "../../../global/config";

const Siginsuccessrm = ({ setSelect }) => {
  const navigate = useNavigate();
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
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const [formState, setFormState] = useState({
    Email: "",
    Password: "",
  });
  const clearForm = () => {
    setFormState({
      Email: "",
      Password: "",
    });
  };

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios_noauth.post(`user/login`, formState);

      if (response.data.token && response.data.role) {
        setLoginSuccessful(true);
        setToasterData({
          open: true,
          message: "login sucessfull",
          severity: "success",
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("id", response.data.id);
        clearForm();

        setTimeout(() => {
          if (response.data.role === "Admin") {
            navigate("/admin");
            return;
          }
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error login user", error);

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
          message: "An error occurred while login user.",
          severity: "error",
        });
      }
    }
  };
  return (
    <div className="flex    justify-center   ">
      <Toaster data={toasterData} close={closeToaster} />
      <div className="  w-[25em]  h-[20em] lg:w-[40em]   p-4  bg-white rounded-lg shadow-lg mt-9">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Sign In
        </h2>
        <form
          key={loginSuccessful ? "loginSuccess" : "loginFailure"}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm flex   gap-5 ">
            <div>
              <label htmlFor="email-address" className="sr-only my-10">
                Email address
              </label>
              <input
                id="email-address"
                name="Email"
                type="email"
                autoComplete="email "
                required
                className="input w-full"
                placeholder="Email address"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="Password"
                type="password"
                autoComplete="current-password"
                required
                className="input w-full"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>
            <p
              className="flex justify-center hover:cursor-pointer text-[.8rem] text-slate-600 hover:bg-slate-200"
              onClick={() => setSelect("r")}
            >
              SignUp
            </p>
            <p
              className="flex justify-center hover:cursor-pointer text-[.8rem] text-slate-600 hover:bg-slate-200"
              onClick={() => setSelect("f")}
            >
              Forgot Password
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="bg-slate-400 p-2 rounded-lg hover:shadow-lg w-full "
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Siginsuccessrm;
