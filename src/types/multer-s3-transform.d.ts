declare module "multer-s3-transform" {
  import { StorageEngine } from "multer";
  import { S3 } from "aws-sdk";

  interface Options {
    s3: S3;
    bucket: any;
    acl?: string;
    shouldTransform?: boolean;
    metadata?: any;
    key?: any;
    transforms?: {
      id: string;
      key: (
        req: Express.Request,
        file: Express.Multer.File,
        cb: (error: Error | null, key?: string) => void
      ) => void;
      transform: (
        req: Express.Request,
        file: Express.Multer.File,
        cb: (error: Error | null, transform?: NodeJS.ReadWriteStream) => void
      ) => void;
    }[];
  }

  function multerS3(options: Options): StorageEngine;

  export = multerS3;
}
