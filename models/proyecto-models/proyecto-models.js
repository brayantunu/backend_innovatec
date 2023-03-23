import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { semilleros } from "../semilleros-models/semilleros-models.js";
import { semillero_proyecto } from "../semillero-proyecto-model/semillero-proyecto-models.js";
export const proyecto= sequelize.define('proyecto',{
    id: {
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
})




proyecto.belongsToMany(semilleros,{
    through:semillero_proyecto
 
})

semilleros.belongsToMany(proyecto,{
    through:semillero_proyecto
  
})