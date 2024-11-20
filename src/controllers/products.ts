import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  // ["tea", "india"] => "tea, india"

  // Create a validator for this product

  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      price: new Prisma.Decimal(req.body.price),
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });

  res.json(product);
};
