class analizador {
    fase1 = "s,h,f,r,e,d,m,v,b,c";
    fase2 = "i,a,n,e,o";// si
    fase3 = "n,c,d,l,t,c,e,r,o";
    fase4 = "o,e,s,i,n,l,d";// sino
    fase5 = "r,o,n,m,t,a,e";// hacer, falso
    fase6 = "a,o,r,b,d";// cadena, entero
    fase7 = "l,a,n,e";// decimal
    fase8 = "s,e,o,r";// mientras, variable, booleano
    fase9 = "o";// verdadero
    fase10 = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
    fase11 = "0,1,2,3,4,5,6,7,8,9";
    fase12 = "(,),{,},[,]";
    fase13 = "=";
    fase14 = "=,>,<";
    fase15 = "+,-,/,%,*,>,<";
    fase16 = "\",;";

    aceptaciones = "si,sino,hacer,falso,cadena,entero,decimal,mientras,variable,booleano,verdadero";
    verificadorCaracter(arreglo, caracter) {
        for (let i = 0; i < arreglo.length; i++) {
            if (arreglo[i] == caracter) {
                return true;
            };
        }
    }
    verificadorReservada(texto, a) {
        let separador = ((fase) => { return fase.split(',') });
        let aceptado = ((cadena, caracter) => { for (let c = 0; c < cadena.length; c++) { if (cadena[c] == caracter) return cadena[c]; } });
        reservadas = separador(aceptaciones);
        flotante = "", entrada = a;
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
    analizadorIdentificador(texto, a) {
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
    analizadorfase11(texto, a) {
        let fase11s = fase11.split(",");
        let flotante = "", i = a;
        for (i; i < texto.length; i++) {
            if (verificadorCaracter(fase11s, texto[i])) flotante += texto[i]; else { if (flotante.length > 0 && texto[i] != '.') return flotante + ',' + (i - 1); else return false; }
        } if (a == flotante.length) return false;
        return flotante + ',' + (i - 1);
    }
    analizadorFlotante(texto, a) {
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
    analizadorOperador(texto, a) {
        a, flotante = "";
        verificador = (() => { if (a <= texto.length) a++; return true; });
        if (texto[a] == fase13) {
            flotante += texto[a];
            if (verificador() && verificadorCaracter(fase14, texto[a])) {
                flotante += texto[a] + ',' + a;
                return flotante;
            } else return flotante + ',' + (a - 1);//se resta 1 ya que operador() suma uno y sino entra entonces debe restarle
        } else if (verificadorCaracter(fase15, texto[a])) return texto[a] + ',' + a; else return false;
    }
    analizadorAgrupacion(texto, a) {
        if (verificadorCaracter(fase12.split(','), texto[a])) return texto[a] + ',' + (a); else return false;
    }
    analizadorSigno(texto, a) {
        if (verificadorCaracter(fase16.split(','), texto[a])) return texto[a] + ',' + (a); else return false;
    }
    salida(texto) {
        let retorno = texto;
        let salida = retorno.substring(retorno.indexOf(',') + 1, retorno.length);
        return salida;
    }
    static analizar(entrada) {
        preservada, pidentificador, pentero, pflotante, poperador, pagrupacion, psigno, error;
        reservadaa;
        if (entrada.length > 0) {
            for (let i = 0; i < entrada.length; i++) {
                if (entrada[i] != ' ') {
                    reservadaa = false;
                    preservada = verificadorReservada(entrada, i);
                    if (preservada != false) {
                        alert('reservada ' + preservada);
                        i = salida(preservada);
                        reservadaa = true;
                    } else {
                        pidentificador = analizadorIdentificador(entrada, i);
                        if (pidentificador != false && !reservadaa) { alert('identificador ' + pidentificador); i = salida(pidentificador); } else {
                            pentero = analizadorfase11(entrada, i);
                            if (pentero != false) { alert('entero: ' + pentero); i = salida(pentero); } else {
                                pflotante = analizadorFlotante(entrada, i);
                                if (pflotante != false) { alert('flotante' + pflotante); i = salida(pflotante); } else {
                                    poperador = analizadorOperador(entrada, i);
                                    if (poperador != false) { alert("operador: " + poperador); i = salida(poperador) } else {
                                        pagrupacion = analizadorAgrupacion(entrada, i);
                                        if (pagrupacion != false) { alert("agrupacion: " + pagrupacion); i = salida(pagrupacion); } else {
                                            psigno = analizadorSigno(entrada, i);
                                            if (psigno != false) { alert("Signo: " + psigno); i = salida(psigno); } else {
                                                alert('error: ' + entrada[i]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}