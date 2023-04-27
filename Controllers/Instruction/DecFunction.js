const Function = require("../Scope/Function");

function DecFunction(_instruction, _scope) {
    const newFunction= new Function(_instruction.data_type, _instruction.name, _instruction.params_list,_instruction.instructions,_instruction.line,_instruction.column);
    if(_scope.existsSymbol(newFunction.id)!=false){ 
        return `Error: No se puede declarar una función con el mismo nombre de una variable '${newFunction.id}'. Linea: ${newFunction.line} Columna: ${newFunction.column}`;
    }
    else if(_scope.existsFunction(newFunction.id)!=false){
        return `Error: La función '${newFunction.id}' ya existe. Linea: ${newFunction.line} Columna: ${newFunction.column}`;
    }
    _scope.addFunction(newFunction.id,newFunction);
    return null;
}
module.exports = DecFunction;