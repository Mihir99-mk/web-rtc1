import { NextFunction, Request, Response } from "express";

export interface Context {
  req: Request;
  res: Response;
  next: NextFunction;
  payload?: { userId: string };
}