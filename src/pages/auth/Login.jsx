import { useState } from "react";
import blog from "../../assets/Blog-intro.jpg";
import RegisterForm from "./component/register_form";
import Siginsuccessrm from "./component/signin_form";
import ForgotPassword from "./component/forgot_password";

const Login = () => {
  const [select, setSelect] = useState("l");
  return (
    <div className="md:flex md:flex-row-reverse md:gap-6">
      <div className="hidden md:block">
        <img src={blog} alt="blog" className="object-cover w-full h-full " />
      </div>
      {select === "r" && <RegisterForm />}
      {select === "f" && <ForgotPassword />}
      {select === "l" && <Siginsuccessrm setSelect={setSelect} />}
    </div>
  );
};

export default Login;
