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

                console.log('inputType', inputType)

                // Tỉnh Thành Phố
                if(inputType === 'TTP'){
                    data.inputType = await db.Province.findAll({
                        where: { type: inputType},
                        attributes: ["id","keyMap","valueEn","valueVi"]
                    })

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }

                // Lấy ra all các loại hàng
                if(inputType === 'All'){
                    data.inputType = await db.Type.findAll({})

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }

                // Get category Danh mục hàng
                if(inputType === 'CATEGRORY'){
                    data.inputType = await db.Category.findAll({})

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }

                // Get category Danh mục hàng
                if(inputType === 'DCC'){
                    data.inputType = await db.Discount.findAll({})

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }

                // Get category Danh mục hàng
                if(inputType === 'BNPRD'){
                    data.inputType = await db.Trademark.findAll({})

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }

                // Choọn size
                if(inputType === 'TYPESIZE'){
                    data.inputType = await db.Type_size.findAll({})

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }

                // Choọn size
                if(inputType === 'SIZE'){
                    data.inputType = await db.Size.findAll({
                        where: {sizeId: inputType}
                    })

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }

                // Chọn SZNB
                if(inputType === 'SZNB'){
                    data.inputType = await db.Size.findAll({
                        where: {sizeId: inputType}
                    })

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }

                // Chọn COLOR
                if(inputType === 'COLOR'){
                    data.inputType = await db.Color.findAll({})

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }

                // Get data GENDER
                if(inputType === 'GENDER' ){
                    data.inputType = await db.Gender.findAll({})

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }

                // Get data ROLE
                if(inputType === 'ROLE' ){
                    data.inputType = await db.Role.findAll({})

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }

                // Get data PAY
                if(inputType === 'PAY' ){
                    data.inputType = await db.Pay.findAll({})

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }
                

                // Get data lẻ Type
                if(inputType !== 'TTP' && inputType !== 'All' && inputType !== 'DCC'){
                    data.inputType = await db.Type.findAll({
                        where: {typeId: inputType},
                       
                    })

                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                        data: data
                    })
                }


             
                
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
                            { model: db.Gender, as: 'genderData', attributes: ["valueEn", "valueVi"]},
                            { model: db.Role, as: 'permissionData', attributes: ["valueEn", "valueVi"]},
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
                            { model: db.Gender, as: 'genderData', attributes: ["valueEn", "valueVi"]},
                            { model: db.Role, as: 'permissionData', attributes: ["valueEn", "valueVi"]},
                            // { model: db.Allcode, as: 'genderData', attributes: ["valueEn", "valueVi"]},
                            // { model: db.Allcode, as: 'permissionData', attributes: ["valueEn", "valueVi"]},
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
                    discounts: data.items.discount || '0' ,
                    name: data.items.name ,
                    nameEn: data.items.nameEn ,
                    price: data.items.price ,
                    priceUS: data.items.priceUS ,
                    newPrice: data.items.newPrice ? data.items.newPrice  : '',
                    newPrice: data.items.newPriceUS ? data.items.newPriceUS  : '',
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
                                await db.Items_color_image.destroy({where: {itemId: dataItems.idItems}})
                            }
                            resolve({
                                errCode: 0,
                                errMessage: 'Ok',
                            })
                        }
                        await db.Items_color_image.destroy({where: {itemId: dataItems.idItems}})
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

                // Lấy thông tin items
                data.inputType = await db.Items.findAll({
                    order: [['createdAt', 'DESC']],      
                    attributes: { exclude: ['category','type'] },
                    include: [
                        {model: db.Store, as: 'storeData', attributes: ["manageId","nameShop"]},
                        {model: db.Discount, as: 'discountData', attributes: ["code","valueEn", "valueVi"]},
                        {model: db.Category, as: 'categoryData', attributes: ["code","valueEn", "valueVi"]},
                        {model: db.Type, as: 'typeData', attributes: ["code","valueEn", "valueVi"]},
                        {model: db.Items_info,as: 'infoItemsData', 
                            attributes: ['describeHtmlEn','describeTextEn','describeHtmlVi','describeTextVi','trademark','production','sentFrom','texture',
                        ],
                            include: [
                                {model: db.Trademark, as: 'trademarkData', attributes: ["code","valueEn", "valueVi"]},
                            ],
                            attributes: {
                                exclude: ['trademark','createdAt','updatedAt']      
                            },
                        },
                    ],
                    limit : 20,
                    raw : true, 
                    nest: true 
                })

                // Lấy ra danh sách id items
                let itemsCoppy = data.inputType.map(item => {
                    return item.idItems
                })

                // Lấy ra màu + ảnh
                let dataColorImg = await db.Items_color_image.findAll({
                    attributes: {exclude: ['id','createdAt','updatedAt','imageLink','color']},
                    order: [['createdAt', 'DESC']],  
                    where: {
                        itemId: {
                            [Op.in]: [...itemsCoppy]
                        }
                    },        
                    include : [
                        { model: db.Color, as: 'colorData', attributes: ["code","valueEn", "valueVi"]},
                    ],
                    raw : true, 
                    nest: true 
                })


                // Lấy ra size + amount 
                let dataSizeAmount = await db.Items_size_amount.findAll({
                    attributes: {exclude: ['id','createdAt','updatedAt','size','typeSize']},
                    order: [['createdAt', 'DESC']],  
                    where: {
                        itemsId: {
                            [Op.in]: [...itemsCoppy]
                        }
                    },        
                    include : [
                        { model: db.Size, as: 'sizeData', attributes: ["code","valueEn", "valueVi"]},
                        { model: db.Type_size, as: 'typeSizeData', attributes: ["code","valueEn", "valueVi"]},

                    ],
                    raw : true, 
                    nest: true 
                })

                // Gán data color + img cho items
                data.inputType.map((item,index) => {
                    let dataColor = dataColorImg.filter(data => {
                        if(data.itemId === item.idItems){
                            return data
                        }
                    })
                    item.dataColorImg = [...dataColor]
                })

                // Gán data size + amount  cho items
                data.inputType.map((item,index) => {
                    let dataSize = dataSizeAmount.filter(data => {
                        if(data.itemsId === item.idItems){
                            return data
                        }
                    })
                    item.dataSizeAmount = [...dataSize]
                })

    
              

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

