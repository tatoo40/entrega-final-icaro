'use strict';
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('usuario', {
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
        email: {
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.CHAR
          
        },
        password: {
          allowNull: false,
          defaultValue: 1,
          type: DataTypes.CHAR,
          password:true
      } ,
      telefono: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.CHAR,
        password:true
    } 
    ,
        domicilio: {
          allowNull: false,
          defaultValue: 1,
          type: DataTypes.CHAR,
          password:true
      },
      role: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.CHAR,
        password:true
    }  

    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'usuarios',
        classMethods: {}
    });
    Usuario.associate = function(models) {
    // associations can be defined here
    };
    return Usuario;
};