//funcion que servira para recibir los datos del servidor ya analizados
function getData() {
    //con axios y el servidor se conectara con el servidor mediante la llamada getTable
    axios.get('/getTable').then(response => {
        //siempre que no venga vacio sera aceptado y llamara a la funcio que pondra los datos en la tabla
        if (response.data.name != "" && response.data.name != null) {
            console.log("datos recibidos correctamente");
            console.log(response.data.name);
            //funcion que postea los datos enla tabla correspondiente
            llenar(response.data.name);
        } else console.log('sin datos que recibir');
    })
        .catch(error => {
            console.log(error.response);
        });
}
//variable que almacena los datos en el body de la tabla
let tabla = document.getElementById('tableBody');
//funcion que recupera los datos en forma de arreglo
function separadorSaltos(entrada) {
    let retorno = ""; retorno = entrada.split('\n');
    return retorno;
}
//los datos de cada linea son enviados con comas tendra el tipo, la cadena analizada, la fila y columna
function sepradadorComas(entrada) {
    let retorno = ""; retorno = entrada.split(',');
    return retorno;
}
//funcion que anade una nueva fila a la tabla
function nuevaFila(entrada) {
    let retorno;
    retorno =
        "<td>" + entrada[0] + "</td>" +
        "<td>" + entrada[1] + "</td>" +
        "<td>" + entrada[2] + "</td>" +
        "<td>" + entrada[3] + "</td>";
    //retorna los datos para la nueva fila
    return retorno;
}
//funcio que usa las funciones anteriores y llena la tabla completa
function llenar(entrada) {
    let saltos = separadorSaltos(entrada);
    let salida = "";
    for (let i = 1; i < (saltos.length); i++) {
        let comas = sepradadorComas(saltos[i]);
        salida = nuevaFila(comas);
        //se cre un nuevo elemento de fila
        var fila = document.createElement('TR');
        fila.innerHTML = salida;
        document.getElementById('tableBody').appendChild(fila);
    }

    console.log('datos importados a tabla');
}
//funcion que borra por completo la tabla
function borrarTabla() {
    document.getElementById('tableBody').innerHTML = "";
}