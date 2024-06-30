var express = require('express');
var router = express.Router();

/* requerir el modelo del controlador */
const movieController = require('../controllers/movieController');

/* GET home page. */
router.get('/', movieController.index);

/* GET details movie page. */
router.get('/id/:idPelicula', movieController.detalle);

/* GET Creat movie page. */
router.get('/register', movieController.showFormCreate);

/* POST capturar la info del formulario */
router.post("/register", movieController.store)

/* GET update movie page. */
router.get('/editMovie/:idPelicula', movieController.showFormUpdate);

/* GET buscar una sola peli */
router.get("/busqueda", movieController.busqueda);

/* POST recuperar la info del form de actualizar */
router.post("/update", movieController.update);

/* POST eliminar pelicula */
router.post("/deleteMovie", movieController.delete);


module.exports = router;