import multer from 'multer'
import path from 'path'

let allowedFiles = ['image/jpeg','image/webp','image/png']

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    let folderName = 'images/'
    cb(null,folderName)
  },
  filename: (req,file,cb) => {
    if(file){
      cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
  }
});

const fileFilterFn = (req,file,cb) => {
  if(allowedFiles.includes(file.mimetype)){
    cb(null,true)
  }else{
    cb(new Error('Only JPEG , PNG and WEBP files are allowed') , false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilterFn,
  limits: {fileSize: 1024 * 1024 * 10}
})

export default upload;