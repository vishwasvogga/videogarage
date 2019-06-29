//----------------All video upload hits here first--------------------------//

//we are usiing express js for creation of API
const express = require('express');
const app = express();
//file upload plugin of express js
const fileUpload = require('express-fileupload');
//to create server
const http = require('http');
//file system and cors
const fs = require('fs');
var cors = require('cors')
//load routers
const ping_route = require('./routers/ping');
const video_route = require('./routers/video');
//constants
const { constants } = require('./config')
//util
const { get_data_folder } = require('./util');

//rabbit mq
const { initRabbitQue } = require('./controller/mrabbitque');

//start server
startServer();


//----------------------------------------------------------------//
async function startServer() {
    //let express use fileupoad plugin
    // lets use a temporrary folder instead of ram to hold the file while uplaoding
    app.use(fileUpload({
        limits: {
            fileSize: constants.file_size_limit,
            useTempFiles: true,
            tempFileDir: get_data_folder('temp')
        }
    }));
    // use cors
    app.use(cors({ credentials: true, origin: true }));
    //register routers
    app.use('', ping_route);
    app.use('/api/v1/video', video_route);
    //listen at port 3000
    app.listen(3000);
    //init rabbit mq
    let rbres = await initRabbitQue();
    if (rbres.success == false) {
        throw error(rbres.msg);
    }
    console.log("Mrabbit que started");
    //create the server
    http.createServer(app);
    //server created successfully
    console.log("Video converter server started");
}
