//posibles lenguajes: es_ES o fr_FR
var FRLOCALE = {
  "Hello": "bonjure ",
  "My name is %s": "mo nome oc ",
  "what": "?",
  "introduce la busqueda" : "traduccion"
};

var ESLOCALE = {
  "Hello": "Hola",
  "My name is %s": "Mi nombres es %s",
  "what": "que"
};

function translated(language, string){
    if (language.indexOf("fr") > -1) {
        return FRLOCALE[string] ? FRLOCALE[string] : string;
    } 

    if (language.indexOf("es") > -1) {
      return SPLOCALE[string] ? SPLOCALE[string] : string;
    }

    return string; 
}

//translated("fr","Hello") --> bonjure
