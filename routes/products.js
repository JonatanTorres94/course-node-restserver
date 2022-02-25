const { Router } = require('express');
const { check } = require('express-validator');
const res = require('express/lib/response');
const { createProduct, getProduct,getProductId, updateProduct, deleteProduct } = require('../controllers/products');
const { existCotagoryById, existProductById } = require('../helpers/db-validators');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');


const router = Router();

/**
 * {{url}}/api/category
 */

//Obtener todos los productos - publica
router.get('/',getProduct);

//Obtener una producto por ID - publica
router.get('/:id',[
    check('id','No is ID for valid Mongo').isMongoId(),
    check('id').custom(existProductById),
    validateFields
],getProductId);

//Crear product - privado - cualquier persona con token valido
router.post('/',[
    validateJWT,
    check('name','The name is required').not().isEmpty(),
    check('category','No is ID mongo').isMongoId(),
    check('category').custom(existCotagoryById),
    validateFields
],createProduct);

//Actualizar por id / privado cualquiera con token valido
router.put('/:id',[
    validateJWT,
    //check('product','No is ID mongo').isMongoId(),
    check('id').custom(existProductById),
    validateFields
] ,updateProduct);

// Borrar una categoria solo un usuario Admin
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id','No is ID for valid Mongo').isMongoId(),
    check('id').custom(existProductById),
    validateFields
],deleteProduct);

//
module.exports = router;