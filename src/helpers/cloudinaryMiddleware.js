const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (req,res,next)=>{
    const uniqueName = new Date().toISOString();

    if(req.file != null){
        await cloudinary.uploader.upload(
            req.file.path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${uniqueName}`,
                tags: `express-cloudinary`,
            },
            (err,image)=>{
                if(err) return res.status(500).send(err);
                console.log("File uploaded to cloudinary")
    
                fs.unlinkSync(req.file.path);
                req.image_profile = image;
                next();
            }
        )
    }if(req.files != null){
        await cloudinary.uploader.upload(
            req.files.image_poster[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${uniqueName}`,
                tags: `express-cloudinary`,
            },
            (err,image_poster)=>{
                if(err) return res.status(500).send(err);
                console.log("File uploaded to cloudinary")
    
                fs.unlinkSync(req.files.image_poster[0].path);
                req.image_poster = image_poster;
            }
        )
        await cloudinary.uploader.upload(
            req.files.pdf_file[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${uniqueName}`,
                tags: `express-cloudinary`,
            },
            (err,pdf_file)=>{
                if(err) return res.status(500).send(err);
                console.log("File uploaded to cloudinary")
    
                fs.unlinkSync(req.files.pdf_file[0].path);
                req.pdf_file = pdf_file;
            
            }
        )
        next()
    }else{
        next();
    }
    
}
module.exports = uploadCloudinary;