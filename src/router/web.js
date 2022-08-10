

import express  from 'express';
import adminController from '../controllers/adminController'
import appController from '../controllers/appController'
let router = express.Router();



function initWebRoutes(app) { 

    // ADMIN
    router.get('/admin/get-data-allcode', adminController.getDataAllcode)
    router.get('/admin/get-data-district', adminController.getDataDistrict)
    router.get('/admin/get-data-wards', adminController.getDataWards) 
    router.post('/admin/create-user', adminController.createNewUser) 
    router.post('/admin/create-shop', adminController.createNewShop) 
    
    router.get('/admin/get-all-user', adminController.getAllUsers)
    router.get('/admin/get-all-shop', adminController.getAllShop)

    

    router.delete('/admin/delete-shop', adminController.deleteShop)

    router.delete('/admin/delete-user', adminController.deleteUser)
    router.post('/admin/change-user', adminController.changeUser)


    
    // APP
    router.post('/system/login', appController.loginSystem)
    router.post('/system/forgot-password', appController.forgotPassword)
    router.post('/system/update-password', appController.updatePassword)
    router.post(`/system/create-user`, appController.createNewUser)


    return app.use('/', router)
}
export default initWebRoutes;