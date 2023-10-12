'use strict';
module.exports = (sequelize, DataTypes) => {
    const CarritoPersistente = sequelize.define('carritopersistente', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        fecha: {
            allowNull: false,
            type: DataTypes.DATE
        },
        idUsuario: {
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.INTEGER
          
        },
        productos: {
          allowNull: false,
          defaultValue: 1,
          type: DataTypes.CHAR,
  
      },  
      activo: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.BOOLEAN,

    }  ,  
    idOrden: {
      allowNull: false,
      defaultValue: 1,
      type: DataTypes.INTEGER,

  }   
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'carritospersistente',
        classMethods: {}
    });
    CarritoPersistente.associate = function(models) {
    // associations can be defined here
    };
    return CarritoPersistente;
};