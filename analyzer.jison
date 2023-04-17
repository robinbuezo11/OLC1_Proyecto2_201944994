/* Definición Léxica */
%lex

%options case-insensitive

%%

\s+											// skip whitespaces
"//".*										// simple line commentary
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// multi line commentary

"int"				return 'Rint';
"double"			return 'Rdouble';
"boolean"			return 'Rboolean';
"char"				return 'Rchar';
"string"			return 'Rstring';


"+"					return 'sum';
"-"					return 'sub';
"*"					return 'mul';
"/"					return 'div';
"^"					return 'pow';
"%"					return 'mod';

"=="				return 'equals';
"!="				return 'diff';
"<"					return 'less';
"<="				return 'lessEq';
">"					return 'greater';
">="				return 'greaterEq';

":"					return 'colon';

"&&"				return 'and'
"||"				return 'or';
"!"					return 'not';

"("					return 'parLeft';
")"					return 'parRight';

";"					return 'semiColon';
"{"					return 'oBracke';
"}"					return 'cBracke';

"="					return 'same';

"++"				return 'doubleSum';
"--"				return 'doubleSub'

","					return 'comma';

"[" 				return 'oSquare';
"]"					return 'cSquare';
"[[" 				return 'oDouSquare';
"]]"				return 'cDouSquare';

"if"				return 'Rif';
"else"				return 'Relse';
"switch"			return 'Rswitch';
"case"				return 'Rcase';
"default"			return 'Rdefault';

"while"				return 'Rwhile';
"for"				return 'Rfor';
"do"				return 'Rdo';

"break"				return 'Rbreak';
"continue"			return 'Rcontinue';
"return"			return 'Rreturn';

"void"				return 'Rvoid';
"print"				return 'Rprint';
"true"				return 'Rtrue';
"false"				return 'Rfalse';
"main"				return 'Rmain';
"new"				return 'Rnew';
"add"				return 'Radd';
"toLower"			return 'RtoLower';
"toUpper"			return 'RtoUpper';
"length"			return 'Rlength';
"truncate"			return 'Rtruncate';
"round"				return 'Rround';
"typeof"			return 'Rtypeof';
"toString"			return 'RtoString';
"toCharArray"		return 'RtoCharArray';


