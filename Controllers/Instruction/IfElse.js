const Scope = require("../Scope/Scope");
const DATA_TYPE = require("../Enums/DataType");
const Operation = require("../Operations/Operation");

function StatementIfElse(_instruction, _scope){
    let message = "";
    let operation = Operation(_instruction.expression, _scope);

    if(operation.type === DATA_TYPE.BOOL){
        if(operation.value){
            let newScope = new Scope(_scope, "If");
            const Block = require("./Block");
            let exe = Block(_instruction.instructions, newScope);
            message += exe.string;
        }else{
            let newScope = new Scope(_scope, "Else");
            const Block = require("./Block");
            let exe = Block(_instruction.elseInstructions, newScope);
            message += exe.string;
        }
        return {
            string: message,
        }
    }
}

module.exports = StatementIfElse;