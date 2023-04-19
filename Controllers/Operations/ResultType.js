const DATA_TYPE = require('../Enums/DataType');

function resultType(_type1, _type2){
    if(
              (_type1 === DATA_TYPE.DOUBLE && _type2=== DATA_TYPE.DOUBLE)
            ||(_type1 === DATA_TYPE.INT && _type2=== DATA_TYPE.DOUBLE)
            ||(_type1 === DATA_TYPE.BOOL && _type2=== DATA_TYPE.DOUBLE)
            ||(_type1 === DATA_TYPE.CHAR && _type2=== DATA_TYPE.DOUBLE)
            ||(_type1 === DATA_TYPE.DOUBLE && _type2=== DATA_TYPE.INT)
            ||(_type1 === DATA_TYPE.DOUBLE && _type2=== DATA_TYPE.BOOL)
            ||(_type1 === DATA_TYPE.DOUBLE && _type2=== DATA_TYPE.CHAR)
        ){  
        return DATA_TYPE.DOUBLE;
    }
    else if(
              (_type1 === DATA_TYPE.INT && _type2=== DATA_TYPE.INT)
            ||(_type1 === DATA_TYPE.INT && _type2=== DATA_TYPE.BOOL)
            ||(_type1 === DATA_TYPE.INT && _type2=== DATA_TYPE.CHAR)
            ||(_type1 === DATA_TYPE.BOOL && _type2=== DATA_TYPE.INT)
            ||(_type1 === DATA_TYPE.CHAR && _type2=== DATA_TYPE.INT)
        ){
        return DATA_TYPE.INT;
    }
    else if((_type1 === DATA_TYPE.STRING || _type2=== DATA_TYPE.STRING)&&(_type1!=null && _type2!=null)){
        return DATA_TYPE.STRING;
    }else if(_type1===null){ 
        if(_type2===DATA_TYPE.DOUBLE){
            return DATA_TYPE.DOUBLE;
        }else if(_type2===DATA_TYPE.INT){
            return DATA_TYPE.INT;
        }
    }
    return null;
}

module.exports = resultType;