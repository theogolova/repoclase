const db = require('../database/models'); /*  va dejar de ser */
const op = db.Sequelize.Op;
const indexController = {
    index: function(req, res) {

      let filtro = {
        /* where: [{awards: 1}, {length: 120}] */
        order: [["title", "ASC"]],
       /*  limit: 5, */
       /*  offset: 2 */
      }
    
      db.Movie.findAll(filtro)
      .then((result) => {
        return res.render("movies", {listaPeliculas: result})
        return res.send(result);
      }).catch((err) => {
        return console.log(err); ;
      });
    },
    detalle: function(req, res) {
      let idPelicula = req.params.idPelicula;

      let criterio = {
          include: [
            {association: "genre"}, // el alias de la rela
            {association: "actors"}
          ]
      }

      db.Movie.findByPk(idPelicula, criterio)
      .then((result) => {
                return res.render("detalleMovies", {movie: result});
      }).catch((err) => {
        return console.log(err);
      });
    },
    showFormCreate: function(req,res) {

      if (req.session.user == undefined) {
          return res.redirect("/users/login")
      } else {
        return res.render("registerMovie");
      }

    },
    showFormUpdate: function(req,res) {
      let idPelicula = req.params.idPelicula;

      db.Movie.findByPk(idPelicula)
      .then((result) => {
          return res.render("updateMovie", {movie : result})  
      }).catch((err) => {
        return console.log(err);
      });

    },
    busqueda: function(req, res) {

      let busqueda = req.query.pelicula; 
      let filtrado = {
        where: {
          title:  { [op.like]: "%" + busqueda + "%"}
        }
      }
      
      db.Movie.findOne(filtrado)
      .then((result) => {
        return res.send(result)
      }).catch((err) => {
        return console.log(err);
      });
    },
    store: function(req, res) {
      let form = req.body;

      db.Movie.create(form)
      .then((result) => {
          return res.redirect("/movies")
      }).catch((err) => {
        return console.log(err);
      });
      

      /* return res.redirect("/movies") */
    },
    update: function(req, res) {
      let form = req.body;
       let filtrado = {
        where: {
          id: form.id
        }
      } 

      db.Movie.update(form, filtrado)
      .then((result) => {
        return res.redirect("/movies/id/" + form.id)
      }).catch((err) => {
        return console.log(err);
      });

    },
    delete: function(req, res) {
      let form = req.body;
      
      let filtrado = {
        where: {
          id: form.id
        }
      }

      db.Movie.destroy(filtrado)
      .then((result) => {
        return res.redirect("/movies/");
      }).catch((err) => {
        return console.log(err);
      });
      
    }
}

module.exports = indexController;





