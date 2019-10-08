function getData  ()  {
    axios.get('/getTable').then(response => {        
        if(response.data.name!=""&&response.data.name!=null){
            console.log("datos recibidos correctamente");
            console.log(response.data.name);
            llenar(response.data.name);
        }else console.log('sin datos que recibir');
        })
        .catch(error => {
            console.log(error.response);
        });
}

let tabla = document.getElementById('tableBody');
function recuperadorArreglo(recuperar){
    let retorno="";
    retorno +=recuperar;
    return retorno.split('\n');
}
function separadorSaltos(entrada){
    let retorno ="";retorno=entrada.split('\n');
    return retorno;
}
function sepradadorComas(entrada){
    let retorno ="";retorno=entrada.split(',');
    return retorno;
}
function nuevaFila(entrada){
    let retorno;
    retorno = 
    "<td>"+entrada[0]+"</td>"+
    "<td>"+entrada[1]+"</td>"+
    "<td>"+entrada[2]+"</td>"+
    "<td>"+entrada[3]+"</td>";
    return retorno;
}

function llenar(entrada){    
    let saltos = separadorSaltos(entrada);
    let salida="";
    for (let i = 1; i < (saltos.length); i++) {        
        let comas = sepradadorComas(saltos[i]);
        salida=nuevaFila(comas);
        var fila = document.createElement('TR');
        fila.innerHTML=salida;
        document.getElementById('tableBody').appendChild(fila);
    }
    
    console.log('datos importados a tabla');
}
function borrarTabla(){
    document.getElementById('tableBody').innerHTML="";
}