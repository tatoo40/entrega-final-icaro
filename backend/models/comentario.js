'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comentario = sequelize.define('comentario', {
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
          allowNull: false,
          defaultValue: 1,
          type: DataTypes.INTEGER,
  
      },  
      nota: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.INTEGER,

    }  ,  
    comentario: {
      allowNull: false,
      defaultValue: '',
      type: DataTypes.CHAR,

  }   
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'comentarios',
        classMethods: {}
    });
    Comentario.associate = function(models) {
    // associations can be defined here
    };
    return Comentario;
};