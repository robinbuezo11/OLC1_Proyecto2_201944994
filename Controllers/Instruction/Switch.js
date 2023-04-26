const Scope = require('../Scope/Scope');
const DATA_TYPE = require('../Enums/DataType');
const Operation = require('../Operations/Operation');

function StatementSwitch(_instruction, _scope){
    let message = '';
    let operation = Operation(_instruction.expression, _scope);

    if(operation.value){
        let parentScope = new Scope(_scope, 'Switch');

        for(i=0; i<_instruction.cases.length; i++){
            let op = Operation(_instruction.cases[i].expression, parentScope);
            if(op.value == operation.value){
                let newScope = new Scope(parentScope, 'Case');
                const Block = require('./Block');
                let exe = Block(_instruction.cases[i].instructions, newScope);
                message += exe.string;
                if(_instruction.cases[i].break){
                    return {
                        string: message,
                    }
                }
            }
        }

        if(_instruction.default){
            let newScope = new Scope(parentScope, 'Default');
            const Block = require('./Block');
            let exe = Block(_instruction.default.instructions, newScope);
            message += exe.string;
        }

        return {
            string: message,
        }
    }
}

module.exports = StatementSwitch;