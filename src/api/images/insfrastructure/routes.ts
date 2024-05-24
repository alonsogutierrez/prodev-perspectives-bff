import express, { Request, Response } from "express";
import handleProductsImages from "./../../shared/insfrastructure/awsS3/middleware";
import { auth } from "./../../shared/auth_middleware";

const logger = console;

const imagesRouter = express.Router();

// POST images
imagesRouter.post(
  "/images",
  [auth, handleProductsImages],
  async (req: Request, res: Response) => {
    try {
      res.status(201).send("Images well loaded");
    } catch (error) {
      let errorMessage: string = "Cant upload images, internal error";
      if (error instanceof Error) {
        errorMessage += ": " + error.message;
      }
      logger.error(errorMessage);
      res.status(500).send({
        error: "Cant upload images, internal error",
      });
    }
  }
);

export default imagesRouter;
