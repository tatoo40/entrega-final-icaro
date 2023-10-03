'use strict';
module.exports = (sequelize, DataTypes) => {
    const ProductoXOrden = sequelize.define('productoXOrden', {
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
        idProducto: {
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.INTEGER
          
        },       
        precio: {
          allowNull: false,
          defaultValue: 1,
          type: DataTypes.DECIMAL,
  
      }, 
      comentarios: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.CHAR,

    },  
      cantidad: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.INTEGER,

    }    
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'productos_x_orden',
        classMethods: {}
    });
    ProductoXOrden.associate = function(models) {
    // associations can be defined here
    };
    return ProductoXOrden;
};