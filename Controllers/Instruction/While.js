const Scope = require('../Scope/Scope');
const DATA_TYPE = require('../Enums/DataType');
const Operation = require('../Operations/Operation');

function StatementWhile(_instruction, _scope){
    let message = "";
    let operation = Operation(_instruction.expression, _scope);

    if(operation.type === DATA_TYPE.BOOL){
        while(operation.value){
            let parentScope = new Scope(_scope, 'While');
            _scope.addChildren(parentScope);
            const Block = require('./Block');
            let exe = Block(_instruction.instructions, parentScope);
            message += exe.string;
            if(exe.break || exe.return){
                return {
                    string: message,
                    break: exe.break,
                    return: exe.return,
                }
            }
            operation = Operation(_instruction.expression, parentScope);
        }
        return {
            string: message
        };
    }else{
        return {
            string: `Error: La expresion de la sentencia while no es de tipo booleano. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
        }
    }
}

module.exports = StatementWhile;