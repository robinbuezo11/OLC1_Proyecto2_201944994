const Scope = require("../Scope/Scope");
const Instruction = require("./Instruction");
const DecParam = require("./DecParam");

function Call(_instruction, _scope) {
    let execute = _scope.getMethod(_instruction.name);
    if(!execute){
        execute = _scope.getFunction(_instruction.name);
    }
    
    let string;
    if(execute){
        let newScope = new Scope(_scope,"CALL");
        _scope.addChildren(newScope);
        const Block = require("./Block");
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
                    return {
                        string: message
                    }
                }

                let exe = Block(execute.instructions,newScope);
                let message = exe.string;
                if(exe.continue){
                    return {
                        string: `Error: No se puede usar continue fuera de un ciclo. Linea: ${exe.continue.line} Columna: ${exe.continue.column}\n`
                    }
                }

                if(execute.type){
                    if(exe.return){
                        if(execute.type === exe.return.type){
                            return {
                                string: message,
                                return: exe.return
                            }
                        }else{
                            return {
                                string: `Error: El tipo de retorno no coincide con el tipo de la función. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
                            }
                        }
                    }else{
                        return {
                            string: `Error: La función ${_instruction.name} debe retornar un valor. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
                        }
                    }
                } else {
                    if(exe.return){
                        return {
                            string: `Error: El método ${_instruction.name} no debe retornar un valor. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
                        }
                    }
                }
                return {
                    string: message
                }
            }else{
                return {
                    string: `Error: La cantidad de parametros no coincide para el método ${_instruction.name}. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
                }
            }
        }else{
            let exe = Block(execute.instructions,newScope);
            let message = exe.string;
            if(exe.continue){
                return {
                    string: `Error: No se puede usar continue fuera de un ciclo. Linea: ${exe.continue.line} Columna: ${exe.continue.column}\n`
                }
            }

            if(execute.type){
                if(exe.return){
                    if(execute.type === exe.return.type){
                        return {
                            string: message,
                            return: exe.return
                        }
                    }else{
                        return {
                            string: `Error: El tipo de retorno no coincide con el tipo de la función. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
                        }
                    }
                }else{
                    return {
                        string: `Error: La función ${_instruction.name} debe retornar un valor. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
                    }
                }
            } else {
                if(exe.return){
                    return {
                        string: `Error: El método ${_instruction.name} no debe retornar un valor. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
                    }
                }
            }
            return {
                string: message
            }
       }
    }
    return {
        string: `Error: El método ${_instruction.name} no existe... Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
    }
}

module.exports = Call