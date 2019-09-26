//contenido capturado desde html con el cual se interactua
//se inician los arreglos que contendran los caracteres aceptados

var abecedario = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
var numero = "0,1,2,3,4,5,6,7,8,9";
var simbolo ="<,>,+,-,*,@,/,{,},[,],(,)";

//separa la cadena de texto y los guarda en arreglos
var tipoIdentificador = separador(abecedario);
var tipoNumero = separador(numero);
var tipoSimbolo = separador(simbolo);
//variable la cual se utilizara para los errores
var error = "Error: ";
//funcion que separa en arreglo cada uno de los caracteres aceptados
function separador(tipo){
    var simbolos = tipo.split(",");
    return simbolos;
}
/*
    Clase que ayuda a crear un objeto el cual tiene dos metodos, los cuales utiliza una
    funcion comparar la cual verifica que este en los caracteres aceptados, los cuales nos
    devolvera y dira de que tipo es y tambien devuelve un nombre.
    tipo 1 sera identificador, tipo 2 sera numero tipo 3 sera simbolo, tipo 4 sera error
 */
class rectificadorTipo{
    verificarTipo(letra){
        var retorno = 0;
        var comparar = letra.toLowerCase();  
        if (comparador(tipoIdentificador,comparar)) {
            retorno = 1;
        } else if(comparador(tipoNumero, comparar)){
            retorno = 2;
        } else if(comparador(tipoSimbolo,comparar)){
            retorno = 3;
        }else if(comparar!=0){
            retorno = 4;
        }
        this.retorno = retorno;
        return retorno;
    }
    nombreTipo(){
        var tipo = 0;
        switch (this.retorno){
            case 1:
                tipo = "Identificador: \t";
                break;
            case 2:
                tipo = "Numero: \t";
                break;
            case 3:
                tipo = "Simbolo: \t";
                break;
        }
        return tipo;
        
    }
}

/*
    Funcion que recibe como parametro la linea de texto ingresada desde el html, el cual
    recibe el texto y lo separa por espacios, agrupando en un arreglo los cuales contendran
    el texto ingresado, se toma el primer caracter de cada arreglo para saber con que tipo inicia, 
    luego se crea una variable la cual ira concatenando los caracteres para luego poder agregarlo 
    al listado de palabras reconocidas, si durante el proceso se encuentra un caracter no aceptado
    entonces se procede a capturar toda la palabra ingresada y lo tomara como un error    
*/
function analizador(texto){
    var separadorEspacio = texto.split(" ");    
    for (let i = 0; i < separadorEspacio.length; i++) {
        let verificador = new rectificadorTipo();
        var tipo = verificador.verificarTipo(separadorEspacio[i].charAt(0));//verifica a que tipo de inicio tiene
        var concatenador = "";
        var palabraActual = separadorEspacio[i];        
        var nombreIdentificador = verificador.nombreTipo();
        var errorSalida = false;
        if(tipo!=0){
            for (let j = 0; j < palabraActual.length; j++) {
            var caracterActual = palabraActual.charAt(j);
                switch(tipo){
                    case 1:{                                            
                            if (comparador(tipoIdentificador,caracterActual)) {
                                concatenador += caracterActual;
                            } else if(comparador(tipoNumero,caracterActual)){
                                concatenador += caracterActual;
                            }else{
                                concatenador = palabraActual;
                                nombreIdentificador = error;
                                errorSalida = true;
                            }                                        
                    }
                    break;
                    case 2:{                        
                            if(comparador(tipoNumero,caracterActual)){
                                concatenador += caracterActual;
                            }else{
                                concatenador = palabraActual;
                                nombreIdentificador = error;
                                errorSalida = true;
                            }                                                   
                    }
                    break;
                    case 3:{
                            if (comparador(tipoSimbolo,caracterActual)) {
                                concatenador += caracterActual;
                            }else{
                                concatenador = palabraActual;
                                nombreIdentificador = error;
                                errorSalida = true;
                            }                                                                  
                    }         
                    break;
                    case 4:{
                        concatenador = palabraActual;
                        nombreIdentificador = error;
                        errorSalida = true;
                    }     
                    break;  
                }
                if (errorSalida) break;                    
            }
            agregar(concatenador,nombreIdentificador);
            this.concatenador = "";
            this.tipo = 0;
        }
    }
}
/*
    Agrega codigo al html en forma de listado, agrega que tipo es lo ingresado
    y luego la cadena de caracteres o caracter ingresado, si es un error entonces
    lo inserta color rojo
*/
function agregar(concatenador,tipo){    
    if(tipo!=error){
        historial.innerHTML = historial.innerHTML+ "<li>" + tipo +" "+ concatenador + "</li>";
    }else{
        historial.innerHTML = historial.innerHTML+ "<li style=\"color: brown\">" + tipo +" "+ concatenador + "</li>";
    }
}
/*
    Recibe el caracter a comparar con los arreglos que se crearon al inicio 
    para saber si este es aceptado, retornando un boleano
*/
function comparador(tipo,variable){
    var retorno = false;
    variable = variable.toLowerCase();
    for (let i = 0; i < tipo.length; i++) {
        if(variable==tipo[i]){
            retorno = true;
            break;
        }
    }
    return retorno;
}
/*
    Manda a llmar a la funcion analizador la cual inicial el reconociminento
    el cual manda un parametro, el cual es el texto ingresado desde el html
*/
function funcion (){    
    analizador(entrada.value);
}
//Borra lo contenido en la lista
function borrarLista(){
    historial.innerHTML =" ";
}
//borra lo que este en campo de texto
function borrarTexto(){
    entrada.value = "";
}
