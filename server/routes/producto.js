const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();

const Producto = require('../models/producto');

//=======================================
// Consulta todos los productos 
//=======================================

app.get('/producto', verificaToken, (req, res)=>{

    let desde = req.query.desde||0;
    desde = Number(desde);

    Producto.find({disponible: true})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos)=> {
            
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                productos
            });
        });
})

//=======================================
// Consulta productos por ID
//=======================================

app.get('/producto/:id', verificaToken, (req, res)=>{

    let id = req.params.id;

    Producto.findById(id )
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')

        .exec((err, productoDB)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message:'El Id no Existe'
                }
            });
        };
        res.json({
            ok: true,
            producto: productoDB
        });
    })
});     

//=======================================
// Buscar un Producto
//=======================================
app.get('/producto/buscar/:termino', verificaToken, (req, res)=>{

        let termino = req.params.termino;
        let regex = new RegExp(termino, 'i')


        Producto.find({ nombre: regex})
            .populate('categoria', 'nombre')
            .exec((err, productos)=>{

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                };
                res.json({
                    ok: true,
                    productos
                });
            })
          
})

//=======================================
// Crea un Producto
//=======================================
app.post('/producto', verificaToken, (req, res)=>{
    

    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id, 
        nombre:  body.nombre,
        precioUni:  body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria:  body.categoria

    });
    
  
    producto.save((err, productoBD)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        
        
        res.status(201).json({
            ok: true,
           producto: productoBD
        });


    })

});

//=======================================
// Actualiza un Producto
//=======================================

app.put('/producto/:id', verificaToken, (req, res) =>{

    let id = req.params.id;
    let body = req.body;

     console.log(id);
     
    Producto.findById(id, (err, productoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!productoBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message:'El Id no Existe'
                }
            });
        };

        productoBD.nombre = body.nombre;
        productoBD.precioUni = body.precioUni;
        productoBD.categoria = body.categoria;
        productoBD.disponible = body.disponible;
        productoBD.descripcion = body.descripcion;

        productoBD.save((err, productoGuardado)=>{
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };
            res.json({
                ok: true,
                producto: productoGuardado
            });

        })

    })


})

 
//=======================================
// Borra productos por ID
//=======================================

app.delete('/producto/:id', verificaToken, (req, res)=>{

    let id = req.params.id;
    Producto.findById(id,(err, productoBD)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!productoBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message:'El Id no Existe'
                }
            });
        };
        productoBD.disponible = false;

        productoBD.save((err, productoBorrado)=>{
            
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };
            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'Producto Borrado'
            }); 
        })

    })
});








module.exports = app;