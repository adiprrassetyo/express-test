const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req,filename,callback)=>{
        callback(null,'./public/files')
    },
    filename:(req,file,callback)=>{
        const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
            file.originalname
        )}`;
        callback(null, nameFormat);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1000 * 1000},
});

const multiUpload = (req,res,next) =>{
    const uploadImage = upload.fields([{
        name: 'image_poster', maxCount: 1
      }, {
        name: 'pdf_file', maxCount: 1
      }]);
    uploadImage(req,res,(err)=>{
        if(err){
            res.status(500).send({
                status: 500,
                message: "file max 5mb",
                error: err
            })
            return
        } else{
            next();
        }
    });
};

module.exports = multiUpload;