const { response } = require('express');
const res = require('express/lib/response');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { verify } = require('jsonwebtoken');
const { verifyGoogle } = require('../helpers/google-verify');
const { json } = require('express/lib/response');


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

const googleSingIn = async (req, res) => {

    const {id_token} = req.body;

    try {
    
        const {name, picture, email} = await verifyGoogle(id_token)
        
        
        let user = await User.findOne({email});
        console.log(user);

        if ( !user ){
            //tengo que crearlo
            const data = {
                name,
                email,
                password: ':p',
                picture,
                createGoogle: true,
                role:'USER_UNDEFINED_ROLE'
            }
            console.log(data);
            user = new User( data );
            await user.save();
        }

        // si el usuario en DB
        if ( !user.statusd ){
            return res.status(401).json({
                msg: 'Talk with on Admin, user locked'
            });
        }
        
        //Generar JWT

        const token = await generateJWT (user.id);

        res.json({
            user,
            token
        })


    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login,
    googleSingIn
}
