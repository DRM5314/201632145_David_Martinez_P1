/* cada fase se representa como caminos de un estado distinto de la fase 1 a la 9 servida para reconocer
las caracteres de palabras reservadas, cada fase mencionada contiene un caracter de alguna palabra 
reservada al final de cada arreglo se mostrara la cadena completa que mostrara una aceptacio como 
palabra reservada*/
var fase1 = "s,h,f,r,e,d,m,v,b,c";
var fase2 = "i,a,n,e,o";// si
var fase3 = "n,c,d,l,t,c,e,r,o";
var fase4 = "o,e,s,i,n,l,d";// sino
var fase5 = "r,o,n,m,t,a,e";// hacer, falso
var fase6 = "a,o,r,b,d";// cadena, entero
var fase7 = "l,a,n,e";// decimal
var fase8 = "s,e,o,r";// mientras, variable, booleano
var fase9 = "o";// verdadero
//camino de estados para abecedario SOLO ACEPTARA MINUSCULAS, las cuales serviran para identificador
var fase10 = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
//camino de estados que servira para reconocer los numeros, utilizado para identificador (seguido de letra), entero y flotanta(numeros seguido de punto y numeros)
var fase11 = "0,1,2,3,4,5,6,7,8,9";
//camino de estados que contiene los simbolos de agrupacion
var fase12 = "(,),{,},[,]";
//camino de estados para aceptar lo que es operadores, estados de fase 13 al 15
var fase13 = "=";
var fase14 = "=,>,<";
var fase15 = "+,-,/,%,*,>,<";
//camino de estados para aceptar signos
var fase16 = "“,”,;";
//camino de concatenacion de las cadenas para las palabras reservadas
var aceptaciones = "si,sino,hacer,falso,cadena,entero,decimal,mientras,variable,booleano,verdadero";
/*funcion que recibe un arreglo y un caracter, el arreglo son los estados y el caracter es lo que se 
esta buscando, si pertece a un estado retorna verdadero y rompera el ciclo, sino retornara falso*/
function verificadorCaracter(arreglo, caracter) {
    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] == caracter) {
            return true;
        };
    }
}
//funcion que representa las transiciones de una palabra recervada, recibinedo el texto completo y posicion ultima analizada
function verificadorReservada(texto, a) {
    //variable que retorna el arreglo solicitado quitando las comas
    let separador = ((fase) => { return fase.split(',') });
    /*variable que retorna el caracter especifico que fue aceptado en dicho estado ya que cada estado
    de una reservada contiene distintos movimentos en caracteres */
    let aceptado = ((cadena, caracter) => { for (let c = 0; c < cadena.length; c++) { if (cadena[c] == caracter) return cadena[c]; } });
    //variable que contiene un arreglo de concatenacion de caracteres para saber las palabras reservadas
    var reservadas = separador(aceptaciones);
    //variable que servira para retorno de concatenacion de caracteres analizados
    var flotante = "", entrada = a;
    //variable la cual comenzara en la posicion que entre el texto 
    let i = a;
    //arreglo de las fases totales para palabras reservadas
    let fases = [fase1, fase2, fase3, fase4, fase5, fase6, fase7, fase8, fase9];
    for (i; i < texto.length; i++) {
        if (verificadorCaracter(fases[i - entrada], texto[i])) {
            flotante += aceptado(fases[i - entrada], texto[i]);
        } else { break; }
    }
    //se compara cadena con cadena, la cadena de reservadas, y cadena analizada por las transiciones cumpiendo cada movimiento en los estados
    for (let j = 0; j < reservadas.length; j++) {
        //si lo siguiente es distinto de numero y igual a una cadena de reservadas y distinto de letras entonces es aceptado como reservada y reotorna lo concatenado
        if (!verificadorCaracter(fase11.split(','), texto[i]) && flotante == reservadas[j] && !verificadorCaracter(fase10.split(','), texto[i])) return flotante + ',' + (i - 1);
    } return false;
}
//funcion que analiza si se obtiene un identificador, recibiendo el texto completo y la posicion ultina que se analizo
function analizadorIdentificador(texto, a) {
    //variable para concatenar y posicionar la entrada
    let flotante = "", i;
    //verifica que no sea vacio o nulo
    if (texto != "" && texto != null) {
        //separa el abecedario de las comas
        let fase101 = fase10.split(",");
        //verifica si el inicio pertenece al abecedario
        if (verificadorCaracter(fase101, texto[a])) {
            //si pertenece verifica luego si lo siguiente es letras o numeros y concatena
            for (i = a; i < texto.length; i++) {
                if (verificadorCaracter(fase101, texto[i])) flotante += texto[i]; else {
                    let fase11s = fase11.split(",");
                    if (verificadorCaracter(fase11s, texto[i])) flotante += texto[i]; else return flotante + ',' + (i - 1);
                }
            }
        } else return false;
    } return flotante + ',' + (i - 1);
}
//funcion que analiza a los numeros funcionando de manera igual a las anteriores
function analizadorfase11(texto, a) {
    let fase11s = fase11.split(",");
    let flotante = "", i = a;
    for (i; i < texto.length; i++) {
        //si pertenece a los numeros concatena sino y lo siguite es distinto de punto o letras sera tomado como error hasta lo siguiente
        if (verificadorCaracter(fase11s, texto[i])) flotante += texto[i]; else { if (flotante.length > 0 && texto[i] != '.' && !verificadorCaracter(fase10, texto[i])) return flotante + ',' + (i - 1); else return false; }
    } if (a == flotante.length) return false;//si lo concatenado es igual a la posicion de entrada entonces no analizo ningun numero y sale retornando falso
    //retornara ya que si existese un error entonces antes hace retornar falso y rompe el ciclo
    return flotante + ',' + (i - 1);
}
//analiza todo el texto hasta que ya no acepte alguno de los caracteres
function analizadorFlotante(texto, a) {
    let i, flotante = "", j;
    for (i = a; i < texto.length; i++) {
        //verifica que lo inicial sea un numero o mas de lo contrario verifica si existe un punto y rompe sino reorna falso
        if (verificadorCaracter(fase11.split(','), texto[i])) flotante += texto[i]; else {
            //al no detectar un numero entonces mira si es un punto y rompe para seguir analizando lo siguiente si no es ni numero ni punto entonces retorna falso
            if (texto[i] == '.') break; else return false;
        }
    }
    //verifica si aun hay mas caracteres
    if ((i + 1) != texto.length) i++;
    //verifica que lo que sigue sean numeros, la posicion [i-2] es para verificar que antes del punto sea digito
    if (verificadorCaracter(fase11.split(','), texto[i]) && verificadorCaracter(fase11.split(','), texto[i - 2])) {
        //concatena el punto y el numero siguiente
        flotante += texto[i - 1], flotante += texto[i];
        for (j = (i + 1); j < texto.length; j++) {
            if (verificadorCaracter(fase11.split(','), texto[j])) flotante += texto[i]; else {
                //verifica que no venga ninguna letra o punto demas
                if (verificadorCaracter(fase10.split(','), texto[j]) || texto[j] == '.') return false; else return flotante + ',' + (j - 1);
            }
        }
        return flotante + ',' + (j - 1);
    } else return false;
}
//analiza los estados de operdor recibinedo el texto completo y la posicion ultima analizada
function analizadorOperador(texto, o) {
    let a = o, flotante = "";
    let verificador = (() => { if (a <= texto.length) a++; return true; });
    if (texto[a] == fase13) {
        flotante += texto[a];
        //verifica que hayan mas caracteres y que pueda moverse al siguiente estado
        if (verificador() && verificadorCaracter(fase14, texto[a])) {
            flotante += texto[a] + ',' + a;
            return flotante;
        } else return flotante + ',' + (a - 1);//se resta 1 ya que operador() suma uno y sino entra entonces debe restarle
    } else if (verificadorCaracter(fase15, texto[a])) return texto[a] + ',' + a; else return false;
}
//recibe el texto y posicion ultima analiza, funcion que verifica los signos de agrupacion
function analizadorAgrupacion(texto, a) {
    if (verificadorCaracter(fase12.split(','), texto[a])) return texto[a] + ',' + (a); else return false;
}
//funcion que analiza los signos que son " y ,
function analizadorSigno(texto, a) {
    if (verificadorCaracter(fase16.split(','), texto[a])) return texto[a] + ',' + (a); else return false;
}
//recibe como parametro la entrada de lo que se concateno mas una coma y la posicion en que se encuentra actualmente
function salidaPosicion(texto) {
    let retorno = texto;
    //separa el texto de la coma y solo retorna la posicion que se recibio en el texto
    let salida = retorno.substring(retorno.indexOf(',') + 1, retorno.length);
    return salida;
}
//recibe como parametro un texto que viene con lo concatenado, una coma y la posicion en que se encuntra
function tokenSalida(texto) {
    //desde la posicion inicial osea 0 hasta la primer coma se encuentra el lexema o token
    let salida = texto.substring(0, (texto.indexOf(',')));
    return salida;
}
//recibe el texto, la posicion acual, el tipo y el numero de fila que ecuentra para retornalo como un arreglo
function salidaFinal(tipo, token, posicion, j) {
    let retorno = [tipo, token, j, posicion];
    return retorno;
}
//funcion que se exportara para ser usada en donde se necesite, como parametros el texto a analizar, la posicion de lo ultimo analizado y la posicion de la fila
module.exports = function analizador(entrada, a, j) {
    //variables que almacenaran lo que retorne cada funcion segun se opere
    var preservada, pidentificador, pentero, pflotante, poperador, pagrupacion, psigno;
    //booleano que avisa a identificador que ya se tomo la cadena como reservada
    var reservadaa;
    //variable que retorna lo analizado
    var salida;
    let i = a;
    if (entrada.length > 0) {
        //cada entrada pondra falso antes de analizarce
        reservadaa = false;
        //alamcena ya sea la cadena que reconocio o falso
        preservada = verificadorReservada(entrada, i);
        if (preservada != false) {
            //salidaFinal servira para devolver un arreglo del tipo, lo analizado, posicion en fila y columna
            salida = salidaFinal('reservada', tokenSalida(preservada), salidaPosicion(preservada), j);
            i = salidaPosicion(preservada);
            reservadaa = true;
        } else {
            pidentificador = analizadorIdentificador(entrada, i);
            if (pidentificador != false && !reservadaa) { salida = salidaFinal('identificador', tokenSalida(pidentificador), salidaPosicion(pidentificador), j); i = salidaPosicion(pidentificador); } else {
                pentero = analizadorfase11(entrada, i);
                if (pentero != false) { salida = salidaFinal('entero', tokenSalida(pentero), salidaPosicion(pentero), j); i = salidaPosicion(pentero); } else {
                    pflotante = analizadorFlotante(entrada, i);
                    if (pflotante != false) { salida = salidaFinal('flotante', tokenSalida(pflotante), salidaPosicion(pflotante), j); i = salidaPosicion(pflotante); } else {
                        poperador = analizadorOperador(entrada, i);
                        if (poperador != false) { salida = salidaFinal('operador', tokenSalida(poperador), salidaPosicion(poperador), j); i = salidaPosicion(poperador) } else {
                            pagrupacion = analizadorAgrupacion(entrada, i);
                            if (pagrupacion != false) { salida = salidaFinal('agrupacion', tokenSalida(pagrupacion), salidaPosicion(pagrupacion), j); i = salidaPosicion(pagrupacion); } else {
                                psigno = analizadorSigno(entrada, i);
                                if (psigno != false) { salida = salidaFinal('signo', tokenSalida(psigno), salidaPosicion(psigno), j); i = salidaPosicion(psigno); } else {
                                    //si llego hasta aca es porque no es aceptado por ninguno de los anteriores estados y es reconocio como error
                                    salida = ['error', entrada[i], j, i];
                                }
                            }
                        }
                    }
                }
            }
        }
        return salida;
    }
}
