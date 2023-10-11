import { io } from "socket.io-client";
const URL = "http://10.0.3.98:5000";

export const useSocketIO = () => {
    const socket = io(URL)
    return {
        socket,
    }
}