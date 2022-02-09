const {Schema, model} = require('mongoose');

/*  Modelo de usuario
{
    name: 'Jonatan',
    email: 'jetrnm@hotmail.com',
    password: 'kjfgñlajsfdsajf',
    img: 'direccion URL',
    role: 'nadjlsgfkljsf',
    statusd: false,
    createGoogle: false
}

*/

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'role is required'],
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    statusd: {
        type: Boolean,
        default: true
    },
    createGoogle: {
        type: Boolean,
        default: false
    },

});

//Con esta funcion quito de la visualización el passsword y el _ _v
UserSchema.methods.toJSON = function(){
    const { __v, password,_id, ...user } = this.toObject();
    user.uid = _id;
    return user
}

module.exports = model('User', UserSchema);

