const Scope = require("../Scope/Scope");
const DATA_TYPE = require("../Enums/DataType");
const Operation = require("../Operations/Operation");

function StatementIfElseIf(_instruction, _scope){
    let message = "";
    let operation = Operation(_instruction.expression, _scope);

    if(operation.type === DATA_TYPE.BOOL){
        if(operation.value){
            let newScope = new Scope(_scope, "If");
            const Block = require("./Block");
            let exe = Block(_instruction.instructions, newScope);
            message += exe.string;
            return {
                string: message,
            }
        }
        for(let i = 0; i < _instruction.list_elseif.length; i++){
            let op = Operation(_instruction.list_elseif[i].expression, _scope);
            if(op.value){
                let newScope = new Scope(_scope, "Else If");
                const Block = require("./Block");
                let exe = Block(_instruction.list_elseif[i].instructions, newScope);
                message += exe.string;
                return {
                    string: message,
                }
            }
        }
        if(_instruction.elseInstructions != null){
            let newScope = new Scope(_scope, "Else");
            const Block = require("./Block");
            let exe = Block(_instruction.elseInstructions, newScope);
            message += exe.string;
            return {
                string: message,
            }
        }
    }
}

module.exports = StatementIfElseIf;