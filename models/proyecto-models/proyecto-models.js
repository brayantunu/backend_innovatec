import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { funcionario_proyecto } from "../funcionario-proyecto/funcionario-proyecto-models.js";
import { semillero_proyecto } from "../semillero-proyecto-model/semillero-proyecto-models.js";
import { producto_proyecto } from "../producto-proyecto-models/producto-proyecto-models.js";
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

//relacion entre funcionario y proyecto 


proyecto.hasMany(funcionario_proyecto,{
    foreignKey: 'proyectoid',
    sourceKey: 'id'
})

funcionario_proyecto.hasMany(proyecto,{
    foreignKey: 'funcionario_proyectoid',
    targetId: 'id'
})

//relacion entre proyecto y producto

proyecto.hasMany (producto_proyecto,{
    foreignKey: 'proyectoid',
    sourceKey: 'id'
})

producto_proyecto.hasMany (proyecto,{
    foreignKey: 'producto_proyectoid',
    sourceKey: 'id'
})


//relacion entre semillero y proyecto
proyecto.hasMany(semillero_proyecto,{
    foreignKey: 'proyectoid',
    sourceKey: 'id'
})

semillero_proyecto.hasMany(proyecto,{
    foreignKey: 'semillero_proyectoid',
    targetId: 'id'
})