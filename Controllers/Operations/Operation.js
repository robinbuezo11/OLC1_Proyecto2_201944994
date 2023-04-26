const OPERATION_TYPE = require('../Enums/OperationType');
const VALUE_TYPE = require('../Enums/ValueType');
const Arithmetic = require('./Arithmetic');
const Logical = require('./Logical');
const Relational = require('./Relational');
const ExpressionValue = require('./ExpressionValue');
const Ternary = require('./Ternary');

function Operation(_exp, _scope){
    if( 
           _exp.type === VALUE_TYPE.DOUBLE || _exp.type === VALUE_TYPE.BOOL || _exp.type === VALUE_TYPE.INT 
        || _exp.type === VALUE_TYPE.STRING || _exp.type === VALUE_TYPE.CHAR || _exp.type === VALUE_TYPE.ID
        ){
        return ExpressionValue(_exp, _scope);
    }else if(
               _exp.type === OPERATION_TYPE.ADD || _exp.type === OPERATION_TYPE.SUB || _exp.type === OPERATION_TYPE.MUL
            || _exp.type === OPERATION_TYPE.DIV || _exp.type === OPERATION_TYPE.POW || _exp.type === OPERATION_TYPE.MOD
            || _exp.type === OPERATION_TYPE.UNARY || _exp.type === OPERATION_TYPE.INC || _exp.type === OPERATION_TYPE.DEC
        ){
        return Arithmetic(_exp, _scope);
    }else if(  
               _exp.type === OPERATION_TYPE.EQUALS || _exp.type === OPERATION_TYPE.DIFF || _exp.type === OPERATION_TYPE.LESS
            || _exp.type === OPERATION_TYPE.LESSEQ || _exp.type === OPERATION_TYPE.GREATER || _exp.type === OPERATION_TYPE.GREATEREQ
    ){
        return Relational(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.AND || _exp.type === OPERATION_TYPE.OR || _exp.type === OPERATION_TYPE.NOT){
        return Logical(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.TERNARY){
        return Ternary(_exp, _scope);
    }
}

module.exports = Operation;