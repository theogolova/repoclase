const { FOREIGNKEYS } = require("sequelize/lib/query-types");

module.exports = function(sequelize, dataTypes) {
    let alias = "Movie";

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        title: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.DECIMAL
        },
        awards: {
            type: dataTypes.INTEGER
        },
        length:{
            type: dataTypes.INTEGER
        },
        genre_id:{
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: "movies",
        timestamps: false,
        underscored: true
    };



    /* definir un modelo */
    let Movie = sequelize.define( alias, cols, config);

    Movie.associate = function(models) {
        // las relaciones

        Movie.belongsTo( models.Genre , {
            as: "genre",    // alias: como voy a llamar a esa relacion
            foreignKey: "genre_id" //
        });

        Movie.belongsToMany(models.Actor , {
            as: "actors",           // alias
            through: "actor_movie",  //tabla intermedia
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
        });

    }

    return Movie;
}
