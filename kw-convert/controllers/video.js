var exp = {};
var ffmpeg = require('fluent-ffmpeg');
var {video_spec} = require('../config');
var {get_data_folder} = require('../util');


exp.convert = async function (filename) {
    return new Promise((resolve)=>{

        let resp = {success:false}
        var output_path = get_data_folder('converted');
        console.log("Video to be converted at ",filename)
        var command = ffmpeg(filename).size(video_spec.str).autopad(true);
        try{
          command.output(output_path+'/'+video_spec.str+'.mp4')
          .on('end', function() {
            console.log('Finished processing');
            resolve({success:true});
          }).on('error', function(err, stdout, stderr) {
            console.log('Cannot process video: ' + err.message);
            resolve({success:false});
          }).on('progress', function(progress) {
            console.log('Processing: ' + progress.percent + '% done');
          }).on('start', function(commandLine) {
            console.log('Spawned Ffmpeg with command: ' + commandLine);
          })
          .run();
        }catch(e){
          console.log(e);
          resolve({success:false});
        }
     
    })
}

module.exports = exp;