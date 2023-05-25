import { sequelize } from "../../db/db.js";
// se importa la base de datos la cual la funcion es que se guarde los modelos que creamos en la base de datos

import { DataTypes } from "sequelize";
// importamos los tipos de datos de la libreria de sequelize

export const funcionario = sequelize.define('funcionario', {
// creamos una constate que se llame producto y la exportamos con export definimos el nombre de sequelize que es la conexion de la base de datos 

    funcionario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    funcionario_iden: {
        type: DataTypes.INTEGER
    },

    funcionario_nombre: {
        type: DataTypes.STRING
    },

    funcionario_apellido: {
        type: DataTypes.STRING
    },

    funcionario_correo: {
        type: DataTypes.STRING
    },

    funcionario_contraseña: {
        type: DataTypes.STRING
    },

    funcionario_telefono: {
        type: DataTypes.BIGINT
    },
    // estos datos son los atributos que se diagramo en el modelo uml

},
    { sequelize,
        tableName:'funcionarios',
        modelName: 'funcionario' },
// se define sequelize con modelname poniendole el nombre de la tabla 

    {
        timestamps: false
    }

)
