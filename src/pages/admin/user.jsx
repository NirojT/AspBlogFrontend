import RegisterAccountForm from "./RegisterAccountForm";
import blog from "../../assets/Blog-intro.jpg";

const Account = () => {
  return (
    <div>
      <div className="md:flex md:gap-6 md:flex-row-reverse">
        <div className="hidden md:block">
          <img src={blog} alt="blog" className="object-cover w-full h-full " />
        </div>

        <RegisterAccountForm />
      </div>
    </div>
  );
};

export default Account;
