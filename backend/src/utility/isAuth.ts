import { verify } from "jsonwebtoken";
import { Context } from "./context";

export const isAuth = (context: Context) => {
    
    const authorization = context.req.headers["authorization"];
  
    if (!authorization) {
      throw new Error("not authenticated");
    }
  
    try {
      const token = authorization.split(" ")[1];
      const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      context.payload = payload as any;
    } catch (err) {
      console.log(err);
      throw new Error("not authenticated");
    }
  
    return context.next();
  };