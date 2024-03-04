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
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false        
        },
        favorite_movie_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: {
                    tableName: 'movies'
                },
                key: 'id'
            },
            onDelete: 'cascade'
        }
        
    }
    const config = {
        tableName: 'actors',
        timestamps: false
    }
    const Actor = sequelize.define(alias,cols,config)

    Actor.associate = (models) => {
        Actor.belongsToMany(models.Movie,{
            as: "movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false,
            onDelete: 'CASCADE'
        })
    }
    
    return Actor;
    
}