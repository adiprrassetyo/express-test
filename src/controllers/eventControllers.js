const { events, comments} = require("../models/");

module.exports = {
    getAllEvent : (req, res)=>{
        events.findAll({
            include: [{
                model: comments}]
        })
        .then((data)=>{
            res.send({
                msg: "Success get all data",
                status: 200,
                data
            })
        })
        .catch ((err)=>{
            res.send({
                msg: 'Error to get all data',
                status:500,
                err,
            })
        })
    },
    postEvent : (req, res)=>{
        let{body} = req;
        let{email} = req.decodedToken;
        const newData = {
            ...body,
            image_poster: req.image_poster.url,
            pdf_file: req.pdf_file.url,
            createdBy: email
        }
        events.create(newData)
        .then((data)=>{
            res.status(200).send({
                msg: "Success to post data",
                status : 200,
                data
            })
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed to post data',
                status: 500,
                err,
            })
        })
    },
    getEventById :(req,res)=>{
        let{ id }=req.params;
        events.findOne({
            where : {id},
            include: [{model: comments}]
        })
        .then ((data)=>{
            if(data == null){
                res.status(404).send({
                    msg: 'data is deleted or moved',
                    status:404,
                })
                return
            }else{
                res.status(200).send({
                    msg: 'Success get data By Id',
                    status:200,
                    data
                })
                return    
            }
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed get data By Id',
                status: 500,
                err,
            })
        })
    },
    deleteEvent :(req, res)=>{
        let{id}=req.params;

        events.destroy({
            where : {id},
        })
        .then((data)=>{
            if(data == 0){
                res.status(404).send({
                    msg: 'data is deleted or moved',
                    status: 404,
                    data
                })
                return
            }else{
                res.status(200).send({
                    msg: 'Success delete data',
                    status: 200,
                    data
                })
                return    
            }
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed delete data',
                status: 500,
                err,
            })
        })
    },
    updateEvent: (req, res)=>{
        let{id}=req.params;
        let{body}=req;
        
        if(req.image == null){
            events.update({...body,updatedBy: nama},{
                where:{id}
            })
            .then((data)=>{
                res.status(200).send({
                    msg: 'Success update data by id',
                    status: 200,
                    data
                })
            })
            .catch((err)=>{
                res.status(500).send({
                    msg: 'Failed update data by id',
                    status: 500,
                    err,
                })
            })
        }else{
            cars.update({...body,image: req.image.url,updatedBy: nama},{
                where:{id}
            })
            .then((data)=>{
                res.status(200).send({
                    msg: 'Success update data by id',
                    status: 200,
                    data
                })
            })
            .catch((err)=>{
                res.status(500).send({
                    msg: 'Failed update data by id',
                    status: 500,
                    err,
                })
            })
        }

    },
}