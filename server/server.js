require ('./config/config.js');


const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));

 
mongoose.connect(process.env.URLDB,
    { useNewUrlParser:true, useCreateIndex:true},
    (err, res)=>{
    if (err) throw (err);
    console.log('Base de datos ONLINE');
    
});

app.listen(process.env.PORT, ()=> {
    console.log('Escuchando puerto: ', process.env.PORT);
    
});