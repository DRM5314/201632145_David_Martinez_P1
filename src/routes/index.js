const path = require('path');
//funcion que analiza el texto 
const analizar = require(path.join(__dirname,'../public/jsAnalizador.js'));

const { Router } = require('express');
const expres = require('express');
const router = Router();
//se utiliza para enviar un objeto al servidor
router.use(expres.json());
//renderiza al inicio que esta en entrada y se podra navegar por medio de el nav de boostrap
router.get('/', (req, res) => {
    res.render('entrada');
});
//renderizara a la tabla, donde podra solicitar los datos
router.get('/tabla', (req, res) => {
    res.render('tabla');
});
//renderiza a los datos del estudiante
router.get('/estudiante', (req, res) => {
    res.render('estudiante');
});
//variables que capturan los datos enviados por el cliente
var textoEntrada, salida = "", convertido;
//funcion que separa el texto de los espacios
function convertidor(entrada) {
    let retorno = ""; retorno += entrada;
    return retorno.split('\n');
}
//recibe desde el cliente los datos enviados por medio de axios
router.post('/post', (req, res) => {
    console.log('Recibo con exito');
    textoEntrada = req.body.salida;
    console.log(textoEntrada);
    //verifica que lo que se ingreso no sea nulo o vacio
    if (textoEntrada != "" && textoEntrada != null) {
        let saltos = textoEntrada.split('\n');
        //for que recorre cada linea
        for (let j = 0; j < saltos.length; j++) {
            //for que recorre cada caracter de linea
            for (let i = 0; i < saltos[j].length; i++) {
                //si no contiene espacio o vacio mandara al analizador
                if (saltos[j][i] != ' ' && saltos[j][i] != '') {
                    //se junta cada analisis en salida seprados por una coma
                    //la funcion analizar recibe la linea y posicion del caracter de la linea y posicion actual de la linea
                    salida += '\n' + analizar(saltos[j], i, j);
                    i = analizar(saltos[j], i, j)[3];
                }
            }
        }
        //muestra el analisis que se realizo
        console.log(salida);
        //recupera lo analizado y convierte en arreglo
        convertido = convertidor(salida);
    } else { console.log('Sin datos en area de texto'); }
    res.status(200);
});
let contador = 1;//variable que lleva el conteo de los datos analizados que seran enviados uno a uno
//verifica que no se halla terminado los datos analizados que solicita el cliente
function verificador() {
    if (contador == convertido.length) return false; else return true;
}
let tiempoEspera = 200;//variable donde se establece el tiempo de espera para mandar cada dato
//manda los datos al cliente, todo el texto sera enviado por medio de un json
router.get('/get', (req, response) => {
    if (convertidor.length > 0 && salida != "") {
        //especifica el tipo de salida se que tendra
        response.contentType('application/json');
        var enviar;///variable que contendra lo analizado
        //si aun hay mas de mandar manda, sino es porque ya se termino lo analizado
        if (verificador()) { enviar = { name: convertido[contador] }; contador++; } else enviar = { name: 'vacio' };
        var eviarJSON = JSON.stringify(enviar);
        //promesa que mantendra el retardo requerido
        let promesa = new Promise((resolve) => {
            setTimeout(() => {
                response.send(eviarJSON).status(200);
            }, tiempoEspera);
        }).then((value) => {
            console.log('se envio con exito ' + value);
        }).catch((error) => {
            console.log('ocurrio un error');
        });
    } else { console.log('sin datos que enviar'); }
});
//manda todo lo analizado a axios que lo convierte y postea en la tabla
router.get('/getTable', (req, response) => {
    if (salida != "" && salida != null) {
        response.contentType('application/json');
        let retorno = { name: salida };
        let retornoJasn = JSON.stringify(retorno);
        response.send(retornoJasn).status(200);
        console.log('Enviado a tabla');
    } else console.log('sin datos que enviar a tabla');
});
//cuando el usuario quiera hacer una limpieza de los datos en memoria del servidor sera llamada y borrar lo que necesite
router.post('/borrar', (req, res) => {
    salida = "";
    convertido.length = 0;
    textoEntrada = "";
    contador = 1;
    res.status(200);
})
module.exports = router;
