const Symbol = require("../Scope/Symbol");
const DATA_TYPE = require("../Enums/DataType");
const INSTRUCTION_TYPE = require("../Enums/InstructionType");
const Operation = require("../Operations/Operation");

function Vector(_instruction, _scope){
    if(_instruction.type === INSTRUCTION_TYPE.SET_VECTOR){
        let message = "";
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
                        return `El indice ${index.value} no existe en el vector Linea ${_instruction.line} y columna ${_instruction.column}\n`;
                    }
                }else{
                    return `El indice ${index.value} no es de tipo entero Linea ${_instruction.line} y columna ${_instruction.column}\n`;
                }
                _scope.setSymbol(_instruction.id, symbol);
                return null;
            }else{
                return `No se puede asignar un valor de tipo ${types.valueType} a un vector de tipo ${types.symbolType} Linea ${_instruction.line} y columna ${_instruction.column}\n`;
            }
        }else{
            return `La variable ${id} no existe Linea ${_instruction.line} y columna ${_instruction.column}\n`;
        }
    }else{
        let list_values = [];
        if(_instruction.type === INSTRUCTION_TYPE.VECTOR_NULL){
            if(_instruction.data_type !== _instruction.create_type){
                return `Error: El tipo de dato ${_instruction.data_type} no coincide con el tipo de dato ${_instruction.create_type} en el Vector. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`;
            }
            let val = Operation(_instruction.size, _scope);
            if(val.type === DATA_TYPE.INT){
                for (let i = 0; i < val.value; i++) {
                    list_values.push(getValue(_instruction.data_type));
                }
            }else{
                return `Error: El tipo de dato ${val.type} no es valido para el tamaño del Vector. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`;
            }
        } else if(_instruction.type === INSTRUCTION_TYPE.VECTOR_VALUES){
            for (let i = 0; i < _instruction.list_values.length; i++) {
                let val = Operation(_instruction.list_values[i], _scope);
                if(val.type === _instruction.data_type){
                    list_values.push(val.value);
                }else{
                    return `Error: El tipo de dato ${val.type} no es valido para el Vector. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`;
                }
            }
        }

        const newSymbol = new Symbol(_instruction.id, list_values, _instruction.data_type, _instruction.line, _instruction.column);

        if (_scope.existsSymbolInActualScope(newSymbol.id) != false) {
            return "Error: ya existe un simbolo con el nombre " + newSymbol.id + " linea: " + newSymbol.line + " columna: " + newSymbol.column + "\n";
        }
        _scope.addSymbol(newSymbol.id, newSymbol);
        // console.log(_scope)
        return null;
    }
}

function getValue(_type){
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
}

module.exports = Vector;