const INSTRUCTION_TYPE = require('../Enums/InstructionType');
const OPERATION_TYPE = require('../Enums/OperationType');
const VALUE_TYPE = require('../Enums/ValueType');
const Arithmetic = require('./Arithmetic');
const Logical = require('./Logical');
const Relational = require('./Relational');
const ExpressionValue = require('./ExpressionValue');

function Operation(_exp, _scope){
    if( 
           _exp.type === VALUE_TYPE.DOUBLE || _exp.type === VALUE_TYPE.BOOL || _exp.type === VALUE_TYPE.INT 
        || _exp.type === VALUE_TYPE.STRING || _exp.type === VALUE_TYPE.CHAR || _exp.type === VALUE_TYPE.ID
    ){
        return ExpressionValue(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.ADD){
        return Arithmetic(_exp, _scope);
    }else if(  
               _exp.type === OPERATION_TYPE.EQUALS || _exp.type === OPERATION_TYPE.DIFF || _exp.type === OPERATION_TYPE.LESS
            || _exp.type === OPERATION_TYPE.LESSEQ || _exp.type === OPERATION_TYPE.GREATER || _exp.type === OPERATION_TYPE.GREATEREQ
    ){
        return Relational(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.AND || _exp.type === OPERATION_TYPE.OR || _exp.type === OPERATION_TYPE.NOT){
        return Logical(_exp, _scope);
    }
}

module.exports = Operation;