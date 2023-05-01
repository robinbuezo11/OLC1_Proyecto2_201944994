const INSTRUCTION_TYPE = require("../Enums/InstructionType");
const OPERATION_TYPE = require("../Enums/OperationType");
const VALUE_TYPE = require("../Enums/ValueType");

class SymbolsHtml{
    constructor(_root){
        this.text = "";
        this.root = _root;
        this.id = 0;
    }

    getHtml(){
        this.text = `<!DOCTYPE html><html><body><div style="text-align:center"><h1>Tabla de Simbolos</h1>`;
        this.text += `<table border=1 style="margin: 0 auto;" class="default">`;
        this.text += `<tr><th>No.</th><th>Identificador</th><th>Tipo Símbolo</th><th>Tipo Valor</th><th>Valor</th><th>Entorno</th><th>Posicion</th></tr>`;
        this.generateSymbols(this.root);
        this.text += `</table></div></body></html>`;
        return this.text;
    }

    generateSymbols(_node){
        
    }
}

/*
        def generateErrors(self):
        text='<!DOCTYPE html><html><body><div style="text-align:center"><h1>Tabla de Errores</h1>'
        text+='<table border=1 style="margin: 0 auto;" class="default">'
        text+='<tr><th>No.</th><th>Lexema</th><th>Tipo</th><th>Columna</th><th>Fila</th></tr>'
        iterator=0
        for error in self.__errors:
            text+=f'<tr><td>{iterator}</td><td>{error[0]}</td><td>Error</td><td>{error[2]}</td><td>{error[1]}</td></tr>'
            iterator+=1
        text+='</table></div></body></html>'

        file=open('./ERRORES_201944994.html','w',encoding='utf-8')
        file.write(text)
        file.close()
*/