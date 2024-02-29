import multer from "multer";
import fs from "fs";
import path from "path";

exports.upload = (folderName: any) => {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const path = `src/uploads/${folderName}/`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      },

      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  });
};
