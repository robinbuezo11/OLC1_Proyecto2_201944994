

%lex

"imprimir"          return 'RIMPRIMIR';
"numero"            return 'RNUMERO';
"string"            return 'RSTRING';

":"                 return 'DOSPTS';
";"                 return 'PTCOMA';
"{"                 return 'LLAVEIZQ';
"}"                 return 'LLAVEDER';
"("                 return 'PARIZQ';
")"                 return 'PARDER';

"&&"                return 'AND';
"||"                return 'OR';

"+"					return 'MAS';
"-"					return 'MENOS';
"*"					return 'POR';
"/"					return 'DIVIDIDO';
"&"					return 'CONCAT';

"<="				return 'MENIGQUE';
">="				return 'MAYIGQUE';
"=="				return 'DOBLEIG';
"!="				return 'NOIG';

"<"					return 'MENQUE';
">"					return 'MAYQUE';
"="					return 'IGUAL';

"!"					return 'NOT';

\"[^\"]*\"              { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+("."[0-9]+)?\b    return 'DECIMAL';
[0-9]+\b                return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]* return 'IDENTIFICADOR';

<<EOF>>                 return 'EOF';
.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line +', en la columna: ' + yylloc.first_column); }