import { Request, Response } from "express";
import { prisma } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRETE } from "../secrets";

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    throw Error("User already exists!");
  }
  user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });
  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    throw Error("User does not exists!");
  }

  if (!compareSync(password, user.password)) {
    throw Error("Incorrect passoword");
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRETE
  );

  res.json({ user, token });
};
