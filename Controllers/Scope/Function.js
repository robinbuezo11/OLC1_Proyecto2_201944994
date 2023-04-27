class Function{
    constructor(_type, _id, _params, _instructions, _line, _column){
        this.type = _type;
        this.id = _id;
        this.params = _params;
        this.instructions = _instructions;
        this.line = _line;
        this.column = _column;
    }
}

module.exports = Function;