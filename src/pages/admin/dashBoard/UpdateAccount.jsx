import { useEffect, useState } from "react";
import blog from "../../../assets/Blog-intro.jpg";
import Toaster from "../../../global/toaster";
import { axios_auth } from "../../../global/config";

const UpdateUserForm = () => {
  const [updateSuccessful, setUpdateSuccessful] = useState(false);
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
    Id: "",
    Username: "",
    Email: "",
    Password: "",
  });
  const clearForm = () => {
    setFormState({
      Id: "",
      Username: "",
      Email: "",
      Password: "",
    });
  };
  console.log(formState);
  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formState);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios_auth.put(
        `user/update/${formState.Id}`,
        formState
      );
      if (res.data) {
        setUpdateSuccessful(true);
        setToasterData({
          open: true,
          message: "user updated successfully",
          severity: "success",
        });

        setFormState({ ...formState, Password: "" });
        clearForm();
        fetchData();
        localStorage.setItem("email", formState.Email);
        localStorage.setItem("name", formState.Name);
      }
    } catch (error) {
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
  const fetchData = async () => {
    try {
      const id = localStorage.getItem("id");
      if (id) {
           const res = await axios_auth.get(`user/getByid/${id}`);
      
        if (res.data.data) {
          const user = res.data.data;
          setFormState({
            ...formState,
            Username: user.userName,
            Email: user.email,
            Id: user.id,
          });
        }
      }
    } catch (error) {
      setToasterData({
        open: true,
        message: "failed to fetch data",
        severity: "error",
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="md:flex md:gap-6 md:flex-row-reverse">
      <div className="hidden md:block">
        <img src={blog} alt="blog" className="object-cover w-full h-full " />
      </div>

      <div className="flex    justify-center   ">
        <Toaster data={toasterData} close={closeToaster} />
        <div className="  w-[25em]  h-[25em] lg:w-[40em]   p-4  bg-white rounded-lg shadow-lg mt-9">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            update user
          </h2>
          <form
            key={updateSuccessful ? "updateSuccess" : "updateFailure"}
            className="mt-8 space-y-6 "
            onSubmit={handleUpdate}
          >
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm   grid grid-cols-2 gap-5 ">
              <div>
                <label htmlFor="Username" className="sr-only ">
                  Username
                </label>
                <input
                  id="Username"
                  name="Username"
                  type="text"
                  required
                  className="input w-full"
                  placeholder="Username"
                  value={formState.Username}
                  onChange={handleInputChange}
                />
              </div>
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
                  value={formState.Email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="Password" className="sr-only">
                  Password
                </label>
                <input
                  id="Password"
                  name="Password"
                  type="Password"
                  autoComplete="current-password"
                  required
                  className="input w-full"
                  placeholder="Password"
                  value={formState.Password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-slate-300 p-2 rounded-lg hover:shadow-lg w-full "
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserForm;
