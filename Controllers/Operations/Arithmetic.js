const DATA_TYPE = require('../Enums/DataType');
const INSTRUCTION_TYPE = require('../Enums/InstructionType');
const OPERATION_TYPE = require('../Enums/OperationType');
const VALUE_TYPE = require('../Enums/ValueType');
const ResultType = require('./ResultType');

function Arithmetic(_exp, _scope){
    if(
           _exp.type === VALUE_TYPE.DOUBLE || _exp.type === VALUE_TYPE.BOOL || _exp.type === VALUE_TYPE.INT
        || _exp.type === VALUE_TYPE.STRING || _exp.type === VALUE_TYPE.CHAR || _exp.type === VALUE_TYPE.ID
        || _exp.type === INSTRUCTION_TYPE.VECTOR_ACCESS || _exp.type === INSTRUCTION_TYPE.LIST_ACCESS
        ){
        const ExpressionValue = require('./ExpressionValue');
        return ExpressionValue(_exp, _scope);
    }else if(
           _exp.type === OPERATION_TYPE.TO_LOWER || _exp.type === OPERATION_TYPE.TO_UPPER || _exp.type === OPERATION_TYPE.LENGTH
        || _exp.type === OPERATION_TYPE.TRUNCATE || _exp.type === OPERATION_TYPE.ROUND || _exp.type === OPERATION_TYPE.TYPEOF
    ){
        const Native = require('./Native');
        return Native(_exp, _scope);
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
    }else if(_exp.type === OPERATION_TYPE.TERNARY){
        const Ternary = require('./Ternary');
        return Ternary(_exp, _scope);
    }else if(_exp.type === OPERATION_TYPE.ADD){
        return add(_exp.opLeft, _exp.opRight, _scope);
    }else if(_exp.type === OPERATION_TYPE.SUB){
        return sub(_exp.opLeft, _exp.opRight, _scope);
    }else if(_exp.type === OPERATION_TYPE.MUL){
        return mul(_exp.opLeft, _exp.opRight, _scope);
    }else if(_exp.type === OPERATION_TYPE.DIV){
        return div(_exp.opLeft, _exp.opRight, _scope);
    }else if(_exp.type === OPERATION_TYPE.POW){
        return pow(_exp.opLeft, _exp.opRight, _scope);
    }else if(_exp.type === OPERATION_TYPE.MOD){
        return mod(_exp.opLeft, _exp.opRight, _scope);
    }else if(_exp.type === OPERATION_TYPE.UNARY){
        return una(_exp.op, _scope);
    }else if(_exp.type === INSTRUCTION_TYPE.INC){
        return inc(_exp.id, _scope);
    }else if(_exp.type === INSTRUCTION_TYPE.DEC){
        return dec(_exp.id, _scope);
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
        return {
            value: `No se puede sumar ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`,
            type: null,
            line: _opLeft.line,
            column: _opLeft.column
        };
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
        return {
            value: `No se puede restar ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`,
            type: null,
            line: _opLeft.line,
            column: _opLeft.column
        };
    }
}

