const DATA_TYPE = require("../Enums/DataType")
const OPERATION_TYPE = require("../Enums/OperationType")
const VALUE_TYPE = require("../Enums/ValueType")
const INSTRUCTION_TYPE = require("../Enums/InstructionType")
const Relational = require("./Relational")
const ExpressionValue = require("./ExpressionValue")
const Ternary = require("./Ternary")
const Call = require("../Instruction/Call")

function Logical(_exp, _scope) {
    //true || false
    if (
          _exp.type === VALUE_TYPE.DOUBLE || _exp.type === VALUE_TYPE.BOOL || _exp.type === VALUE_TYPE.INT 
        ||_exp.type === VALUE_TYPE.STRING || _exp.type === VALUE_TYPE.ID || _exp.type === VALUE_TYPE.CHAR
        || _exp.type === INSTRUCTION_TYPE.VECTOR_ACCESS || _exp.type === INSTRUCTION_TYPE.LIST_ACCESS
        ) {
        return ExpressionValue(_exp, _scope);
    }
    else if (
               _exp.type === OPERATION_TYPE.EQUALS || _exp.type === OPERATION_TYPE.DIFF || _exp.type === OPERATION_TYPE.LESS 
            || _exp.type === OPERATION_TYPE.LESSEQ || _exp.type === OPERATION_TYPE.GREATER || _exp.type === OPERATION_TYPE.GREATEREQ
            ) {
        return Relational(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.TERNARY){
        return Ternary(_exp, _scope);
    }else if(_exp.type === INSTRUCTION_TYPE.CALL){
        return Call(_exp, _scope).return;
    }
    else if (_exp.type === OPERATION_TYPE.OR || _exp.type === OPERATION_TYPE.AND || _exp.type === OPERATION_TYPE.NOT) {
        return compare(_exp.opLeft, _exp.opRight, _exp.type, _scope);
    }
}
function compare(_opLeft, _opRight, _type, _scope) {
    if(_type === OPERATION_TYPE.NOT){
        const opRight = Logical(_opRight, _scope);

        if(opRight.type === DATA_TYPE.BOOL){
            return {
                value: !opRight.value,
                type: DATA_TYPE.BOOL,
                line: _opRight.line,
                column: _opRight.column
            };
        }else{
            return {
                value: `No se puede realizar una operación lógica con ${opRight.type} en la linea ${_opRight.line} y columna ${_opRight.column}`,
                type: null,
                line: _opRight.line,
                column: _opRight.column
            };
        }
    }else{
        const opLeft = Logical(_opLeft, _scope);
        const opRight = Logical(_opRight, _scope);

        if (opLeft.type == opRight.type && opLeft.type === DATA_TYPE.BOOL) {
            var result = false;
            switch (_type) {
                case OPERATION_TYPE.OR:
                    if (opLeft.value || opRight.value) {
                        result = true;
                    }
                    break;
                case OPERATION_TYPE.AND:
                    if (opLeft.value && opRight.value) {
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
        } else {
            return {
                value: `No se puede realizar una operación lógica con ${opLeft.type} y ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`,
                type: null,
                line: _opLeft.line,
                column: _opLeft.column
            };
        }
    }
}

module.exports = Logical;