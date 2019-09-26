

var entrada = document.getElementById("areaTexto");
var salida = document.querySelector("#areaTexto");

function separadorSaltos(texto){
    let salida = texto.split("\n");
    alert("Son "+salida.length+" Saltos");    
    return salida;
}
function separadorEspacios(texto){
    let salida=[];
    texto.forEach(element => {
        let flotante = element.split(" ");
        flotante.forEach(flot => {
            if(flot!="")salida.push(flot);
        });
    });
    return salida;
}

function mostrarDatos(){    
    let saltos = separadorSaltos(entrada.value);
    let salida = separadorEspacios(saltos);
    let promesas = [];
    let tiempo = 2000;
    salida.forEach(element=>{
        let promesaFanatasma = new Promise((resolve)=>{
            setTimeout(() => {
                resolve(element);
            },tiempo);
            tiempo+=2000;
        });        
        promesas.push(promesaFanatasma);
        promesaFanatasma = null;
    });
    promesas.forEach(element => {
        element.then((value)=>{
            console.log(value);
        });
    });
    }



function borrarTexto(){ 
    entrada.value="";
}