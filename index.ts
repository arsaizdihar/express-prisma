import cookieParser from "cookie-parser";
import express from "express";
import config from "./src/config";
import extractJWT from "./src/middleware/extractJWT";
import postRouter from "./src/routes/post.routes";
import userRouter from "./src/routes/user.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(extractJWT);
app.use("/api", userRouter);
app.use("/api/posts", postRouter);

app.listen(config.server.port, () =>
  console.log(
    `REST API server ready at: http://localhost:${config.server.port}`
  )
);
