const DATA_TYPE = require('../Enums/DataType');
const VALUE_TYPE = require('../Enums/ValueType');
const INSTRUCTION_TYPE = require('../Enums/InstructionType');

function ExpressionValue(_expression, _scope){
    if(_expression.type == VALUE_TYPE.DOUBLE){
        return {
            value: Number(_expression.value),
            type: DATA_TYPE.DOUBLE,
            line: _expression.line,
            column: _expression.column
        };
    }else if(_expression.type == VALUE_TYPE.INT){
        return {
            value: Number(_expression.value),
            type: DATA_TYPE.INT,
            line: _expression.line,
            column: _expression.column
        };
    }else if(_expression.type == VALUE_TYPE.BOOL){
        return {
            value: _expression.value.toLowerCase() === 'true' ? true : false,
            type: DATA_TYPE.BOOL,
            line: _expression.line,
            column: _expression.column
        }
    }else if(_expression.type == VALUE_TYPE.CHAR){
        return {
            value: _expression.value.substring(1, _expression.value.length - 1),
            type: DATA_TYPE.CHAR,
            line: _expression.line,
            column: _expression.column
        };
    }else if(_expression.type == VALUE_TYPE.STRING){
        return {
            value: _expression.value.substring(1, _expression.value.length - 1),
            type: DATA_TYPE.STRING,
            line: _expression.line,
            column: _expression.column
        };
    }else if(_expression.type == VALUE_TYPE.ID){
        const symbol = _scope.getSymbol(_expression.value);
        if(symbol){
            return {
                value: symbol.value,
                type: symbol.type,
                line: symbol.line,
                column: symbol.column
            };
        }
        return{
            value: "Error: La variable " + _expression.value + " no existe Linea: " + _expression.line + " Columna: " + _expression.column,
            type: null,
            line: _expression.line,
            column: _expression.column
        };
    }else if(_expression.type === INSTRUCTION_TYPE.VECTOR_ACCESS || _expression.type === INSTRUCTION_TYPE.LIST_ACCESS){
        const symbol = _scope.getSymbol(_expression.id);
        if(symbol){
            const Operation = require('./Operation');
            const index = Operation(_expression.index, _scope);
            if(index.type === DATA_TYPE.INT){
                if(index.value >= 0 && index.value < symbol.value.length){
                    return {
                        value: symbol.value[index.value],
                        type: symbol.type,
                        line: _expression.line,
                        column: _expression.column
                    };
                }
                return {
                    value: "Error: El indice " + index.value + " esta fuera de los limites de la estructura " + _expression.id + " Linea: " + _expression.line + " Columna: " + _expression.column,
                    type: null,
                    line: _expression.line,
                    column: _expression.column
                };
            }
            return {
                value: "Error: El indice " + index.value + " no es de tipo entero Linea: " + _expression.line + " Columna: " + _expression.column,
                type: null,
                line: _expression.line,
                column: _expression.column
            };
        }
        return {
            value: "Error: La estructura " + _expression.id + " no existe Linea: " + _expression.line + " Columna: " + _expression.column,
            type: null,
            line: _expression.line,
            column: _expression.column
        };
    }
}

module.exports = ExpressionValue;