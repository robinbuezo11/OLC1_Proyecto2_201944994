// Constantes para todos los tipos de 'valores' que soporta nuestra gramática
const TIPO_VALOR = {
    NUMERO:         'VAL_NUMERO',
    IDENTIFICADOR:  'VAL_IDENTIFICADOR',
    CADENA: 'VAL_CADENA',
};

// Constantes para todos los tipos de 'operaciones' que soporta nuestra gramática
const TIPO_OPERACION = {
    SUMA:           'OP_SUMA',
    RESTA:          'OP_RESTA',
    MULTIPLICACION: 'OP_MULTIPLICACION',
    DIVISION:       'OP_DIVISION',
    NEGATIVO:       'OP_NEGATIVO',
    MAYOR_QUE:      'OP_MAYOR_QUE',
    MENOR_QUE:      'OP_MENOR_QUE',

    MAYOR_IGUAL:    'OP_MAYOR_IGUAL',
    MENOR_IGUAL:    'OP_MENOR_IGUAL',
    DOBLE_IGUAL:    'OP_DOBLE_IGUAL',
    NO_IGUAL:       'OP_NO_IGUAL',

    AND:            'OP_AND',
    OR:             'OP_OR',
    NOT:            'OP_NOT',

    CONCATENACION:  'OP_CONCATENACION'
};

// Constantes para todos los tipos de 'instrucciones' que soporta nuestra gramática
const TIPO_INSTRUCCION = {
    IMPRIMIR:       'INSTR_IMPRIMIR',
    DECLARACION:    'INSTR_DECLARACION',
    ASIGNACION:     'INSTR_ASIGNACION',
    IF:             'INSTR_IF',
    IF_ELSE:        'INSTR_ELSE'
};


function nuevaOperacion(operandoIzq, operandoDer, tipo) {
    return {
        operandoIzq: operandoIzq,
        operandoDer: operandoDer,
        tipo: tipo
    };
}


const instruccionesAPI = {

    /**
     * Crea un nuevo objeto tipo Operación para las operaciones binarias válidas.
     * @param {*} operandoIzq
     * @param {*} operandoDer
     * @param {*} tipo
     */
    nuevoOperacionBinaria: function(operandoIzq, operandoDer, tipo) {
        return nuevaOperacion(operandoIzq, operandoDer, tipo);
    },

    /**
     * Crea un nuevo objeto tipo Operación para las operaciones unarias válidas.
     * @param {*} operando
     * @param {*} tipo
     */
    nuevoOperacionUnaria: function(operando, tipo) {
        return nuevaOperacion(operando, undefined, tipo);
    },

    /**
     * Crea un nuevo objeto tipo Valor, esto puede ser una cadena, un número o un identificador.
     * @param {*} valor
     * @param {*} tipo
     */
    nuevoValor: function(valor, tipo) {
        return {
            valor: valor,
            tipo: tipo
        };
    },

    /**
     * Crea un nuevo objeto tipo Instrucción para la instrucción de imprimir.
     * @param {*} expresionCadena
     */
    nuevoImprimir: function(expresionCadena) {
        return {
            tipo: TIPO_INSTRUCCION.IMPRIMIR,
            expresionCadena: expresionCadena
        };
    },

    /**
     * Crea un nuevo objeto tipo Instrucción para la instrucción de declaración.
     * @param {*} identificador
     * @param {*} tipo
     */
    nuevoDeclaracion: function(identificador, tipo) {
        return {
            tipo: TIPO_INSTRUCCION.DECLARACION,
            identificador: identificador,
            tipo_dato: tipo_dato
        };
    },

    /**
     * Crea un nuevo objeto tipo Instrucción para la instrucción de asignación.
     * @param {*} identificador
     * @param {*} expresionNumerica
     */
    nuevoAsignacion: function(identificador, expresionNumerica) {
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            identificador: identificador,
            expresionNumerica: expresionNumerica
        };
    },

    /**
     * Crea un nuevo objeto tipo Instrucción para la instrucción de if.
     * @param {*} expresionLogica
     * @param {*} instrucciones
     */
    nuevoIf: function(expresionLogica, instrucciones) {
        return {
            tipo: TIPO_INSTRUCCION.IF,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones
        };
    },

    /**
     * Crea un nuevo objeto tipo operador (+,-,*,/)
     * @param {*} operador
     */
    nuevoOperador: function(operador) {
        return {
            operador: operador
        };
    }
};

// Exportamos las constantes y la API
module.exports.TIPO_OPERACION = TIPO_OPERACION;
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION;
module.exports.TIPO_VALOR = TIPO_VALOR;
module.exports.instruccionesAPI = instruccionesAPI;