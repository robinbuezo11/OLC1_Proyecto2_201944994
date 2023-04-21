const INSTRUCTION_TYPE = require("../Enums/InstructionType");
const OPERATION_TYPE = require("../Enums/OperationType");
const VALUE_TYPE = require("../Enums/ValueType");

class Grapher{
    constructor(_root){
        this.graph = "";
        this.root = _root;
        this.id = 0;
    }

    getGraph(){
        this.graph += "digraph G {\n";
        this.graph += "node [shape=box];\n";
        this.graph += "Node0[label=\"RAIZ\"];\n";
        this.id = 1;
        this.traverseAST("Node0", this.root);
        this.graph += "}";
        return this.graph;
    }

    traverseAST(_parent,_child){
        _child.forEach(instruction => {
            if(instruction.type === INSTRUCTION_TYPE.DECLARATION){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"DECLARACION\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphDeclaration(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.MAIN){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"MAIN\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphMain(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.ASSIGNMENT){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"ASIGNACION\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphAssignment(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.DEC_METHOD){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"DECLARACION METODO\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphMethod(instruction, childName);
            } /* 
                vectores
                listas
                funciones
            */
        });
    }

    traverseInstructions(_parent,_child){
        _child.forEach(instruction => {
            if(instruction.type === INSTRUCTION_TYPE.DECLARATION){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"DECLARACION\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphDeclaration(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.ASSIGNMENT){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"ASIGNACION\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphAssignment(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.PRINT){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"PRINT\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphOperation(instruction.expression, childName);
            } /*
                bloques
            */
        });
    }

    graphDeclaration(_instruction, _parent){
        let varType = `Node${this.id}`;
        this.id++;
        this.graph += varType + `[label=\"TIPO\n${_instruction.data_type}\"];\n`;
        this.graph += _parent + "->" + varType + ";\n";
        let varName = `Node${this.id}`;
        this.id++;
        this.graph += varName + `[label=\"ID\n${_instruction.id}\"];\n`;
        this.graph += _parent + "->" + varName + ";\n";
        if(_instruction.value != null){
            this.graphOperation(_instruction.value, _parent);
        }
    }
    graphOperation(_expression, _parent){
        if(
               _expression.type === VALUE_TYPE.DOUBLE || _expression.type === VALUE_TYPE.INT || _expression.type === VALUE_TYPE.BOOL 
            || _expression.type === VALUE_TYPE.CHAR || _expression.type === VALUE_TYPE.STRING || _expression.type === VALUE_TYPE.ID
            ){
            let exp = _expression.value.toString();
            exp = exp.replace(/\"/gi, '\\\"');
            let value = `Node${this.id}`;
            this.graph += value + `[label=\" ${_expression.type}\n ${exp}\"];\n`;
            this.graph += _parent + "->" + value + ";\n";
            this.id++;
        } else if(
                       _expression.type === OPERATION_TYPE.ADD || _expression.type === OPERATION_TYPE.SUB || _expression.type === OPERATION_TYPE.MUL
                    || _expression.type === OPERATION_TYPE.DIV || _expression.type === OPERATION_TYPE.POW || _expression.type === OPERATION_TYPE.MOD
                    || _expression.type === OPERATION_TYPE.EQUALS || _expression.type === OPERATION_TYPE.DIFF || _expression.type === OPERATION_TYPE.LESS
                    || _expression.type === OPERATION_TYPE.LESSEQ || _expression.type === OPERATION_TYPE.GREATER || _expression.type === OPERATION_TYPE.GREATEREQ 
                    || _expression.type === OPERATION_TYPE.OR || _expression.type === OPERATION_TYPE.AND || _expression.type === OPERATION_TYPE.NOT
            ){
            let value = `Node${this.id}`;
            this.graph += value + `[label=\" ${_expression.type}\n ${this.getSymbol(_expression.type)}\"];\n`;
            this.graph += _parent + "->" + value + ";\n";
            this.id++;
            if(_expression.type !== OPERATION_TYPE.NOT){
                this.graphOperation(_expression.opLeft, value);
            }
            this.graphOperation(_expression.opRight, value);
        } else if(_expression.type === OPERATION_TYPE.UNARY){
            let value = `Node${this.id}`;
            this.graph += value + `[label=\" ${_expression.type}\n ${this.getSymbol(_expression.type)}\"];\n`;
            this.graph += _parent + "->" + value + ";\n";
            this.id++;
            this.graphOperation(_expression.op, value);
        }
    }
    getSymbol(_type){
        switch(_type){
            case OPERATION_TYPE.ADD:
                return "+";
            case OPERATION_TYPE.SUB:
                return "-";
            case OPERATION_TYPE.MUL:
                return "*";
            case OPERATION_TYPE.DIV:
                return "/";
            case OPERATION_TYPE.POW:
                return "^";
            case OPERATION_TYPE.MOD:
                return "%";
            case OPERATION_TYPE.UNARY:
                return "-";
            case OPERATION_TYPE.EQUALS:
                return "==";
            case OPERATION_TYPE.DIFF:
                return "!=";
            case OPERATION_TYPE.LESS:
                return "<";
            case OPERATION_TYPE.LESSEQ:
                return "<=";
            case OPERATION_TYPE.GREATER:
                return ">";
            case OPERATION_TYPE.GREATEREQ:
                return ">=";
            case OPERATION_TYPE.OR:
                return "||";
            case OPERATION_TYPE.AND:
                return "&&";
            case OPERATION_TYPE.NOT:
                return "!";
        }
    }
    graphMain(_instruction, _parent){
        let varType = `Node${this.id}`;
        this.id++;
        this.graph += varType + `[label=\"LLAMADA \n ${_instruction.name}\"];\n`;
        this.graph += _parent + "->" + varType + ";\n";
        if(_instruction.list_values != null){
            let param = `Node${this.id}`;
            this.id++;
            this.graph += param + `[label=\"PARAMETROS\"];\n`;
            this.graph += _parent + "->" + param + ";\n";
            for(let i=0;i < _instruction.list_values.length;i++){
                this.graphOperation(_instruction.list_values[i], param);
            }
        }
    }
    graphAssignment(_instruction, _parent){
        let varType = `Node${this.id}`;
        this.id++;
        this.graph += varType + `[label=\"ID \n ${_instruction.id}\"];\n`;
        this.graph += _parent + "->" + varType + ";\n";
        this.graphOperation(_instruction.expression, _parent);
    }
    graphMethod(_instruction, _parent){
        let varType = `Node${this.id}`;
        this.id++;
        this.graph += varType + `[label=\"ID \n ${_instruction.name}\"];\n`;
        this.graph += _parent + "->" + varType + ";\n";
        if(_instruction.params_list != null){
            let param = `Node${this.id}`;
            this.id++;
            this.graph += param + `[label=\"PARAMETROS\"];\n`;
            this.graph += _parent + "->" + param + ";\n";
            for(let i=0;i < _instruction.params_list.length;i++){
                this.graphDeclaration(_instruction.params_list[i], param);
            }
        }
        let instruction = `Node${this.id}`;
        this.id++;
        this.graph += instruction + `[label=\"INSTRUCCIONES\"];\n`;
        this.graph += _parent + "->" + instruction + ";\n";
        this.traverseInstructions(instruction, _instruction.instructions);
    }
}

module.exports = Grapher;