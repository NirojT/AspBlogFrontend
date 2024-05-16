import { useEffect, useState } from "react";
import NotificationCard from "./component/NotificationCard";
import { axios_noauth } from "../../global/config";
import { useGlobalStore } from "../../global/store";

const Notification = () => {

  const setNoti = useGlobalStore((state) => state.setNoti);
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("id") ?? "";

      const res = await axios_noauth.get(`Notification/getNotification/${userId}`);

      if (res.data.data) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

 
  useEffect(() => {
    setNoti(data?.length  );
  }, [data]);

  return (
    <div className="">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Notifications
      </h2>
      <div className="max-h-[40em] overflow-auto">
        {Array.isArray(data) && data.length > 0 ? (
          data?.map((data, index) => (
            <NotificationCard key={index} data={data} />
          ))
        ) : (
          <div className="flex justify-center items-center h-96">
            {" "}
            No Notification available
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
