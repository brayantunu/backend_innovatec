import { DataTypes } from "sequelize"
import { sequelize } from "../../db/db.js"

export const posible_solucion = sequelize.define('posiblesolucion', {
    nivel_relativo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
},
    {
        timestamps: false
    })


// llaves primarias de pregunta gc y soluciond de las tablas