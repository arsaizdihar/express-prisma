import { User } from "@prisma/client";
import { Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import logging from "../config/logging";

const NAMESPACE = "Auth";

const signJWT = (user: User, res: Response) => {
  const now = new Date().getTime();
  const expiresTime = now + config.server.token.expireTime * 1000;
  const expires = new Date(expiresTime);

  try {
    const token = jwt.sign({ id: user.id }, config.server.token.secret, {
      issuer: config.server.token.issuer,
      algorithm: "HS256",
      expiresIn: config.server.token.expireTime,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires,
    });
    return res.json({ user: { ...user, password: undefined } });
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    return res.status(500).json({ message: error.message, error });
  }
};

export default signJWT;
