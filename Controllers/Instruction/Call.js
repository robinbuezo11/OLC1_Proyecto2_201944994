const Scope = require("../Scope/Scope");
const Instruction = require("./Instruction");
const INSTRUCTION_TYPE = require("../Enums/InstructionType");
const Block = require("./Block");
const DecParam = require("./DecParam");

function Call(_instruction, _scope) {
    let execute = _scope.getMethod(_instruction.name);
    if(!execute){
        execute = _scope.getFunction(_instruction.name);
    }
    
    let string;
    if(execute){
        let newScope = new Scope(_scope,"CALL");
        if(execute.params!=null){
            if(_instruction.list_values!=null && _instruction.list_values.length==execute.params.length){
                let error = false;
                for(let i=0;i<execute.params.length;i++){
                    var assignDeclaration = Instruction.newDeclaration(execute.params[i].id,_instruction.list_values[i],execute.params[i].data_type,_instruction.line,_instruction.column);
                    let message = DecParam(assignDeclaration,newScope);
                    if(message!=null){
                        error = true;
                        string += message+"\n";
                    }
                }
                if(error){
                    return message;
                }
                let exe = Block(execute.instructions,newScope);
                let message = exe.string;
                return message;
            }else{
                return `Error: La cantidad de parametros no coincide para el método ${_instruction.name}. Linea: ${_instruction.line} Columna: ${_instruction.column}`;
            }
        }else{
            let exe = Block(execute.instructions,newScope);
            let message = exe.string;
            return message;
       }
    }
    return `Error: El método ${_instruction.name} no existe... Linea: ${_instruction.line} Columna: ${_instruction.column}`;
}

module.exports = Call