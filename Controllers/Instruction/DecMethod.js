const Method = require('../Scope/Method');

function DecMethod(_instruction, _scope) {
    const newMethod= new Method(_instruction.name, _instruction.params_list,_instruction.instructions,_instruction.line,_instruction.column);
    if(_scope.existsSymbol(newMethod.id)!=false){ 
        return `Error: No se puede declarar un metodo con el mismo nombres de una variable '${newMethod.id}'. Linea: ${newMethod.line} Columna: ${newMethod.column}`;
    }
    else if(_scope.existsMethod(newMethod.id)!=false){
        return `Error: El método '${newMethod.id}' ya existe. Linea: ${newMethod.line} Columna: ${newMethod.column}`;
    }
    _scope.addMethod(newMethod.id,newMethod);
    return null;
}
module.exports = DecMethod