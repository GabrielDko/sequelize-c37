module.exports = (sequelize, DataTypes) => {
    const alias = 'Actor' 

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unsigned: true,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        favorite_movie_id: {
            type: DataTypes.INTEGER,
            unsigned: true,
            forgeinKey: true
        }
        
    }
    const config = {
        tableName: 'actors',
        timestamps: true
    }

    // Actor.associate = (models) => {
    //     Actor.belongsToMany(models.Movie, { through: 'favorite_movie', foreignKey: 'actor_id' })
    // }
    return sequelize.define(alias,cols,config)

    
}