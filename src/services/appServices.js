import CheckDataDown from '../utils/CheckDataDown'
import hashPassword from '../utils/hashPassword'
import bcrypt  from 'bcryptjs'; 
import db from '../models/index'
import sendEmail from '../utils/sendEmail'

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
                    attributes: {
                        exclude: ['phoneNumber','gender','district','wards']      
                    },
                })
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






export default {updatePassword, loginSystem, forgotPassword,createNewUser}