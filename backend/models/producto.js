'use strict';
module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('producto', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre: {
            allowNull: false,
            type: DataTypes.STRING
        },
        descripcion: {
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.CHAR
          
        },
        precio: {
          allowNull: false,
          defaultValue: 1,
          type: DataTypes.DECIMAL,
  
      },  
      stock_actual: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.INTEGER,

    },  
      foto: {
        allowNull: true,
        defaultValue: 1,
        type: DataTypes.CHAR
      
    },
      categoria_id: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.INTEGER,
   
    }      
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'productos',
        classMethods: {}
    });
    Producto.associate = function(models) {
    // associations can be defined here
    };
    return Producto;
};