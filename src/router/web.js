

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

    
    // APP
    router.post('/system/login', appController.loginSystem)
    router.post('/system/forgot-password', appController.forgotPassword)
    router.post('/system/update-password', appController.updatePassword)


    return app.use('/', router)
}
export default initWebRoutes;