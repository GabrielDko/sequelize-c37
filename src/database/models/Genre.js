module.exports = (sequelize, DataTypes) => {
    const alias = 'Genre' 

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unsigned: true,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        ranking: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unsigned: true
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unsigned: true
        }
    }
    const config = {
        tableName: 'genres',
        timestamps: true
    }
    const Genre = sequelize.define(alias,cols,config)


    Genre.associate = (models)=> {
        Genre.hasMany(models.Movie,{
            as: "movies",
            foreignKey: 'genre_id'
        })
    }

    return Genre;
}