// Xoa items
function deleteItems(id){
    return new Promise(async(resolve, reject) =>{
        try{
            
            const items = await db.Items.findOne({ 
                where: {idItems: id}       
            })
            const imgItems = await db.Items_color_image.findAll({ 
                where: {itemId: id}       
            })  

            // Nếu tồn tại items
            if(items && imgItems){

                // Lặp xóa ảnh
                imgItems.map((img) => {
                    fs.rmSync(`src/public/images/Items/${img.image}`, {
                        force: true,
                    });
                })


                await db.Items.destroy({where: {idItems: id}})
                await db.Items_color_image.destroy({where: {itemId: id}})
                await db.Items_info.destroy({where: {itemsId:  id}})
                await db.Items_size_amount.destroy({where: {itemsId:  id}})


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
        }catch(err){
            console.log(err)
        }
    })
}

// EDIT all Thoong tin items
function editItems(data){
    return new Promise(async(resolve, reject) =>{
        try{
            
            // Nếu sửa ảnh 
            if(data && data.dataImgFile.length > 0 && data.dataItemsColorImgages.length > 0){

                // Set name img file 
                data.dataItemsColorImgages.map(img => {
                    data.dataImgFile.map(imgFile => {
                        if(img.image === imgFile.originalname){
                            console.log(imgFile.filename, img.image)
                            img.image = imgFile.filename
                        }
                    })
                })
                

                let imgOld = await db.Items_color_image.findAll({where: {itemId: data.dataItemsColorImgages[0].itemId},attributes: ['image']})
                // Lấy ra img cũ
                let dataImgOld = [] 
                imgOld.map(item => dataImgOld.push(item.image))
                
                // lấy ra img mới
                let dataImgNew = [] 
                data.dataItemsColorImgages.map(item => dataImgNew.push(item))
           
                // Lấy ra img thay đổi
                let dataImgNewSave = dataImgNew
                let dataImgOlddalete = dataImgOld
                dataImgOld.map(item => {
                    dataImgNew.map((img,index) => {
                        if(item === img.image){
                            if(dataImgNewSave[index]){
                                dataImgNewSave[index] = ''
                            }
                            if(dataImgOlddalete[index]){
                                dataImgOlddalete[index] = ''
                            }
                        }
                    })
                })


                // Xóa ảnh cũ
                let imgDelete = dataImgOlddalete.filter(item => item.trim() !== '')
                console.log('Ảnh Xóa',imgDelete)
                imgDelete.length > 0 && imgDelete.map(img => {
                    fs.rmSync(`src/public/images/Items/${img}`, {
                        force: true,
                    });
                })

                // Delete data img color
                await db.Items_color_image.destroy({where: {itemId: data.dataItemsColorImgages[0].itemId}})

                // Thêm data bảng items_color_images
                await db.Items_color_image.bulkCreate(data.dataItemsColorImgages)
            }

            // Chỉ sửa màu không sửa ảnh
            if(data && data.dataImgFile.length === 0 && data.dataItemsColorImgages.length > 0){
                // Delete data img color
                await db.Items_color_image.destroy({where: {itemId: data.dataItemsColorImgages[0].itemId}})

                // Thêm data bảng items_color_images
                await db.Items_color_image.bulkCreate(data.dataItemsColorImgages)
            }

            // Lấy ra giá cũ
            let oldDataPrice = await db.Items.findOne({ 
                where: {idItems: data.dataItems.idItems},
                attributes: ['price','priceUS'],     
            })

            // updata data items
            let resItems = await db.Items.update(
                {
                    idItems: data.dataItems.idItems,
                    idShop: data.dataItems.idShop,
                    manageId: data.dataItems.manageId,
                    category: data.dataItems.category,
                    type: data.dataItems.type, 
                    discounts: data.dataItems.discount || '0',
                    name: data.dataItems.name,
                    nameEn: data.dataItems.nameEn,
                    price: oldDataPrice.price,
                    priceUS: oldDataPrice.priceUS,
                    newPrice: data.dataItems.newPrice,
                    newPriceUS: data.dataItems.newPriceUS,
                },
                {where :{idItems: data.dataItems.idItems}}
            )

            // Nếu upload items không thành công 
            if(resItems.length === 0) {
                resolve({
                    errCode: -1,
                    errMessage: 'Upload items error !!!'
                })
            } 
            
            // Update barng item info 
            let itemsInfo = await db.Items_info.update(
                { 
                    itemsId: data.dataItemsInfo.itemsId,
                    describeHtmlEn: data.dataItemsInfo.describeHtmlEn,
                    describeTextEn: data.dataItemsInfo.describeTextEn,
                    describeHtmlVi: data.dataItemsInfo.describeHtmlVi,
                    describeTextVi: data.dataItemsInfo.describeTextVi, 
                    trademark: data.dataItemsInfo.trademark,
                    production: data.dataItemsInfo.production,
                    sentFrom: data.dataItemsInfo.sentFrom,
                    texture: data.dataItemsInfo.texture,
                },
                {where: {itemsId: data.dataItems.idItems}}
            )

            // Nếu upload items không thành công 
            if(itemsInfo.length === 0) {
                resolve({
                    errCode: -1,
                    errMessage: 'Upload itemsInfo error !!!'
                })
            } 

            // Upload data size + amount nếu size tồn tại 
            if(data.dataItemsSizeAmount){
                if(!data.dataItemsSizeAmount.data){

                    let newNataItemsSizeAmount = []
                    let idItems = []
                    let dataSize = []
                    // Lấy ra list size + id items
                    for(let key in data.dataItemsSizeAmount) {
                        newNataItemsSizeAmount.push(data.dataItemsSizeAmount[key])
                        idItems.push(data.dataItemsSizeAmount[key].itemsId)
                        dataSize.push(data.dataItemsSizeAmount[key].size)
                    }
                    

                    // delete size old
                    await db.Items_size_amount.destroy({   
                            where: {itemsId: idItems[0], size: { [Op.in]: [...dataSize]}}
                        }
                    )
                    
                    // add new size mount 
                    await db.Items_size_amount.bulkCreate(newNataItemsSizeAmount)
                    
                    resolve({
                        errCode: 0,
                        errMessage: 'Ok'
                    })

                }
                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                })
            }


            resolve({
                errCode: 0,
                errMessage: 'Ok'
            })
        }
        catch(error){
            reject({
                errCode: -1,
                errMessage: 'Upload error !!!',
                data: error
            })
        }
    })
}

