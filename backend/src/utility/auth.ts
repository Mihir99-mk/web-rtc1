import { sign } from "jsonwebtoken";
import { User } from "../types/types";

export const createAccessToken = (user: User): string => {
  try {
    if (!user || !user.id) {
      throw new Error("Invalid user object. Missing 'id' property.");
    }

    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m"
    });
  } catch (error) {
    console.error("Error creating access token:", error);
    throw error; // You may want to handle this error more gracefully based on your application's needs
  }
};

export const createRefreshToken = (user: User): string => {
  try {
    if (!user || !user.id) {
      throw new Error("Invalid user object. Missing 'id' property.");
    }

    return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d"
    });
  } catch (error) {
    console.error("Error creating refresh token:", error);
    throw error; // You may want to handle this error more gracefully based on your application's needs
  }
};
