import multer from 'multer'

let allowedFiles = ['image/jpeg','image/webp','image/png']

const storage = multer.memoryStorage();

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