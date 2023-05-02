class Scope{
    constructor(_previous, _actual){
        this.previous = _previous;
        this.name = _actual;
        this.symbolsTable = new Map();
        this.methodsTable = new Map();
        this.functionsTable = new Map();
        this.childs = [];
    }

    addChildren(_child){
        this.childs.push(_child);
    }

    addSymbol(_id, _symbol){
        this.symbolsTable.set(_id.toLowerCase(), _symbol);
    }

    getSymbol(_id){
        for(let scope = this; scope != null; scope = scope.previous){
            let symbol = scope.symbolsTable.get(_id.toLowerCase());
            if(symbol){
                return symbol;
            }
        }
        return null;
    }

    existsSymbol(_id){
        for(let scope = this; scope != null; scope = scope.previous){
            let symbol = scope.symbolsTable.get(_id.toLowerCase());
            if(symbol){
                return true;
            }
        }
        return false;
    }

    existsSymbolInActualScope(_id){
        let symbol = this.symbolsTable.get(_id.toLowerCase());
        if(symbol){
            return true;
        }
        return false;
    }

    setSymbol(_id, _symbol){
        for(let scope = this; scope != null; scope = scope.previous){
            let symbol = scope.symbolsTable.get(_id.toLowerCase());
            if(symbol){
                scope.symbolsTable.set(_id.toLowerCase(), _symbol);
                return true;
            }
        }
        return false;
    }

    addMethod(_id, _method){
        this.methodsTable.set(_id.toLowerCase(), _method);
    }

    getMethod(_id){
        for(let scope = this; scope != null; scope = scope.previous){
            let method = scope.methodsTable.get(_id.toLowerCase());
            if(method){
                return method;
            }
        }
        return null;
    }

    existsMethod(_id){
        for(let scope = this; scope != null; scope = scope.previous){
            let method = scope.methodsTable.get(_id.toLowerCase());
            if(method){
                return true;
            }
        }
        return false;
    }

    addFunction(_id, _function){
        this.functionsTable.set(_id.toLowerCase(), _function);
    }

    getFunction(_id){
        for(let scope = this; scope != null; scope = scope.previous){
            let function_ = scope.functionsTable.get(_id.toLowerCase());
            if(function_){
                return function_;
            }
        }
        return null;
    }

    existsFunction(_id){
        for(let scope = this; scope != null; scope = scope.previous){
            let function_ = scope.functionsTable.get(_id.toLowerCase());
            if(function_){
                return true;
            }
        }
        return false;
    }

    getSymbolsHtml(){
        let id = 1;
        let text = `<!DOCTYPE html><html><head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Símbolos</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
                    </head><body><div style="text-align:center"><h1>Tabla de Simbolos</h1>
                    <table class="table">
                    <thead><tr><th scope="col">No.</th><th scope="col">Identificador</th><th scope="col">Tipo Símbolo</th><th scope="col">Tipo Valor</th><th scope="col">Valor</th><th scope="col">Entorno</th><th scope="col">Línea</th><th scope="col">Columna</th></tr></thead><tbody>`;
        text = this.generateSymbols(this, text, id).text;
        text += `</tbody></table></div></body></html>`;
        return text;
    }

    generateSymbols(_scope, _text, _id){
        let text = _text;
        let id = _id;
        _scope.childs.forEach(scope => {
            scope.symbolsTable.forEach(symbol => {
                if(Array.isArray(symbol.value)){
                    text += `<tr><td>${id}</td><td>${symbol.id}</td><td>Estructura</td><td>${symbol.type}</td><td>${JSON.stringify(symbol.value)}</td><td>${scope.name}</td><td>${symbol.line}</td><td>${symbol.column}</td></tr>`;
                }else{
                    text += `<tr><td>${id}</td><td>${symbol.id}</td><td>Variable</td><td>${symbol.type}</td><td>${symbol.value}</td><td>${scope.name}</td><td>${symbol.line}</td><td>${symbol.column}</td></tr>`;
                id++;
                }
            });

            scope.methodsTable.forEach(method => {
                text += `<tr><td>${id}</td><td>${method.id}</td><td>Método</td><td>Void</td><td>-</td><td>${scope.name}</td><td>${method.line}</td><td>${method.column}</td></tr>`;
                id++;
            });

            scope.functionsTable.forEach(func => {
                text += `<tr><td>${id}</td><td>${func.id}</td><td>Función</td><td>${func.type}</td><td>-</td><td>${scope.name}</td><td>${func.line}</td><td>${func.column}</td></tr>`;
                id++;
            });

            let res = this.generateSymbols(scope, text, id);
            text = res.text;
            id = res.id;
        });

        return {
            text: text,
            id: id
        };
    }    
}

module.exports = Scope;