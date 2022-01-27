# videogarage

This repo provides an api end point to convert a give video to multiple resolutions

  

----------------------Pre requisites------------------------

-- This project is written in node js

-- install node and npm

-- we use pm2 for process managemnet , install pm2 globally

-- this project dependes on ffmpeg (For video conversion)

-- https://ffmpeg.zeranoe.com/builds/

-- install the build and set path

-------------------------------------------------------------


----------------------Config------------------------

-- Update rabbitmq parameteres in config.js in kw-convert.

-------------------------------------------------------------
  
  

---------Rabbit que as service--------------

We need rabbitmq brocker

  

https://customer.cloudamqp.com/instance/

we use rabbitmq cloud service as brocker 

can also use local brocker

kw-api/config.js - to set the rabbitmq endpoint

kw-convert/config.js - to set the rabbitmq endpoint

--------------------------------------------

  
  

--------------------kw-api------------------------

Where the file upload api hits 

index.js - starting point

creates Que and Fanout exchange

pushes the file location to exchange

--------------------------------------------------

  

-----------------------kw-convert-----------------

We create 5 instances of kw-convert with different config

We use pm2 to do this

bash startup.sh  --&gt; to start all the instances

connects to the respective que to get fanout message when the file is uploaded

----------------------------------------------------

  

----------------------Input APIs--------------------------------------------------------------------

1) localhost:3000/ping  - pong

  

2) localhost:3000/api/v1/video/convert

  

content-type: multipart/form-data; boundary=--------------------------647942983366309789637864

content-length: 11761076

Connection: keep-alive

cache-control: no-cache

Content-Disposition: form-data; name="video"; filename="/C:/Users/Spectrus/Downloads/jellyfish-25-mbps-hd-hevc.3gp

------------------------------------------------------------------------------------------------------

  

----------------------Output------------------------

Converted files are stored in __dirname/kw_api/data/converted

----------------------------------------------------
