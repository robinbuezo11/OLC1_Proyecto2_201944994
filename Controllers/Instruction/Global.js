const INSTRUCTION_TYPE = require("../Enums/InstructionType");
const Assignment = require("./Assignment");
const Declaration = require("./Declaration");
const DecMethod = require("./DecMethod");
const DecFunction = require("./DecFunction");
const Vector = require("./Vector");
const List = require("./List");
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
            if(message && message != ""){
               string+= message;
            }
        }else if(_instructions[i].type===INSTRUCTION_TYPE.ASSIGNMENT){
            let message = Assignment(_instructions[i],_scope);
            if(message && message != ""){
                string+= message;
             }
        }else if (_instructions[i].type === INSTRUCTION_TYPE.DEC_METHOD) {
            let message = DecMethod(_instructions[i], _scope);
            if(message && message != ""){
                string+= message;
             }
        }else if (_instructions[i].type === INSTRUCTION_TYPE.DEC_FUNC) {
            let message = DecFunction(_instructions[i], _scope);
            if(message && message != ""){
                string+= message;
             }
        }else if (
                       _instructions[i].type === INSTRUCTION_TYPE.VECTOR_NULL || _instructions[i].type === INSTRUCTION_TYPE.VECTOR_VALUES
                    || _instructions[i].type === INSTRUCTION_TYPE.SET_VECTOR
            ){
            let message = Vector(_instructions[i], _scope);
            if(message && message != ""){
                string+= message;
             }
        }else if (
                       _instructions[i].type === INSTRUCTION_TYPE.DEC_LIST || _instructions[i].type === INSTRUCTION_TYPE.LIST_VALUES
                    || _instructions[i].type === INSTRUCTION_TYPE.ADD_LIST || _instructions[i].type === INSTRUCTION_TYPE.SET_LIST
            ){
            let message = List(_instructions[i], _scope);
            if(message && message != ""){
                string+= message;
             }
        }

    }
    // In this third pass we are going to execute the main
    for (let i = 0; i < _instructions.length; i++) {
        
        if(_instructions[i].type===INSTRUCTION_TYPE.MAIN){
            let message = Main(_instructions[i],_scope);
            //console.log(message)
            if(message && message != ""){
                string+= message;
             }
            break;
        }

    }
    
    return string;
}

module.exports=Global