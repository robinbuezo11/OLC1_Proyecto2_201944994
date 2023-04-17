const INSTRUCTION_TYPE = require("../Enums/InstructionType");
const Print = require("./Print");
const Assignment = require("./Assignment");
const Declaration = require("./Declaration");
const StatementIf = require("./If");
function Block(_instructions,_scope){
    let string="";
    
    _instructions.forEach(instruction => {
        if(instruction.type===INSTRUCTION_TYPE.PRINT){
           string+=Print(instruction,_scope) + "\n";
        }else if (instruction.type === INSTRUCTION_TYPE.DECLARATION) {
            var message = Declaration(instruction, _scope);

            if (message != null) {
                string += message;
            }
        } else if (instruction.type === INSTRUCTION_TYPE.ASSIGNMENT) {
            var message = Assignment(instruction, _scope);
            if (message != null) {
                string += message;
            }
        } else if (instruction.type === INSTRUCTION_TYPE.IF) {
            let exec = StatementIf(instruction, _scope);
            var message = exec.string;
            if (message != null) {
                string += message;
            }
        }
    });
    return {
        string:string
    }

}
module.exports = Block