let matrizEstados = [
    [1, 2, "", 4, 5, "", 7, 8],//estado 0
    [1, 1, "", 4, 5, 6, 7, 8],//estado 1
    ["", 2, 3, 4, 5, 6, 7, 8],//estado 2
    ["", 2, "", 4, "", "", "", 8],//estado 3
    [1, 2, "", 4, 5, 6, 7, 8],//estado 4
    [1, 2, "", 4, "", 6, "", 8],//estado 5
    [1, 2, "", 4, "", "", "", 8],//estado 6
    [1, 2, "", 4, "", "", "", 8],//estado 7
    [1, 2, "", 4, 5, 6, 7, 8],//estado 8
];
let matrizAceptaciones = [
    [true, true, false, true, false, false, true, true],//estado 0
    [true, true, false, true, false, true, true, true],//estado 1
    [false, true, false, true, false, true, true, true],//estado 2
    [false, true, false, false, false, false, false, true],//estado 3
    [true, true, false, true, false, true, true, true],//estado 4
    [true, true, false, true, false, true, false, true],//estado 5
    [true, true, false, true, false, false, false, true],//estado 6
    [true, true, false, true, false, false, false, true],//estado 7
    [true, true, false, true, false, true, true, true],//estado 8
];
let letra = "abcdefghijklmnopqrstuvwxyz";
let numero = "0123456789";
let punto = "."
let agrupacion = "()[]{}"
let operador1 = "=";
let operador2 = "<>=";
let operadores = "<>=+-*/%"
let transiciones = [letra, numero, punto, agrupacion, operador1, operador2, operadores];
let entrada = document.getElementById('textoEtrada');
function isReserveda(concatenacion){
    let reservadas = ["si","sino","hacer","falso","cadena","entero","decimal","mientras","variable","booleano","verdadero"];
    for (let i = 0; i < reservadas.length; i++) {
        if(concatenacion==reservadas[i])return true;        
    }
    return false;
}
function aceptado(matriz, caracter) {
    for (let i = 0; i < matriz.length; i++) {
        if (matriz[i] == caracter) return true;
    } return false;
}
function posTransicion(caracter) {
    if (aceptado(transiciones[0], caracter)) return 0; else
        if (aceptado(transiciones[1], caracter)) return 1; else
            if (aceptado(transiciones[2], caracter)) return 2; else
                if (aceptado(transiciones[3], caracter)) return 3; else
                    if (aceptado(transiciones[4], caracter)) return 4; else
                        if (aceptado(transiciones[5], caracter)) return 5; else
                            if (aceptado(transiciones[6], caracter)) return 6; else return 7;
}
function tipoToken(transicion) {
    switch (transicion) {
        case 0:
            return 'identificador';
        case 1:
            return 'numero';
        case 2:
            return 'flotnate';
        case 3:
            return 'agrupacion';
        case 4:
            return 'operador';
        case 5:
            return 'operador';
        case 6:
            return 'operador';
        case 4:
            return 'error';

    }
}
function analizar() {
    let posicionEstado = 0, validar, transicion, concatenacion = "", acptadas = "",tipore;
    for (let i = 0; i < entrada.value.length; i++) {
        if (entrada.value[i] == " " && concatenacion.length > 0) { if(isReserveda(concatenacion))tipore='reservada';else tipore=tipoToken(transicion);posicionEstado = 0; i++; acptadas += tipore + validar + " " + concatenacion + '\n'; concatenacion = ""; }
        if (i == entrada.value.length) break;
        transicion = posTransicion(entrada.value[i]);
        //console.log('en estado' + posicionEstado);        
        switch (posicionEstado) {
            case 0:
                posicionEstado = matrizEstados[0][transicion];
                validar = matrizAceptaciones[0][transicion];
                break;
            case 1:
                posicionEstado = matrizEstados[1][transicion];
                validar = matrizAceptaciones[1][transicion];            
                break;
            case 2:
                posicionEstado = matrizEstados[2][transicion];
                validar = matrizAceptaciones[2][transicion];
                break;
            case 3:
                posicionEstado = matrizEstados[3][transicion];
                validar = matrizAceptaciones[3][transicion];
                break;
            case 4:
                posicionEstado = matrizEstados[4][transicion];
                validar = matrizAceptaciones[4][transicion];
                break;
            case 5:
                posicionEstado = matrizEstados[5][transicion];
                validar = matrizAceptaciones[5][transicion];
                break;
            case 6:
                posicionEstado = matrizEstados[6][transicion];
                validar = matrizAceptaciones[6][transicion];
                break;
            case 7:
                posicionEstado = matrizEstados[7][transicion];
                validar = matrizAceptaciones[7][transicion];
                break;
            case 8:
                posicionEstado = matrizEstados[8][transicion];
                validar = matrizAceptaciones[8][transicion];
                break;
        }
        concatenacion += entrada.value[i];        
    }
    if (concatenacion.length > 0) { if(isReserveda(concatenacion))tipore='reservada';acptadas += tipore + validar + " " + concatenacion + '\n'; }
    var terminada = acptadas.split('/n');
    for (let j = 0; j < terminada.length; j++) {
        console.log(terminada[j]);

    }

}