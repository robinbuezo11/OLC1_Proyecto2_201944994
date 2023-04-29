const Operation = require('../Operations/Operation');

function Return(_instruction, _scope){
    return Operation(_instruction.expression, _scope);
}

module.exports = Return;