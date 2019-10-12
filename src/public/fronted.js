/* variables que serviran para capturar lo que contenga el area de texto, y tambien para 
añadir al listado las solicitadas desde el fronted*/
let texto = document.querySelector('#textoArea');
let listado = document.getElementById('listado');
let datos;

//funcion que captura la informacion que contiene el ara de texto y la envia al servidor
function postText(){
    //se compara antes de enviar que no este vacio, nulo o solo mande un espacio
    if(texto.value!=null&&texto.value!=""&&texto.value!=" "){
        //se utiliza axios para poder mandar los datos con un formato Json, si se reporta un error lo escribe en consola 
        axios.post('/post',{
            salida : texto.value
        }).then(response=>{
            console.log(response);
        }).catch(error=>{
            console.log(error.response);
            alert('error en conexion');
        });
    }else alert('ingrese texto');
}

//funcion que solicita un token del servidor, el cual tendra un retrado de 3 segundos, por cada solicitud
function getData()  {
    //axios se encarga de recuperar el dato proveninete del servidor
    axios.get('/get').then(response => {
        //primero se analiza que no venga vacio
        if(response.data.name!=""&&response.data.name!=null){
            console.log("datos recibidos correctamente");
            //mostrara lo que se recibio
            console.log(response.data.name);
            //se manda a llamar a la funcion que se encargara de mostrar el dato con forma de listado
            mostrar(response.data.name);
        }else {console.log('sin datos que recibir');}
        })        
        .catch(error => {
            //si existe un error lo mostrara en pantalla
            console.log(error.response);
        });
}
//funcion que añade un elemento tipo listado, siempre y cuando lo recibido en la peticion no sea vacio
function mostrar(datos){
    //en el lado del servidor manda vacio en caso que se halla analizado todo el texto
    if(datos!="vacio"){
    let retorno = datos.split(',');
    //se recibira con comas el cual vendra con un formato tipo, token, fila, columna
    listado.innerHTML = "<li>"+retorno[0]+" "+retorno[1]+" Fila "+retorno[2]+" Columna "+retorno[3]+"</li>";
    }else{
        //si el dato del lado del servidor viene como vacio entonces muestra que ya se completo
        listado.innerHTML = "<li>Datos analizados por completo</li>";
    }
}
//funcion que borra los datos y hace una limpieza, del area de texto, lo que tenia almacenado en el servidor lo manda a vaciar, de igual manera lo mostado como listado
function borrarTexto(){
    let borrar = document.querySelector('#textoArea');
    borrar.value="";
    listado.innerHTML="";
    //aixios manda a borrar lo que tenga del lado del servidor
    axios.post('/borrar',{
        salida : ''
    }).then(response=>{
        console.log(response);
    }).catch(error=>{
        console.log(error.response);
        //alert('error en conexion');
    });
}