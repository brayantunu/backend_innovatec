import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";

export const proyecto= sequelize.define('proyecto',{
    proyecto_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    proyecto_codigo:{
        type: DataTypes.STRING
    },
    proyecto_linea: {
        type: DataTypes.STRING
    },

    proyecto_nombre: {
        type: DataTypes.STRING
    },
    proyecto_presupuesto: {
        type: DataTypes.INTEGER (11)
    },
    
},
{ sequelize, modelName: 'proyectos' }
)



