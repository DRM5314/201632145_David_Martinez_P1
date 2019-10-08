
var fase1 = "s,h,f,r,e,d,m,v,b,c";
var fase2 = "i,a,n,e,o";// si
var fase3 = "n,c,d,l,t,c,e,r,o";
var fase4 = "o,e,s,i,n,l,d";// sino
var fase5 = "r,o,n,m,t,a,e";// hacer, falso
var fase6 = "a,o,r,b,d";// cadena, entero
var fase7 = "l,a,n,e";// decimal
var fase8 = "s,e,o,r";// mientras, variable, booleano
var fase9 = "o";// verdadero
var fase10 = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
var fase11 = "0,1,2,3,4,5,6,7,8,9";
var fase12 = "(,),{,},[,]";
var fase13 = "=";
var fase14 = "=,>,<";
var fase15 = "+,-,/,%,*,>,<";
var fase16 = "\",;";

var aceptaciones = "si,sino,hacer,falso,cadena,entero,decimal,mientras,variable,booleano,verdadero";
function verificadorCaracter(arreglo, caracter) {
    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] == caracter) {
            return true;
        };
    }
}
function verificadorReservada(texto, a) {
    let separador = ((fase) => { return fase.split(',') });
    let aceptado = ((cadena, caracter) => { for (let c = 0; c < cadena.length; c++) { if (cadena[c] == caracter) return cadena[c]; } });
    var reservadas = separador(aceptaciones);
    var flotante = "", entrada = a;
    let i = a;
    let fases = [fase1, fase2, fase3, fase4, fase5, fase6, fase7, fase8, fase9];
    for (i; i < texto.length; i++) {
        if (verificadorCaracter(fases[i - entrada], texto[i])) {
            flotante += aceptado(fases[i - entrada], texto[i]);
        } else { break; }
    }
    for (let j = 0; j < reservadas.length; j++) {
        if (!verificadorCaracter(fase11.split(','), texto[i]) && flotante == reservadas[j] && !verificadorCaracter(fase10.split(','), texto[i])) return flotante + ',' + (i - 1);
    } return false;
}
function analizadorIdentificador(texto, a) {
    let flotante = "", i;
    if (texto != "" && texto != null) {
        let fase101 = fase10.split(",");
        if (verificadorCaracter(fase101, texto[a])) {
            for (i = a; i < texto.length; i++) {
                if (verificadorCaracter(fase101, texto[i])) flotante += texto[i]; else {
                    let fase11s = fase11.split(",");
                    if (verificadorCaracter(fase11s, texto[i])) flotante += texto[i]; else return flotante + ',' + (i - 1);
                }
            }
        } else return false;
    } return flotante + ',' + (i - 1);
}
function analizadorfase11(texto, a) {
    let fase11s = fase11.split(",");
    let flotante = "", i = a;
    for (i; i < texto.length; i++) {
        if (verificadorCaracter(fase11s, texto[i])) flotante += texto[i]; else { if (flotante.length > 0 && texto[i] != '.') return flotante + ',' + (i - 1); else return false; }
    } if (a == flotante.length) return false;
    return flotante + ',' + (i - 1);
}
function analizadorFlotante(texto, a) {
    let i, flotante = "", salida, j;
    for (i = a; i < texto.length; i++) {
        if (verificadorCaracter(fase11.split(','), texto[i])) flotante += texto[i]; else {
            if (texto[i] == '.') break; else return false;
        }
    }
    if ((i + 1) != texto.length) i++;
    if (verificadorCaracter(fase11.split(','), texto[i]) && verificadorCaracter(fase11.split(','), texto[i - 2])) {
        flotante += texto[i - 1], flotante += texto[i];
        for (j = (i + 1); j < texto.length; j++) {
            if (verificadorCaracter(fase11.split(','), texto[j])) flotante += texto[i]; else {
                if (verificadorCaracter(fase10.split(','), texto[j]) || texto[j] == '.') return false; else return flotante + ',' + (j - 1);
            }
        }
        return flotante + ',' + (j - 1);
    } else return false;
}
function analizadorOperador(texto, a) {
    var a, flotante = "";
    var verificador = (() => { if (a <= texto.length) a++; return true; });
    if (texto[a] == fase13) {
        flotante += texto[a];
        if (verificador() && verificadorCaracter(fase14, texto[a])) {
            flotante += texto[a] + ',' + a;
            return flotante;
        } else return flotante + ',' + (a - 1);//se resta 1 ya que operador() suma uno y sino entra entonces debe restarle
    } else if (verificadorCaracter(fase15, texto[a])) return texto[a] + ',' + a; else return false;
}
function analizadorAgrupacion(texto, a) {
    if (verificadorCaracter(fase12.split(','), texto[a])) return texto[a] + ',' + (a); else return false;
}
function analizadorSigno(texto, a) {
    if (verificadorCaracter(fase16.split(','), texto[a])) return texto[a] + ',' + (a); else return false;
}
function salidaPosicion(texto) {
    let retorno = texto;
    let salida = retorno.substring(retorno.indexOf(',') + 1, retorno.length);
    return salida;
}
function tokenSalida(texto) {
    let salida = texto.substring(0, (texto.indexOf(',')));
    return salida;
}
function salidaFinal(tipo, token, posicion,j) {
    let retorno = [tipo, token, j, posicion];
    return retorno;
}

module.exports = function analizador(entrada, a,j) {
    var preservada, pidentificador, pentero, pflotante, poperador, pagrupacion, psigno;
    var reservadaa;
    var salida;
    let i = a;
    if (entrada.length > 0) {
            reservadaa = false;
            preservada = verificadorReservada(entrada, i);
            if (preservada != false) {
                salida = salidaFinal('reservada', tokenSalida(preservada), salidaPosicion(preservada),j);
                i = salidaPosicion(preservada);
                reservadaa = true;
            } else {
                pidentificador = analizadorIdentificador(entrada, i);
                if (pidentificador != false && !reservadaa) { salida = salidaFinal('identificador', tokenSalida(pidentificador), salidaPosicion(pidentificador),j); i = salidaPosicion(pidentificador); } else {
                    pentero = analizadorfase11(entrada, i);
                    if (pentero != false) { salida = salidaFinal('entero', tokenSalida(pentero), salidaPosicion(pentero),j); i = salidaPosicion(pentero); } else {
                        pflotante = analizadorFlotante(entrada, i);
                        if (pflotante != false) { salida = salidaFinal('flotante', tokenSalida(pflotante), salidaPosicion(pflotante),j); i = salidaPosicion(pflotante); } else {
                            poperador = analizadorOperador(entrada, i);
                            if (poperador != false) { salida = salidaFinal('operador', tokenSalida(poperador), salidaPosicion(poperador),j); i = salidaPosicion(poperador) } else {
                                pagrupacion = analizadorAgrupacion(entrada, i);
                                if (pagrupacion != false) { salida = salidaFinal('agrupacion', tokenSalida(pagrupacion), salidaPosicion(pagrupacion),j); i = salidaPosicion(pagrupacion); } else {
                                    psigno = analizadorSigno(entrada, i);
                                    if (psigno != false) { salida = salidaFinal('signo', tokenSalida(psigno), salidaPosicion(psigno),j); i = salidaPosicion(psigno); } else {
                                        salida = ['error',entrada[i],j,i];
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
