const Operation = require('../Operations/Operation');

function Return(_instruction, _scope){
    let operation = Operation(_instruction.expression, _scope);
    return {
        data: operation
    }
}

module.exports = Return;