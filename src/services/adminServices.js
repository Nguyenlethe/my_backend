import db from '../models/index'
import _ from 'lodash'
import hashPassword from '../utils/hashPassword'
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

                if(inputType !== 'TTP'){
                    data.inputType = await db.Allcode.findAll({
                        where: { type: inputType},
                        attributes: ["id","keyMap","valueEn","valueVi"]
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




// API xóa user
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

export default {
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