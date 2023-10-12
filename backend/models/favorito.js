'use strict';
module.exports = (sequelize, DataTypes) => {
    const Favorito = sequelize.define('favorito', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        idUsuario: {
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.INTEGER
          
        },
        idProducto: {
          allowNull: false,
          defaultValue: 1,
          type: DataTypes.INTEGER,
  
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'favoritos',
        classMethods: {}
    });
    Favorito.associate = function(models) {
    // associations can be defined here
    };
    return Favorito;
};