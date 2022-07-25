import express  from 'express';
import  homecontroller  from '../controllers/homecontroller'


let router = express.Router();




function initWebRoutes(app) { 

    router.get('/', function(req, res){
        res.send('Heloo')
    })






    return app.use('/', router)
}

export default initWebRoutes;
