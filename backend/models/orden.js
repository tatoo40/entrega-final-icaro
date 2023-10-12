'use strict';
module.exports = (sequelize, DataTypes) => {
    const Orden = sequelize.define('orden', {
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
        precio_total: {
          allowNull: false,
          defaultValue: 1,
          type: DataTypes.DECIMAL,
  
      },  
      cantidad_productos: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.INTEGER,

    }    ,  
    metodo_entrega: {
      allowNull: false,
      defaultValue: 1,
      type: DataTypes.CHAR,

  }    
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'ordenes',
        classMethods: {}
    });
    Orden.associate = function(models) {
    // associations can be defined here
    };
    return Orden;
};