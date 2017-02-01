var configValues = require('./config.json');
module.exports = {
    mongoConnectionString : () => {
        return 'mongodb://' + configValues.uname + ':' + configValues.pwd + 
        '@ds141108.mlab.com:41108/nodetodosample';
    }
}