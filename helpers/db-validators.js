const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(role = '') => {
    
    const existRol = await Role.findOne({role})
    if( !existRol ) {
        throw new Error(`The rol ${role} it isn't registered in DB `);
    }
}

const isEmailvalid = async(email = '') => {
    //Verificar si el correo existe
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`Email ${email} is already registered`)
    }
}

const existUserId = async(id) => {
    //Verificar si el ID es valido
    const existId = await User.findById(id)
    if(!existId){
        throw new Error(`Id ${id} is not valid`)
    }
}

module.exports = {
    isRoleValid,
    isEmailvalid,
    existUserId
}