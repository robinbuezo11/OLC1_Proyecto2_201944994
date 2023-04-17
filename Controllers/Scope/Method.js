class Method{
    constructor(_id, _params, _instructions, _line, _column){
        this.id = _id;
        this.params = _params;
        this.instructions = _instructions;
        this.line = _line;
        this.column = _column;
    }
}

module.exports = Method;