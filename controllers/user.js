const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { exists } = require('../models/user');


const usersGet = async (req = request, res = response) => {
    
    const {limit = 5, from = 0 } = req.query; // para pasar un parametro de limite y desde
    const query = { statusd: true };

    const [all, users] = await Promise.all([
         User.countDocuments(query),
         User.find(query)
            .skip(Number(from))
            .limit(Number(limit))

     ]); // Esto permite ejecutar las promesas de forma simultanea para no romper el db


    res.json({
        all,
        users
    });
}

//user post guarda el user en la bd
const userPost = async(req, res = response) => {

    const { name,email,password,role } = req.body;
    const user = new User( {name,email,password,role} );

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    //Guardar en DB
    await user.save()
    
    res.json({
        msg: 'post API - Controller',
        user
    });
}

const userPut = async (req, res = response) => {
    
    const { id } = req.params; // Desestructuro lo que viene como parametro pasado por el usuario, id sale del nombre dado en la URL luego de los :
    //Lo que extraigo como password, google y email son datos que no realizo ninguna accion con ellos como si con resto, todo lo que quiero excluir va extraido
    const { _id,password,createGoogle,email, ...resto } = req.body;

    //TODO validar contra base de datos
    if( password ){
        //Encriptar password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    // Actualiza datos en DB
    const usuario = await User.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const userDelete = async (req, res = response) => {
    
    const { id } = req.params;
    
    //Borrar fisicamente de la DB
    //const user = await User.findByIdAndDelete( id );

    //Borrar sin eliminar
    const user = await User.findByIdAndUpdate(id,{ statusd: false });


    res.json({
        user
    });
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - COntroller'
    });
}

module.exports = {
    usersGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}