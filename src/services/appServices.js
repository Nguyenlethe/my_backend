import CheckDataDown from '../utils/CheckDataDown'
import hashPassword from '../utils/hashPassword'
import bcrypt  from 'bcryptjs'; 
import db from '../models/index'
import sendEmail from '../utils/sendEmail'
const { Op } = require("sequelize");
const salt = bcrypt.genSaltSync(10);

// Login 
function loginSystem(dataForm) {
    return new Promise( async(resolve, reject) => {
        try{
            let isData = CheckDataDown(dataForm);
            if(isData.status === true){
                let res = await db.User.findOne({
                    where: {
                        email: dataForm.account,
                    },
                    include: [
                        { model: db.Province, as: 'provinceData', attributes: ["valueEn", "valueVi"]},
                        { model: db.Province, as: 'districtData', attributes: ["valueEn", "valueVi"]},
                        { model: db.Province, as: 'wardsData', attributes: ["valueEn", "valueVi"]}
                    ],
                    raw : true,
                    nest: true
                })

                console.log(res)

                if(res){
                    let password = hashPassword(dataForm.password,res.password, 'login');
                    if(password){
                        if(!res.permission){
                            res.permission = 'R3'
                        }
                        let role = hashPassword(res.permission);
                        resolve({
                            errCode: 0,
                            messages: 'Ok',
                            data: {...res,permission: role}
                        })
                    }else{
                        resolve({
                            errCode: 2,
                            messages: 'Incorrect information',
                            data: { password: {
                                    valueVi: 'Mật khẩu không chính xác !!!',
                                    valueEn: 'Incorrect password'
                                }
                            }
                        })
                    }
                }else{
                    resolve({
                        errCode: 1,
                        messages: 'Incorrect information',
                        data: { account: {
                            valueVi: 'Email không chính xác !!!',
                            valueEn: 'Incorrect Email'
                        }
                        }
                    })
                }
            }
        }
        catch(err){
            reject(err)
        }
    })
}

// Get check Email & Gửi Email
function forgotPassword(inputData) {
    return new Promise( async(resolve, reject) => {
        try{
            if(!inputData.valueAccount){
                resolve({ 
                    errCode: 1,
                    messages: 'Email Not Empty'
                })
            }

            let res = await db.User.findOne({
                where: {
                    email: inputData.valueAccount,
                }
            })

            if(res){


                console.log(res)

                let token = Math.floor(Math.random() * 10000);
                await sendEmail.sendSimpleEmail({...inputData,fullName: `${res.firstName} ${res.lastName}`, token: token})
   

                let addTokenDbUser = await db.User.update(
                    { token: token},
                    {where: {email: inputData.valueAccount}}
                )
                
                if(addTokenDbUser){
                    resolve({
                        errCode: 0,
                        messages: 'Ok',
                    })    
                }else{
                    resolve({
                        errCode: -1,
                        messages: 'The server is not responding'
                    })   
                }
            }else{
                resolve({
                    errCode: 1,
                    messages: 'Email already exist',
                    data: { account: {
                        valueVi: 'Không tìm thấy account !!!',
                        valueEn: 'Account not found',
                    }}
                })
            }
        }
        catch(err){
            reject(err)
        }
    })
}

// Check token và Update password
function updatePassword(data) {
    return new Promise( async(resolve, reject) => {
        try{
            let resBol = CheckDataDown(data)
            if(resBol.status === true){
                let res = await db.User.findOne({
                    where: {
                        email: data.valueAccount,
                        token: data.token
                    }
                })
                if(!res){
                    resolve({
                        errCode: 1,
                        messages: 'Token not found',
                        data: {
                            valueVi: 'Mã xác nhận không đúng !!!',
                            valueEn: 'Incorrect code!!!'
                        }
                    })
                }
                let newPass = hashPassword(data.newPassword)
                let addTokenDbUser = await db.User.update(
                    { 
                        token: 'Empty',
                        password: newPass
                    },
                    {where: {email: data.valueAccount}}
                )
                if(addTokenDbUser){
                    resolve({
                        errCode: 0,
                        messages: 'Ok',
                    })
                }else{
                    resolve({
                        errCode: -1,
                        messages: 'The server is not responding'
                    })
                }
            }   
        }
        catch(err){
            reject(err)
        }
    })
}

