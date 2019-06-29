//this file initialsied rabbitmq

var amqp = require('amqplib/callback_api');
const { rabbitmq } = require('../config');
//singleton channel
var schannel;

var exp = {};

//initialise mrabbit que
exp.initRabbitQue = function () {
    return new Promise((resolve) => {
        let options = {
            protocol: rabbitmq.protocol,
            port: rabbitmq.port,
            username: rabbitmq.user,
            password: rabbitmq.pass,
            locale: 'en_US',
            frameMax: 0,
            heartbeat: 5,
            vhost: 'qcwnmpgo',
        }

        //connect to rabbit mq brocker
        amqp.connect(rabbitmq.host,
            options, function (error0, connection) {
                if (error0) {
                    return resolve({ success: false, msg: error0 })
                }

                //create channel connection
                connection.createChannel(async function (error1, channel) {
                    if (error1) {
                        return resolve({ success: false, msg: error0 })
                    }
          
                    let async_tasks = [];
                    //create exchange
                    async_tasks.push(rabbitmq.exchange.forEach((exchange) => {
                        channel.assertExchange(exchange, 'fanout', { durable: true })
                    }))

                    //create ques
                    rabbitmq.ques.forEach((que) => {
                        async_tasks.push(channel.assertQueue(que, { durable: true }));
                    })

                    //create all exchanges and ques
                    await Promise.all(async_tasks)


                    async_tasks = [];
                    //bind all 'convert' que to 'upload' exhange
                    rabbitmq.ques.forEach((que) => {
                        async_tasks.push(channel.bindQueue(que, rabbitmq.exchange[0]));
                    })

                    //bind all que to echanges
                    await Promise.all(async_tasks)

                    schannel = channel;
                    return resolve({ success: true, msg: "Rabbit mq Init success" })
                    // channel.sendToQueue(queue, Buffer.from(msg));
                    // console.log(" [x] Sent %s", msg);
                });
            });
    })

}


//send the message to the que
exp.sendMessage = async function (exchange, data) {
    if (schannel != null) {
        let resp = await schannel.publish(exchange,'', Buffer.from(data), { persistent: true,noAck:false });  
        return { success: resp , msg: "Video conversion started" }
    } else {
        return { success: false, msg: "Channel not found" }
    }
}

exp.channel = schannel;

module.exports = exp;