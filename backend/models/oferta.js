'use strict';
module.exports = (sequelize, DataTypes) => {
    const Oferta = sequelize.define('oferta', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        fecha_hasta: {
            allowNull: false,
            type: DataTypes.DATE
        },

        foto: {
            allowNull: true,
            defaultValue: '',
            type: DataTypes.CHAR
          
        },
        descripcion: {
          allowNull: false,
          defaultValue: 1,
          type: DataTypes.CHAR,
  
        } ,
        idProducto: {
          allowNull: false,
          defaultValue: 1,
          type: DataTypes.INTEGER,
  
        }  ,
        foto: {
          allowNull: false,
          defaultValue: 1,
          type: DataTypes.CHAR,
  
        }  
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'ofertas',
        classMethods: {}
    });
    Oferta.associate = function(models) {
    // associations can be defined here
    };
    return Oferta;
};