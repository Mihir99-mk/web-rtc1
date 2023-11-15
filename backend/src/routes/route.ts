import express, { Request, Response } from "express";
import { Users } from "src/types/types";
import { PrismaClient } from "@prisma/client";
import { createAccessToken, createRefreshToken } from "../utility/auth";
import { refreshToken } from "../utility/refreshToken";

import { verify } from "jsonwebtoken";

export const route = express.Router();
const prisma = new PrismaClient();

route.post("/signup", async (req: Request, res: Response) => {
  const users: Users = req.body;

  if (!users) {
    return res.status(400).json({
      error: "Bad Request",
      details: "Request body is missing",
    });
  }

  try {
    const response = await prisma.user.create({
      data: {
        email: users.email,
        password: users.password,
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      error: "Registration failed",
      details: error.details,
    });
  }
});

route.post("/refresh_token", async (req, res) => {
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.error(err);
    return res.send({ ok: false, accessToken: "" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    refreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  } catch (error) {
    console.error(error);
    return res.send({ ok: false, accessToken: "" });
  }
});

route.post("/signin", async (req: Request, res: Response) => {
  const users: Users = req.body;

  if (!users) {
    return res.status(400).json({
      error: "Bad Request",
      details: "Request body is missing",
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        AND: {
          email: users.email,
          password: users.password,
        },
      },
    });


    res.status(201).json({user:user, token:createAccessToken(user as Users)});
  } catch (error) {
    res.status(400).json({
      error: "Login failed",
      details: error.details,
    });
  }
});
