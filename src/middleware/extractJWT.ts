import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import logging from "../config/logging";
import prisma from "../core/prisma";
import signJWT from "../utils/signJWT";

const NAMESPACE = "Auth";

const extractJWT = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Validating token");
  const token: string = req.cookies.token;

  if (token) {
    jwt.verify(token, config.server.token.secret, async (error, decoded) => {
      if (error) {
        next();
      } else if (decoded) {
        prisma.user
          .findUnique({
            where: { id: decoded.id },
          })
          .then((user) => {
            if (decoded.exp) {
              const now = new Date().getTime();
              if (
                decoded.exp * 1000 - now <=
                  config.server.token.expireTime * 500 &&
                user
              ) {
                signJWT(user, res, false);
              }
            }
            res.locals.user = user;
            next();
          })
          .catch((_error) => {
            logging.error(NAMESPACE, "ID error", _error);

            return res.status(500).json({
              message: _error.message,
              error: _error,
            });
          });
      } else {
        return res.status(500);
      }
    });
  } else {
    next();
  }
};

export default extractJWT;
