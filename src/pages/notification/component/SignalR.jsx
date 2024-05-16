import { useState, useEffect } from "react";
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { notification } from "antd";

export const SignalR = () => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("https://localhost:7064/hubs/signalR")
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection && connection.state === HubConnectionState.Disconnected) {
      connection
        .start()
        .then(() => {
          connection.on("notis", (message) => {
            console.log(message);
            // Call notification.open inside an effect hook
            // to avoid issues in React 18 concurrent mode
            const openNotification = () => {
              notification.open({
                className: "bg-green-500",
                message: "New Alert!",
                description: message,
              });
            };
            openNotification();
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  return <></>;
};
