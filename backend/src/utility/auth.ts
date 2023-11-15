import { sign } from "jsonwebtoken";
import { Users } from "../types/types";

export const createAccessToken = (user: Users): string => {
  try {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m"
    });
  } catch (error) {
    console.error("Error creating access token:", error);
    throw error; // You may want to handle this error more gracefully based on your application's needs
  }
};

export const createRefreshToken = (user: Users): string => {
  try {
    return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d"
    });
  } catch (error) {
    console.error("Error creating refresh token:", error);
    throw error; // You may want to handle this error more gracefully based on your application's needs
  }
};
