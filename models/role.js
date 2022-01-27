const { Schema, model } = require('mongoose');

const RoleSchema = Schema ({
    role:{
        type: String,
        require: [true, 'The rol is require']
    }
});

module.exports = model( 'Role', RoleSchema);