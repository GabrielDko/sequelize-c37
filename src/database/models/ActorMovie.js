module.exports = (sequelize, DataTypes) => {
    const ActorMovie = sequelize.define('ActorMovie', {
        actor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model:{
                    tableName:'actors'
                  },
                key: 'id'
            },
            onDelete: 'cascade'
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model:{
                    tableName:'movies'
                  },
                key: 'id'
            },
            onDelete: 'cascade'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'actor_movie',
        timestamps: false
    });

    return ActorMovie;
};
