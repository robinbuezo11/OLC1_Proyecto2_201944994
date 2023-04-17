const DATA_TYPE = require("../Enums/DataType")
const OPERATION_TYPE = require("../Enums/OperationType")
const VALUE_TYPE = require("../Enums/ValueType")
const Relational = require("./Relational")
const ExpressionValue = require("./ExpressionValue")

function Logical(_exp, _scope) {
    //true || false
    if (
          _exp.type === VALUE_TYPE.DOUBLE || _exp.type === VALUE_TYPE.BOOL || _exp.type === VALUE_TYPE.INT 
        ||_exp.type === VALUE_TYPE.STRING || _exp.type === VALUE_TYPE.ID || _exp.type === VALUE_TYPE.CHAR
        ) {
        return ExpressionValue(_exp, _scope);
    }
    else if (
               _exp.type === OPERATION_TYPE.EQUALS || _exp.type === OPERATION_TYPE.DIFF || _exp.type === OPERATION_TYPE.LESS 
            || _exp.type === OPERATION_TYPE.LESSEQ || _exp.type === OPERATION_TYPE.GREATER || _exp.type === OPERATION_TYPE.GREATEREQ
            ) {
        return Relational(_exp, _scope);
    }
    else if (_exp.type === OPERATION_TYPE.OR) {
        return or(_exp.opLeft, _exp.opRight, _scope);
    }
}
function or(_opLeft, _opRight, _scope) {
    const opLeft = Logical(_opLeft, _scope);
    const opRight = Logical(_opRight, _scope);

    if (opLeft.type == opRight.type && opLeft.type === DATA_TYPE.BOOL) {
        var result = false;
        if (opLeft.value || opRight.value) {
            result = true;
        }
        return {
            value: result,
            type: DATA_TYPE.BOOL,
            line: _opLeft.line,
            column: _opLeft.column
        };
    } else {
        throw new Error(`No se puede realizar la operacion OR entre ${opLeft.type} y ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`);
    }
    
    
}

module.exports = Logical;