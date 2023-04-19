const DATA_TYPE = require('../Enums/DataType');
const INSTRUCTION_TYPE = require('../Enums/InstructionType');
const OPERATION_TYPE = require('../Enums/OperationType');
const VALUE_TYPE = require('../Enums/ValueType');
const ResultType = require('./ResultType');
const ExpressionValue = require('./ExpressionValue');

function Arithmetic(_exp, _scope){
    if(
           _exp.type === VALUE_TYPE.DOUBLE || _exp.type === VALUE_TYPE.BOOL || _exp.type === VALUE_TYPE.INT
        || _exp.type === VALUE_TYPE.STRING || _exp.type === VALUE_TYPE.CHAR || _exp.type === VALUE_TYPE.ID
        ){
        return ExpressionValue(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.ADD){
        return add(_exp.opLeft, _exp.opRight, _scope);
    }else if(_exp.type === OPERATION_TYPE.SUB){
        return sub(_exp.opLeft, _exp.opRight, _scope);
    }else if(_exp.type === OPERATION_TYPE.MUL){
        return mul(_exp.opLeft, _exp.opRight, _scope)
    }
}

function add(_opLeft, _opRight, _scope){
    const opLeft = Arithmetic(_opLeft, _scope);
    const opRight = Arithmetic(_opRight, _scope);

    const typeresult = ResultType(opLeft.type, opRight.type);

    if(typeresult){
        if(typeresult === DATA_TYPE.DOUBLE || typeresult === DATA_TYPE.INT){
            if(opLeft.type === DATA_TYPE.BOOL || opRight.type === DATA_TYPE.BOOL){
                if(opLeft.type === DATA_TYPE.BOOL){
                    if(opLeft.value === true){
                        const result = 1 + Number(opRight.value);
                        return {
                            value: result,
                            type: typeresult,
                            line: _opLeft.line,
                            column: _opLeft.column
                        }
                    }else{
                        const result = 0 + Number(opRight.value);
                        return {
                            value: result,
                            type: typeresult,
                            line: _opLeft.line,
                            column: _opLeft.column
                        }
                    }
                }else if(opRight.type === DATA_TYPE.BOOL){
                    if(opRight.value === true){
                        const result = 1 + Number(opLeft.value);
                        return {
                            value: result,
                            type: typeresult,
                            line: _opLeft.line,
                            column: _opLeft.column
                        }
                    }else{
                        const result = 0 + Number(opLeft.value);
                        return {
                            value: result,
                            type: typeresult,
                            line: _opLeft.line,
                            column: _opLeft.column
                        }
                    }
                }
            }else if(opLeft.type === DATA_TYPE.CHAR || opRight.type === DATA_TYPE.CHAR){
                if(opLeft.type === DATA_TYPE.CHAR){
                    const result = Number((opLeft.value).charCodeAt(0)) + Number(opRight.value);
                    return {
                        value: result,
                        type: typeresult,
                        line: _opLeft.line,
                        column: _opLeft.column
                    }
                }else if(opRight.type === DATA_TYPE.CHAR){
                    const result = Number(opLeft.value) + Number((opRight.value).charCodeAt(0));
                    return {
                        value: result,
                        type: typeresult,
                        line: _opLeft.line,
                        column: _opLeft.column
                    }
                }
            } else {
                const result = Number(opLeft.value) + Number(opRight.value);
                return {
                    value: result,
                    type: typeresult,
                    line: _opLeft.line,
                    column: _opLeft.column
                }
            }
        }else if(typeresult === DATA_TYPE.STRING){
            const result = opLeft.value.toString() + opRight.value.toString();
            return {
                value: result,
                type: typeresult,
                line: _opLeft.line,
                column: _opLeft.column
            }
        }
    }else{
        throw new Error(`No se puede sumar ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`);
    }
}

function sub(_opLeft, _opRight, _scope){
    const opLeft = Arithmetic(_opLeft, _scope);
    const opRight = Arithmetic(_opRight, _scope);

    const typeresult = ResultType(opLeft.type, opRight.type);

    if(typeresult === DATA_TYPE.DOUBLE || typeresult === DATA_TYPE.INT){
        if(opLeft.type === DATA_TYPE.BOOL || opRight.type === DATA_TYPE.BOOL){
            if(opLeft.type === DATA_TYPE.BOOL){
                if(opLeft.value === true){
                    const result = 1 - Number(opRight.value);
                    return {
                        value: result,
                        type: typeresult,
                        line: _opLeft.line,
                        column: _opLeft.column
                    }
                }else{
                    const result = 0 - Number(opRight.value);
                    return {
                        value: result,
                        type: typeresult,
                        line: _opLeft.line,
                        column: _opLeft.column
                    }
                }
            }else if(opRight.type === DATA_TYPE.BOOL){
                if(opRight.value === true){
                    const result = 1 - Number(opLeft.value);
                    return {
                        value: result,
                        type: typeresult,
                        line: _opLeft.line,
                        column: _opLeft.column
                    }
                }else{
                    const result = 0 - Number(opLeft.value);
                    return {
                        value: result,
                        type: typeresult,
                        line: _opLeft.line,
                        column: _opLeft.column
                    }
                }
            }
        }else if(opLeft.type === DATA_TYPE.CHAR || opRight.type === DATA_TYPE.CHAR){
            if(opLeft.type === DATA_TYPE.CHAR){
                const result = Number((opLeft.value).charCodeAt(0)) - Number(opRight.value);
                return {
                    value: result,
                    type: typeresult,
                    line: _opLeft.line,
                    column: _opLeft.column
                }
            }else if(opRight.type === DATA_TYPE.CHAR){
                const result = Number(opLeft.value) - Number((opRight.value).charCodeAt(0));
                return {
                    value: result,
                    type: typeresult,
                    line: _opLeft.line,
                    column: _opLeft.column
                }
            }
        } else {
            const result = Number(opLeft.value) - Number(opRight.value);
            return {
                value: result,
                type: typeresult,
                line: _opLeft.line,
                column: _opLeft.column
            }
        }
    }else{
        throw new Error(`No se puede restar ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`);
    }
}

function mul(_opLeft, _opRight, _scope){
    const opLeft = Arithmetic(_opLeft, _scope);
    const opRight = Arithmetic(_opRight, _scope);

    const typeresult = ResultType(opLeft.type, opRight.type);

    if(typeresult === DATA_TYPE.DOUBLE || typeresult === DATA_TYPE.INT){
        if(opLeft.type === DATA_TYPE.BOOL || opRight.type === DATA_TYPE.BOOL){
            throw new Error(`No se puede multiplicar ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`); 
        }else if(opLeft.type === DATA_TYPE.CHAR || opRight.type === DATA_TYPE.CHAR){
            if(opLeft.type === DATA_TYPE.CHAR){
                const result = Number((opLeft.value).charCodeAt(0)) * Number(opRight.value);
                return {
                    value: result,
                    type: typeresult,
                    line: _opLeft.line,
                    column: _opLeft.column
                }
            }else if(opRight.type === DATA_TYPE.CHAR){
                const result = Number(opLeft.value) * Number((opRight.value).charCodeAt(0));
                return {
                    value: result,
                    type: typeresult,
                    line: _opLeft.line,
                    column: _opLeft.column
                }
            }
        } else {
            const result = Number(opLeft.value) * Number(opRight.value);
            return {
                value: result,
                type: typeresult,
                line: _opLeft.line,
                column: _opLeft.column
            }
        }
    }else{
        throw new Error(`No se puede multiplicar ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`);
    }
}

module.exports = Arithmetic;