import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { producto } from "../productos-models/productos-models.js";



export const funcionario = sequelize.define('funcionario', {
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

    funcionario_administrador: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
    }
},
    { sequelize,
        tableName:'funcionarios',
        modelName: 'funcionario' },
    {
        timestamps: false
    }

)
