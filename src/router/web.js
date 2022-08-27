

import express  from 'express';
import adminController from '../controllers/adminController'
import appController from '../controllers/appController'
let router = express.Router();



function initWebRoutes(app) { 

    // ADMIN
    router.get('/admin/get-data-allcode', adminController.getDataAllcode)
    router.get('/admin/get-data-district', adminController.getDataDistrict)
    router.get('/admin/get-data-wards', adminController.getDataWards) 
    router.get('/admin/get-all-user', adminController.getAllUsers)
    router.get('/admin/get-all-shop', adminController.getAllShop)
    router.get('/admin/get-one-user', adminController.getOneShop)
    
    router.get('/admin/get-data-items', adminController.getDataItems)
    
    router.delete('/admin/delete-user', adminController.deleteUser)
    router.delete('/admin/delete-shop', adminController.deleteShop)

    router.post('/admin/create-shop', adminController.createNewShop) 
    router.post('/admin/create-user', adminController.createNewUser) 
    router.post('/admin/change-shop', adminController.changeShop)
    router.post('/admin/change-user', adminController.changeUser)
    router.post('/admin/change-shop-notIMG', adminController.changeShopNotImg)
    router.post('/admin/create-new-items', adminController.addNewItems)
    router.post('/admin/delete-items', adminController.deleteItems)

    router.post('/admin/change-items', adminController.editDataItems)
    router.get('/admin/get-all-items-where', adminController.getItemsWhere)
    router.get('/admin/get-data-discount', adminController.getAllDiscountItems)
    router.get('/admin/search-data-items', adminController.searchItems)








    // APP
    router.post('/system/login', appController.loginSystem)
    router.post(`/system/create-user`, appController.createNewUser)
    router.post('/system/forgot-password', appController.forgotPassword)
    router.post('/system/update-password', appController.updatePassword)


    return app.use('/', router)
}
export default initWebRoutes;