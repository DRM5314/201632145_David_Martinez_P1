const path = require('path');

let saludar = require('/media/david/01B9B45E763867BC/Git lenguajes (Proyectos)/proyecto1/src/public/jsAnalizador');

const { Router } = require('express');
const expres = require('express');
const router = Router();

router.use(expres.json());

router.get('/', (req, res) => {
    res.render('entrada');
});

router.get('/tabla', (req, res) => {
    res.render('tabla');
});

router.get('/estudiante', (req, res) => {
    res.render('estudiante');
});

var textoEntrada, salida = "", convertido;
function convertidor(entrada) {
    let retorno = ""; retorno += entrada;
    return retorno.split('\n');
}
router.post('/post', (req, res) => {
    console.log('Recibo con exito');
    textoEntrada = req.body.salida;
    console.log(textoEntrada);
    if (textoEntrada != "" && textoEntrada != null) {
        let saltos = textoEntrada.split('\n');
        for (let j = 0; j < saltos.length; j++) {
            for (let i = 0; i < saltos[j].length; i++) {
                if (saltos[j][i] != ' '&&saltos[j][i]!='') {
                    salida += '\n' + saludar(saltos[j], i, j);
                    i = saludar(saltos[j], i, j)[3];
                }
            }
        }
        console.log(salida);
        convertido = convertidor(salida);
    }else {console.log('Sin datos en area de texto');}
    res.status(200);
});
let contador = 1;
function verificador() {
    if (contador == convertido.length) return false; else return true;
}
router.get('/get', (req, response) => {
    if (convertidor.length > 0 &&salida!="") {
        response.contentType('application/json');
        var enviar;
        if (verificador()) { enviar = { name: convertido[contador] }; contador++; } else enviar = { name: 'vacio' };
        var eviarJSON = JSON.stringify(enviar);
        let promesa = new Promise((resolve) => {
            setTimeout(() => {
                response.send(eviarJSON).status(200);
            }, 3000);
        }).then((value) => {
            console.log('se envio con exito ' + value);
        }).catch((error) => {
            console.log('ocurrio un error');
        });
    } else {console.log('sin datos que enviar');}
});
router.get('/getTable', (req, response) => {
    if (salida!= "" && salida != null) {
        response.contentType('application/json');
        let retorno = { name: salida };
        let retornoJasn = JSON.stringify(retorno);
        response.send(retornoJasn).status(200);
        console.log('Enviado a tabla');
    } else console.log('sin datos que enviar a tabla');
});
router.post('/borrar',(req,res)=>{
    salida="";
    convertido.length=0;    
    textoEntrada="";
    contador = 1;
    res.status(200);
})
module.exports = router;