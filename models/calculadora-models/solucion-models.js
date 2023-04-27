import { DataTypes } from "sequelize"
import { sequelize } from "../../db/db.js"

export const solucion = sequelize.define('solucion', {
    solucion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    solucion_descripcion: {
        type: DataTypes.STRING
    },
},
    {
        timestamps: false
    })
