import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import cloudinary  from "../cloudnary/cloudnaryConfig.js";

const allowedFiles = ["image/png", "image/webp", "image/jpeg","application/pdf"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadFolder = "images/";

    if (req.uploadFolder) {
      uploadFolder += req.uploadFolder;
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let finalFileName = `${file.fieldname}-${uniqueSuffix}${path.extname(
      file.originalname
    )}`;
    cb(null, finalFileName);
  },
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPDF = file.mimetype === 'application/pdf';
    return {
      folder: isPDF ? "books_pdf" : '',
      format: isPDF ? "pdf" : "auto",
      public_id: `${file.fieldname}-${Date.now()}`,
      resource_type: isPDF ? "raw" : 'image',
    };
  },
});

const fileFilterFn = (req, file, cb) => {
  if (allowedFiles.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("File Not Accepted only JPG , JPEG , PNG and WEBP allowed"),
      false
    );
  }
};

const fileUploadMiddleware = (fieldname,maxCount=1) => {
  return (req,res,next) => {
    const isPDF = req.file?.mimetype === 'application/pdf'
    const selectedStorage = isPDF ? cloudinaryStorage : storage;

    const upload = multer({
      storage: selectedStorage,
      fileFilter: fileFilterFn,
      limits: {fieldSize: 10 * 1024 * 1024}
    })

    const uploadMethod = maxCount > 1 ? upload.array(fieldname,maxCount) : upload.single(fieldname);

    uploadMethod(req,res, function (err) {
      if(err){
        res.status(400).json({error: err.message});
      }
      next();
    })
  }
}

export default fileUploadMiddleware;
