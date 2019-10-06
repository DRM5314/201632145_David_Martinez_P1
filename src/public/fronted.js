let texto = document.querySelector('#textoArea');

function postText(){
    axios.post('/post',{
        salida : texto.value
    }).then(response=>{
        console.log(response);
    }).catch(error=>{
        console.log(error);
        alert('error en conexion');
    });
}
function borrar(){
    let borrar = document.querySelector('#textoArea');
    borrar.value="";
}