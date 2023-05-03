const Scope = require("../Controllers/Scope/Scope");
const Global = require("../Controllers/Instruction/Global");
const Grapher = require("../Controllers/Scope/Grapher");
let fs = require('fs');

module.exports=(parser, app)=>{

    let test;
    let ast;
    let graphic;
    let GlobalScope;
    let errors = [];
    app.post('/analyzer',(req,res)=>{
        test = req.body.input;
        let parse = parser.parse(test);
        ast = parse.ast;
        errors = parse.errors;
        graphic = new Grapher(ast);
        //console.log(ast)
        GlobalScope= new Scope(null,"Global")
        let string =Global(ast, GlobalScope)

        let result= {
            tree: ast,
            result:string,
            errors:errors
        }
           
        res.send(result);
    });

    app.get('/graphAST',(req,res)=>{

        dot=graphic.getGraph();
        fs.writeFile('./Controllers/Reportes/AST.dot', dot, function (err) {
            if (err){
                console.log(err);
            }
        });
        const {exec} = require('child_process');
        exec('dot -Tpng ./Controllers/Reportes/AST.dot -o ./Controllers/Reportes/AST.png', (err, stdout, stderr) => {
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

    app.get('/generateSymbols',(req,res)=>{
        let symbols = GlobalScope.getSymbolsHtml();
        fs.writeFile('./Controllers/Reportes/Symbols.html', symbols, function (err) {
            if (err){
                console.log(err);
                res.send(false);
            }else{
                res.send(true);
            }
        });
    });

    app.get('/generateErrors',(req,res)=>{
        
        let id = 1;
        let text = `<!DOCTYPE html><html><head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Errores</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
                    </head><body><div style="text-align:center"><h1>Tabla de Errores</h1>
                    <table class="table">
                    <thead><tr><th scope="col">No.</th><th scope="col">Tipo</th><th scope="col">Descripción</th><th scope="col">Línea</th><th scope="col">Columna</th></tr></thead><tbody>`;
        for(let i = 0; i < errors.length; i++){
            let error = errors[i];
            text += `<tr><td>${id}</td><td>${error.type}</td><td>${error.value}</td><td>${error.line}</td><td>${error.column}</td></tr>`;
            id++;
        }
        text += `</tbody></table></div></body></html>`;
        
        fs.writeFile('./Controllers/Reportes/Errors.html', text, function (err) {
            if (err){
                console.log(err);
                res.send(false);
            }else{
                res.send(true);
            }
        });
    });
}