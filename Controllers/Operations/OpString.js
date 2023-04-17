const Operation = require('./Operation');

function OpString(_exp, _scope){
    return Operation(_exp, _scope);
}
module.exports = OpString;