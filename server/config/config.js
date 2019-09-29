//==============================
// PORT
//==============================

process.env.PORT =process.env.PORT||3000;

//=================================
// Entorno
//=================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
 
//=================================
// Entorno
//=================================
let urlDB;

//if (process.env.NODE_ENV === 'dev') {

  //  urlDB = 'mongodb://localhost:27017/cafe';
//} else {
    urlDB = 'mongodb+srv://monramar:pata2014@cluster0-o8m6o.mongodb.net/cafe';

//}

process.env.URLDB = urlDB;


