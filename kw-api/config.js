var exp = {};

exp.response = function(state,code,data,res){
    return res.status(code).send({"success":state,"data":data});
}

exp.rescode ={
    success : 200,
    success_no_content : 204,
    fail_bad_req : 400
}
exp.constants={
    "file_size_limit":   10*1024 * 1024 * 1024  //configured to 10 GB
}

exp.rabbitmq = {
    host : 'amqp://qcwnmpgo:isFlg9Mqu1TnA_Znki_TbWleVn4H7KVo@baboon.rmq.cloudamqp.com/qcwnmpgo',
    port : 1883,
    user : 'qcwnmpgo:qcwnmpgo',
    pass : 'isFlg9Mqu1TnA_Znki_TbWleVn4H7KVo',
    vhost : '/',
    protocol : 'amqp',
    exchange :['video-upload'],
    ques : ['convert-1080','convert-720','convert-480','convert-320','convert-240']
}
module.exports = exp;