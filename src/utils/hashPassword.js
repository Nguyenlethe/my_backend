import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10) 

// Conver password
function hashUserPassword(password,userPassword, type){
    if(type === 'login'){
        let checkPassword = bcrypt.compareSync(password,userPassword)
        return checkPassword
    }
    if(!type){
        let hashPassword = bcrypt.hashSync(password, salt);
        if(hashPassword) {
            return hashPassword
        }
    }
}

export default hashUserPassword