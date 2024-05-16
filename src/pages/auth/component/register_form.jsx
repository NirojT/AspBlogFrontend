import { useState } from "react";

import Toaster from "../../../global/toaster";
import { useNavigate } from "react-router-dom";
import { axios_noauth_form } from "../../../global/config";

const RegisterForm = () => {
  const[loading,setLoading]=useState(false)
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
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const role = "User";
  const [formState, setFormState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
  const clearForm = () => {
    setFormState({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    setLoading(true)
    e.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setToasterData({
        open: true,
        message: "password match failed",
        severity: "error",
      });
      setLoading(false)
      return;
    }

    try {
      const response = await axios_noauth_form.post(
        `user/register?roleName=${role}`,
        formState
      );

      if (response.data.message) {
        setRegistrationSuccessful(true);
        setToasterData({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setLoading(false)
        clearForm();
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false)
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
      <div className="  w-[25em]  h-[20em] lg:w-[40em]   p-4  bg-white rounded-lg shadow-lg mt-9">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          SignUp Here
        </h2>
        <form
          key={
            registrationSuccessful
              ? "registrationSuccess"
              : "registrationFailure"
          }
          className="mt-8 space-y-6 "
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm grid grid-cols-2 gap-5 ">
            <div>
              <label htmlFor="userName" className="sr-only ">
                userName
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                required
                className="input w-full"
                placeholder="userName"
                onChange={handleInputChange}
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
                placeholder="email address"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="Password" className="sr-only">
                Password
              </label>
              <input
                id="Password"
                name="password"
                type="Password"
                autoComplete="current-password"
                required
                className="input w-full"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only w-full">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                className="input w-full"
                placeholder="Confirm Password"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only w-full">
                image
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
          </div>

          <div>
            <button
              type="submit"
              className="bg-slate-300 p-2 rounded-lg hover:shadow-lg w-full "
            >
            {loading ? "loading" : "SignUp"}
             
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
