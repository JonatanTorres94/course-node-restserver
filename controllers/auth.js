const { response } = require('express');
const res = require('express/lib/response');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {

    const {email, password } = req.body;

    try{

        //Verificar si email existe

        const user = await User.findOne({ email });

        if (!user){
            return res.status(400).json({
                msg: 'User / Password is not correct - email'
            });
        }

        //Verificar user activo en BD

        if ( !user.statusd ){ // esto es igual a hacer user.status === false
            return res.status(400).json({
                msg: 'User / Password is not correct - status: false'
            });
        }


        //Verificar Password

        const validPass = bcryptjs.compareSync ( password, user.password );
        if( !validPass ){
            return res.status(400).json({
                msg: 'User / Password is not correct - password'
            });
        }

        //Generar JWT

        const token = await generateJWT (user.id);

        res.json ({
            msg: 'Login ok',
            user,
            token
        })

    } catch(error){

        console.log(error)
        res.status(500).json({
            msg: 'Speak with your Admin'
        })


    }


}

module.exports = {
    login
}
