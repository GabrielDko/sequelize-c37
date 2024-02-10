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
        },
        genre_id: {
            type: DataTypes.INTEGER,
            unsigned: true
        }
    }
    const config = {
        tableName: 'movies',
        timestamps: true
    }
    return sequelize.define(alias,cols,config)
}