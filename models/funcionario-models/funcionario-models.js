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
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },

    funcionario_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    funcionario_apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },

    funcionario_correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        },

    funcionario_contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },

    funcionario_telefono: {
        type: DataTypes.BIGINT,
        allowNull: false
    },

    funcionario_administrador: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

},
    { sequelize,
        tableName:'funcionarios',
        modelName: 'funcionario' },
    {
        timestamps: false
    }

)
