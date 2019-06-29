const {initRabbitQue} = require('./controllers/rabbitmq')
const { rabbitmq } = require('./config');
//Intialise que and start listening
startService();








//-------------------------------------------------------------------------------//
async function startService(){
    let resp = await initRabbitQue();
    if(resp.success==true){
        console.log(`Video convert ${rabbitmq.que} service started`);
    }else{
        throw Error(resp.msg);
    }
}
