import db from '../models/index'
import _ from 'lodash'
import hashPassword from '../utils/hashPassword'
const { Op } = require("sequelize");
var fs = require('fs');


// Lấy Dl bảng Allcode ((Gender, Province,Permission ))
function getDataAllcodes(inputType){
    return new Promise(async(resolve, reject) =>{
        try{
            if(!inputType){
                resolve({
                    errCode: 1,
                    errMessage: 'Type not found => getDataAllcode (adminServices)',
                    data: []
                })
            }else{
                let data = {}
                
                if(inputType === 'TTP'){
                    data.inputType = await db.Province.findAll({
                        where: { type: inputType},
                        attributes: ["id","keyMap","valueEn","valueVi"]
                    })
                }

                if(inputType === 'All'){
                    data.inputType = await db.Allcode.findAll({
                        where: {
                            type: {
                                [Op.in]: ['FSB','FSAM','FSM','FS']
                            }
                        },
                        attributes: ["id","keyMap","valueEn","valueVi"]
                    })
                }


                if(inputType !== 'TTP' && inputType !== 'All'){
                    data.inputType = await db.Allcode.findAll({
                        where: {type: inputType},
                        attributes: ["id",'type',"keyMap","valueEn","valueVi"]
                    })
                }
                
    
                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data: data
                })
            }
        }
        catch(error){
            reject('Error reject :',error)
        }
    })
}

// Lấy Dl Huyện
function getDataDistrict(inputType){
    return new Promise(async(resolve, reject) =>{
        try{
            if(!inputType){
                resolve({
                    errCode: 1,
                    errMessage: 'Type not found => getDataAllcode (adminServices)',
                    data: []
                })
            }else{
                let data = await db.Province.findAll({
                    where: { type: inputType},
                    attributes: ["id","keyMap","valueEn","valueVi"]
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data: data
                })

            }
        }
        catch(error){
            reject('Error reject :',error)
        }
    })
}


// Lấy Dl Xã
function getDataWards(inputType){
    return new Promise(async(resolve, reject) =>{
        try{
            if(!inputType){
                resolve({
                    errCode: 1,
                    errMessage: 'Type not found => getDataAllcode (adminServices)',
                    data: []
                })
            }else{
                let data = await db.Province.findAll({
                    where: { type: inputType},
                    attributes: ["id","keyMap","valueEn","valueVi"]
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data: data
                })

            }
        }
        catch(error){
            reject('Error reject :',error)
        }
    })
}


// Create user
function createNewUser(data){
    return new Promise(async(resolve, reject) =>{
        try{
                let newPassword = hashPassword(data.password)
                await db.User.create({ 
                    email:  data.email,	
                    password:  newPassword,	
                    firstName:  data.firstName,	
                    lastName:  data.lastName,	
                    gender:  data.gender,	
                    permission:  data.permission,	
                    phoneNumber:  data.phoneNumber,	
                    avata:  data.avata,	
                    avataLink:  data.avataLink,	
                    province:  data.province,	
                    district:  data.district,	
                    wards:  data.wards,	
                    addressDetails:  data.addressDetails,	
                })
            

            resolve({
                errCode: 0,
                errMessage:'Ok',
            })
        }
        catch(error){
            reject('Error reject ')
        }
    })
}


// Create Shop
function createNewShop(data){
    return new Promise(async(resolve, reject) =>{
        try{
            console.log('data Create :',data)
            let user = await db.User.findOne({where: {id: data.manageId}})
            if(user){
                await db.User.update({permission: data.permission},{where: {id: data.manageId}})
                await db.Store.create({ 
                    manageId: data.manageId,
                    permission: data.permission,
                    nameShop:  data.nameShop,
                    addressShop: data.addressShop,
                    emailShop: data.emailShop, 
                    phoneNumber: data.phoneNumber,
                    pay: data.pay,
                    province: data.province,
                    avata: data.avata,
                })
            }
            resolve({
                errCode: 0,
                errMessage:'Ok',
            })
        }
        catch(error){
            reject('Error reject ')
        }
    })
}


