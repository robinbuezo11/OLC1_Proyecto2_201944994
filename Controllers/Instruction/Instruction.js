const INSTRUCTION_TYPE = require('../Enums/InstructionType');

function newOperation(_opLeft, _opRight, _type, _line, _column){
    return {
        opLeft: _opLeft,
        opRight: _opRight,
        type: _type,
        line: _line,
        column: _column
    };
}

function newUnary(_op, _type, _line, _column){
    return {
        op: _op,
        type: _type,
        line: _line,
        column: _column
    };
}

const Instruction = {
    newPrint: function(_exp, _line, _column){
        return {
            type: INSTRUCTION_TYPE.PRINT,
            expression: _exp,
            line: _line,
            column: _column
        };
    },newValue: function(_value, _type, _line, _column){
        return {
            value: _value,
            type: _type,
            line: _line,
            column: _column
        };
    },newBinaryOperation: function(_opLeft, _opRight, _type, _line, _column){
        return newOperation(_opLeft, _opRight, _type, _line, _column);
    },newUnaryOperation: function(_op, _type, _line, _column){
        return newUnary(_op, _type, _line, _column);
    },newAssignment: function(_id, _exp, _line, _column){
        return {
            type: INSTRUCTION_TYPE.ASSIGNMENT,
            id: _id,
            expression: _exp,
            line: _line,
            column: _column
        };
    },newDeclaration: function(_id, _value, _type, _line, _column){
        return {
            type: INSTRUCTION_TYPE.DECLARATION,
            id: _id,
            value: _value,
            data_type: _type,
            line: _line,
            column: _column
        };
    },newMain: function(_name, _values, _line, _column){
        return {
            type: INSTRUCTION_TYPE.MAIN,
            name: _name,
            list_values: _values,
            line: _line,
            column: _column
        }
    },newMethod: function(_name, _params, _instructions, _line, _column){
        return {
            type: INSTRUCTION_TYPE.DEC_METHOD,
            name: _name,
            params_list: _params,
            instructions: _instructions,
            line: _line,
            column: _column
        }
    },newIf: function(_expression, _instructions, _line, _column){
        return {
            type: INSTRUCTION_TYPE.IF,
            expression: _expression,
            instructions: _instructions,
            line: _line,
            column: _column
        }
    },newIfElse: function(_expression, _instructions, _elseInstructions, _line, _column){
        return {
            type: INSTRUCTION_TYPE.IF_ELSE,
            expression: _expression,
            instructions: _instructions,
            elseInstructions: _elseInstructions,
            line: _line,
            column: _column
        }
    },newElseIf: function(_expression, _instructions, _line, _column){
        return {
            type: INSTRUCTION_TYPE.ELSE_IF,
            expression: _expression,
            instructions: _instructions,
            line: _line,
            column: _column
        }
    },newIfElseIf: function(_expression, _instructions, _elseIfList, _elseInstructions, _line, _column){
        return {
            type: INSTRUCTION_TYPE.IF_ELSE_IF,
            expression: _expression,
            instructions: _instructions,
            list_elseif: _elseIfList,
            elseInstructions: _elseInstructions,
            line: _line,
            column: _column
        }
    }
}

module.exports = Instruction;