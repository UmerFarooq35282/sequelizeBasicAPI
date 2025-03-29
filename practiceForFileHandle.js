import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const localStorage = multer.diskStorage({
    destination: () => {},
    filename: () => {}
})

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: () => {}
})

const fileFilter = () => {}

const multerMiddleWare = (fieldName,maxCount = 1) => {
    return (req,res,next) => {
        const isPDF = req.headers['content-type'] === 'application/pdf'
        const selectedStorage = isPDF ? cloudinaryStorage : localStorage;

        const upload = multer({
            storage: selectedStorage,
            fileFilter: fileFilter,
            limits: {fieldSize: 10 * 1024 * 1024}
        })

        const uploadMethod = maxCount > 1 ? upload.array(fieldName,maxCount) : upload.single(fieldName);

        uploadMethod(req,res,function(err){
            if(err){
                return res.status(400).json({error: err.message});
            }
            next();
        });
    }
}


export default multerMiddleWare;