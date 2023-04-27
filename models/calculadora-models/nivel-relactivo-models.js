import { DataTypes } from "sequelize"
import { sequelize } from "../../db/db.js"

export const n_relativo = sequelize.define('nivel_relativo', {
    nivel_relativo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    n_relativo_codigo_nivel: {
        type: DataTypes.STRING
    },

    n_relativo_descripcion: {
        type: DataTypes.STRING
    },

},
    {
        timestamps: false
    })
