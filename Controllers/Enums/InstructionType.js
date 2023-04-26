const INSTRUCTION_TYPE = {
    PRINT:          'INSTR_PRINT',
    DECLARATION:    'INSTR_DECLARATION',
    ASSIGNMENT:     'INSTR_ASSIGNMENT',
    DEC_METHOD:     'INSTR_DEC_METHOD',
    MAIN:           'INSTR_MAIN',
    IF:             'INSTR_IF',
    IF_ELSE:        'INSTR_ELSE',
    ELSE_IF:        'INSTR_ELSE_IF',
    IF_ELSE_IF:     'INSTR_IF_ELSE_IF',
    SWITCH:         'INSTR_SWITCH',
    CASE:           'INSTR_CASE',
    DEFAULT:        'INSTR_DEFAULT',
    WHILE:          'INSTR_WHILE',
};

module.exports = INSTRUCTION_TYPE;