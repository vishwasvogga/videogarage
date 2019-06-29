var exp = {};
const path = require('path')
const NodeCache = require("node-cache");
const myCache = new NodeCache();

//get the data folder
// you can pass one more folder name to append to the path
exp.get_data_folder = function (fold) {
    if (fold == null || fold == undefined) {
        return path.join(__dirname, 'data')
    } else {
        return path.join(__dirname, 'data', fold)
    }

}


exp.getCache = function (key) {
    return new Promise((resolve) => {
        myCache.get(key, function (err, value) {
            if (!err) {
                resolve(value)
            } else {
                resolve(null)
            }
        });
    })
}


exp.setCache = function (key, val) {
    return new Promise((resolve) => {
        myCache.set(key, val, function (err, success) {
            if (!err && success) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    })
}

module.exports = exp;