const { Router } = require('express');
const { usersGet, userPatch, userDelete, userPut, userPost } = require('../controllers/user');

const router = Router();

router.get('/', usersGet);

router.post('/', userPost);

router.put('/:id', userPut);

router.delete('/', userDelete);

router.patch('/', userPatch);


module.exports = router;