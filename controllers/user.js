const { response, request } = require('express');

const usersGet = (req = request, res = response) =>{
    
    const {q, name= 'no name', apikey, page= 1, limit} = req.query;
    
    res.json({
        msg: 'get API - Controller ',
        q,
        name,
        apikey,
        page,
        limit
    });
}

const userPost = (req, res = response) => {
    
    const {name, age} = req.body;
    
    res.json({
        msg: 'post API - Controller',
        name,
        age
    });
}

const userPut = (req, res = response) => {
    
    const { id } = req.params; // Desestructuro lo que viene como parametro pasado por el usuario, id sale del nombre dado en la URL luego de los :
    
    res.json({
        msg: 'put API - COntroller',
        id
    });
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - COntroller'
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