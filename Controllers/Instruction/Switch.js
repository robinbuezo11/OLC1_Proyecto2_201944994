const Scope = require('../Scope/Scope');
const DATA_TYPE = require('../Enums/DataType');
const Operation = require('../Operations/Operation');

function StatementSwitch(_instruction, _scope){
    let message = "";
    let operation = Operation(_instruction.expression, _scope);

    if(operation.value != null){
        let parentScope = new Scope(_scope, 'Switch');
        _scope.addChildren(parentScope);

        for(i=0; i<_instruction.cases.length; i++){
            let op = Operation(_instruction.cases[i].expression, parentScope);
            if(op.value == operation.value){
                let newScope = new Scope(parentScope, 'Case');
                parentScope.addChildren(newScope);
                const Block = require('./Block');
                let exe = Block(_instruction.cases[i].instructions, newScope);
                message += exe.string;
                if(exe.break || exe.continue || exe.return){
                    return {
                        string: message,
                        break: exe.break,
                        continue: exe.continue,
                        return: exe.return,
                    }
                }
            }
        }

        if(_instruction.default){
            let newScope = new Scope(parentScope, 'Default');
            parentScope.addChildren(newScope);
            const Block = require('./Block');
            let exe = Block(_instruction.default.instructions, newScope);
            message += exe.string;
            if(exe.break || exe.continue || exe.return){
                return {
                    string: message,
                    break: exe.break,
                    continue: exe.continue,
                    return: exe.return,
                }
            }
        }

        return {
            string: message
        }
    }else{
        return {
            string: "Error: No se puede evaluar la expresion en el switch"
        }
    }
}

module.exports = StatementSwitch;