// Register
function createNewUser(dataForm) {
    return new Promise( async(resolve, reject) => {
        try{
            console.log('Du lieu xuong :',dataForm)

            let isData = CheckDataDown(dataForm);
            if(isData.status === true){
                let res = await db.User.findOne({
                    where: {email: dataForm.account}
                })

                console.log('Du lieu check DB :',res)

                if(!res){

                    let newPassword = hashPassword(dataForm.password);
                    await db.User.create({
                        permission: 'R3',
                        email: dataForm.account,
                        password: newPassword
                    })

                    resolve({
                        errCode: 0,
                        messages: 'OK',
                    })

                }else{
                    resolve({
                        errCode: 1,
                        messages: 'Email already exist',
                        data: { account: {
                            valueVi: 'Email đã tồn tại !!!',
                            valueEn: 'Email already exist'
                        }}
                    })
                }
            }
        }
        catch(err){
            reject(err)
        }
    })
}

// Get items where
function searchItemsNameNav(data){
    return new Promise(async(resolve, reject) =>{
        try{

            let dataSearch = []
            const numberLimit =  Number(data.limit)
            const pageNumber = Number(data.page)

            let count = await db.Items.findAll({attributes: ['id']})


            //  Toàn bộ web vi
            if(data.idShop === 'EMPTY' && data.language === 'vi' && data.category === 'All'){
                dataSearch = await db.Items.findAll({
                    where: {
                        name: {
                            [Op.substring]: data.value
                        }
                    },
                    include: [
                        {model: db.Items_color_image, as:'dataImgItems', attributes: ["image"] },
                    ],
                    offset:((pageNumber-1) * numberLimit),
                    limit : numberLimit,
                    subQuery:false,
                    group: ['idItems'],
                    raw : true, 
                    nest: true 
                })
            }

            //  Toàn bộ web en
            if(data.idShop === 'EMPTY' && data.language === 'en' && data.category === 'All'){
                dataSearch = await db.Items.findAll({
                    where: {
                        nameEn: {
                            [Op.substring]: data.value
                        }
                    },
                    include: [
                        {model: db.Items_color_image, as:'dataImgItems', attributes: ["image"] },
                    ],
                     offset:((pageNumber-1) * numberLimit),
                    limit : numberLimit,
                    subQuery:false,
                    group: ['idItems'],
                    raw : true, 
                    nest: true 
                })
            }

            // Trong shop vi
            if(data.idShop !== 'EMPTY' && data.language === 'vi'){
                dataSearch = await db.Items.findAll({
                    where: {
                        idShop: data.idShop,
                        name: {
                            [Op.substring]: data.value
                        }
                    },
                    include: [
                        {model: db.Items_color_image, as:'dataImgItems', attributes: ["image"] },
                    ],
                     offset:((pageNumber-1) * numberLimit),
                    limit : numberLimit,
                    subQuery:false,
                    group: ['idItems'],
                    raw : true, 
                    nest: true 
                })
            }

            // Trong shop en
            if(data.idShop !== 'EMPTY' && data.language === 'en'){
                dataSearch = await db.Items.findAll({
                    where: {
                        idShop: data.idShop,
                        nameEn: {
                            [Op.substring]: data.value
                        }
                    },
                    include: [
                        {model: db.Items_color_image, as:'dataImgItems', attributes: ["image"] },
                    ],
                     offset:((pageNumber-1) * numberLimit),
                    limit : numberLimit,
                    subQuery:false,
                    group: ['idItems'],
                    raw : true, 
                    nest: true 
                })
            }

            // Trong Danh mục vi
            if(data.idShop === 'EMPTY' && data.language === 'vi' && data.category !== 'All'){
                dataSearch = await db.Items.findAll({
                    where: {
                        category: data.category,
                        nameEn: {
                            [Op.substring]: data.value
                        }
                    },
                    include: [
                        {model: db.Items_color_image, as:'dataImgItems', attributes: ["image"] },
                    ],
                    offset:((pageNumber-1) * numberLimit),
                    limit : numberLimit,
                    subQuery:false,
                    group: ['idItems'],
                    raw : true, 
                    nest: true 
                })
            }

            // Trong Danh mục En
            if(data.idShop === 'EMPTY' && data.language === 'en' && data.category !== 'All'){
                dataSearch = await db.Items.findAll({
                    where: {
                        category: data.category,
                        nameEn: {
                            [Op.substring]: data.value
                        }
                    },
                    include: [
                        {model: db.Items_color_image, as:'dataImgItems', attributes: ["image"] },
                    ],
                    offset:((pageNumber-1) * numberLimit),
                    limit : numberLimit,
                    subQuery:false,
                    group: ['idItems'],
                    raw : true, 
                    nest: true 
                })
            }

            // NOT ITEMS
            if(dataSearch.length === 0){
                resolve({
                    errCode: -2,
                    errMessage: 'Not Items',
                    data: []
                })
            }


            // OK
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data: dataSearch,
                count: count.length
            })
        }
        catch(error){
            reject('Error reject :',error)
        }
    })
}