function mul(_opLeft, _opRight, _scope){
    const opLeft = Arithmetic(_opLeft, _scope);
    const opRight = Arithmetic(_opRight, _scope);

    const typeresult = ResultType(opLeft.type, opRight.type);

    if(typeresult === DATA_TYPE.DOUBLE || typeresult === DATA_TYPE.INT){
        if(opLeft.type === DATA_TYPE.BOOL || opRight.type === DATA_TYPE.BOOL){
            return {
                value: `No se puede multiplicar ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`,
                type: null,
                line: _opLeft.line,
                column: _opLeft.column
            }; 
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
        return {
            value: `No se puede multiplicar ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`,
            type: null,
            line: _opLeft.line,
            column: _opLeft.column
        };
    }
}

function div(_opLeft, _opRight, _scope){
    const opLeft = Arithmetic(_opLeft, _scope);
    const opRight = Arithmetic(_opRight, _scope);

    const typeresult = ResultType(opLeft.type, opRight.type);

    if(typeresult === DATA_TYPE.DOUBLE || typeresult === DATA_TYPE.INT){
        if(opRight.value != 0){
            if(opLeft.type === DATA_TYPE.BOOL || opRight.type === DATA_TYPE.BOOL){
                return {
                    value: `No se puede dividir ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`,
                    type: null,
                    line: _opLeft.line,
                    column: _opLeft.column
                };
            }else if(opLeft.type === DATA_TYPE.CHAR || opRight.type === DATA_TYPE.CHAR){
                if(opLeft.type === DATA_TYPE.CHAR){
                    const result = Number((opLeft.value).charCodeAt(0)) / Number(opRight.value);
                    return {
                        value: result,
                        type: DATA_TYPE.DOUBLE,
                        line: _opLeft.line,
                        column: _opLeft.column
                    }
                }else if(opRight.type === DATA_TYPE.CHAR){
                    const result = Number(opLeft.value) / Number((opRight.value).charCodeAt(0));
                    return {
                        value: result,
                        type: DATA_TYPE.DOUBLE,
                        line: _opLeft.line,
                        column: _opLeft.column
                    }
                }
            } else {
                const result = Number(opLeft.value) / Number(opRight.value);
                return {
                    value: result,
                    type: DATA_TYPE.DOUBLE,
                    line: _opLeft.line,
                    column: _opLeft.column
                }
            }
        }else{
            return {
                value: `No se puede dividir entre 0 en la linea ${_opLeft.line} y columna ${_opLeft.column}`,
                type: null,
                line: _opLeft.line,
                column: _opLeft.column
            };
        }
    }else{
        return {
            value: `No se puede dividir ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`,
            type: null,
            line: _opLeft.line,
            column: _opLeft.column
        };
    }
}

function pow(_opLeft, _opRight, _scope){
    const opLeft = Arithmetic(_opLeft, _scope);
    const opRight = Arithmetic(_opRight, _scope);

    const typeresult = ResultType(opLeft.type, opRight.type);

    if(typeresult === DATA_TYPE.DOUBLE || typeresult === DATA_TYPE.INT){
        if((opLeft.type === DATA_TYPE.BOOL || opRight.type === DATA_TYPE.BOOL) || (opLeft.type === DATA_TYPE.CHAR || opRight.type === DATA_TYPE.CHAR)){
            return {
                value: `No se puede calcular la potencia de ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`,
                type: null,
                line: _opLeft.line,
                column: _opLeft.column
            };
        } else {
            const result = Number(opLeft.value) ** Number(opRight.value);
            return {
                value: result,
                type: typeresult,
                line: _opLeft.line,
                column: _opLeft.column
            }
        }
    }else{
        return {
            value: `No se puede calcular la potencia de ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`,
            type: null,
            line: _opLeft.line,
            column: _opLeft.column
        };
    }
}

function mod(_opLeft, _opRight, _scope){
    const opLeft = Arithmetic(_opLeft, _scope);
    const opRight = Arithmetic(_opRight, _scope);

    const typeresult = ResultType(opLeft.type, opRight.type);

    if(typeresult === DATA_TYPE.DOUBLE || typeresult === DATA_TYPE.INT){
        if((opLeft.type === DATA_TYPE.BOOL || opRight.type === DATA_TYPE.BOOL) || (opLeft.type === DATA_TYPE.CHAR || opRight.type === DATA_TYPE.CHAR)){
            return {
                value: `No se puede calcular el módulo de ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`,
                type: null,
                line: _opLeft.line,
                column: _opLeft.column
            };
        } else {
            const result = Number(opLeft.value) % Number(opRight.value);
            return {
                value: result,
                type: DATA_TYPE.DOUBLE,
                line: _opLeft.line,
                column: _opLeft.column
            }
        }
    }else{
        return {
            value: `No se puede calcular el módulo de ${opLeft.type} con ${opRight.type} en la linea ${_opLeft.line} y columna ${_opLeft.column}`,
            type: null,
            line: _opLeft.line,
            column: _opLeft.column
        };
    }
}

function una(_op, _scope){
    const op = Arithmetic(_op, _scope);

    if(op.type === DATA_TYPE.INT || op.type === DATA_TYPE.DOUBLE){
        const result = Number(op.value) * -1;
        return {
            value: result,
            type: op.type,
            line: _op.line,
            column: _op.column
        }
    }else{
        return {
            value: `No se puede calcular el negativo de ${op.type} en la linea ${_op.line} y columna ${_op.column}`,
            type: null,
            line: _op.line,
            column: _op.column
        };
    }
}

function inc(_op, _scope){
    const op = Arithmetic(_op, _scope);

    if(op.type === DATA_TYPE.INT || op.type === DATA_TYPE.DOUBLE){
        const result = Number(op.value) + 1;
        return {
            value: result,
            type: op.type,
            line: _op.line,
            column: _op.column
        }
    }else{
        return {
            value: `No se puede calcular el incremento de ${op.type} en la linea ${_op.line} y columna ${_op.column}`,
            type: null,
            line: _op.line,
            column: _op.column
        };
    }
}

function dec(_op, _scope){
    const op = Arithmetic(_op, _scope);

    if(op.type === DATA_TYPE.INT || op.type === DATA_TYPE.DOUBLE){
        const result = Number(op.value) - 1;
        return {
            value: result,
            type: op.type,
            line: _op.line,
            column: _op.column
        }
    }else{
        return {
            value: `No se puede calcular el decremento de ${op.type} en la linea ${_op.line} y columna ${_op.column}`,
            type: null,
            line: _op.line,
            column: _op.column
        };
    }
}

module.exports = Arithmetic;