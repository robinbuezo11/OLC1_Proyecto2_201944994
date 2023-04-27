class Scope{
    constructor(_previous, _actual){
        this.previous = _previous;
        this.name = _actual;
        this.symbolsTable = new Map();
        this.methodsTable = new Map();
        this.functionsTable = new Map();
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
}

module.exports = Scope;