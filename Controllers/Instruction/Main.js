const Scope = require("../Scope/Scope");
const Instruction = require("./Instruction");
const Block = require("./Block");

function Main(_instruction, _scope) {
    var executeMethod = _scope.getMethod(_instruction.name);
    
    if(executeMethod!=null){
       let newScope = new Scope(_scope,"Main");
       if(executeMethod.params_list!=null){

       }else{
            let exe = Block(executeMethod.instructions,newScope);
            let message = exe.string;
            return message;
       }
    }
    return `Error: El método ${_instruction.name} no existe... Linea: ${_instruction.line} Columna: ${_instruction.column}`;
}

module.exports = Main