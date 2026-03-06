import { createContext } from "react";
import { Socket } from "socket.io-client";

type SocketContextType = {
    socket : Socket | undefined,
    isConnected : boolean
}

const SocketContext = createContext<SocketContextType>({
    socket : undefined as any as Socket,
    isConnected : false
});

export default SocketContext;