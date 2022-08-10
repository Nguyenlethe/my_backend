import appServices from "../services/appServices"
import _ from "lodash";

// Login
const loginSystem = async (req, res) => {
    try{
        let data = req.body
        let ress = await appServices.loginSystem(data)
        return res.status(200).json(ress)
    }catch(e){
        return res.status(200).json(e)
    }
}



// Quên Password (Check Email & Send Email)
const forgotPassword = async (req, res) => {
    try{
        let data = req.body
        let ress = await appServices.forgotPassword(data)
        return res.status(200).json(ress)
    }catch(e){
        return res.status(200).json(e)
    }
}




// Update lại mật khẩu
const updatePassword = async (req, res) => {
    try{
        let data = req.body
        let ress = await appServices.updatePassword(data)
        return res.status(200).json(ress)
    }catch(e){
        return res.status(200).json(e)
    }
}



// Update lại mật khẩu
const createNewUser = async (req, res) => {
    try{
        let data = req.body
        let ress = await appServices.createNewUser(data)
        return res.status(200).json(ress)
    }catch(e){
        return res.status(200).json(e)
    }
}




export default {
    createNewUser,
    updatePassword,
    loginSystem,
    forgotPassword
}