// Get likes or Follow
function getLikeOrFollowItemsShop(data){
    return new Promise(async(resolve, reject) =>{
        try{

            let res = []
            console.log('DATA XUONG :',data)

            // ADD     { idUser: '2', type: 'ADD', idItems: 'ADMTSP02', idShop: '3' }
            // DELETE  { idUser: '2', type: 'DELETE', idItems: 'ADMTSP01', idShop: '3' }


            // Get items like
            if(data.type && data.type == 'LIKE'){
                res = await db.FollowLike.findAll({
                    where: {idUser: data.idUser, status: 'LK'},
                    attributes: ['idItems'],
                })
            }

            // Get shop follow
            if(data.type && data.type == 'FLOW'){
                res = await db.FollowLike.findAll({
                    where: {idUser: data.idUser, status: 'LK'},
                    attributes: ['idItems'],
                })
            }

            // LIKE
            if(data.type && data.type == 'ADD'){
                await db.FollowLike.create({
                    idUser: data.idUser,
                    idShop: data.idShop,
                    idItems: data.idItems,
                    status:  'LK',
                })
            }

            // DELETE LIKE
            if(data.type && data.type == 'DELETE'){
                await db.FollowLike.destroy({
                    where: {
                        idUser: data.idUser,
                        idItems: data.idItems,
                        idShop: data.idShop,
                        status:  'LK',
                    }
                })
            }

            console.log('ITEMS LIKE :', res)


            resolve({
                errCode: 0,
                errMessage: 'OK',
                data: res
            })
          
        }
        catch(error){
            reject('Error reject :',error)
        }
    })
}

// Delete voucher Expired
function deleteVoucherExpired(){
    return new Promise(async(resolve, reject) =>{
        try{

            let resVoucher = await db.Items_discount.findAll({
                attributes: ['id', 'dayEnd'],
                raw : true, 
                nest: true 
            })

            let arrayIdVoucherDelete = []
            if(resVoucher && resVoucher.length > 0){
                
                resVoucher.map(day => {
                    let today = new Date();
                    const dayEndVouCher = new Date(`${day.dayEnd}`)
                    const timeVoucher = dayEndVouCher.getTime()
                    const timeNow = today.getTime()
                    today = today.setHours(0, 0, 0, 0);

                    if(timeVoucher < timeNow){
                        arrayIdVoucherDelete.push(day.id)
                    }
                })
            }


            await db.Items_discount.destroy({   
                where: {id: { [Op.in]: arrayIdVoucherDelete}}
            })
    

            resolve({
                errCode: 0,
                errMessage: 'OK',
            })
          
        }
        catch(error){
            reject('Error reject :',error)
        }
    })
}


// add items to cart
function addNewItemsToCart(dataClient) {
    return new Promise( async(resolve, reject) => {
        try{
            
            await db.Manage_oder.create({
                itemsId: dataClient.itemsId,
                userGuestId: dataClient.userGuestId,
                idShop:  dataClient.idShop,
                itemsNumber: dataClient.itemsNumber,
                timeCreate: dataClient.timeCreate,
                status: 'CART',
                color: dataClient.color,
                size: dataClient.size
            })
                
            resolve({
                errCode: 0,
                messages: 'OK'
            })
           
        }
        catch(err){
            reject(err)
        }
    })
}

// get list items cart
function getListCart(id) {
    return new Promise( async(resolve, reject) => {
        try{
            
            console.log('DATA CART :',id)
            let res = await db.Manage_oder.findAll({
                where: {userGuestId: id, status: "CART"},
                include: [
                    {model: db.Items,
                        include: [
                            {model: db.Items_color_image, as:'dataImgItems', attributes: ["image"] },
                        ],
                        group: ['idItems']
                    }
                ],
                group: ['id'],
                raw : true, 
                nest: true 
            })
         
                
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data: res
            })
           
        }
        catch(err){
            reject(err)
        }
    })
}

export default {
    getListCart,
    addNewItemsToCart,
    deleteVoucherExpired,
    getLikeOrFollowItemsShop,
    updatePassword, 
    loginSystem, 
    forgotPassword,
    createNewUser,
    searchItemsNameNav
}

