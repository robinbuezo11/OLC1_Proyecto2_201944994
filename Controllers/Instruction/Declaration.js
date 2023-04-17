const Symbol = require("../Scope/Symbol");
const DATA_TYPE = require("../Enums/DataType");
const Operation = require("../Operations/Operation");

function Declaration(_instruction, _scope){
    if (_instruction.data_type === DATA_TYPE.DOUBLE) { 
        let value = 0.0;
        if (_instruction.value != null) {
            let op = Operation(_instruction.value, _scope);
            type = op.type;
            if (type === DATA_TYPE.DOUBLE) {
                value = op.value;
            }else{
                return `No se puede asignar un valor de tipo ${type} a una variable de tipo ${DATA_TYPE.DOUBLE} linea: ${_instruction.line} columna: ${_instruction.column}`;
            }
        }
        const newSymbol = new Symbol(_instruction.id, value, DATA_TYPE.DOUBLE, _instruction.line, _instruction.column);

        if (_scope.existsSymbolInActualScope(newSymbol.id) != false) {
            return "Error: La variable " + newSymbol.id + " ya existe linea: " + newSymbol.line + " columna: " + newSymbol.column;
        }
        _scope.addSymbol(newSymbol.id, newSymbol);
        // console.log(_scope)
        return null;
    }else if (_instruction.data_type === DATA_TYPE.INT) {
        let value = 0;
        if (_instruction.value != null) { 
            var op = Operation(_instruction.value, _scope);
            type = op.type;
            if (type === DATA_TYPE.INT) {
                value = op.value;
            }else{
                return `No se puede asignar un valor de tipo ${type} a una variable de tipo ${DATA_TYPE.INT} linea: ${_instruction.line} columna: ${_instruction.column}`;
            }
        }
        const newSymbol = new Symbol(_instruction.id, value, DATA_TYPE.INT, _instruction.line, _instruction.column);
       
        if (_scope.existsSymbolInActualScope(newSymbol.id) != false) {

            return "Error: La variable " + newSymbol.id + " ya existe linea: " + newSymbol.line + " columna: " + newSymbol.column;
        }

        _scope.addSymbol(newSymbol.id, newSymbol);
        //console.log(_scope)
        return null;
    } else if (_instruction.data_type === DATA_TYPE.CHAR) {
        let value = '';
        if (_instruction.value != null) {
            var op = Operation(_instruction.value, _scope);
            type = op.type;
            if (type === DATA_TYPE.CHAR) {
                value = op.value;
            }else{
                return `No se puede asignar un valor de tipo ${type} a una variable de tipo ${DATA_TYPE.CHAR} linea: ${_instruction.line} columna: ${_instruction.column}`;
            }
        }
        const newSymbol = new Symbol(_instruction.id, value, DATA_TYPE.CHAR, _instruction.line, _instruction.column);

        if (_scope.existsSymbolInActualScope(newSymbol.id) != false) {

            return "Error: La variable " + newSymbol.id + " ya existe linea: " + newSymbol.line + " columna: " + newSymbol.column;
        }
        _scope.addSymbol(newSymbol.id, newSymbol);
        //console.log(_scope)
        return null;
    } else if (_instruction.data_type === DATA_TYPE.BOOL) {
        let value = true;
        if (_instruction.value != null) {

            var op = Operation(_instruction.value, _scope);
            //console.log(op)
            type = op.type;
            if (type === DATA_TYPE.BOOL) {
                value = op.value;
            }else{
                return `No se puede asignar un valor de tipo ${type} a una variable de tipo ${DATA_TYPE.BOOL} linea: ${_instruction.line} columna: ${_instruction.column}`;
            }
            
        }
        const newSymbol = new Symbol(_instruction.id, value, DATA_TYPE.BOOL, _instruction.line, _instruction.column);

        if (_scope.existsSymbolInActualScope(newSymbol.id) != false) {
            return "Error: La variable " + newSymbol.id + " ya existe linea: " + newSymbol.line + " columna: " + newSymbol.column;
        }
        _scope.addSymbol(newSymbol.id, newSymbol);
        // console.log(_scope)
        return null;
    } else if (_instruction.data_type === DATA_TYPE.STRING) {
        let value = "";
        // console.log(_instruction)
        if (_instruction.value != null) {
            var op = Operation(_instruction.value, _scope);
            type = op.type;
            if (type === DATA_TYPE.STRING) {
                value = op.value;
            }else{
                return `No se puede asignar un valor de tipo ${type} a una variable de tipo ${DATA_TYPE.STRING} linea: ${_instruction.line} columna: ${_instruction.column}`;
            }
            
        }
        const newSymbol = new Symbol(_instruction.id, value, DATA_TYPE.STRING, _instruction.line, _instruction.column);

        if (_scope.existsSymbolInActualScope(newSymbol.id) != false) {
            return "Error: La variable " + newSymbol.id + " ya existe linea: " + newSymbol.line + " columna: " + newSymbol.column;
        }
        _scope.addSymbol(newSymbol.id, newSymbol);
        //console.log(_scope)
        return null;
    }
}
module.exports = Declaration;