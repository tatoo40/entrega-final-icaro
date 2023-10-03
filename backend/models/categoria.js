'use strict';
module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('categoria', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'categorias',
        classMethods: {}
    });
    Categoria.associate = function(models) {
    // associations can be defined here
    };
    return Categoria;
};