//this file initialsied rabbitmq

var amqp = require('amqplib/callback_api');
const { rabbitmq } = require('../config');
const { convert } = require('./video');
const { getCache, setCache } = require('../util');
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

                    //create que
                    async_tasks.push(channel.assertQueue(rabbitmq.que, { durable: true }));

                    //create all ques
                    await Promise.all(async_tasks)


                    //wait for the convertion message
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", rabbitmq.que);
                    channel.consume(rabbitmq.que, async function (msg) {
                        //on conversion request recieve
                        console.log(" [x] Received %s", msg.content.toString());
                        if (msg.content == null || msg.content.length == 0) {
                            // message is not compatible
                            //discard the message forever
                            channel.nack(msg, false, false);
                        } else {
                            //get the retry count
                            let retry = await getCache(msg.content.toString());
                            if (retry == null || retry == undefined) {
                                retry = rabbitmq.retryBeforeReject;
                            } else if (retry == 0) {
                                channel.ack(msg);
                            }

                            console.log("Retry count is ",retry);
                            if(retry>0){
                                //start converting the video
                                let resp = await convert(msg.content.toString());
                                if (resp.success == true) {
                                    //if conversion is success
                                    channel.ack(msg);
                                } else {
                                    //else if conversion fails , reque
                                    retry = retry-1;
                                    await setCache(msg.content.toString(),retry);
                                    channel.nack(msg);
                                }
                            }
                        }
                    }, { noAck: false });

                    schannel = channel;
                    return resolve({ success: true, msg: "Rabbit mq Init success" })
                });
            });
    })

}

exp.channel = schannel;

module.exports = exp;