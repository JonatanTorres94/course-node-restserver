const { response, request } = require('express');
const jsonwebtoken = require("jsonwebtoken");
const user = require('../models/user');

const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'No send token'
        })
    }

   try {

    const {uid} = jsonwebtoken.verify(token, process.env.SECRETPRIVATEKEY )

    // leer el usuario que corresponde
    const user = await User.findById(uid);

    //Este error es cuando el usuario NO EXISTE en la DB
    if(!user){
        return res.status(401).json({
            msg: 'User non-existent in DB'
        })
    }

    //Verificar si el UID es status True
    if (!user.statusd) { 
        return res.status(401).json({
            msg: 'Status false, token not valid'
        })
    }
    
    req.user = user;


    next();
       
   } catch (error) {
       console.log(error);
       res.status(401).json({
           msg: 'Token is invalid'
       })
   }
}

module.exports = {
    validateJWT
}