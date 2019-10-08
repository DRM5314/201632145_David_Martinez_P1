let texto = document.querySelector('#textoArea');
let listado = document.getElementById('listado');
let datos;
function postText(){
    if(texto.value!=null&&texto.value!=""&&texto.value!=" "){
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

function getData()  {
    axios.get('/get').then(response => {        
        if(response.data.name!=""&&response.data.name!=null){
            console.log("datos recibidos correctamente");
            console.log(response.data.name);
            mostrar(response.data.name);
        }else {console.log('sin datos que recibir');}
        })
        .catch(error => {
            console.log(error.response);
        });
}
function mostrar(datos){
    if(datos!="vacio"){
    let retorno = datos.split(',');
    listado.innerHTML = "<li>"+retorno[0]+" "+retorno[1]+" Fila "+retorno[2]+" Columna "+retorno[3]+"</li>";
    }else{
        listado.innerHTML = "<li>Datos analizados por completo</li>";
    }
}
function borrarTexto(){
    let borrar = document.querySelector('#textoArea');
    borrar.value="";
    listado.innerHTML="";
    axios.post('/borrar',{
        salida : ''
    }).then(response=>{
        console.log(response);
    }).catch(error=>{
        console.log(error.response);
        alert('error en conexion');
    });
}