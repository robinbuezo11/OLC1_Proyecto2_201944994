const OPERATION_TYPE = require('../Enums/OperationType');
const INSTRUCTION_TYPE = require('../Enums/InstructionType');
const VALUE_TYPE = require('../Enums/ValueType');

function Operation(_exp, _scope){
    if( 
           _exp.type === VALUE_TYPE.DOUBLE || _exp.type === VALUE_TYPE.BOOL || _exp.type === VALUE_TYPE.INT 
        || _exp.type === VALUE_TYPE.STRING || _exp.type === VALUE_TYPE.CHAR || _exp.type === VALUE_TYPE.ID
        || _exp.type === INSTRUCTION_TYPE.VECTOR_ACCESS || _exp.type === INSTRUCTION_TYPE.LIST_ACCESS
        ){
        const ExpressionValue = require('./ExpressionValue');
        return ExpressionValue(_exp, _scope);
    }else if(
               _exp.type === OPERATION_TYPE.ADD || _exp.type === OPERATION_TYPE.SUB || _exp.type === OPERATION_TYPE.MUL
            || _exp.type === OPERATION_TYPE.DIV || _exp.type === OPERATION_TYPE.POW || _exp.type === OPERATION_TYPE.MOD
            || _exp.type === OPERATION_TYPE.UNARY || _exp.type === INSTRUCTION_TYPE.INC || _exp.type === INSTRUCTION_TYPE.DEC
        ){
        const Arithmetic = require('./Arithmetic');
        return Arithmetic(_exp, _scope);
    }else if(  
               _exp.type === OPERATION_TYPE.EQUALS || _exp.type === OPERATION_TYPE.DIFF || _exp.type === OPERATION_TYPE.LESS
            || _exp.type === OPERATION_TYPE.LESSEQ || _exp.type === OPERATION_TYPE.GREATER || _exp.type === OPERATION_TYPE.GREATEREQ
    ){
        const Relational = require('./Relational');
        return Relational(_exp, _scope);
    }else if(
               _exp.type === OPERATION_TYPE.TO_LOWER || _exp.type === OPERATION_TYPE.TO_UPPER || _exp.type === OPERATION_TYPE.LENGTH
            || _exp.type === OPERATION_TYPE.TRUNCATE || _exp.type === OPERATION_TYPE.ROUND || _exp.type === OPERATION_TYPE.TYPEOF
            || _exp.type === OPERATION_TYPE.TO_STRING
    ){
        const Native = require('./Native');
        return Native(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.AND || _exp.type === OPERATION_TYPE.OR || _exp.type === OPERATION_TYPE.NOT){
        const Logical = require('./Logical');
        return Logical(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.TERNARY){
        const Ternary = require('./Ternary');
        return Ternary(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.CAST){
        const Cast = require('./Cast');
        return Cast(_exp, _scope);
    }else if(_exp.type === INSTRUCTION_TYPE.CALL){
        const Call = require('../Instruction/Call');
        let call = Call(_exp, _scope);
        if(call.return){
            return call.return;
        }else{
            return {
                value: call.string,
                type: null,
                line: _exp.line,
                column: _exp.column
            };
        }
    }
}

module.exports = Operation;