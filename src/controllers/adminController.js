import adminServices from "../services/adminServices"
import validateCreateUser from "../utils/validateFormCreateUser";
const multer = require('multer'); 
import {storageAvata,storageAvataShop,imageFilterAvataShop, imageFilterAvata,storageImgItems,imageFilterImgItems} from '../utils/handleFileAvata'
var fs = require('fs');
import _ from "lodash";



// Xl lấy Dl select from (Gender, Province,Permission )
const getDataAllcode = async (req, res) => {
    try{
        console.log(req.query.type)
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
                    console.log(req.body.dataUser)
                    let data = JSON.parse(req.body.dataUser);
                    console.log(data)
                    console.log(req.file)
                    data.avata = req.file ? req.file.filename : '';
                    let newData = await validateCreateUser(data)

                    if(_.isEmpty(newData)) {
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

// Xl Lưu ảnh và gửi dữ liệu shop lên DB
const createNewShop = async (req, res) => {
    try{
        let upload = multer({ storage: storageAvataShop, fileFilter: imageFilterAvataShop }).single('file');  
        upload(req, res, async (err) => {
            if(!req.file){
                let data = JSON.parse(req.body.shopData)
                let newData = await validateCreateUser(data, 'Shop')
                if(_.isEmpty(newData)){
                    let data = await adminServices.createNewShop(data)
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
                    let data = JSON.parse(req.body.shopData);
                    data.avata = req.file ? req.file.filename : '';
                    let newData = await validateCreateUser(data)
                console.log(newData)

                    if(_.isEmpty(newData)) {
                        let dataRes = await adminServices.createNewShop(data)
                        return res.status(200).json(dataRes)  
                    }else{
                        fs.rmSync(`src/public/images/AvataShop/${req.file.filename}`, {
                            force: true,
                        });
                console.log(newData)

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

// Xl lấy User
const getAllUsers = async (req, res) => {
    try{

        let data = await adminServices.getAllUsers(req.query.type)

        return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err)
    }
}

// Xl lấy Shop
const getAllShop = async (req, res) => {
    try{
        console.log(req.query.type)
        let data = await adminServices.getAllShops(req.query.type)
        return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err)
    }
}

// Xl delete
const deleteUser = async (req, res) => {
    try{
        let data = await adminServices.deleteUser(req.body)
        return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err)
    }
}

// Xl delete
const deleteShop = async (req, res) => {
    try{
        console.log(req.body)
        let data = await adminServices.deleteShop(req.body)
        return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err)
    }
}

// Xl Change USer
const changeUser = async (req, res) => {
    try{
        let data = await adminServices.changeUser(req.body)
        return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err)
    }
}

// Xl change dữ liệu shop + img 
const changeShop = async (req, res) => {
    try{
        let upload = multer({ storage: storageAvataShop, fileFilter: imageFilterAvataShop }).single('file');  
        upload(req, res, async (err) => {
            try{
                let data = JSON.parse(req.body.shopData)
                data.avata = req.file ? req.file.filename : '';
                let newData = await validateCreateUser(data)

                if(_.isEmpty(newData)){
                    let resEdit = await adminServices.editShop(data)
                    return res.status(200).json(resEdit)  
                }else{
    
                    fs.rmSync(`src/public/images/AvataShop/${req.file.filename}`, {
                        force: true,
                    });
    
                    return res.status(200).json({
                        errCode: -1,
                        errMessage: 'Data cannot be left blank',
                        data: newData
                    });
                }
            }

            catch(err) {
                return res.status(200).json(err)
            }
        })
    }catch(err){
        return res.status(200).json(err)
    }
}

// Xl Change dữ liệu shop - img 
const changeShopNotImg = async (req, res) => {
    try{
        console.log(req.body)
        let data = await adminServices.changeShopNotImg(req.body)
        return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err)
    }
}

// Get one user
const getOneShop = async (req, res) => {
    try{
        console.log(req.query.id)
        let data = await adminServices.getOneShop(req.query.id)
        return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err)
    }
}

// Create items
const addNewItems = async (req, res) => {
    try{

        let upload = multer({ storage: storageImgItems, fileFilter: imageFilterImgItems }).array('file',12);  
        upload(req, res, async (err) => {
            if(!req.file){

            }
            if(!err) {
                try{

                    let dataItemsColorImgages =  JSON.parse(req.body.dataItemsColorImgages)
                    let dataItems =  JSON.parse(req.body.dataItems)
                    let dataItemsInfo = JSON.parse(req.body.dataItemsInfo)
                    let datItemsSizeAmount = JSON.parse(req.body.datItemsSizeAmount)

                    // Lặp gán Gtri tên ảnh cho bảng dataItemsColorImgages
                    let arrayImgItems  = [...req.files]
                    arrayImgItems.map((item,i) => {
                        if(item.originalname === dataItemsColorImgages[i].image){
                            dataItemsColorImgages[i].image = item.filename
                        }
                    })

        
                    // Xóa item nếu item trong datItemsSizeAmount nếu mount = ''
                    for(let key in datItemsSizeAmount){
                        for(let value in datItemsSizeAmount[key]){
                            if(value === 'amount' && datItemsSizeAmount[key][value] === '' ){
                                delete datItemsSizeAmount[key]
                            }
                        }
                    }

                    // Check data xuống
                    let newData = await validateCreateUser({...dataItemsColorImgages,...dataItems,...dataItemsInfo,...datItemsSizeAmount},'items')

                    if(_.isEmpty(newData) && !_.isEmpty(datItemsSizeAmount)) {
                        let dataRes = await adminServices.addNewItems({items_color_images:dataItemsColorImgages, items: dataItems,items_infos: dataItemsInfo,items_size_amount: datItemsSizeAmount})
                       
                        // Nếu Thành công !!
                        if(dataRes.errCode === 0){
                            return res.status(200).json({
                                errCode: 0,
                                errMessage: 'Ok'
                            })  
                        }

                        // Nếu không thành công xóa ảnh
                        arrayImgItems.map(img => {
                            fs.rmSync(`src/public/images/Items/${img.filename}`, {
                                force: true,
                            });
                        })

                        // Return trả về client
                        return res.status(200).json({
                            errCode: -1,
                            errMessage: 'Add items errr',
                            data: dataRes
                        })  
                    }else{

                        // Nếu không thành công xóa ảnh
                        arrayImgItems.map(img => {
                            fs.rmSync(`src/public/images/Items/${img.filename}`, {
                                force: true,
                            });
                        })

                      
                        // Nếu không có size
                        if(_.isEmpty(datItemsSizeAmount)) {
                            return res.status(200).json({
                                errCode: -1,
                                errMessage: 'Data cannot be left blank',
                                data: {...newData,itemsSizeAmount: {
                                    valueEn: "Not empty size items !!!",
                                    valueVi: "Không được để trống size items !!!"
                                }}
                            });
                        }

                       // Return trả về client
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

// Xl lấy Dl select from (Gender, Province,Permission )
const getDataItems = async (req, res) => {
    try{
        console.log('Get data Items',req.query.type)
        let data = await adminServices.getDataItems(req.query.type)
        return res.status(200).json(data)
    }catch(e){
        return res.status(200).json(e)
    }
}

// Xoa items
const deleteItems = async (req, res) => {
    try{
        console.log('idItems Xoa',req.body.id)
        let data = await adminServices.deleteItems(req.body.id)
        return res.status(200).json(data)
    }catch(e){
        return res.status(200).json(e)
    }
}

// Xl change items
const editDataItems = async (req, res) => {
    try{
        let upload = multer({ storage: storageImgItems, fileFilter: imageFilterImgItems }).array('file',12);  
        upload(req, res, async (err) => {
        try{
            if(!err){
                try{

                    // lấy data truyền xuống
                    let arrayImgItems = [...req.files]
                    let data =  {
                        dataImgFile: arrayImgItems, 
                        dataItems: JSON.parse(req.body.dataItems), 
                        dataItemsInfo: JSON.parse(req.body.dataItemsInfo),
                        dataItemsColorImgages: JSON.parse(req.body.dataItemsColorImgages),
                        dataItemsSizeAmount: JSON.parse(req.body.dataItemsSizeAmount),
                    }

                    // Kiểm tra dữ liệu 
                    let newData = await validateCreateUser({...data.dataItems ,...data.dataItemsInfo} , 'items')

                    // không lỗi gửi đi để update
                    if(_.isEmpty(newData)){
                        let dataRes = await adminServices.editItems(data)
                        if(dataRes.errCode === -1){
                            arrayImgItems.length > 0 && arrayImgItems.map(img => {
                                fs.rmSync(`src/public/images/Items/${img.filename}`, {
                                    force: true,
                                });
                            })
                        }
                        return res.status(200).json(dataRes)
                    }

                    // Xóa img nếu có lỗi
                    arrayImgItems.length > 0 && arrayImgItems.map(img => {
                        fs.rmSync(`src/public/images/Items/${img.filename}`, {
                            force: true,
                        });
                    })

                    return res.status(200).json({
                        errCode: -1,
                        errMessage: 'Error data !!!',
                        data: newData
                    }
                    )

                }catch(err){
                    return res.status(200).json(err)
                }
            }else{
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'An error occurred',
                })
            }
        }catch(err) {
            return res.status(200).json(err)
        }})
    }catch(err){
        return res.status(200).json(err)
    }
}


// Get items where
const getItemsWhere = async (req, res) => {
    try{
        let data = await adminServices.getItemsWhere({type: req.query.type, category: req.query.category})
        return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err)
    }
}


// Get data discount
const getAllDiscountItems = async (req, res) => {
    try{
        let data = await adminServices.getAllDiscountItems(req.query.type)
        return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err)
    }
}


// Get data discount
const searchItems = async (req, res) => {
    try{
        let dataClient = req.query
        let data = await adminServices.searchItems(dataClient)
        return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err)
    }
}



export default {
    searchItems,
    getAllDiscountItems,
    getItemsWhere,
    editDataItems,
    deleteItems,
    getDataItems,
    addNewItems,
    getOneShop,
    changeShopNotImg,
    changeShop,
    deleteShop,
    getAllShop,
    changeUser,
    deleteUser,
    getAllUsers,
    createNewUser,
    getDataWards,
    getDataDistrict,
    getDataAllcode,
    createNewShop
}