const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, userPatch, userDelete, userPut, userPost } = require('../controllers/user');
const { isRoleValid, isEmailvalid, existUserId } = require('../helpers/db-validators');
const{
    validateFields,
    validateJWT,
    isAdminRole,
    haveRol
} = require('../middlewares');




const router = Router();

router.get('/', usersGet);


//Uso [] para enviar Middlewares pueden ser uno o varios el tercer argumento enviado se considera el constructor
// chk (email(es el param), it is not... (es el msg))
router.post('/',[
    check('name', 'name is require').not().isEmpty(),
    check('email', 'it is not email valid').isEmail(),
    check('email').custom(isEmailvalid),
    check('password','is required and must be more than 6 characters').isLength({min: 6}),
    //check('role', 'it is not role correct').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValid ),
    validateFields
],userPost);

router.put('/:id', [
    check('id','It isn`t valid ID').isMongoId(),
    check('id').custom(existUserId),
    check('role').custom( isRoleValid ),
    validateFields
] ,userPut);

router.delete('/:id', [
    validateJWT,
    //isAdminRole, // Este midel verifica si el usuario es admin y solo admin
    haveRol('ADMIN_ROLE','SALE_ROLE'), // aca puedo indicar varios roles para que pueda realizar el delete
    check('id','It isn`t valid ID').isMongoId(),
    check('id').custom(existUserId),
    validateFields
] ,userDelete);

router.patch('/', userPatch);


module.exports = router;