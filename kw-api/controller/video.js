const fs = require('fs');
const {get_data_folder,get_random_string} = require('../util');
const {sendMessage} = require('../controller/mrabbitque');
const {rabbitmq} = require('../config');

var exp = {};

exp.storefile = async function (bytearray)  {
    return new Promise( (resolve)=>{
        let resp = {success:false,msg:"no data"};

        //check for empty or null data
        if(bytearray == null || bytearray.length==0){
            return resolve(resp);
        }
        //get the write path
        const video_store_path = get_data_folder(`video/${get_random_string()}.mp4`)
        //write the file
        fs.writeFile(video_store_path,bytearray,(err)=>{
            if(err){
                resp.msg = err;
                return resolve(resp);
            }else{
                return resolve({success:true,msg:video_store_path})
            }
        });
    }).catch((e)=>{console.log(e)})
}


exp.convertMessage = async function (file_path){
    //send the conersion message to all the ques
    return await sendMessage(rabbitmq.exchange[0],file_path);
}

module.exports = exp;