const multer = require('multer'); 

const path = require('path');
var appRoot = require('app-root-path'); 


// Lưu file,tên file
const storageAvata = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + "/src/public/images/Avata");
    },

    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})


// Kiểm tra xem tải đúng file không
const imageFilterAvata = function(req, file, cb) {
    // Nếu mà name file không match với các đôi file trên này thì sẽ báo lỗi ra
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Định dạng file không được hỗ trợ !!!';
        return cb(new Error('Định dạng file không được hỗ trợ !!!'), false);
    }
    cb(null, true);
}




// Lưu file,tên file
const storageAvataShop = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + "/src/public/images/AvataShop");
    },

    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})




// Kiểm tra xem tải đúng file không
const imageFilterAvataShop = function(req, file, cb) {
    // Nếu mà name file không match với các đôi file trên này thì sẽ báo lỗi ra
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Định dạng file không được hỗ trợ !!!';
        return cb(new Error('Định dạng file không được hỗ trợ !!!'), false);
    }
    cb(null, true);
}



// Lưu file,tên file
const storageImgItems = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + "/src/public/images/Items");
    },

    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})




// Kiểm tra xem tải đúng file không
const imageFilterImgItems = function(req, file, cb) {
    // Nếu mà name file không match với các đôi file trên này thì sẽ báo lỗi ra
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Định dạng file không được hỗ trợ !!!';
        return cb(new Error('Định dạng file không được hỗ trợ !!!'), false);
    }
    cb(null, true);
}





export { storageAvata, storageAvataShop,storageImgItems, imageFilterAvataShop,imageFilterAvata ,imageFilterImgItems} 
