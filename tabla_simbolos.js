const TIPO_DATO = {
    NUMERO: 'numero',
    STRING: 'string',
}

/**
 * Función que crea objetos tipo simbolo.
 * @param {*} id
 * @param {*} tipo
 * @param {*} valor
 */
function crearSimbolo(id, tipo, valor) {
    return {
        id: id,
        tipo: tipo,
        valor: valor
    };
}

/**
 * Clase que representa la tabla de símbolos.
 */
class TS {

    /**
     * El constructor de la clase recibe la tabla de símbolos padre.
     * @param {*} simbolos
     */
    constructor(simbolos) {
        this._simbolos = simbolos;
    }

    /**
     * Función que agrega un nuevo símbolo a la tabla.
     * Esta función se usa en la sentencia de declaración.
     * @param {*} id
     * @param {*} tipo
     */
    agregar(id, tipo) {
        const nuevoSimbolo = crearSimbolo(id, tipo);
        this._simbolos.push(nuevoSimbolo);
    }

    /**
     * Función para actualizar el valor de un símbolo.
     * Esta función se usa en la sentencia de asignación.
     * @param {*} id
     * @param {*} valor
     */
    actualizar(id, valor) {//Validamos tipos
        const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0];
        if (simbolo) {
            if (simbolo.tipo===valor.tipo){
                if (simbolo.tipo===TIPO_DATO.NUMERO){
                    if (valor.valor instanceof String){//Convertimos si es necesario
                        simbolo.valor = ParseInt(valor.valor,10);
                    }else{
                        simbolo.valor = valor.valor;
                    }
                }else{
                    if (valor.valor instanceof Number){//Convertimos si es necesario
                        simbolo.valor = valor.valor.toString();
                    }else{
                        simbolo.valor = valor.valor;
                    }
                }
            }else{
                throw 'ERROR DE TIPOS -> Variable: ' + id + ' tiene tipo: ' + simbolo.tipo + ' y el valor a asignar es de tipo: ' + valor.tipo;
            }
        } else {
            throw 'ERROR -> Variable: ' + id + ' no ha sido declarada';
        }
    }

    /**
     * Función para obtener el valor de un símbolo.
     * @param {*} id
     */
    obtener(id) {
        const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0];
        if (simbolo) return simbolo; //Retornamos el simbolo completo
        else throw 'ERROR -> Variable: ' + id + ' no ha sido declarada';
    }

    /**
     * Función para obtener los simbolos de la tabla.
     */
    getSimbolos() {
        return this._simbolos;
    }
}

// Exportamos las constantes y la clase

module.exports.TIPO_DATO = TIPO_DATO;
module.exports.TS = TS;