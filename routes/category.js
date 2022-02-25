const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategory,getCategoryId, updateCategory, deleteCategory } = require('../controllers/category');
const { existCotagoryById } = require('../helpers/db-validators');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');


const router = Router();

/**
 * {{url}}/api/category
 */

//Obtener todas las categorias - publica
router.get('/',getCategory);

//Obtener una categoria por ID - publica
router.get('/:id',[
    check('id','No is ID for valid Mongo').isMongoId(),
    check('id').custom(existCotagoryById),
    validateFields
],getCategoryId);

//Crear categoria - privado - cualquier persona con token valido
router.post('/',[
    validateJWT,
    check('name','The name is required').not().isEmpty(),
    validateFields
],createCategory);

//Actualizar por id / privado cualquiera con token valido
router.put('/:id',[
    validateJWT,
    check('name', 'Name is require by update').not().isEmpty(),
    check('id').custom(existCotagoryById),
    validateFields
] ,updateCategory);

// Borrar una categoria solo un usuario Admin
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id','No is ID for valid Mongo').isMongoId(),
    check('id').custom(existCotagoryById),
    validateFields
],deleteCategory);

//
module.exports = router;