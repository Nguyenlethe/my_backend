import express  from 'express';
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoutes from './router/web'
import connectDB from './config/connectDB'
require('dotenv').config() // Giúp ta gọi được biến PORT từ file .env
const port = process.env.PORT || 6262


const app = express()
initWebRoutes(app)
viewEngine(app)



// config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


connectDB()




app.listen(port, () => {   // Ứng dụng của chúng ta được chạy trên port này
    console.log(`Backend Node JS export : http://localhost:${port}/`)
})