// Lấy User
function getAllUsers(inputType){
    return new Promise(async(resolve, reject) =>{
        try{
            if(!inputType){
                resolve({
                    errCode: 1,
                    errMessage: 'Type not found',
                })
            }else{
                if(inputType === 'ALL'){
                    let data = await db.User.findAll({
                        order: [['createdAt', 'DESC']],          
                        include : [
                            { model: db.Allcode, as: 'genderData', attributes: ["valueEn", "valueVi"]},
                            { model: db.Allcode, as: 'permissionData', attributes: ["valueEn", "valueVi"]},
                            { model: db.Province, as: 'provinceData', attributes: ["valueEn", "valueVi"]},
                            { model: db.Province, as: 'districtData', attributes: ["valueEn", "valueVi"]},
                            { model: db.Province, as: 'wardsData', attributes: ["valueEn", "valueVi"]}
                        ],
                        attributes: {
                            exclude: ['password']      
                        },
                        raw : true,
                        nest: true
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: {
                            listAllUser: data
                        }
                    })
                }
                
                if(inputType === '!R2'){
                    let dataStore = await db.Store.findAll({
                        attributes: ["manageId"]
                    })

                    let ArrayId = dataStore.map(item => {
                        return  item.manageId
                    })

                    let data = await db.User.findAll({
                        order: [['createdAt', 'DESC']],          
                        include : [
                            { model: db.Allcode, as: 'genderData', attributes: ["valueEn", "valueVi"]},
                            { model: db.Allcode, as: 'permissionData', attributes: ["valueEn", "valueVi"]},
                            { model: db.Province, as: 'provinceData', attributes: ["valueEn", "valueVi"]},
                            { model: db.Province, as: 'districtData', attributes: ["valueEn", "valueVi"]},
                            { model: db.Province, as: 'wardsData', attributes: ["valueEn", "valueVi"]}
                        ],
                        attributes: {
                            exclude: ['password']      
                        },
                        where: {
                            id: {
                              [Op.notIn]: [...ArrayId]
                            }
                        },
                        raw : true,
                        nest: true
                    })

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: {
                            listAllUser: data
                        }
                    })
                }
            }
        }
        catch(error){
            reject('Error reject :',error)
        }
    })
}


// Lấy Dl Shop
function getAllShops(inputType){
    return new Promise(async(resolve, reject) =>{
        try{
            if(inputType === 'ALL'){
                let shop = await db.Store.findAll({
                    order: [['createdAt', 'DESC']],          
                    include : [
                        { model: db.User, as: 'FullName', attributes: ["firstName", "lastName"]},
                    ],
                    attributes: {
                        exclude: ['password']      
                    },
                    raw : true,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    message: 'Ok',
                    data: {
                        listAllShop: shop
                    }
                })
            }


         
            

        }catch(err){
            console.log(err)
        }
    })
}

// API xóa user
function deleteUser(data){
    return new Promise(async(resolve, reject) =>{
        try{
            const user = await db.User.findOne({ 
                where: {id: data.id}       
            })  

            if(user){
                console.log(user)
                await db.User.destroy({ 
                    where: {id: data.id }       
                })  
                fs.rmSync(`src/public/images/Avata/${data.avata}`, {
                    force: true,
                });
                resolve({
                    errCode: 0,
                    message: 'Delete successful'
                })
            }else{     
                resolve({
                    errCode: 2,
                    errMessage: 'The user not found'
                })
            }
        }
        catch(error){
            reject("Delete reject : " + error.message)
        }
    })
}


// API xóa Shop
function deleteShop(data){
    return new Promise(async(resolve, reject) =>{
        try{
            const shop = await db.Store.findOne({ 
                where: {manageId: data.idManage}       
            })  

            if(shop){
                
                await db.Store.destroy({ 
                    where: {manageId: data.idManage}       
                })  
                fs.rmSync(`src/public/images/AvataShop/${data.avata}`, {
                    force: true,
                });

                resolve({
                    errCode: 0,
                    message: 'Delete successful'
                })
            }else{     
                resolve({
                    errCode: 2,
                    errMessage: 'The user not found'
                })
            }
        }
        catch(error){
            reject("Delete reject : " + error.message)
        }
    })
}


// API sửa user
function changeUser(data){
    return new Promise(async(resolve, reject) =>{
        try{
            await db.User.update(
            {
                firstName:  data.firstName,	
                lastName:  data.lastName,	
                gender:  data.gender,	
                permission:  data.permission,	
                phoneNumber:  data.phoneNumber,	
                province:  data.province,	
                district:  data.district,	
                wards:  data.wards,	
                addressDetails:  data.addressDetails,	
            },
            {where :{email:data.email}
            })  
         
            resolve({
                errCode: 0,
                message: 'Change successful'
            })
           
        }
        catch(error){
            reject("Delete reject : " + error.message)
        }
    })
}


