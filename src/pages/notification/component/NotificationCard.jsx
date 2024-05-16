/* eslint-disable react/prop-types */

const NotificationCard = ({ data }) => {
  return (
    <div className="flex justify-center mb-2  p-1 ">
      <div className=" w-full  space-y-1 bg-slate-800 text-white p-3 rounded-xl shadow-md hover:bg-slate-600 hover:cursor-pointer">
        <div className="w-full ">
          <div className="my-2 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <span
                className={`h-1 w-3 ${
                  data?.message?.includes("up") ||
                  data?.message?.includes("down")
                    ? "bg-pink-500"
                    : "bg-blue-500"
                }  rounded-full inline-block`}
              ></span>
              <span>
                {data?.message} on {data?.createdDate?.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
