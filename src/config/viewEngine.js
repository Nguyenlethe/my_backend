import express  from "express";


function configViewEngine(app) {
    app.use(express.static('./src/public'))  // cho phép phía clien vào thư mục này
    app.set('view engine', 'ejs')            // Đọc các file có duôi ejs
    app.set('views', './src/views')          // Địa chỉ lấy các file ejs
}

export default configViewEngine;