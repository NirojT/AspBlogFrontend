import { useState } from "react";
import Toaster from "../../../global/toaster";
import { axios_noauth } from "../../../global/config";

const Forgotpassword = () => {
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
  const [loading, setLoading] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);

  const [message, setMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState({
    email: "",
    token: "",
    password: "",
    confirmPassword: "",
  });
  const handleChangepassword = (e) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleForgot = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await axios_noauth.post(`user/forgotRequest?email=${email}`);
      if (res.data.message) {
        setFormState({
          email: email,
          token: "",
          password: "",
          confirmPassword: "",
        });
        setMessage(true);
        setToasterData({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        setLoading(false);
        setEmail("");
      }

      // console.log(res)
    } catch (err) {
      setLoading(false);
      console.log(err);
      setToasterData({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };
  const handlepasswordReset = async (e) => {
    setLoadingNext(true);
    e.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setToasterData({
        open: true,
        message: "password didnot synched",
        severity: "error",
      });
      setLoadingNext(false);
      return;
    }

    try {
      const res = await axios_noauth.post(`user/reset-passwords`, formState);
      if (res.data.message) {
        setToasterData({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        setFormState({
          email: "",
          token: "",
          password: "",
          confirmPassword: "",
        });
        setLoadingNext(false);
      }

      // console.log(res)
    } catch (err) {
      setLoadingNext(false);
      console.log(err);
      setToasterData({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };

  return (
    <div className="flex    justify-center   ">
      <Toaster data={toasterData} close={closeToaster} />
      <div
        className={`  w-[25em]  h-[30em]  ${
          message && "h-[30em]"
        } lg:w-[40em]   p-4  bg-white rounded-lg shadow-lg mt-9`}
      >
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Forgot password
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleForgot}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm flex flex-col gap-5 ">
            <div>
              <label htmlFor="email-address" className="sr-only my-10">
                email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email "
                required
                className="input w-full"
                placeholder="email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-slate-400 p-2 rounded-lg hover:shadow-lg w-full "
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>

        {message && (
          <form className="mt-8 space-y-6" onSubmit={handlepasswordReset}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm grid grid-cols-2  gap-5 ">
              <div>
                <label htmlFor="email-address" className="sr-only my-10">
                  email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email "
                  required
                  className="input w-full"
                  placeholder="email "
                  value={formState.email}
                  onChange={handleChangepassword}
                />
              </div>
              <div>
                <label htmlFor="token" className="sr-only ">
                  token
                </label>
                <input
                  id="token"
                  name="token"
                  type="text"
                  required
                  className="input w-[20em] h-[7em]"
                  placeholder="token"
                  value={formState.token}
                  onChange={handleChangepassword}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  new password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input w-full"
                  placeholder="new password"
                  value={formState.password}
                  onChange={handleChangepassword}
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
                  placeholder="confirm password"
                  value={formState.confirmPassword}
                  onChange={handleChangepassword}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-slate-300 p-2 rounded-lg hover:shadow-lg w-full "
              >
                {loadingNext ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Forgotpassword;
