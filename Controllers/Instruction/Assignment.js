const INSTRUCTION_TYPE = require('../Enums/InstructionType');
const Operation = require('../Operations/Operation');
const Call = require('./Call');

function Assignment(_instruction, _scope){
    let message = '';
    let id = null;
    if(_instruction.type === INSTRUCTION_TYPE.INC || _instruction.type === INSTRUCTION_TYPE.DEC){
        id = _instruction.id.value;
    }else{
        id = _instruction.id;
    }
    const exists = _scope.existsSymbol(id);
    if(exists){
        let value = null;
        if(_instruction.type === INSTRUCTION_TYPE.INC || _instruction.type === INSTRUCTION_TYPE.DEC){
            value = Operation(_instruction, _scope);
        }else if(_instruction.expression.type === INSTRUCTION_TYPE.CALL){
            let response = Call(_instruction.expression, _scope);
            message += response.string;
            value = response.return;
            if(!value){
                return message; //`No se pudo obtener el valor de la funcion ${_instruction.expression.name} linea: ${_instruction.line} columna: ${_instruction.column}`;
            }
        }else{
            value = Operation(_instruction.expression, _scope);
        }
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