([a-zA-Z])[a-zA-Z0-9_]*	return 'id';
["\""][^\"]*["\""]		{ /* yytext = yytext.substr(1,yyleng-2); */ return 'string'; }
["\'"][^\']*["\'"]		{ /* yytext = yytext.substr(1,yyleng-2); */ return 'char'; }
[0-9]+("."[0-9]+){1}\b  return 'double';
[0-9]+\b				return 'int';


<<EOF>>				return 'EOF';
.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex


%{
	const OPERATION_TYPE	= require('./Controllers/Enums/OperationType');
	const VALUE_TYPE 		= require('./Controllers/Enums/ValueType');
	const DATA_TYPE			= require('./Controllers/Enums/DataType');
	const INSTRUCTION		= require('./Controllers/Instruction/Instruction');
%}


/* Operator associations and precedences */
%left 'or'
%left 'and'
%right 'not'
%left 'equals' 'diff' 'less' 'lessEq' 'greater' 'greaterEq'
%left 'sum' 'sub'
%left 'mul' 'div'
%nonassoc 'pow'
%left usub

%start INI

%% /* Grammar definition */

INI
	: INSTRUCTIONSBODY EOF {
		// When input is recognized we return the AST
		return $1;
	}
;

INSTRUCTIONSBODY
	: INSTRUCTIONSBODY BODY { $1.push($2); $$ = $1; }
	| BODY					{ $$ = [$1]; }
;

BODY
	: DEC_VAR semiColon {$$=$1;}                                           //RECURSIVE DECLARATION OF EACH COMPONENT
    |ASIG_VAR semiColon {$$=$1;}
    |METHODS {$$=$1;}
    |MAIN {$$=$1;} 

        
;
METHODS: Rvoid id parLeft parRight oBracke INSTRUCTIONS cBracke {$$ = INSTRUCTION.newMethod($2, null, $6, this._$.first_line,this._$.first_column+1)}
        
;

MAIN: Rmain id parLeft parRight semiColon {$$ = INSTRUCTION.newMain($2, null, this._$.first_line,this._$.first_column+1)}
      
       
;
DEC_VAR: TYPE id  {$$= INSTRUCTION.newDeclaration($2,null, $1,this._$.first_line, this._$.first_column+1)}
        |TYPE id same EXPRESSION  {$$= INSTRUCTION.newDeclaration($2, $4, $1,this._$.first_line, this._$.first_column+1);
        }

;
ASIG_VAR: id same EXPRESSION {$$ = INSTRUCTION.newAssignment($1, $3,this._$.first_line, this._$.first_column+1)}
        
;
TYPE: Rint{$$= DATA_TYPE.INT}
    |Rdouble{$$= DATA_TYPE.DOUBLE}
    |Rchar {$$= DATA_TYPE.CHAR}
    |Rboolean{$$= DATA_TYPE.BOOL}
    |Rstring {$$= DATA_TYPE.STRING}
;
INSTRUCTIONS: INSTRUCTIONS INSTRUCTION {$$ = $1; $1.push($2);}
            |INSTRUCTION {$$ = [$1];}

;
INSTRUCTION: DEC_VAR semiColon {$$=$1;}                                           //RECURSIVE DECLARATION OF EACH COMPONENT OF THE BODY
        |ASIG_VAR semiColon {$$=$1;}
        |PRINT {$$=$1;}

;
PRINT: Rprint parLeft EXPRESSION parRight semiColon {$$ = INSTRUCTION.newPrint($3, this._$.first_line,this._$.first_column+1)}
;
EXPRESSION: EXPRESSION sum EXPRESSION{$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.ADD,this._$.first_line, this._$.first_column+1);}
         | EXPRESSION sub EXPRESSION {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.SUB,this._$.first_line, this._$.first_column+1);}
         | EXPRESSION mul EXPRESSION {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.MUL,this._$.first_line, this._$.first_column+1);}
         | EXPRESSION div EXPRESSION   {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.DIV,this._$.first_line, this._$.first_column+1);}
         | EXPRESSION pow EXPRESSION {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.POW,this._$.first_line, this._$.first_column+1);}
         | EXPRESSION mod EXPRESSION {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.MOD,this._$.first_line, this._$.first_column+1);}
         | EXPRESSION less EXPRESSION    {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.LESS,this._$.first_line, this._$.first_column+1);}
         | EXPRESSION greater EXPRESSION    {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.GREATER,this._$.first_line, this._$.first_column+1);}
         | EXPRESSION lessEq EXPRESSION {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.LESSEQ,this._$.first_line, this._$.first_column+1);}
         | EXPRESSION greaterEq EXPRESSION {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.GREATEREQ,this._$.first_line, this._$.first_column+1);}
         | EXPRESSION diff EXPRESSION  {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.DIFF,this._$.first_line, this._$.first_column+1);}
         | EXPRESSION and EXPRESSION {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.AND,this._$.first_line, this._$.first_column+1);}
         | EXPRESSION or EXPRESSION {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.OR,this._$.first_line, this._$.first_column+1);}
         | not EXPRESSION {$$= INSTRUCTION.newBinaryOperation(null,$2, OPERATION_TYPE.NOT,this._$.first_line, this._$.first_column+1);}
		 | sub EXPRESSION %prec usub {$$= INSTRUCTION.newUnaryOperation($2, OPERATION_TYPE.UNARY,this._$.first_line, this._$.first_column+1);}
         | parLeft EXPRESSION parRight {$$=$2}
         | EXPRESSION equals EXPRESSION {$$= INSTRUCTION.newBinaryOperation($1,$3, OPERATION_TYPE.EQUALS,this._$.first_line, this._$.first_column+1);}
         | double {$$= INSTRUCTION.newValue(Number($1),VALUE_TYPE.DOUBLE,this._$.first_line, this._$.first_column+1);}
         | int {$$= INSTRUCTION.newValue(Number($1),VALUE_TYPE.INT,this._$.first_line, this._$.first_column+1);}
         | Rtrue {$$= INSTRUCTION.newValue($1,VALUE_TYPE.BOOL,this._$.first_line, this._$.first_column+1);}
         | Rfalse {$$= INSTRUCTION.newValue($1,VALUE_TYPE.BOOL,this._$.first_line, this._$.first_column+1);}
         | string {$$= INSTRUCTION.newValue($1,VALUE_TYPE.STRING,this._$.first_line, this._$.first_column+1);}
         | id{$$= INSTRUCTION.newValue($1,VALUE_TYPE.ID,this._$.first_line, this._$.first_column+1);}
         | char {$$= INSTRUCTION.newValue($1,VALUE_TYPE.CHAR,this._$.first_line, this._$.first_column+1);}
;