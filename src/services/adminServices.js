import db from '../models/index'
import _ from 'lodash'
import hashPassword from '../utils/hashPassword'




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
                idUser:  data.idUser,	
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






export default {
    createNewUser,
    getDataWards,
    getDataDistrict,
    getDataAllcodes
}