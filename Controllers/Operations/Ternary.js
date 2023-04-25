const DATA_TYPE = require('../Enums/DataType');

function Ternary(_exp, _scope){
    const Operation = require('./Operation');
    const result = Operation(_exp.expression, _scope);
    if(result.type === DATA_TYPE.BOOL){
        if(result.value){
            let res = Operation(_exp.opTrue, _scope);
            return {
                value: res.value,
                type: res.type,
                line: _exp.line,
                column: _exp.column
            };
        }else{
            let res = Operation(_exp.opFalse, _scope);
            return {
                value: res.value,
                type: res.type,
                line: _exp.line,
                column: _exp.column
            };
        }
    }else{
        return {
            value: `Error: La condición no es de tipo booleana. Linea: ${_exp.line} Columna: ${_exp.column}`,
            type: null,
            line: _exp.line,
            column: _exp.column
        };
    }
}

module.exports = Ternary;