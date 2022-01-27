const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
    
    const errors = validationResult(req);
    //mando a imprimir los errores encontrados por express validator
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validateFields
}