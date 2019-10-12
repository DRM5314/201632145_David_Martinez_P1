var salida = "";
function processFiles(files) {
    var file = files[0];

    var reader = new FileReader();

    reader.onload = function (e) {
        // Cuando éste evento se dispara, los datos están ya disponibles.
        // Se trata de copiarlos a una área <div> en la página.
        var output = document.getElementById("fileInput");
        output.textContent = e.target.result;
        llenarCampo(e.target.result);
    };
    reader.readAsText(file);
}
function llenarCampo(texto) {
    var txt = texto;
    for (var i = 0; i < txt.length; i++) {
        salida += txt[i];
    }
    document.getElementById("textoArea").innerHTML = salida;
}