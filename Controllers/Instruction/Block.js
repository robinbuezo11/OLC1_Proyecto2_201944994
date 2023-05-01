const INSTRUCTION_TYPE = require("../Enums/InstructionType");
const Print = require("./Print");
const Assignment = require("./Assignment");
const Declaration = require("./Declaration");
const StatementIf = require("./If");
const StatementIfElse = require("./IfElse");
const StatementIfElseIf = require("./IfElseIf");
const StatementSwitch = require("./Switch");
const StatementWhile = require("./While");
const StatementFor = require("./For");
const StatementDoWhile = require("./DoWhile");
const Call = require("./Call");
const Vector = require("./Vector");
const List = require("./List");
const Return = require("./Return");

function Block(_instructions,_scope){
    let string="";
    let _break=false;
    let _continue=null;
    let _return=null;
    
    _instructions.forEach(instruction => {
        if(_break || _continue!=null || _return!=null){
            return;
        }else if(instruction.type===INSTRUCTION_TYPE.PRINT){
           string+=Print(instruction,_scope) + "\n";
        }else if (instruction.type === INSTRUCTION_TYPE.DECLARATION) {
            var message = Declaration(instruction, _scope);
            if (message != null) {
                string += message + "\n";
            }
        } else if (instruction.type === INSTRUCTION_TYPE.ASSIGNMENT || instruction.type === INSTRUCTION_TYPE.INC || instruction.type === INSTRUCTION_TYPE.DEC) {
            var message = Assignment(instruction, _scope);
            if (message != null) {
                string += message + "\n";
            }
        } else if (instruction.type === INSTRUCTION_TYPE.IF) {
            let exec = StatementIf(instruction, _scope);
            var message = exec.string;
            if (message != null) {
                string += message + "\n";
            }
            if (exec.break || exec.continue || exec.return) {
                _break = exec.break;
                _continue = exec.continue;
                _return = exec.return;
                return;
            }
        } else if (instruction.type === INSTRUCTION_TYPE.IF_ELSE) {
            let exec = StatementIfElse(instruction, _scope);
            var message = exec.string;
            if (message != null) {
                string += message + "\n";
            }
            if (exec.break || exec.continue || exec.return) {
                _break = exec.break;
                _continue = exec.continue;
                _return = exec.return;
                return;
            }
        } else if (instruction.type === INSTRUCTION_TYPE.IF_ELSE_IF) {
            let exec = StatementIfElseIf(instruction, _scope);
            var message = exec.string;
            if (message != null) {
                string += message + "\n";
            }
            if (exec.break || exec.continue || exec.return) {
                _break = exec.break;
                _continue = exec.continue;
                _return = exec.return;
                return;
            }
        } else if (instruction.type === INSTRUCTION_TYPE.SWITCH) {
            let exec = StatementSwitch(instruction, _scope);
            var message = exec.string;
            if (message != null) {
                string += message + "\n";
            }
            if (exec.return) {
                _return = exec.return;
                return;
            }
        } else if (instruction.type === INSTRUCTION_TYPE.WHILE) {
            let exec = StatementWhile(instruction, _scope);
            var message = exec.string;
            if (message != null) {
                string += message + "\n";
            }
            if (exec.return) {
                _return = exec.return;
                return;
            }
        } else if (instruction.type === INSTRUCTION_TYPE.FOR) {
            let exec = StatementFor(instruction, _scope);
            var message = exec.string;
            if (message != null) {
                string += message + "\n";
            }
            if (exec.return) {
                _return = exec.return;
                return;
            }
        } else if (instruction.type === INSTRUCTION_TYPE.DO_WHILE) {
            let exec = StatementDoWhile(instruction, _scope);
            var message = exec.string;
            if (message != null) {
                string += message + "\n";
            }
            if (exec.return) {
                _return = exec.return;
                return;
            }
        } else if (instruction.type === INSTRUCTION_TYPE.BREAK) {
            _break = true;
            return;
        } else if (instruction.type === INSTRUCTION_TYPE.CONTINUE) {
            _continue = instruction;
            return;
        } else if (instruction.type === INSTRUCTION_TYPE.RETURN){
            if(instruction.expression!=null){
                _return = Return(instruction, _scope);
            }else{
                _return = true;
            }
        } else if (instruction.type === INSTRUCTION_TYPE.CALL) {
            let exec = Call(instruction, _scope);
            var message = exec.string;
            if (message != null) {
                string += message + "\n";
            }
        } else if (
                    instruction.type === INSTRUCTION_TYPE.VECTOR_NULL || instruction.type === INSTRUCTION_TYPE.VECTOR_VALUES
                    || instruction.type === INSTRUCTION_TYPE.SET_VECTOR
            ){
            let message = Vector(instruction, _scope);
            if (message != null) {
                string += message + "\n";
            }
        } else if (
                       instruction.type === INSTRUCTION_TYPE.DEC_LIST || instruction.type === INSTRUCTION_TYPE.LIST_VALUES
                    || instruction.type === INSTRUCTION_TYPE.ADD_LIST || instruction.type === INSTRUCTION_TYPE.SET_LIST
            ) {
            let message = List(instruction, _scope);
            if (message != null) {
                string += message + "\n";
            }
        }
    });
    return {
        string:string,
        break: _break,
        continue: _continue,
        return: _return
    }

}
module.exports = Block