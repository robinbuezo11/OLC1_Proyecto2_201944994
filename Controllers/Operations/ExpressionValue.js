const DATA_TYPE = require('../Enums/DataType');
const VALUE_TYPE = require('../Enums/ValueType');

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
    }
}

module.exports = ExpressionValue;