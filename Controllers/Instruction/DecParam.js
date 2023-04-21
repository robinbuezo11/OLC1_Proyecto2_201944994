const Symbol = require=("../Scope/Symbol");
const DATA_TYPE = require("../Enums/DataType");
const OPERATION_TYPE = require("../Enums/OperationType");

function DecParam(_instruction, _scope){
    if(_instruction.data_type === DATA_TYPE.DOUBLE){
        let value = 0.0;
        if(_instruction.value != null){
            const Operation = require("../Operations/Operation");
            let op = Operation(_instruction.value, _scope.previous)

            let type = op.type;
            if(type === OPERATION_TYPE.DOUBLE){
                value = op.value;
            }
        }
        const newSymbol = new Symbol(_instruction.id, value, DATA_TYPE.DOUBLE, _instruction.line, _instruction.column);
        if(_scope.existsSymbolInActualScope(newSymbol.id)){
            return `Error la variable ${newSymbol.id} ya existe en la Linea: ${newSymbol.line} Columna: ${newSymbol.column}`;
        }else{
            _scope.addSymbol(newSymbol.id, newSymbol);
            return null;
        }
    }
}

module.exports = DecParam;