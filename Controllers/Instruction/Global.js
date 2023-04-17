const INSTRUCTION_TYPE = require("../Enums/InstructionType");
const Assignment = require("./Assignment");
const Declaration = require("./Declaration");
const DecMethod = require("./DecMethod");
const Main = require("./Main");


function Global(_instructions, _scope){
    let string = "";
    //In this first pass we are going to check if this have a only one main
    let countMain = 0;
    for (let i = 0; i < _instructions.length; i++) {
        
       if(_instructions[i].type == INSTRUCTION_TYPE.MAIN){
          countMain++;
       }
       
    }
    if(countMain>1){
        return "Solo puede haber 1 main";
    }else if(countMain==0){
        return "No hay main";
    }
    // In this second pass we are going to declare all the variables and methods
    for (let i = 0; i < _instructions.length; i++) {
        
        if(_instructions[i].type===INSTRUCTION_TYPE.DECLARATION){
            let message = Declaration(_instructions[i],_scope);
            if(message!=null){
               string+= message+ "\n";
            }
        }else if(_instructions[i].type===INSTRUCTION_TYPE.ASSIGNMENT){
            let message = Assignment(_instructions[i],_scope);
            if(message!=null){
               string+= message+ "\n";
            }
        }else if (_instructions[i].type === INSTRUCTION_TYPE.DEC_METHOD) {
            let message = DecMethod(_instructions[i], _scope);
            if (message != null) {
                string += message + "\n";
            }
        }

    }
    // In this third pass we are going to execute the main
    for (let i = 0; i < _instructions.length; i++) {
        
        if(_instructions[i].type===INSTRUCTION_TYPE.MAIN){
            let message = Main(_instructions[i],_scope);
            //console.log(message)
            if(message!=null){
                string+= message+ "\n";
            }
            break;
        }

    }
    
    return string;
}

module.exports=Global