import adminServices from "../services/adminServices"
import validateCreateUser from "../utils/validateFormCreateUser";
const multer = require('multer'); 
import {storageAvata, imageFilterAvata} from '../utils/handleFileAvata'
var fs = require('fs');
import _ from "lodash";



// Xl lấy Dl select from (Gender, Province,Permission )
const getDataAllcode = async (req, res) => {
    try{
        let data = await adminServices.getDataAllcodes(req.query.type)
        return res.status(200).json(data)
    }catch(e){
        return res.status(200).json(e)
    }
}


// Xl lấy Dl huyện
const getDataDistrict = async (req, res) => {
    try{
        let data = await adminServices.getDataDistrict(req.query.type)
        return res.status(200).json(data)
    }catch(e){
        return res.status(200).json(e)
    }
}



// Xl lấy Dl Xã
const getDataWards = async (req, res) => {
    try{
        let data = await adminServices.getDataWards(req.query.type)
        return res.status(200).json(data)
    }catch(e){
        return res.status(200).json(e)
    }
}



// Xl Lưu ảnh và gửi dữ liệu người dùng lên DB
const createNewUser = async (req, res) => {
    try{
        let upload = multer({ storage: storageAvata, fileFilter: imageFilterAvata }).single('file');  
        upload(req, res, async (err) => {

            if(!req.file){
                let data = JSON.parse(req.body.dataUser)
                let newData = await validateCreateUser(data)
                if(_.isEmpty(newData)){
                    let data = await adminServices.createNewUser(data)
                    return res.status(200).json(data)  
                }else{
                    return res.status(200).json({
                        errCode: -1,
                        errMessage: 'Data cannot be left blank',
                        data: newData
                    });
                }
            }

            if(!err) {
                try{
                    let data = JSON.parse(req.body.dataUser);
                    data.avata = req.file ? req.file.filename : '';
                    let newData = await validateCreateUser(data)

                    if(_.isEmpty(newData)){
                        let dataRes = await adminServices.createNewUser(data)
                        return res.status(200).json(dataRes)  
                    }else{
                        fs.rmSync(`src/public/images/Avata/${req.file.filename}`, {
                            force: true,
                        });
                        return res.status(200).json({
                            errCode: -1,
                            errMessage: 'Data cannot be left blank',
                            data: newData
                        });
                    }
                }catch(err){
                    return res.status(200).json(err)
                }
            }
        })
    }catch(err){
        return res.status(200).json(err)
    }
}

export default {
    createNewUser,
    getDataWards,
    getDataDistrict,
    getDataAllcode
}