// Change shop + img
function editShop(data){
    return new Promise(async(resolve, reject) =>{
        try{
            let dataInfoShop = await db.Store.findOne({where: {manageId: data.manageId}})
            if(data.permission === 'R1' || data.permission === 'R3'){
                fs.rmSync(`src/public/images/AvataShop/${dataInfoShop.avata}`, {
                    force: true,
                });
                await db.Store.destroy({ 
                    where: {manageId: data.manageId}       
                })  
                fs.rmSync(`src/public/images/AvataShop/${data.avata}`, {
                    force: true,
                });
                resolve({
                    errCode: 0,
                    message: 'Delete successful'
                })
            }
        
            
            fs.rmSync(`src/public/images/AvataShop/${dataInfoShop.avata}`, {
                force: true,
            });

            if(dataInfoShop){
                await db.Store.update(
                {
                    permission: data.permission,
                    nameShop:  data.nameShop,
                    addressShop: data.addressShop,
                    emailShop: data.emailShop, 
                    phoneNumber: data.phoneNumber,
                    pay: data.pay,
                    province: data.province,
                    avata: data.avata,
                },
                {where :{manageId:data.manageId}}
                )
            } 
            await db.User.update({permission:  data.permission},
                {where :{id:data.manageId}
            })  
           

            resolve({
                errCode: 0,
                errMessage:'Ok',
            })
        }
        catch(error){
            reject('Error reject ')
        }
    })
}


// Change shop Not IMG
function changeShopNotImg(data){
    return new Promise(async(resolve, reject) =>{
        try{
            let dataInfoShop = await db.Store.findOne({where: {manageId: data.manageId}})

            if(dataInfoShop){
                if(data.permission === 'R1' || data.permission === 'R3'){
                    fs.rmSync(`src/public/images/AvataShop/${dataInfoShop.avata}`, {
                        force: true,
                    });
                    await db.Store.destroy({ 
                        where: {manageId: data.manageId}       
                    })  
                    resolve({
                        errCode: 0,
                        message: 'Delete successful'
                    })
                }
    
                await db.Store.update(
                {
                    permission: data.permission,
                    nameShop:  data.nameShop,
                    addressShop: data.addressShop,
                    emailShop: data.emailShop, 
                    phoneNumber: data.phoneNumber,
                    pay: data.pay,
                    province: data.province,

                },
                {where :{manageId:data.manageId}}
            )} 

            await db.User.update({permission: data.permission},
                {where :{id:data.manageId}
            })  
            resolve({
                errCode: 0,
                errMessage:'Ok',
            })
        }
        catch(error){
            reject("Err reject : " + error.message)
        }
    })
}


// Lấy User
function getOneShop(id){
    return new Promise(async(resolve, reject) =>{
        try{
            if(!id){
                resolve({
                    errCode: 1,
                    errMessage: 'ID not found',
                })
            }else{
                let user = {}
                let res = await db.Store.findOne({
                    where: {id: id}
                })

                console.log(res)

                if(res){
                    let dataUser = await db.User.findOne({
                        where: {id: res.manageId}
                    })
                    if(!dataUser){
                        resolve({
                            errCode: 1,
                            errMessage: 'User Not Found ',
                        })
                    }
                    user.value = dataUser.id,
                    user.labelVi = `${dataUser.firstName} ${dataUser.lastName}`,
                    user.labelEn = `${dataUser.lastName} ${dataUser.firstName}`

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: user
                    })

                }else{
                    resolve({
                        errCode: 1,
                        errMessage: 'Shop Not Found',
                    })
                }
            }
        }
        catch(error){
            reject('Error reject :',error)
        }
    })
}


