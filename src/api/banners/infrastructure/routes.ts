import express, { Request, Response } from "express";
import handleBannersImages from "../../shared/infrastructure/awsS3/uploadBanner";
import { auth } from "./../../shared/auth_middleware";

const logger = console;

const imagesRouter = express.Router();

// POST images
imagesRouter.post(
  "/banners",
  [auth, handleBannersImages],
  async (req: Request, res: Response) => {
    try {
      res.status(201).send("Banners well loaded");
    } catch (error) {
      let errorMessage: string = "Cant upload banners, internal error";
      if (error instanceof Error) {
        errorMessage += ": " + error.message;
      }
      logger.error(errorMessage);
      res.status(500).send({
        error: "Cant upload banners, internal error",
      });
    }
  }
);

export default imagesRouter;
