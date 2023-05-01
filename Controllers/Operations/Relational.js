const DATA_TYPE = require("../Enums/DataType");
const INSTRUCTION_TYPE = require("../Enums/InstructionType");
const OPERATION_TYPE = require("../Enums/OperationType");
const VALUE_TYPE = require("../Enums/ValueType");

function Relational(_exp,_scope){
    if (
           _exp.type === VALUE_TYPE.DOUBLE || _exp.type === VALUE_TYPE.BOOL || _exp.type === VALUE_TYPE.INT
        || _exp.type === VALUE_TYPE.STRING || _exp.type === VALUE_TYPE.ID || _exp.type === VALUE_TYPE.CHAR
        || _exp.type === INSTRUCTION_TYPE.VECTOR_ACCESS || _exp.type === INSTRUCTION_TYPE.LIST_ACCESS
        ) {
        const ExpressionValue = require("./ExpressionValue");
        return ExpressionValue(_exp, _scope);
    }
    else if (
           _exp.type === OPERATION_TYPE.ADD || _exp.type === OPERATION_TYPE.SUB || _exp.type === OPERATION_TYPE.DIV
        || _exp.type === OPERATION_TYPE.POW || _exp.type === OPERATION_TYPE.MOD || _exp.type === OPERATION_TYPE.UNARY 
        || _exp.type === OPERATION_TYPE.MUL
        ) {
        const Arithmetic = require("./Arithmetic");
        return Arithmetic(_exp, _scope);
    }else if(
           _exp.type === OPERATION_TYPE.TO_LOWER || _exp.type === OPERATION_TYPE.TO_UPPER || _exp.type === OPERATION_TYPE.LENGTH
        || _exp.type === OPERATION_TYPE.TRUNCATE || _exp.type === OPERATION_TYPE.ROUND || _exp.type === OPERATION_TYPE.TYPEOF
        || _exp.type === OPERATION_TYPE.TO_STRING
        ){
        const Native = require("./Native");
        return Native(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.TERNARY){
        const Ternary = require("./Ternary");
        return Ternary(_exp, _scope);
    }else if(_exp.type === INSTRUCTION_TYPE.CALL){
        const Call = require("../Instruction/Call");
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
    else if (
           _exp.type === OPERATION_TYPE.EQUALS || _exp.type === OPERATION_TYPE.DIFF || _exp.type === OPERATION_TYPE.LESS 
        || _exp.type === OPERATION_TYPE.LESSEQ || _exp.type === OPERATION_TYPE.GREATER || _exp.type === OPERATION_TYPE.GREATEREQ
        ) {
        return compare(_exp.opLeft, _exp.opRight, _exp.type, _scope);
    }
}

function compare(_opLeft, _opRight, _type, _scope) {
    const opLeft = Relational(_opLeft, _scope);
    const opRight = Relational(_opRight, _scope);
    if(
        (opLeft.type == DATA_TYPE.STRING && opRight.type == DATA_TYPE.STRING) || (opLeft.type == DATA_TYPE.INT && opRight.type == DATA_TYPE.INT)
        || (opLeft.type == DATA_TYPE.INT && opRight.type == DATA_TYPE.DOUBLE) || (opLeft.type == DATA_TYPE.INT && opRight.type == DATA_TYPE.CHAR)
        || (opLeft.type == DATA_TYPE.DOUBLE && opRight.type == DATA_TYPE.INT) || (opLeft.type == DATA_TYPE.DOUBLE && opRight.type == DATA_TYPE.CHAR)
        || (opLeft.type == DATA_TYPE.CHAR && opRight.type == DATA_TYPE.INT) || (opLeft.type == DATA_TYPE.CHAR && opRight.type == DATA_TYPE.DOUBLE)
        || (opLeft.type == DATA_TYPE.CHAR && opRight.type == DATA_TYPE.CHAR) || (opLeft.type == DATA_TYPE.DOUBLE && opRight.type == DATA_TYPE.DOUBLE)
        ){

        var result = false;

        switch(_type){
            case OPERATION_TYPE.EQUALS:
                if (opLeft.value == opRight.value) {
                    result = true;
                }
                break;
            case OPERATION_TYPE.DIFF:
                if (opLeft.value != opRight.value) {
                    result = true;
                }
                break;
            case OPERATION_TYPE.LESS:
                if (opLeft.value < opRight.value) {
                    result = true;
                }
                break;
            case OPERATION_TYPE.LESSEQ:
                if (opLeft.value <= opRight.value) {
                    result = true;
                }
                break;
            case OPERATION_TYPE.GREATER:
                if (opLeft.value > opRight.value) {
                    result = true;
                }
                break;
            case OPERATION_TYPE.GREATEREQ:
                if (opLeft.value >= opRight.value) {
                    result = true;
                }
                break;
        }

        return {
            value: result,
            type: DATA_TYPE.BOOL,
            line: _opLeft.line,
            column: _opLeft.column
        };

    }else{
        return {
            value: `No se puede comparar ${opLeft.type} con ${opRight.type}. Linea: ${_opLeft.line} Columna: ${_opLeft.column}`,
            type: null,
            line: _opLeft.line,
            column: _opLeft.column
        };
    }
}

module.exports = Relational;