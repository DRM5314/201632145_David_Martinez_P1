const express = require('express');
const app = express();
const path = require('path');

//configuracion

app.set('port',5000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


//routes
app.use(require('./routes/index'));

//estatico
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;