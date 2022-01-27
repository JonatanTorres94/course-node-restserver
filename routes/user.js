const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, userPatch, userDelete, userPut, userPost } = require('../controllers/user');
const { validateFields } = require('../middlewares/validate-fields');
const { isRoleValid, isEmailvalid, existUserId } = require('../helpers/db-validators');


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
    check('id','It isn`t valid ID').isMongoId(),
    check('id').custom(existUserId),
    validateFields
] ,userDelete);

router.patch('/', userPatch);


module.exports = router;