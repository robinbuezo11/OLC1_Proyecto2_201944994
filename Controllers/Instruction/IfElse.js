const Scope = require("../Scope/Scope");
const DATA_TYPE = require("../Enums/DataType");
const Operation = require("../Operations/Operation");

function StatementIfElse(_instruction, _scope){
    let message = "";
    let operation = Operation(_instruction.expression, _scope);

    if(operation.type === DATA_TYPE.BOOL){
        if(operation.value){
            let newScope = new Scope(_scope, "If");
            _scope.addChildren(newScope);
            const Block = require("./Block");
            let exe = Block(_instruction.instructions, newScope);
            message += exe.string;
            if(exe.break || exe.continue || exe.return){
                return {
                    string: message,
                    break: exe.break,
                    continue: exe.continue,
                    return: exe.return,
                }
            }
        }else{
            let newScope = new Scope(_scope, "Else");
            _scope.addChildren(newScope);
            const Block = require("./Block");
            let exe = Block(_instruction.elseInstructions, newScope);
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
            string: message,
        }
    }else{
        return {
            string: `Error: La expresion de la sentencia if no es de tipo booleano. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
        }
    }
}

module.exports = StatementIfElse;