module.exports = function(sequelize, dataTypes) {
    let alias = "Actor";

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        firstName: {
            type: dataTypes.STRING
        },
        lastName: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.DECIMAL
        }
    };

    let config = {
        tableName: "actors",
        timestamps: false,
        underscored: true
    };

    /* definir un modelo */
    let Actors = sequelize.define( alias, cols, config);

    Actors.associate = function(models) {
        
        Actors.belongsToMany(models.Movie , {
            as: "movies",           // alias
            through: "actor_movie",  //tabla intermedia
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        });
    }
    
    return Actors;
}
