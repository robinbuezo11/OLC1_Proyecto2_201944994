const Symbol = require("../Scope/Symbol");
const DATA_TYPE = require("../Enums/DataType");
const INSTRUCTION_TYPE = require("../Enums/InstructionType");
const Operation = require("../Operations/Operation");
const Call = require("./Call");


function Declaration(_instruction, _scope){
    let message = '';
    if (_instruction.data_type === DATA_TYPE.DOUBLE) { 
        let value = 0.0;
        if (_instruction.value != null) {
            let val = null;
            if(_instruction.value.type === INSTRUCTION_TYPE.CALL){
                let response = Call(_instruction.value, _scope);
                message += response.string;
                val = response.return;
                if(!val){
                    return message;//`No se pudo obtener el valor de la funcion ${_instruction.value.name} linea: ${_instruction.line} columna: ${_instruction.column}`;
                }
            }else{
                val = Operation(_instruction.value, _scope);
                if(!val.type){
                    return val.value + `\nNo se pudo obtener el valor de la expresion linea: ${_instruction.line} columna: ${_instruction.column}\n`;
                }
            }
            type = val.type;
            if (type === DATA_TYPE.DOUBLE) {
                value = val.value;
            }else{
                return `No se puede asignar un valor de tipo ${type} a una variable de tipo ${DATA_TYPE.DOUBLE} linea: ${_instruction.line} columna: ${_instruction.column}\n`;
            }
        }
        const newSymbol = new Symbol(_instruction.id, value, DATA_TYPE.DOUBLE, _instruction.line, _instruction.column);

        if (_scope.existsSymbolInActualScope(newSymbol.id) != false) {
            return "Error: La variable " + newSymbol.id + " ya existe linea: " + newSymbol.line + " columna: " + newSymbol.column + "\n";
        }
        _scope.addSymbol(newSymbol.id, newSymbol);
        // console.log(_scope)
        return null;
    }else if (_instruction.data_type === DATA_TYPE.INT) {
        let value = 0;
        if (_instruction.value != null) { 
            let val = null;
            if(_instruction.value.type === INSTRUCTION_TYPE.CALL){
                let response = Call(_instruction.value, _scope);
                message += response.string;
                val = response.return;
                if(!val){
                    return message;//`No se pudo obtener el valor de la funcion ${_instruction.value.name} linea: ${_instruction.line} columna: ${_instruction.column}`;
                }
            }else{
                val = Operation(_instruction.value, _scope);
                if(!val.type){
                    return val.value + `\nNo se pudo obtener el valor de la expresion linea: ${_instruction.line} columna: ${_instruction.column}\n`;
                }
            }
            type = val.type;
            if (type === DATA_TYPE.INT) {
                value = val.value;
            }else{
                return `No se puede asignar un valor de tipo ${type} a una variable de tipo ${DATA_TYPE.INT} linea: ${_instruction.line} columna: ${_instruction.column}\n`;
            }
        }
        const newSymbol = new Symbol(_instruction.id, value, DATA_TYPE.INT, _instruction.line, _instruction.column);
       
        if (_scope.existsSymbolInActualScope(newSymbol.id) != false) {

            return "Error: La variable " + newSymbol.id + " ya existe linea: " + newSymbol.line + " columna: " + newSymbol.column + "\n";
        }

        _scope.addSymbol(newSymbol.id, newSymbol);
        //console.log(_scope)
        return null;
    } else if (_instruction.data_type === DATA_TYPE.CHAR) {
        let value = '\u0000';
        if (_instruction.value != null) {
            let val = null;
            if(_instruction.value.type === INSTRUCTION_TYPE.CALL){
                let response = Call(_instruction.value, _scope);
                message += response.string;
                val = response.return;
                if(!val){
                    return message;//`No se pudo obtener el valor de la funcion ${_instruction.value.name} linea: ${_instruction.line} columna: ${_instruction.column}`;
                }
            }else{
                val = Operation(_instruction.value, _scope);
                if(!val.type){
                    return val.value + `\nNo se pudo obtener el valor de la expresion linea: ${_instruction.line} columna: ${_instruction.column}\n`;
                }
            }
            type = val.type;
            if (type === DATA_TYPE.CHAR) {
                value = val.value;
            }else{
                return `No se puede asignar un valor de tipo ${type} a una variable de tipo ${DATA_TYPE.CHAR} linea: ${_instruction.line} columna: ${_instruction.column}\n`;
            }
        }
        const newSymbol = new Symbol(_instruction.id, value, DATA_TYPE.CHAR, _instruction.line, _instruction.column);

        if (_scope.existsSymbolInActualScope(newSymbol.id) != false) {

            return "Error: La variable " + newSymbol.id + " ya existe linea: " + newSymbol.line + " columna: " + newSymbol.column + "\n";
        }
        _scope.addSymbol(newSymbol.id, newSymbol);
        //console.log(_scope)
        return null;
    } else if (_instruction.data_type === DATA_TYPE.BOOL) {
        let value = true;
        if (_instruction.value != null) {
            let val = null;
            if(_instruction.value.type === INSTRUCTION_TYPE.CALL){
                let response = Call(_instruction.value, _scope);
                message += response.string;
                val = response.return;
                if(!val){
                    return message;//`No se pudo obtener el valor de la funcion ${_instruction.value.name} linea: ${_instruction.line} columna: ${_instruction.column}`;
                }
            }else{
                val = Operation(_instruction.value, _scope);
                if(!val.type){
                    return val.value + `\nNo se pudo obtener el valor de la expresion linea: ${_instruction.line} columna: ${_instruction.column}\n`;
                }
            }
            type = val.type;
            if (type === DATA_TYPE.BOOL) {
                value = val.value;
            }else{
                return `No se puede asignar un valor de tipo ${type} a una variable de tipo ${DATA_TYPE.BOOL} linea: ${_instruction.line} columna: ${_instruction.column}\n`;
            }
            
        }
        const newSymbol = new Symbol(_instruction.id, value, DATA_TYPE.BOOL, _instruction.line, _instruction.column);

        if (_scope.existsSymbolInActualScope(newSymbol.id) != false) {
            return "Error: La variable " + newSymbol.id + " ya existe linea: " + newSymbol.line + " columna: " + newSymbol.column + "\n";
        }
        _scope.addSymbol(newSymbol.id, newSymbol);
        // console.log(_scope)
        return null;
    } else if (_instruction.data_type === DATA_TYPE.STRING) {
        let value = "";
        // console.log(_instruction)
        if (_instruction.value != null) {
            let val = null;
            if(_instruction.value.type === INSTRUCTION_TYPE.CALL){
                let response = Call(_instruction.value, _scope);
                message += response.string;
                val = response.return;
                if(!val){
                    return message;//`No se pudo obtener el valor de la funcion ${_instruction.value.name} linea: ${_instruction.line} columna: ${_instruction.column}`;
                }
            }else{
                val = Operation(_instruction.value, _scope);
                if(!val.type){
                    return val.value + `\nNo se pudo obtener el valor de la expresion linea: ${_instruction.line} columna: ${_instruction.column}\n`;
                }
            }
            type = val.type;
            if (type === DATA_TYPE.STRING) {
                value = val.value;
            }else{
                return `No se puede asignar un valor de tipo ${type} a una variable de tipo ${DATA_TYPE.STRING} linea: ${_instruction.line} columna: ${_instruction.column}\n`;
            }
            
        }
        const newSymbol = new Symbol(_instruction.id, value, DATA_TYPE.STRING, _instruction.line, _instruction.column);

        if (_scope.existsSymbolInActualScope(newSymbol.id) != false) {
            return "Error: La variable " + newSymbol.id + " ya existe linea: " + newSymbol.line + " columna: " + newSymbol.column + "\n";
        }
        _scope.addSymbol(newSymbol.id, newSymbol);
        //console.log(_scope)
        return null;
    }
}
module.exports = Declaration;