const OPERATION_TYPE = require('../Enums/OperationType');
const INSTRUCTION_TYPE = require('../Enums/InstructionType');
const VALUE_TYPE = require('../Enums/ValueType');
const DATA_TYPE = require('../Enums/DataType');

function Native(_exp, _scope){
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
    }else if(_exp.type === OPERATION_TYPE.TO_LOWER){
        return toLower(_exp.op, _scope);
    }else if(_exp.type === OPERATION_TYPE.TO_UPPER){
        return toUpper(_exp.op, _scope);
    }else if(_exp.type === OPERATION_TYPE.LENGTH){
        return length(_exp.op, _scope);
    }else if(_exp.type === OPERATION_TYPE.TRUNCATE){
        return truncate(_exp.op, _scope);
    }
}

function toLower(_op, _scope){
    const op = Native(_op, _scope);

    if(op.type === DATA_TYPE.STRING && !Array.isArray(op.value)){
        let result = op.value.toLowerCase();
        return {
            value: result,
            type: DATA_TYPE.STRING,
            line: _op.line,
            column: _op.column
        }
    }else{
        return {
            value: `Error: La función toLower espera un parámetro de tipo String. Linea: ${_op.line} Columna: ${_op.column}`,
            type: null,
            line: _op.line,
            column: _op.column
        }
    }
}

function toUpper(_op, _scope){
    const op = Native(_op, _scope);

    if(op.type === DATA_TYPE.STRING && !Array.isArray(op.value)){
        let result = op.value.toUpperCase();
        return {
            value: result,
            type: DATA_TYPE.STRING,
            line: _op.line,
            column: _op.column
        }
    }else{
        return {
            value: `Error: La función toUpper espera un parámetro de tipo String. Linea: ${_op.line} Columna: ${_op.column}`,
            type: null,
            line: _op.line,
            column: _op.column
        }
    }
}

function length(_op, _scope){
    const op = Native(_op, _scope);

    if(op.type === DATA_TYPE.STRING || Array.isArray(op.value)){
        let result = op.value.length;
        return {
            value: result,
            type: DATA_TYPE.INT,
            line: _op.line,
            column: _op.column
        }
    }else{
        return {
            value: `Error: La función length espera un parámetro de tipo String, Vector o Lista. Linea: ${_op.line} Columna: ${_op.column}`,
            type: null,
            line: _op.line,
            column: _op.column
        }
    }
}

function truncate(_op, _scope){
    const op = Native(_op, _scope);

    if((op.type === DATA_TYPE.DOUBLE || op.type === DATA_TYPE.INT) && !Array.isArray(op.value)){
        let result = Math.trunc(op.value);
        return {
            value: result,
            type: DATA_TYPE.INT,
            line: _op.line,
            column: _op.column
        }
    }else{
        return {
            value: `Error: La función truncate espera un parámetro de tipo Double o Int. Linea: ${_op.line} Columna: ${_op.column}`,
            type: null,
            line: _op.line,
            column: _op.column
        }
    }
}

module.exports = Native;