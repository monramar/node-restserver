const jwt=require('jsonwebtoken');


//================================
// Verificar Token
//================================


let verificaToken =(req, res, next)=>{

    let token = req.get('token');

       jwt.verify( token, 'este-es-el-seed-desarrollo' /* process.env.SEED */ , (err, decoded)=>{
        
        if ( err ){

            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }
        
        req.usuario = decoded.usuario;
        next();
    }); 

};

//================================
// Verificar adminRole
//================================


let verificaAdminRole =(req, res, next)=>{

    let usuario = req.usuario;
    console.log(usuario);
    

       if  (usuario.role === 'ADMIN_ROLE'){
           next()
       } else{

            return res.json({
                ok: false,
                err: {
                    message: 'El usuario no es adminisrador'
                }
            })
            
       }

};



module.exports={
    verificaToken,
    verificaAdminRole
}