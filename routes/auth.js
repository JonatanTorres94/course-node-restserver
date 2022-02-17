const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    check('email','Email is required').isEmail(),
    check('password','Password is required').not().isEmpty(),
    validateFields
],login );

router.post('/google',[
    
    check('id_token','Token google is required').not().isEmpty(),
    validateFields
],googleSingIn );


module.exports = router;
