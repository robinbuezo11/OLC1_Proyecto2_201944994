const OPERATION_TYPE = {
    ADD:            'ADD',
    SUB:            'SUB',
    MUL:            'MUL',
    DIV:            'DIV',
    POW:            'POW',
    MOD:            'MOD',

    EQUALS:          'EQUALS',
    DIFF:           'DIFF',
    LESS:           'LESS',
    LESSEQ:         'LESSEQ',
    GREATER:        'GREATER',
    GREATEREQ:      'GREATEREQ',

    AND:            'AND',
    OR:             'OR',
    NOT:            'NOT',

    UNARY:          'UNARY',
    TERNARY:        'TERNARY',

    CAST:           'CAST',

    TO_LOWER:       'TO_LOWER',
    TO_UPPER:       'TO_UPPER',
    LENGTH:         'LENGTH',
    TRUNCATE:       'TRUNCATE',
    ROUND:          'ROUND',
    TYPEOF:         'TYPEOF',
    TO_STRING:      'TO_STRING',
    TO_CHAR_ARRAY:  'TO_CHAR_ARRAY',
}

module.exports = OPERATION_TYPE;