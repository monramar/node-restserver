const express = require('express');

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

const Categoria = require('../models/categoria');


//=======================================
// Mostrar todas las categorias
//=======================================
app.get('/categoria', (req, res)=>{
    Categoria.find({})
    .sort('descripcion')
        .populate ('usuario', 'nombre email')
        .exec((err, categorias)=>{

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }; 

            res.json({
                ok: true,
                categorias
            });


        })

});

//=======================================
// Mostrar una de las categorias por if
//=======================================
app.get('/categoria/:id', (req, res)=>{
    //Categoria.ffindById ()
    let id= req.params.id;
    Categoria.findById(id, (err, categoriaDB)=>{

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }; 
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message:'El Id no Existe'
                }
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    })
    

});

//=======================================
// Crea una categorias 
//=======================================
app.post('/categoria', verificaToken, (req, res)=>{
    //Retrorna id de categoria
    //req.usuario_id

    let body = req.body;

    let categoria= new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
        
    });
    
  
    categoria.save((err, categoriaDB)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        
        res.json({
            ok: true,
           categoria: categoriaDB
        });


    })

});

//=======================================
// actualiza una categorias 
//=======================================
app.put('/categoria/:id', verificaToken,  (req, res)=>{
   
    let id= req.params.id
    let body= req.body;

    let descCategoria ={
        descripcion : body.descripcion
    };

    Categoria.findByIdAndUpdate( id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        
        res.json({
            ok: true,
           categoria: categoriaDB
        });
    } )
    

});


//=======================================
// borra una categorias 
//=======================================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res)=>{
    //Categoria.findByIdAndRemove ()
    let id= req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        console.log(categoriaDB);
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message:'El Id no Existe'
                }
            });
        };

        res.json({
            ok: true,
           message: 'Categoria Borrada'
        });
    })


});




module.exports = app;