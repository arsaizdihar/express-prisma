import type { NextFunction, Request, Response } from "express";

const NAMESPACE = "AUTH";

const loginRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};

export default loginRequired;
