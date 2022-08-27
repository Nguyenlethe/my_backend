import db from '../models/index'
import _, { constant } from "lodash";

// Check dữ liệu tạo ng dùng để tải lên Đb
const validateCreateUser = async (dataUser, type) => {

    var checkEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    var checkPasswor = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    var checkPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let listErr = {}

   console.log(dataUser)

    if(!_.isEmpty(dataUser)){

        for(let key in dataUser) {

            if(dataUser[key] === '' && key !== 'newPrice' && key !== 'production' && key !== 'texture' && key !== 'sale' && key !== 'discount'){
                listErr[key] = {
                    valueVi: `Không được để trống ${key} !!!`,
                    valueEn: `Not empty ${key} !!!`
                }
            }


            if(key === 'price'){

                if(Number(dataUser[key]) + 0 === NaN){
                    listErr[key] = {
                        valueVi: `${key} không hợp lệ !!!`,
                        valueEn: `${key} Invalid !!!`
                    }
                }
            }
            
            if(key === 'email'){
                console.log(dataUser[key])
                if(dataUser[key] !== ''){
                    if(!checkEmail.test(dataUser[key])){
                        listErr[key] = {
                            valueVi: `${key} không hợp lệ !!!`,
                            valueEn: `${key} Invalid !!!`
                        }
                    }
                    else{
                        let data = await db.User.findOne({
                            where: { email: dataUser[key]},
                            attributes: ["email"]
                        })
                        if(data) {
                            listErr[key] = {
                                valueVi: `${key} Đã tồn tại vui lòng nhập ${key} khác !!!`,
                                valueEn: `${key} already exists, please enter another ${key} !!!`
                            }
                        }
                    }
                }
            }

            if(type !== 'Shop'){
                if(key === 'password'){
                    if(dataUser[key].trim() !== ''){
                        if(!checkPasswor.test(dataUser[key])){
                            listErr[key] = {
                                valueVi: `${key} không hợp lệ !!!`,
                                valueEn: `${key} Invalid !!!`
                            }
                        }
                    }
                }
            }

            if(key === 'phoneNumber'){
                if(dataUser[key] !== ''){
                    if(!checkPhone.test(dataUser[key])){
                        listErr[key] = {
                            valueVi: `${key} không hợp lệ !!!`,
                            valueEn: `${key} Invalid !!!`
                        }
                    }
                }
            }
            
            if(type !== 'Shop' && type !== 'items'){
                if(dataUser.avata === undefined || null){
                    listErr.avata = {
                        valueVi: `Avata Trống !!!`,
                        valueEn: `Not empty Avata !!!`
                    }
                }
            }

            
            if(dataUser.type === 'EditIMG'){
                if(key === 'emailShop'){
                    if(dataUser[key] !== ''){
                        if(!checkEmail.test(dataUser[key])){
                            listErr[key] = {
                                valueVi: `${key} không hợp lệ !!!`,
                                valueEn: `${key} Invalid !!!`
                            }
                        }
                    }
                }
            }


            

        }
        return listErr
    }else{
        return {}
    }
}


export default validateCreateUser