// Add all Thoong tin items
function addNewItems(data){
    return new Promise(async(resolve, reject) =>{
        try{
            // Check items đã tồn tại chưa
            let res = await db.Items.findOne({
                where: { idItems: data.items.idItems},
            })
         
            if(res){
                resolve({
                    errCode: -2,
                    errMessage: 'Item already exists',
                })
            }else{

                // Thêm data bảmg items
                let resItems = await db.Items.create({ 
                    idItems: data.items.idItems ,
                    idShop: data.items.idShop ,
                    manageId:  data.items.manageId ,
                    category: data.items.category ,
                    type: data.items.type , 
                    discount: data.items.discount ,
                    name: data.items.name ,
                    price: data.items.price ,
                    newPrice: data.items.newPrice ? data.items.newPrice  : '',
                })
                

                if(resItems){
                    // Thêm data bảmg Items_info
                    let Items_info = await db.Items_info.create({ 
                        itemsId: data.items_infos.itemsId ? data.items_infos.itemsId : '',
                        describeHtmlEn: data.items_infos.describeHtmlEn,
                        describeTextEn: data.items_infos.describeTextEn,
                        describeHtmlVi: data.items_infos.describeHtmlVi,
                        describeTextVi: data.items_infos.describeTextVi, 
                        trademark: data.items_infos.trademark,
                        production: data.items_infos.production ? data.items_infos.production  : '',
                        sentFrom: data.items_infos.sentFrom,
                        texture: data.items_infos.texture ? data.items_infos.texture  : '',
                    })


                    if(Items_info){

                        // Chuyển items_color_images thành mảng
                        let dataColorItemsImg = []
                        for(let key in data.items_color_images){
                            dataColorItemsImg.push(data.items_color_images[key])
                        }

                        // Thêm data bảng items_color_images
                        let resItemsColorImages = await db.Items_color_image.bulkCreate(dataColorItemsImg)


                        if(resItemsColorImages){
                            // Chuyển items_size_amount thành mảng
                            let dataItemSizeAmout = []
                            for(let key in data.items_size_amount){
                                dataItemSizeAmout.push(data.items_size_amount[key])
                            }

                            // Thêm data vào bảng Items_size_amount
                            let resItemSizeAmout = await db.Items_size_amount.bulkCreate(dataItemSizeAmout)
                            if(_.isEmpty(resItemSizeAmout)){
                                resolve({
                                    errCode: -1,
                                    errMessage: 'Add data items_size_amount error',
                                })
                                // Xóa data ở các bảng nếu có lỗi
                                await db.Items.destroy({where: {idItems: dataItems.idItems}})
                                await db.Items_info.destroy({where: {itemsId:  dataItems.idItems}})
                                await db.items_color_images.destroy({where: {itemId: dataItems.idItems}})
                            }


                            resolve({
                                errCode: 0,
                                errMessage: 'Ok',
                            })
                        }
                        await db.items_color_images.destroy({where: {itemId: dataItems.idItems}})
                        resolve({
                            errCode: -1,
                            errMessage: 'Add data items_color_images error',
                        })
                    }
                    await db.Items_info.destroy({where: {itemsId:  dataItems.idItems}})
                    resolve({
                        errCode: -1,
                        errMessage: 'Add data Items_info error',
                    })
                }
                await db.Items.destroy({where: {idItems: dataItems.idItems}})
                resolve({
                    errCode: -1,
                    errMessage: 'Add data Items error',
                })
            }
        }



        catch(error){
            reject('Error reject 1:',error)
        }
    })
}

// Get data items
function getDataItems(inputType){
    return new Promise(async(resolve, reject) =>{
        try{

            let data = {}
            if(inputType === 'All'){

                data.inputType = await db.Items.findAll({

                    order: [['createdAt', 'DESC']],      
                    include: [
                        {model: db.Category, as: 'categoryData', attributes: ["valueEn", "valueVi"]},
                        {model: db.Items_info, 
                            as: 'infoItemsData', 
                            attributes: ['describeHtmlEn','describeTextEn','describeHtmlVi','describeTextVi','trademark','production','sentFrom','texture'],
                         
                        },
                        
                    ],
                    raw : true, 
                    nest: true 
                })

                console.log(data.inputType)
            }




            resolve({
                errCode: 0,
                message: 'Ok',
                data: data
            })


         
            

        }catch(err){
            console.log(err)
        }
    })
}



export default {
    getDataItems,
    addNewItems,
    getOneShop,
    changeShopNotImg,
    editShop,
    deleteShop,
    createNewShop,
    changeUser,
    deleteUser,
    getAllUsers,
    createNewUser,
    getDataWards,
    getDataDistrict,
    getDataAllcodes,
    getAllShops
}