const  {Router} = require('express');

const router = Router();

const userController = require('./controllers/userController')

router.get('/hello', (req, res) => {
    res.send('hello world !');
});

router.post('/login', userController.validLogin);

module.exports = router;