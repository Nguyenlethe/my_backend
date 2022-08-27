import express  from 'express';
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoutes from './router/web'
import connectDB from './config/connectDB'



require('dotenv').config() // Giúp ta gọi được biến PORT từ file .env
const port = process.env.PORT || 6262
const app = express()




app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:6868');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
})

// config app
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'},{extended: true}));


initWebRoutes(app)
viewEngine(app)
connectDB()





app.listen(port, () => {   // Ứng dụng của chúng ta được chạy trên port này
    console.log(`Backend Node JS export : http://localhost:${port}/`)
})


