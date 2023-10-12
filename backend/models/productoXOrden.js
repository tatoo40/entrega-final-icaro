'use strict';
module.exports = (sequelize, DataTypes) => {
    const ProductoXOrden = sequelize.define('productoXOrden', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        idOrden: {
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
      cantidad: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.DECIMAL,

    }, 
      comentarios: {
        allowNull: true,
        defaultValue: 1,
        type: DataTypes.CHAR,

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