const OpString = require("../Operations/OpString");

function Print(_instruction, _scope) {
    const string = OpString(_instruction.expression, _scope).value;
    return string;
}

module.exports = Print;