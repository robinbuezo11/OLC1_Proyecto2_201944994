const VALUE_TYPE = require('../Enums/ValueType');
const OPERATION_TYPE = require('../Enums/OperationType');
const INSTRUCTION_TYPE = require('../Enums/InstructionType');
const DATA_TYPE = require('../Enums/DataType');
const ExpressionValue = require('./ExpressionValue');
const Arithmetic = require('./Arithmetic');
const Ternary = require('./Ternary');

function Cast(_exp, _scope){
    if( 
           _exp.type === VALUE_TYPE.DOUBLE || _exp.type === VALUE_TYPE.BOOL || _exp.type === VALUE_TYPE.INT 
        || _exp.type === VALUE_TYPE.STRING || _exp.type === VALUE_TYPE.CHAR || _exp.type === VALUE_TYPE.ID
        ){
        return ExpressionValue(_exp, _scope);
    }else if(
               _exp.type === OPERATION_TYPE.ADD || _exp.type === OPERATION_TYPE.SUB || _exp.type === OPERATION_TYPE.MUL
            || _exp.type === OPERATION_TYPE.DIV || _exp.type === OPERATION_TYPE.POW || _exp.type === OPERATION_TYPE.MOD
            || _exp.type === OPERATION_TYPE.UNARY || _exp.type === INSTRUCTION_TYPE.INC || _exp.type === INSTRUCTION_TYPE.DEC
        ){
        return Arithmetic(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.TERNARY){
        return Ternary(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.CAST){
        return cast(_exp.expression, _exp.data_type, _scope);      
    }
}

function cast(_exp, _type, _scope){
    const exp = Cast(_exp, _scope);

    if(_type === DATA_TYPE.INT){
        if(exp.type === DATA_TYPE.DOUBLE){
            return {
                value: Math.floor(exp.value),
                type: DATA_TYPE.INT,
                line: _exp.line,
                column: _exp.column
            };
        }else if(exp.type === DATA_TYPE.CHAR){
            return {
                value: exp.value.charCodeAt(0),
                type: DATA_TYPE.INT,
                line: _exp.line,
                column: _exp.column
            };
        }else{
            return {
                value: `Error: No se puede castear de ${exp.type} a ${_type}. Linea: ${_exp.line} Columna: ${_exp.column}`,
                type: null,
                line: _exp.line,
                column: _exp.column
            }
        }
    }else if(_type === DATA_TYPE.DOUBLE){
        if(exp.type === DATA_TYPE.INT){
            return {
                value: exp.value,
                type: DATA_TYPE.DOUBLE,
                line: _exp.line,
                column: _exp.column
            };
        }else if(exp.type === DATA_TYPE.CHAR){
            return {
                value: exp.value.charCodeAt(0),
                type: DATA_TYPE.DOUBLE,
                line: _exp.line,
                column: _exp.column
            };
        }else{
            return {
                value: `Error: No se puede castear de ${exp.type} a ${_type}. Linea: ${_exp.line} Columna: ${_exp.column}`,
                type: null,
                line: _exp.line,
                column: _exp.column
            }
        }
    }else if(_type === DATA_TYPE.CHAR){
        if(exp.type === DATA_TYPE.INT){
            return {
                value: String.fromCharCode(exp.value),
                type: DATA_TYPE.CHAR,
                line: _exp.line,
                column: _exp.column
            };
        }else{
            return {
                value: `Error: No se puede castear de ${exp.type} a ${_type}. Linea: ${_exp.line} Columna: ${_exp.column}`,
                type: null,
                line: _exp.line,
                column: _exp.column
            }
        }
    }else{
        return {
            value: `Error: No se puede castear de ${exp.type} a ${_type}. Linea: ${_exp.line} Columna: ${_exp.column}`,
            type: null,
            line: _exp.line,
            column: _exp.column
        }
    }
}


module.exports = Cast;