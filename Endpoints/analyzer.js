const Scope = require("../Controllers/Scope/Scope");
const Global = require("../Controllers/Instruction/Global");
const Grapher = require("../Controllers/Scope/Grapher");
let fs = require('fs');

module.exports=(parser, app)=>{

    let test;
    let ast;
    let graphic;
    app.post('/analyzer',(req,res)=>{
        test = req.body.input;
        ast = parser.parse(test);
        graphic = new Grapher(ast);
        //console.log(ast)
        const GlobalScope= new Scope(null,"Global")
        let string =Global(ast, GlobalScope)

        let result= {
            tree: ast,
            result:string
        }
           
        res.send(result)
    });

    app.get('/graphAST',(req,res)=>{

        dot=graphic.getGraph();
        fs.writeFile('./Controllers/AST/AST.dot', dot, function (err) {
            if (err){
                console.log(err);
            }
        });
        const {exec} = require('child_process');
        exec('dot -Tpng ./Controllers/AST/AST.dot -o ./Controllers/AST/AST.png', (err, stdout, stderr) => {
            if (err) {
                console.log(err.message);
                res.send(err.message);
                return;
            }
            if (stderr) {
                console.log(stderr);
            }
        });
    });    
}