// Get items where
function getItemsWhere(data){
    return new Promise(async(resolve, reject) =>{
        try{
            console.log(data)
            if(!_.isEmpty(data)){
                let res  = []

                // Truyền đầy đủ thông tin category !== All
                if(data.idShop && data.category && data.type && data.category !== 'All'){
                    res = await db.Items.findAll({
                        where: {
                            idShop: data.idShop,
                            category: data.category, 
                            type: data.type
                        },
                        include: [
                            {model: db.Items_color_image, as:'dataImgItems', attributes: ["image"] },
                        ],
                        group: ['idItems'],
                        limit : 30,
                        raw : true, 
                        nest: true 
                    })
                }

                // Không truyền type và Category !== All
                if(data.type === 'none' && data.category !== 'All'){
                    res = await db.Items.findAll({
                        where: {
                            idShop: data.idShop,
                            category: data.category
                        },
                        include: [
                            {model: db.Items_color_image, as:'dataImgItems', attributes: ["image"] },
                        ],
                        group: ['idItems'],
                        limit : 30,
                        raw : true, 
                        nest: true 
                    })
                }

                // Không truyền type, category === 'All
                if(data.type === 'none' && data.category === 'All'){
                    res = await db.Items.findAll({
                        where: {
                            idShop: data.idShop
                        },
                        include: [
                            {model: db.Items_color_image, as:'dataImgItems', attributes: ["image"] },
                        ],
                        group: ['idItems'],
                        limit : 30,
                        raw : true, 
                        nest: true 
                    })
                }

                // Truyền type !== none, category === 'All'
                if(data.type !== 'none' && data.category === 'All'){
                    res = await db.Items.findAll({
                        where: {
                            idShop: data.idShop,
                            type: data.type
                        },
                        include: [
                            {model: db.Items_color_image, as:'dataImgItems', attributes: ["image"] },
                        ],
                        group: ['idItems'],
                        limit : 30,
                        raw : true, 
                        nest: true 
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: res
                })
            }

            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        }
        catch(error){
            reject('Error reject :',error)
        }
    })
}

// Get data voucher
function getAllDiscountItems(type){
    return new Promise(async(resolve, reject) =>{
        try{
            console.log('data xuoonsg :',type)

            if(!type){
                resolve({
                    errCode: -1,
                    errMessage: 'Not type !!!'
                })
            }
            let voucher = await db.Voucher.findAll({
                where: {idUserCreate: type}
            })

            if(!voucher){
                resolve({
                    errCode: -2,
                    errMessage: 'Not data voucher !!!'
                })
            }

            resolve({
                errCode: 0,
                errMessage: 'OK',
                data: voucher
            })
    
        }
        catch(error){
            reject('Error reject :',error)
        }
    })
}

// Get items where
function searchItems(data){
    return new Promise(async(resolve, reject) =>{
        try{
            let {table,type,value,idShop} = data
            if(!table || !type || !value || !idShop){
                resolve({
                    errCode: -1,
                    errMessage: 'Data type error !!!',
                    data: []
                })
            }

            if(table === 'Items'){
                if(type === 'idItems'){

                    console.log(value,idShop)

                    let dataRes = await db.Items.findAll({
                        where: {
                            idShop: idShop,
                            idItems: {
                                [Op.startsWith]: value
                            }
                        },
                        include: [
                            {model: db.Items_color_image, as:'dataImgItems', attributes: ["image"] },
                        ],
                        group: ['idShop'],
                        raw : true, 
                        nest: true 
                    })

                    if(dataRes.length === 0){
                        resolve({
                            errCode: -2,
                            errMessage: 'Not Items',
                            data: []
                        })
                    }
                    resolve({
                        errCode: 0,
                        errMessage: 'OK',
                        data: dataRes
                    })
                }
            }

            
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data: []
            })
        }
        catch(error){
            reject('Error reject :',error)
        }
    })
}


export default {
    searchItems,
    getAllDiscountItems,
    getItemsWhere,
    editItems,
    deleteItems,
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










