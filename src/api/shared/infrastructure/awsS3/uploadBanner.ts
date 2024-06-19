import AWS from "aws-sdk";
import multerS3 from "multer-s3-transform";
import multer from "multer";
import sharp from "sharp";
import dotenv from "dotenv";

dotenv.config();

const logger = console;

const s3 = new AWS.S3({
  accessKeyId: process.env.SECRET_KEY_AWS_ID,
  secretAccessKey: process.env.SECRET_KEY_AWS_ACCESS,
  region: process.env.S3_AWS_REGION,
});

const S3_BANNERS_PATH: string = process.env.S3_BANNERS_PATH!;

const multerOptions = {
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: (
      req: Request | any,
      file: any,
      cb: (error: any, bucket: string) => void
    ) => {
      const bucket: string | undefined = req.headers["bucket_name"] as
        | string
        | undefined;
      if (!bucket) {
        cb(new Error("Missing bucket in request headers"), "");
      } else {
        cb(null, bucket);
      }
    },
    metadata: (
      req: any,
      file: { fieldname: any },
      callBack: (arg0: null, arg1: { fieldName: any }) => void
    ) => {
      callBack(null, { fieldName: file.fieldname });
    },
    key: (
      req: any,
      file: { originalname: string },
      callBack: (arg0: null, arg1: string) => void
    ) => {
      const fullPath: string = S3_BANNERS_PATH + file.originalname; //If you want to save into a folder concat de name of the folder to the path
      callBack(null, fullPath);
    },
    shouldTransform: true,
    transforms: [
      {
        id: "small",
        key: function (
          req: any,
          file: { originalname: string },
          cb: (arg0: null, arg1: string) => void
        ) {
          cb(null, S3_BANNERS_PATH + "small/" + file.originalname);
        },
        transform: function (
          req: any,
          file: any,
          cb: (arg0: null, arg1: sharp.Sharp) => void
        ) {
          //Perform desired transformations
          logger.info("Transforming with sharp small version");
          cb(
            null,
            sharp().resize(800, 300).toFormat("jpeg", { mozjpeg: true })
          );
        },
      },
      {
        id: "medium",
        key: function (
          req: any,
          file: { originalname: string },
          cb: (arg0: null, arg1: string) => void
        ) {
          cb(null, S3_BANNERS_PATH + "medium/" + file.originalname);
        },
        transform: function (
          req: any,
          file: any,
          cb: (arg0: null, arg1: sharp.Sharp) => void
        ) {
          //Perform desired transformations
          logger.info("Transforming with sharp medium version");
          cb(
            null,
            sharp().resize(2000, 900).toFormat("jpeg", { mozjpeg: true })
          );
        },
      },
    ],
  }),
  limits: { fileSize: 50000000 },
};

const multerS3Instance = multer(multerOptions);

const uploadProductS3 = multerS3Instance.array("images", 2);

const handleBannerImages = async (req: any, res: any, next: () => void) => {
  try {
    const startTime = Date.now();
    uploadProductS3(req, res, (error: any) => {
      const durationMulterTime = Date.now() - startTime;
      logger.log(
        "Duration multer execution and transform: ",
        durationMulterTime / 1000 + " seconds"
      );
      if (error) {
        logger.error("handleProductImages Error: ", error);
        res.status(500).json({
          status: "fail",
          error: error,
        });
      }
      if (!req.files) {
        logger.log("handleProductImages Error: No File Selected!");
        res.status(500).json({
          status: "fail",
          message: "Error: No File Selected",
        });
      }
      let fileArray = req.files,
        fileLocation;
      const images: any[] = [];
      fileArray.forEach((file: { originalname: string }) => {
        const smallUrlFile =
          req.headers["bucket_url"] +
          "/" +
          S3_BANNERS_PATH +
          "small/" +
          file.originalname;
        const mediumUrlFile =
          req.headers["bucket_url"] +
          "/" +
          S3_BANNERS_PATH +
          "medium/" +
          file.originalname;
        logger.log("smallUrlFile", smallUrlFile);
        logger.log("mediumUrlFile", mediumUrlFile);
        images.push(smallUrlFile);
        images.push(mediumUrlFile);
      });
      logger.log({
        status: "ok",
        filesArray: fileArray,
        locationArray: images,
      });
      req.imagesS3Service = {
        status: "ok",
        filesArray: fileArray,
        locationArray: images,
      };
      next();
    });
  } catch (err) {
    const message: string = "Error in handleBannerImages Middleware";
    let errorMessage: string = "";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    logger.error(`${message}:`, errorMessage);
  }
};

export default handleBannerImages;
