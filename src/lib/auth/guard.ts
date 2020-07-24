import IO from "socket.io";
import { api } from "../api";

export const AuthGuard = async (
  socket: IO.Socket,
  next: (err?: any) => any,
) => {
  const { access_token } = socket.handshake.query;
  if (!access_token) next(new Error("Unauthorized Connection"));
  try {
    const user: IO.ISocketUser = await api.get("/users/@me", {
      headers: {
        authorization: access_token,
      },
    });
    if (!user) return next(new Error("Unauthorized Connection"));
    socket.user = user;
    next();
  } catch (e) {
    next(new Error("Unauthorized Connection"));
  }
};
