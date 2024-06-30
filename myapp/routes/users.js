var express = require('express');
var router = express.Router();
const { body } = ('express-validator')

const validation = [
    body("name").notEmpty().withMessage("debes ingresar un nombre").bail()
]



/* requerir el modelo del controlador */
const userController = require('../controllers/userController');

/* mostrar formulario REGISTER */
router.get('/register', userController.register);

/* mostrar formulario REGISTER */
router.post('/register', validation , userController.store);

/* mostrar formulario LOGIN */
router.get('/login', userController.login);

/* mostrar formulario LOGIN */
router.post('/login', userController.loginUser);

/*  LOGOUT */
router.post('/logout', userController.logout);

module.exports = router;
