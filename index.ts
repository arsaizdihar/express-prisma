import cookieParser from "cookie-parser";
import express from "express";
import config from "./src/config";
import extractJWT from "./src/middleware/extractJWT";
import userRouter from "./src/routes/user.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(extractJWT);
app.use("/api", userRouter);

// app.get("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// app.get("/feed", async (req, res) => {
//   const posts = await prisma.post.findMany({
//     where: { published: true },
//     include: { author: true },
//   });
//   res.json(posts);
// });

// app.get("/posts/:id", async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.findUnique({
//     where: { id: Number(id) },
//   });
//   res.json(post);
// });

// app.post("/user", async (req, res) => {
//   const result = await prisma.user.create({
//     data: { ...req.body },
//   });
//   res.json(result);
// });

// app.post("/posts", async (req, res) => {
//   const { title, content, authorEmail } = req.body;
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       published: true,
//       author: { connect: { email: authorEmail } },
//     },
//   });
//   res.json(result);
// });

// app.put("/posts/publish/:id", async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.update({
//     where: { id: Number(id) },
//     data: { published: true },
//   });
//   res.json(post);
// });

// app.delete("/posts/:id", async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.delete({
//     where: { id: Number(id) },
//   });
//   res.json(post);
// });

app.listen(config.server.port, () =>
  console.log(
    `REST API server ready at: http://localhost:${config.server.port}`
  )
);
