const Scope = require('../Scope/Scope');
const DATA_TYPE = require('../Enums/DataType');
const INSTRUCTION_TYPE = require('../Enums/InstructionType');
const Operation = require('../Operations/Operation');

function StatementFor(_instruction, _scope){
    let message = '';
    
    if(_instruction.declaration.type !== INSTRUCTION_TYPE.DECLARATION && _instruction.declaration.type !== INSTRUCTION_TYPE.ASSIGNMENT){
        return {
            string: `Error: La sentencia for no tiene una declaracion o asignacion. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
        }
    }
    if(_instruction.assignment.type !== INSTRUCTION_TYPE.ASSIGNMENT && _instruction.assignment.type !== INSTRUCTION_TYPE.INC && _instruction.assignment.type !== INSTRUCTION_TYPE.DEC){
        return {
            string: `Error: La sentencia for no tiene una asignacion. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
        }
    }

    let parent = new Scope(_scope, 'For');

    if(_instruction.declaration.type === INSTRUCTION_TYPE.DECLARATION){
        const Declaration = require('./Declaration');
        Declaration(_instruction.declaration, parent);
    }else if(_instruction.declaration.type === INSTRUCTION_TYPE.ASSIGNMENT){
        const Assignment = require('./Assignment');
        Assignment(_instruction.declaration, parent);
    }

    let operation = Operation(_instruction.expression, parent);
    if(operation.type === DATA_TYPE.BOOL){
        while(operation.value){
            let parentScope = new Scope(parent, 'For');
            const Block = require('./Block');
            let exe = Block(_instruction.instructions, parentScope);
            message += exe.string;
            if(exe.break || exe.return){
                return {
                    string: message,
                    return: exe.return,
                }
            }
            const Assignment = require('./Assignment');
            Assignment(_instruction.assignment, parentScope);
            operation = Operation(_instruction.expression, parentScope);
        }
        return {
            string: message
        };
    }else{
        return {
            string: `Error: La expresion de la sentencia for no es de tipo booleano. Linea: ${_instruction.line} Columna: ${_instruction.column}\n`
        }
    }
}

module.exports = StatementFor;