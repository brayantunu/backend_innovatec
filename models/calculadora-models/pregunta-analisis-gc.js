import { DataTypes } from "sequelize"
import { sequelize } from "../../db/db.js"

export const pregunta_a_gc = sequelize.define('pregunta_a_gc', {
    pregunta_a_gc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    pregunta_descripcion_pregunta: {
        type: DataTypes.STRING
    },

},
    {
        timestamps: false
    })
