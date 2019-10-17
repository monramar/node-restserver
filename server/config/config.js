//==============================
// PORT
//==============================

process.env.PORT =process.env.PORT||3000;

//=================================
// Entorno
//=================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==============================
// Vencimiento del token
//==============================
// 60 Seg
// 60 min
// 24 hor
// 30 dias
process.env.CADUCIDAD_TOKEN = '48h';

//==============================
// SEED de 
//==============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'
 
//=================================
//Base de Datos
//=================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {

   urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;

}

process.env.URLDB = urlDB;

//=================================
//  Google Cliente ID
//=================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '1046857701264-afo23u5u28f7sb67sbgi6oas8c4scbv2.apps.googleusercontent.com';

