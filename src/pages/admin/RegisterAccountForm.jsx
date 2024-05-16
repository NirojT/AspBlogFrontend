import { useState } from "react";
import Toaster from "../../global/toaster";
import { useNavigate } from "react-router-dom";
import {  axios_auth_form } from "../../global/config";

const RegisteruserForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
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

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    image: null,
  });
  const clearForm = () => {
    setFormState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      image: null,
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
    setLoading(true);
    if (formState.password !== formState.confirmPassword) {
      setToasterData({
        open: true,
        message: "password didnot matched",
        severity: "error",
      });
      return;
    }

    try {
      const response = await axios_auth_form.post(
        `user/register?roleName=${formState.role}`,
        formState
      );

      if (response.data.message) {
        setRegistrationSuccessful(true);
        setToasterData({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setLoading(false);
        clearForm();
      }
    } catch (error) {
      console.error("Error registering user", error);

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
          message: "An error occurred while registering user.",
          severity: "error",
        });
      }
    }
  };
  return (
    <div className="flex    justify-center   ">
      <Toaster data={toasterData} close={closeToaster} />

      <div className="  w-[25em]  h-[25em] lg:w-[40em]   p-4  bg-white rounded-lg shadow-lg mt-9">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Create user
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6  "
          key={
            registrationSuccessful
              ? "registrationSuccess"
              : "registrationFailure"
          }
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm grid grid-cols-2 gap-5  ">
            <div>
              <label htmlFor="username" className="sr-only ">
                username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="input w-full"
                placeholder="name"
                onChange={handleInputChange}
                value={formState.username}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only my-10">
                email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email "
                required
                className="input w-full"
                placeholder="email"
                onChange={handleInputChange}
                value={formState.email}
              />
            </div>
           
              <div>
                <select
                  name="role"
                  id="role"
                  className="w-full"
                  onChange={handleInputChange}
                >
                  <option disabled value={""} selected>
                    role
                  </option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label htmlFor="username" className="sr-only ">
                  username
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
                    setFormState({
                      ...formState,
                      image: selectedFile,
                    });
                  }}
                />
              </div>

              <div className="">
                <label htmlFor="password" className="sr-only">
                  password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input w-full"
                  placeholder="password"
                  onChange={handleInputChange}
                  value={formState.password}
                />
              </div>
             
            <div>
              <label htmlFor="confirm-password" className="sr-only w-full">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                className="input w-full"
                placeholder="Confirm password"
                onChange={handleInputChange}
                value={formState.confirmPassword}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-slate-400 p-2 rounded-lg hover:shadow-lg w-full "
            >
              {loading ? "loading" : "Register"}
            </button>
          </div>
          <button
            className="bg-slate-400 p-2 rounded-lg hover:shadow-lg w-full"
            onClick={() => navigate("/admin/update")}
          >
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisteruserForm;
