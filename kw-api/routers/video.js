// router for /video/
// server health check
var express= require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const {response,rescode} = require('../config');
const {storefile,convertMessage}= require('../controller/video')


//log incoming request
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next(); 
});

//On video convert 
router.post('/convert',jsonParser, async function(req, res) {
    //check one file exists
    if (Object.keys(req.files).length == 0) {
        return  response(false,rescode.fail_bad_req,"No files uploaded",res);
    } else if(Object.keys(req.files).length >1){
        return response(false,rescode.fail_bad_req,"Cannot upload more than one file",res);
    }

    //get the file uploaded
    let videoFile = req.files.video;
    //check if file present with required key
    if(videoFile == undefined){
        return response(false,rescode.fail_bad_req,"upload file with key 'video'",res);
    }

    //store the file
    let retresp =await storefile(videoFile.data);
    if(retresp.success == true){
          //send the convert messgae to que
        retresp =await convertMessage(retresp.msg);
    }

    return response(true,rescode.success,retresp,res);
});



module.exports = router;