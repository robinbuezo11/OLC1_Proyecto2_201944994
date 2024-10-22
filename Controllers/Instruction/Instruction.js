const INSTRUCTION_TYPE = require('../Enums/InstructionType');
const OPERATION_TYPE = require('../Enums/OperationType');
const VALUE_TYPE = require('../Enums/ValueType');

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
        let value = _value;
        if(_type == VALUE_TYPE.STRING){
            value = value.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\r/g, '\r').replace(/\\'/g, '\'').replace(/\\"/g, '\"').replace(/\\\\/g, '\\');
        }
        return {
            value: value,
            type: _type,
            line: _line,
            column: _column
        };
    },newAssignment: function(_id, _exp, _line, _column){
        return {
            type: INSTRUCTION_TYPE.ASSIGNMENT,
            id: _id,
            expression: _exp,
            line: _line,
            column: _column
        };
    },newIncrement: function(_id, _line, _column){
        return {
            type: INSTRUCTION_TYPE.INC,
            id: _id,
            line: _line,
            column: _column
        };
    },newDecrement: function(_id, _line, _column){
        return {
            type: INSTRUCTION_TYPE.DEC,
            id: _id,
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
    },newFunction: function(_type, _name, _params, _instructions, _line, _column){
        return {
            type: INSTRUCTION_TYPE.DEC_FUNC,
            data_type: _type,
            name: _name,
            params_list: _params,
            instructions: _instructions,
            line: _line,
            column: _column
        }
    },newCall: function(_name, _values, _line, _column){
        return {
            type: INSTRUCTION_TYPE.CALL,
            name: _name,
            list_values: _values,
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
    },newSwitch: function(_expression, _cases, _default, _line, _column){
        return {
            type: INSTRUCTION_TYPE.SWITCH,
            expression: _expression,
            cases: _cases,
            default: _default,
            line: _line,
            column: _column
        }
    },newCase: function(_expression, _instructions, _line, _column){
        return {
            type: INSTRUCTION_TYPE.CASE,
            expression: _expression,
            instructions: _instructions,
            line: _line,
            column: _column
        }
    },newDefault: function(_instructions, _line, _column){
        return {
            type: INSTRUCTION_TYPE.DEFAULT,
            instructions: _instructions,
            line: _line,
            column: _column
        }
    },newWhile: function(_expression, _instructions, _line, _column){
        return {
            type: INSTRUCTION_TYPE.WHILE,
            expression: _expression,
            instructions: _instructions,
            line: _line,
            column: _column
        }
    },newFor: function(_declaration, _expression, _assignment, _instructions, _line, _column){
        return {
            type: INSTRUCTION_TYPE.FOR,
            declaration: _declaration,
            expression: _expression,
            assignment: _assignment,
            instructions: _instructions,
            line: _line,
            column: _column
        }
    },newDoWhile: function(_instructions, _expression, _line, _column){
        return {
            type: INSTRUCTION_TYPE.DO_WHILE,
            instructions: _instructions,
            expression: _expression,
            line: _line,
            column: _column
        }
    },newBreak: function(_line, _column){
        return {
            type: INSTRUCTION_TYPE.BREAK,
            line: _line,
            column: _column
        }
    },newContinue: function(_line, _column){
        return {
            type: INSTRUCTION_TYPE.CONTINUE,
            line: _line,
            column: _column
        }
    },newReturn: function(_exp, _line, _column){
        return {
            type: INSTRUCTION_TYPE.RETURN,
            expression: _exp,
            line: _line,
            column: _column
        }
    },newCast: function(_type, _exp, _line, _column){
        return {
            type: OPERATION_TYPE.CAST,
            data_type: _type,
            expression: _exp,
            line: _line,
            column: _column
        }
    },newTernary: function(_expression, _opTrue, _opFalse, _line, _column){
        return {
            type: OPERATION_TYPE.TERNARY,
            expression: _expression,
            opTrue: _opTrue,
            opFalse: _opFalse,
            line: _line,
            column: _column
        };
    },newVectorNull: function(_type, _id, _create_type, _size, _line, _column){
        return {
            type: INSTRUCTION_TYPE.VECTOR_NULL,
            data_type: _type,
            id: _id,
            create_type: _create_type,
            size: _size,
            line: _line,
            column: _column
        };
    },newVectorValues: function(_type, _id, _list_values, _line, _column){
        return {
            type: INSTRUCTION_TYPE.VECTOR_VALUES,
            data_type: _type,
            id: _id,
            list_values: _list_values,
            line: _line,
            column: _column
        };
    },newVectorAccess: function(_id, _index, _line, _column){
        return {
            type: INSTRUCTION_TYPE.VECTOR_ACCESS,
            id: _id,
            index: _index,
            line: _line,
            column: _column
        };
    },newSetVector: function(_id, _index, _value, _line, _column){
        return {
            type: INSTRUCTION_TYPE.SET_VECTOR,
            id: _id,
            index: _index,
            value: _value,
            line: _line,
            column: _column
        };
    },newList: function(_type, _id, _create_type, _line, _column){
        return {
            type: INSTRUCTION_TYPE.DEC_LIST,
            data_type: _type,
            id: _id,
            create_type: _create_type,
            line: _line,
            column: _column
        };
    },newListValues: function(_type, _id, _list_values, _line, _column){
        return {
            type: INSTRUCTION_TYPE.LIST_VALUES,
            data_type: _type,
            id: _id,
            list_values: _list_values,
            line: _line,
            column: _column
        };
    },newAddList: function(_id, _value, _line, _column){
        return {
            type: INSTRUCTION_TYPE.ADD_LIST,
            id: _id,
            value: _value,
            line: _line,
            column: _column
        };
    },newListAccess: function(_id, _index, _line, _column){
        return {
            type: INSTRUCTION_TYPE.LIST_ACCESS,
            id: _id,
            index: _index,
            line: _line,
            column: _column
        };
    },newSetList: function(_id, _index, _value, _line, _column){
        return {
            type: INSTRUCTION_TYPE.SET_LIST,
            id: _id,
            index: _index,
            value: _value,
            line: _line,
            column: _column
        };
    },newBinaryOperation: function(_opLeft, _opRight, _type, _line, _column){
        return newOperation(_opLeft, _opRight, _type, _line, _column);
    },newUnaryOperation: function(_op, _type, _line, _column){
        return newUnary(_op, _type, _line, _column);
    }
}

module.exports = Instruction;