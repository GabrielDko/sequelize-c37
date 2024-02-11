module.exports = (sequelize, DataTypes) => {
    const alias = 'Movie' 

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unsigned: true,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL(3,1),
            allowNull: false,
            unsigned: true
        },
        awards: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unsigned: true
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        length: {
            type: DataTypes.INTEGER,
            unsigned: true
        }
    }
    const config = {
        tableName: 'movies',
        timestamps: true
    }
    const Movie = sequelize.define(alias,cols,config)

    Movie.associate = (models)=> {
        Movie.belongsTo(models.Genre,{
            as: "genres",
            foreignKey: 'genre_id'
        });


        Movie.belongsToMany(models.Actor,{
            as: "actors",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
        });
    }

    return Movie;
}