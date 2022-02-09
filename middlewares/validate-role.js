const { response } = require("express");


const isAdminRole = (req, res = response, next ) => {

    if( !req.user ){
        return res.status(500).json({
            msg: 'Is want to validate role without validate token first'
        });
    }

    const {role, name} = req.user;

    if (role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} You dont have admin permissions`
        })
    }

    next();
}

const haveRol = ( ...rols ) => {

    return  (req, res = response, next) => {

        if( !req.user ){
            return res.status(500).json({
                msg: 'Is want to validate role without validate token first'
            });
        }

        if (!rols.includes( req.user.role )){
            return res.status(401).json({
                msg: `The server require one of it rol ${rols}`
            });
        }

        next();
    }

}

module.exports = {
    isAdminRole,
    haveRol
}

