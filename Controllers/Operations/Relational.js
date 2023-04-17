const DATA_TYPE = require("../Enums/DataType");
const INSTRUCTION_TYPE = require("../Enums/InstructionType");
const OPERATION_TYPE = require("../Enums/OperationType");
const VALUE_TYPE = require("../Enums/ValueType");
const Arithmetic = require("./Arithmetic");
const ExpressionValue = require("./ExpressionValue");

function Relational(_exp,_scope){
    if (
           _exp.type === VALUE_TYPE.DOUBLE || _exp.type === VALUE_TYPE.BOOL || _exp.type === VALUE_TYPE.INT
        || _exp.type === VALUE_TYPE.STRING || _exp.type === VALUE_TYPE.ID || _exp.type === VALUE_TYPE.CHAR
        ) {
        return ExpressionValue(_exp, _scope);
    }
    else if (
           _exp.type === OPERATION_TYPE.ADD || _exp.type === OPERATION_TYPE.SUB || _exp.type === OPERATION_TYPE.DIV
        || _exp.type === OPERATION_TYPE.POW || _exp.type === OPERATION_TYPE.MOD || _exp.type === OPERATION_TYPE.UNARY 
        || _exp.type === OPERATION_TYPE.MUL
        ) {
        return Arithmetic(_exp, _scope);
    }
    else if (_exp.type === OPERATION_TYPE.EQUALS) {
        return equals(_exp.opLeft, _exp.opRight, _scope);
    }
}

function equals(_opLeft, _opRight, _scope) {
    const opLeft = Relational(_opLeft, _scope);
    const opRight = Relational(_opRight, _scope);
    // console.log(opLeft.type,opRight.type)
    if (
           (opLeft.type == DATA_TYPE.STRING && opRight.type == DATA_TYPE.STRING) || (opLeft.type == DATA_TYPE.INT && opRight.type == DATA_TYPE.INT)
        || (opLeft.type == DATA_TYPE.INT && opRight.type == DATA_TYPE.DOUBLE) || (opLeft.type == DATA_TYPE.INT && opRight.type == DATA_TYPE.CHAR)
        || (opLeft.type == DATA_TYPE.DOUBLE && opRight.type == DATA_TYPE.INT) || (opLeft.type == DATA_TYPE.CHAR && opRight.type == DATA_TYPE.INT)
        || (opLeft.type == DATA_TYPE.CHAR && opRight.type == DATA_TYPE.DOUBLE) || (opLeft.type == DATA_TYPE.CHAR && opRight.type == DATA_TYPE.CHAR) ||
        (opLeft.type == DATA_TYPE.DOUBLE && opRight.type == DATA_TYPE.DOUBLE)) {
        var result = false;
        if (opLeft.value == opRight.value) {
            result = true;
        }
        //console.log(result)
        return {
            value: result,
            type: DATA_TYPE.BOOL,
            line: _opLeft.line,
            column: _opLeft.column
        };
    }
    
   
}
module.exports = Relational;