class Symbol{
    constructor(_id, _value, _type, _line, _column){
        this.id = _id;
        this.value = _value;
        this.type = _type;
        this.line = _line;
        this.column = _column;
    }
}

module.exports = Symbol;