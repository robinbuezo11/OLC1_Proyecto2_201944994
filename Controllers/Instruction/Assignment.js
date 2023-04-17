const Operation = require('../Operations/Operation');

function Assignment(_instruction, _scope){
    const id = _instruction.id;
    const exists = _scope.existsSymbol(id);
    if(exists){
        let value = Operation(_instruction.expression, _scope);
        let symbol = _scope.getSymbol(id);
        let types = {
            symbolType: symbol.type,
            valueType: value.type
        }
        if(types.symbolType === types.valueType){
            symbol.value = value.value;
            _scope.setSymbol(id, symbol);
            return null;
        }else{
            return `No se puede asignar un valor de tipo ${types.valueType} a una variable de tipo ${types.symbolType} en la linea ${_instruction.line} y columna ${_instruction.column}`;
        }
    }else{
        return `La variable ${id} no existe Linea ${_instruction.line} y columna ${_instruction.column}`;
    }
}

module.exports = Assignment;