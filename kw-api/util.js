const randomString = require('random-string');
const path = require('path');

var exp={};

//get a random string
exp.get_random_string = function(){
    return randomString({length: 25});
}

//get the data folder
// you can pass one more folder name to append to the path
exp.get_data_folder = function(fold){
    if(fold == null || fold == undefined){
        return path.join(__dirname,'data')
    }else{
        return path.join(__dirname,'data',fold)
    }
  
}


module.exports = exp;