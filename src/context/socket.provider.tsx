import React, { useState } from "react";
import { io, ManagerOptions, SocketOptions } from "socket.io-client";
import SocketContext from "./socket.context";

type SocketProviderProps = {
  uri?: string;
  options?: Partial<ManagerOptions & SocketOptions>;
  children: React.ReactNode;
};

const SocketProvider: React.FC<SocketProviderProps> = ({
  uri: serverUrl,
  options,
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);

  const socket = React.useMemo(() => {
    return io(serverUrl, options);
  }, [serverUrl, options]);

  React.useEffect(() => {
    if (!socket) return;

    if (!socket.connected) {
      socket.connect();
      console.log("Connecting to socket...");
    }

    const handleConnect = () => {
      console.log("Connected to socket");
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from socket");
      setIsConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);

      socket.disconnect();
      console.log("Socket cleanup");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
export { SocketContext };