var exp = {};
require('dotenv').config();

exp.rescode ={
    success : 200,
    success_no_content : 204,
    fail_bad_req : 400
}

exp.rabbitmq = {
    host : 'amqp://qcwnmpgo:isFlg9Mqu1TnA_Znki_TbWleVn4H7KVo@baboon.rmq.cloudamqp.com/qcwnmpgo',
    port : 1883,
    user : 'qcwnmpgo:qcwnmpgo',
    pass : 'isFlg9Mqu1TnA_Znki_TbWleVn4H7KVo',
    vhost : '/',
    protocol : 'amqp',
    que :  getQue(),
    retryBeforeReject : 3  //incase message processing fails , retries 
}

exp.video_spec = {
    str:getResolution(),
    base_path:''
}

function getResolution(){
    console.log(process.env.resolution)
    if(process.env.resolution != undefined ){
        return process.env.resolution.replace(" ","");
    }else{
        return '1920x1080';
    }
}

function getQue(){
    console.log(process.env.que_name)
    if(process.env.que_name != undefined ){
        return process.env.que_name.replace(" ","");
    }else{
        return 'convert-1080';
    }
}

module.exports = exp;