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
    return sequelize.define(alias,cols,config)
}