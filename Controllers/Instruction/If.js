const Scope = require('../Scope/Scope');
const DATA_TYPE = require('../Enums/DataType');
const Operation = require('../Operations/Operation');

function StatementIf(_instruction, _scope){
    let message = "";
    let operation = Operation(_instruction.expression, _scope);
    if(operation.type === DATA_TYPE.BOOL){
        if(operation.value){
            let newScope = new Scope(_scope,"if");
            const Block = require('./Block');
            let exec = Block(_instruction.instructions, newScope);
            message += exec.string;
        }
        return {
            string:message
        };
    }else{
        return {
            string: `Error: La expresion de la sentencia if no es de tipo booleano. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
        }
    }
}

module.exports = StatementIf;