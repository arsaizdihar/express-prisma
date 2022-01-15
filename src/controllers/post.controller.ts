import { User } from "@prisma/client";
import { RequestHandler } from "express";
import prisma from "../core/prisma";

export const allPosts: RequestHandler = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      id: true,
      createdAt: true,
      title: true,
      author: { select: { id: true, email: true, name: true } },
    },
  });
  return res.json(posts);
};

export const getPost: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);

  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { id: true, email: true, name: true } } },
  });
  if (!post) return res.status(404).json();
  return res.json(post);
};

export const createPost: RequestHandler = async (req, res) => {
  const { title, content, published = true } = req.body;
  const user = res.locals.user as User;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  const post = await prisma.post.create({
    data: { title, content, published, authorId: user.id },
  });
  return res.status(201).json(post);
};

export const deletePost: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  const user = res.locals.user as User;
  const { count } = await prisma.post.deleteMany({
    where: { authorId: user.id, AND: { id } },
  });
  if (count === 0) {
    res.status(404).json({ message: "Not Found" });
  }
  return res.json({ message: "Post deleted" });
};

export const updatePost: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  const { title, content, published } = req.body;
  const user = res.locals.user as User;
  if ((await prisma.post.count({ where: { id, authorId: user.id } })) === 0)
    return res.status(404).json({ message: "Not found" });
  const post = await prisma.post.update({
    where: { id },
    data: { title, content, published },
  });
  return res.json(post);
};
