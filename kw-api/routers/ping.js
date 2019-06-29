// router for /ping
// server health check
var express= require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const {response,rescode} = require('../config');

//log incoming request
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next(); 
});

//Ping Pong
router.get('/ping',jsonParser, function(req, res) {
    //if ping then pong
    return response(true,rescode.success,"pong",res);
});



module.exports = router;