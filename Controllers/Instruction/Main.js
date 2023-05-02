const Scope = require("../Scope/Scope");
const Instruction = require("./Instruction");
const Block = require("./Block");
const DecParam = require("./DecParam");

function Main(_instruction, _scope) {
    let executeMethod = _scope.getMethod(_instruction.name);
    
    let string;
    if(executeMethod!=null){
        let newScope = new Scope(_scope,"Main");
        _scope.addChildren(newScope);
        if(executeMethod.params!=null){
            if(_instruction.list_values!=null && _instruction.list_values.length==executeMethod.params.length){
                let error = false;
                for(let i=0;i<executeMethod.params.length;i++){
                    var assignDeclaration = Instruction.newDeclaration(executeMethod.params[i].id,_instruction.list_values[i],executeMethod.params[i].data_type,_instruction.line,_instruction.column);
                    let message = DecParam(assignDeclaration,newScope);
                    if(message!=null && message!=""){
                        error = true;
                        string += message+"\n";
                    }
                }
                if(error){
                    return message;
                }
                let exe = Block(executeMethod.instructions,newScope);
                let message = exe.string;
                if(exe.continue){
                    return `Error: No se puede usar continue fuera de un ciclo. Linea: ${exe.continue.line} Columna: ${exe.continue.column}`;
                }
                return message;
            }else{
                return `Error: La cantidad de parametros no coincide para el método ${_instruction.name}. Linea: ${_instruction.line} Columna: ${_instruction.column}`;
            }
        }else{
            let exe = Block(executeMethod.instructions,newScope);
            let message = exe.string;
            if(exe.continue){
                return `Error: No se puede usar continue fuera de un ciclo. Linea: ${exe.continue.line} Columna: ${exe.continue.column}`;
            }
            return message;
       }
    }
    return `Error: El método ${_instruction.name} no existe... Linea: ${_instruction.line} Columna: ${_instruction.column}`;
}

module.exports = Main