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
            } else if(instruction.type === INSTRUCTION_TYPE.DEC_FUNC){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"DECLARACION FUNCION\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphFunction(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.VECTOR_NULL || instruction.type === INSTRUCTION_TYPE.VECTOR_VALUES){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"DECLARACION VECTOR\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphVectorDeclaration(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.SET_VECTOR){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"ASIGNACION VECTOR\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphStructAssignment(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.DEC_LIST || instruction.type === INSTRUCTION_TYPE.LIST_VALUES){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"DECLARACION LISTA\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphListDeclaration(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.ADD_LIST){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"ADD LISTA\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                let id = "Node" + this.id;
                this.id++;
                this.graph += id + `[label=\"ID\n${instruction.id}\"];\n`;
                this.graph += childName + "->" + id + ";\n";
                this.graphOperation(instruction.value, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.SET_LIST){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"ASIGNACION LISTA\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphStructAssignment(instruction, childName);
            }
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
            } else if(instruction.type === INSTRUCTION_TYPE.ASSIGNMENT || instruction.type === INSTRUCTION_TYPE.INC || instruction.type === INSTRUCTION_TYPE.DEC){
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
            } else if(instruction.type === INSTRUCTION_TYPE.IF){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"IF\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphIf(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.IF_ELSE){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"IF\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphIf(instruction, childName);
                this.graphElse(instruction.elseInstructions, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.IF_ELSE_IF){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"IF\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphIf(instruction, childName);
                for(let i = 0; i < instruction.list_elseif.length; i++){
                    this.graphElseIf(instruction.list_elseif[i].instructions, childName);
                }
                if(instruction.elseInstructions){
                    this.graphElse(instruction.elseInstructions, childName);
                }
            } else if(instruction.type === INSTRUCTION_TYPE.SWITCH){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"SWITCH\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphSwitch(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.WHILE){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"WHILE\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphWhile(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.FOR){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"FOR\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphFor(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.DO_WHILE){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"DO WHILE\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphDoWhile(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.CALL){
                this.graphCall(instruction, _parent);
            } else if(instruction.type === INSTRUCTION_TYPE.BREAK){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"BREAK\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
            } else if(instruction.type === INSTRUCTION_TYPE.CONTINUE){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"CONTINUE\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
            } else if(instruction.type === INSTRUCTION_TYPE.RETURN){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"RETURN\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                if(instruction.expression != null){
                    this.graphOperation(instruction.expression, childName);
                }
            } else if(instruction.type === INSTRUCTION_TYPE.VECTOR_NULL || instruction.type === INSTRUCTION_TYPE.VECTOR_VALUES){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"DECLARACION VECTOR\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphVectorDeclaration(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.SET_VECTOR){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"ASIGNACION VECTOR\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphStructAssignment(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.DEC_LIST || instruction.type === INSTRUCTION_TYPE.LIST_VALUES){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"DECLARACION LISTA\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphListDeclaration(instruction, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.ADD_LIST){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"ADD LISTA\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                let id = "Node" + this.id;
                this.id++;
                this.graph += id + `[label=\"ID\n${instruction.id}\"];\n`;
                this.graph += childName + "->" + id + ";\n";
                this.graphOperation(instruction.value, childName);
            } else if(instruction.type === INSTRUCTION_TYPE.SET_LIST){
                let childName = "Node" + this.id;
                this.id++;
                this.graph += childName + "[label=\"ASIGNACION LISTA\"];\n";
                this.graph += _parent + "->" + childName + ";\n";
                this.graphStructAssignment(instruction, childName);
            }
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
        if(_instruction.type === INSTRUCTION_TYPE.CALL){
            this.graphCall(_instruction, _parent);
        } else if(_instruction.value != null){
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
        }else if(_expression.type === OPERATION_TYPE.TERNARY){
            let childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"?\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            this.graphTernary(_expression, childName);
        }else if(_expression.type === OPERATION_TYPE.CAST){
            let childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"CAST\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            let varType = `Node${this.id}`;
            this.id++;
            this.graph += varType + `[label=\"TIPO\n${_expression.data_type}\"];\n`;
            this.graph += childName + "->" + varType + ";\n";
            this.graphOperation(_expression.expression, childName);
        }else if(_expression.type === INSTRUCTION_TYPE.CALL){
            this.graphCall(_expression, _parent);
        }else if(_expression.type === INSTRUCTION_TYPE.VECTOR_ACCESS){
            let childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"ACCESO VECTOR\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            let varName = `Node${this.id}`;
            this.id++;
            this.graph += varName + `[label=\"ID\n${_expression.id}\"];\n`;
            this.graph += childName + "->" + varName + ";\n";
            let index = `Node${this.id}`;
            this.id++;
            this.graph += index + `[label=\"POSICION\"];\n`;
            this.graph += childName + "->" + index + ";\n";
            this.graphOperation(_expression.index, index);
        }else if(_expression.type === INSTRUCTION_TYPE.LIST_ACCESS){
            let childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"ACCESO LISTA\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            let varName = `Node${this.id}`;
            this.id++;
            this.graph += varName + `[label=\"ID\n${_expression.id}\"];\n`;
            this.graph += childName + "->" + varName + ";\n";
            let index = `Node${this.id}`;
            this.id++;
            this.graph += index + `[label=\"POSICION\"];\n`;
            this.graph += childName + "->" + index + ";\n";
            this.graphOperation(_expression.index, index);
        }else if(_expression.type === OPERATION_TYPE.TO_LOWER){
            let childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"TOLOWER\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            this.graphOperation(_expression.op, childName);
        }else if(_expression.type === OPERATION_TYPE.TO_UPPER){
            let childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"TOUPPER\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            this.graphOperation(_expression.op, childName);
        }else if(_expression.type === OPERATION_TYPE.LENGTH){
            let childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"LENGTH\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            this.graphOperation(_expression.op, childName);
        }else if(_expression.type === OPERATION_TYPE.TRUNCATE){
            let childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"TRUNCATE\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            this.graphOperation(_expression.op, childName);
        }else if(_expression.type === OPERATION_TYPE.ROUND){
            let childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"ROUND\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            this.graphOperation(_expression.op, childName);
        }else if(_expression.type === OPERATION_TYPE.TYPEOF){
            let childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"TYPEOF\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            this.graphOperation(_expression.op, childName);
        }else if(_expression.type === OPERATION_TYPE.TO_STRING){
            let childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"TOSTRING\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            this.graphOperation(_expression.op, childName);
        }else if(_expression.type === OPERATION_TYPE.TO_CHAR_ARRAY){
            let childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"TOCHARARRAY\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            this.graphOperation(_expression.op, childName);
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
            this.graph += varType + "->" + param + ";\n";
            for(let i=0;i < _instruction.list_values.length;i++){
                this.graphOperation(_instruction.list_values[i], param);
            }
        }
    }

    graphCall(_instruction, _parent){
        let varType = `Node${this.id}`;
        this.id++;
        this.graph += varType + `[label=\"LLAMADA \n ${_instruction.name}\"];\n`;
        this.graph += _parent + "->" + varType + ";\n";
        if(_instruction.list_values != null){
            let param = `Node${this.id}`;
            this.id++;
            this.graph += param + `[label=\"PARAMETROS\"];\n`;
            this.graph += varType + "->" + param + ";\n";
            for(let i=0;i < _instruction.list_values.length;i++){
                this.graphOperation(_instruction.list_values[i], param);
            }
        }
    }

    graphAssignment(_instruction, _parent){
        let varType = `Node${this.id}`;
        this.id++;
        this.graph += varType + `[label=\"ID \n ${_instruction.id.value}\"];\n`;
        this.graph += _parent + "->" + varType + ";\n";
        if(_instruction.type === INSTRUCTION_TYPE.CALL){
            this.graphCall(_instruction, _parent);
        }else if(_instruction.expression != null){
            this.graphOperation(_instruction.expression, _parent);
        }else{
            let value = `Node${this.id}`;
            this.graph += value + `[label=\" ${_instruction.type}\n ${_instruction.type === INSTRUCTION_TYPE.INC?"++":"--"}\"];\n`;
            this.graph += _parent + "->" + value + ";\n";
            this.id++;
        }
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

    graphFunction(_instruction, _parent){
        let type = `Node${this.id}`;
        this.id++;
        this.graph += type + `[label=\"TIPO \n ${_instruction.data_type}\"];\n`;
        this.graph += _parent + "->" + type + ";\n";
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

    graphVectorDeclaration(_instruction, _parent){
        let varType = `Node${this.id}`;
        this.id++;
        this.graph += varType + `[label=\"TIPO \n ${_instruction.data_type}\"];\n`;
        this.graph += _parent + "->" + varType + ";\n";
        let id = `Node${this.id}`;
        this.id++;
        this.graph += id + `[label=\"ID \n ${_instruction.id}\"];\n`;
        this.graph += _parent + "->" + id + ";\n";
        if(_instruction.type === INSTRUCTION_TYPE.VECTOR_NULL){
            let size = `Node${this.id}`;
            this.id++;
            this.graph += size + `[label=\"TAMAÑO\"];\n`;
            this.graph += _parent + "->" + size + ";\n";
            this.graphOperation(_instruction.size, size);
        }else if(_instruction.type === INSTRUCTION_TYPE.VECTOR_VALUES){
            let value = `Node${this.id}`;
                this.id++;
                this.graph += value + `[label=\"VALORES\"];\n`;
                this.graph += _parent + "->" + value + ";\n";
            for(let i=0;i < _instruction.list_values.length;i++){
                this.graphOperation(_instruction.list_values[i], value);
            }
        }
    }

    graphStructAssignment(_instruction, _parent){
        let id = `Node${this.id}`;
        this.id++;
        this.graph += id + `[label=\"ID \n ${_instruction.id}\"];\n`;
        this.graph += _parent + "->" + id + ";\n";
        let index = `Node${this.id}`;
        this.id++;
        this.graph += index + `[label=\"POSICION\"];\n`;
        this.graph += _parent + "->" + index + ";\n";
        this.graphOperation(_instruction.index, index);
        if(_instruction.value){
            let value = `Node${this.id}`;
            this.id++;
            this.graph += value + `[label=\"VALOR\"];\n`;
            this.graph += _parent + "->" + value + ";\n";
            this.graphOperation(_instruction.value, value);
        }
    }

    graphListDeclaration(_instruction, _parent){
        let varType = `Node${this.id}`;
        this.id++;
        this.graph += varType + `[label=\"TIPO \n ${_instruction.data_type}\"];\n`;
        this.graph += _parent + "->" + varType + ";\n";
        let id = `Node${this.id}`;
        this.id++;
        this.graph += id + `[label=\"ID \n ${_instruction.id}\"];\n`;
        this.graph += _parent + "->" + id + ";\n";
        if(_instruction.type === INSTRUCTION_TYPE.LIST_VALUES){
            let value = `Node${this.id}`;
            this.id++;
            this.graph += value + `[label=\"VALORES\"];\n`;
            this.graph += _parent + "->" + value + ";\n";
            this.graphOperation(_instruction.list_values, value);
        }
    }

    graphTernary(_instruction, _parent){
        let childName = `Node${this.id}`;
        this.id++;
        this.graph += childName + `[label=\"CONDICION\"];\n`;
        this.graph += _parent + "->" + childName + ";\n";
        this.graphOperation(_instruction.expression, childName);
        childName = `Node${this.id}`;
        this.id++;
        this.graph += childName + `[label=\"TRUE\"];\n`;
        this.graph += _parent + "->" + childName + ";\n";
        this.graphOperation(_instruction.opTrue, childName);
        childName = `Node${this.id}`;
        this.id++;
        this.graph += childName + `[label=\"FALSE\"];\n`;
        this.graph += _parent + "->" + childName + ";\n";
        this.graphOperation(_instruction.opFalse, childName);
    }

    graphIf(_instruction, _parent){
        let childName = "Node" + this.id;
        this.id++;
        this.graph += childName + "[label=\"CONDICION\"];\n";
        this.graph += _parent + "->" + childName + ";\n";
        this.graphOperation(_instruction.expression, childName);
        childName = "Node" + this.id;
        this.id++;
        this.graph += childName + "[label=\"INSTRUCCIONES\"];\n";
        this.graph += _parent + "->" + childName + ";\n";
        this.traverseInstructions(childName, _instruction.instructions);
    }

    graphElse(_instruction, _parent){
        let childName = "Node" + this.id;
        this.id++;
        this.graph += childName + "[label=\"ELSE\"];\n";
        this.graph += _parent + "->" + childName + ";\n";
        this.traverseInstructions(childName, _instruction);
    }

    graphElseIf(_instruction, _parent){
        let childName = "Node" + this.id;
        this.id++;
        this.graph += childName + "[label=\"ELSE IF\"];\n";
        this.graph += _parent + "->" + childName + ";\n";
        this.traverseInstructions(childName, _instruction);
    }

    graphSwitch(_instruction, _parent){
        let childName = "Node" + this.id;
        this.id++;
        this.graph += childName + "[label=\"CONDICION\"];\n";
        this.graph += _parent + "->" + childName + ";\n";
        this.graphOperation(_instruction.expression, childName);
        
        for(let i=0;i < _instruction.cases.length;i++){
            childName = "Node" + this.id;
            this.id++;
            this.graph += childName + `[label=\"CASE\"];\n`;
            this.graph += _parent + "->" + childName + ";\n";
            this.graphOperation(_instruction.cases[i].expression, childName);
            let inst = "Node" + this.id;
            this.id++;
            this.graph += inst + "[label=\"INSTRUCCIONES\"];\n";
            this.graph += childName + "->" + inst + ";\n";
            this.traverseInstructions(inst, _instruction.cases[i].instructions);
        }

        if(_instruction.default){
            childName = "Node" + this.id;
            this.id++;
            this.graph += childName + "[label=\"DEFAULT\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            this.traverseInstructions(childName, _instruction.default.instructions);
        }
    }

    graphWhile(_instruction, _parent){
        let childName = "Node" + this.id;
        this.id++;
        this.graph += childName + "[label=\"CONDICION\"];\n";
        this.graph += _parent + "->" + childName + ";\n";
        this.graphOperation(_instruction.expression, childName);
        childName = "Node" + this.id;
        this.id++;
        this.graph += childName + "[label=\"INSTRUCCIONES\"];\n";
        this.graph += _parent + "->" + childName + ";\n";
        this.traverseInstructions(childName, _instruction.instructions);
    }

    graphFor(_instruction, _parent){
        let childName = "Node" + this.id;
        this.id++;
        if(_instruction.declaration.type == INSTRUCTION_TYPE.ASSIGNMENT){
            this.graph += childName + "[label=\"ASIGNACION\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            this.graphAssignment(_instruction.declaration, childName);
        }else if(_instruction.declaration.type == INSTRUCTION_TYPE.DECLARATION){
            this.graph += childName + "[label=\"DECLARACION\"];\n";
            this.graph += _parent + "->" + childName + ";\n";
            this.graphDeclaration(_instruction.declaration, childName);
        }
        childName = "Node" + this.id;
        this.id++;
        this.graph += childName + "[label=\"CONDICION\"];\n";
        this.graph += _parent + "->" + childName + ";\n";
        this.graphOperation(_instruction.expression, childName);
        childName = "Node" + this.id;
        this.id++;
        this.graph += childName + "[label=\"INCREMENTO\"];\n";
        this.graph += _parent + "->" + childName + ";\n";
        this.graphAssignment(_instruction.assignment, childName);
        childName = "Node" + this.id;
        this.id++;
        this.graph += childName + "[label=\"INSTRUCCIONES\"];\n";
        this.graph += _parent + "->" + childName + ";\n";
        this.traverseInstructions(childName, _instruction.instructions);
    }

    graphDoWhile(_instruction, _parent){
        let childName = "Node" + this.id;
        this.id++;
        this.graph += childName + "[label=\"INSTRUCCIONES\"];\n";
        this.graph += _parent + "->" + childName + ";\n";
        this.traverseInstructions(childName, _instruction.instructions);
        childName = "Node" + this.id;
        this.id++;
        this.graph += childName + "[label=\"CONDICION\"];\n";
        this.graph += _parent + "->" + childName + ";\n";
        this.graphOperation(_instruction.expression, childName);
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
}

module.exports = Grapher;