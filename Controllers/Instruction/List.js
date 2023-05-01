const Symbol = require("../Scope/Symbol");
const INSTRUCTION_TYPE = require("../Enums/InstructionType");
const DATA_TYPE = require("../Enums/DataType");
const Operation = require("../Operations/Operation");

function List(_instruction, _scope){
    if(_instruction.type === INSTRUCTION_TYPE.DEC_LIST){
        if(_instruction.data_type !== _instruction.create_type){
            return `Error: El tipo de dato ${_instruction.data_type} no coincide con el tipo de dato ${_instruction.create_type} de la Lista. Linea: ${_instruction.line} Columna: ${_instruction.column}`;
        }
        let list_values = [];
        const newSymbol = new Symbol(_instruction.id, list_values, _instruction.data_type, _instruction.line, _instruction.column);

        if (_scope.existsSymbolInActualScope(newSymbol.id) != false) {
            return "Error: ya existe un simbolo con el nombre " + newSymbol.id + " linea: " + newSymbol.line + " columna: " + newSymbol.column;
        }
        _scope.addSymbol(newSymbol.id, newSymbol);
        // console.log(_scope)
        return null;
    }else if(_instruction.type === INSTRUCTION_TYPE.ADD_LIST){
        let message = '';
        const exists = _scope.existsSymbol(_instruction.id);
        if(exists){
            let value = null;
            if(_instruction.value.type === INSTRUCTION_TYPE.CALL){
                let response = Call(_instruction.value, _scope);
                message += response.string;
                value = response.return;
                if(!value){
                    return message; //`No se pudo obtener el valor de la funcion ${_instruction.expression.name} linea: ${_instruction.line} columna: ${_instruction.column}`;
                }
            }else{
                value = Operation(_instruction.value, _scope);
                if(!value.type){
                    return value.value;
                }
            }
            let symbol = _scope.getSymbol(_instruction.id);
            let types = {
                symbolType: symbol.type,
                valueType: value.type
            }
            if(types.symbolType === types.valueType){
                symbol.value.push(value.value);
                _scope.setSymbol(_instruction.id, symbol);
                return null;
            }else{
                return `No se puede asignar un valor de tipo ${types.valueType} a un vector de tipo ${types.symbolType} Linea ${_instruction.line} y columna ${_instruction.column}`;
            }
        }else{
            return `La variable ${id} no existe Linea ${_instruction.line} y columna ${_instruction.column}`;
        }
    }else if(_instruction.type === INSTRUCTION_TYPE.SET_LIST){
        let message = '';
        const exists = _scope.existsSymbol(_instruction.id);
        if(exists){
            let value = null;
            if(_instruction.value.type === INSTRUCTION_TYPE.CALL){
                let response = Call(_instruction.value, _scope);
                message += response.string;
                value = response.return;
                if(!value){
                    return message; //`No se pudo obtener el valor de la funcion ${_instruction.expression.name} linea: ${_instruction.line} columna: ${_instruction.column}`;
                }
            }else{
                value = Operation(_instruction.value, _scope);
                if(!value.type){
                    return value.value;
                }
            }
            let symbol = _scope.getSymbol(_instruction.id);
            let types = {
                symbolType: symbol.type,
                valueType: value.type
            }
            if(types.symbolType === types.valueType){
                let index = Operation(_instruction.index, _scope);
                if(index.type === DATA_TYPE.INT){
                    if(index.value >= 0 && index.value < symbol.value.length){
                        symbol.value[index.value] = value.value;
                    }else{
                        return `El indice ${index.value} esta fuera de rango Linea ${_instruction.line} y columna ${_instruction.column}`;
                    }
                }else{
                    return `El indice ${index.value} no es de tipo entero Linea ${_instruction.line} y columna ${_instruction.column}`;
                }
                _scope.setSymbol(_instruction.id, symbol);
                return null;
            }else{
                return `No se puede asignar un valor de tipo ${types.valueType} a un vector de tipo ${types.symbolType} Linea ${_instruction.line} y columna ${_instruction.column}`;
            }
        }else{
            return `La variable ${id} no existe Linea ${_instruction.line} y columna ${_instruction.column}`;
        }
    }
}

/*function getValue(_type){
    switch(_type){
        case DATA_TYPE.INT:
            return 0;
        case DATA_TYPE.DOUBLE:
            return 0.0;
        case DATA_TYPE.CHAR:
            return '\u0000';
        case DATA_TYPE.STRING:
            return "";
        case DATA_TYPE.BOOL:
            return true;
    }
}*/

module.exports = List;