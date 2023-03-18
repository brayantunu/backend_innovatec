import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { funcionario_producto } from "../funcionario-producto-models/funcionario-producto.-models.js"; 
import { funcionario_proyecto } from "../funcionario-proyecto/funcionario-proyecto-models.js";
import { funcionario_semillero } from "../funcionario-semilleros-models/funcionario-semillero-models.js";


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

    funcionario_telefono: {
        type: DataTypes.NUMBER
    },

    funcionario_administrador: {
        type: DataTypes.BOOLEAN
    },
},
    {
        timestamps: false
    })

    
//relacion entre funcionario y producto
funcionario.hasMany(funcionario_producto,{
    foreignKey: 'funcionarioid',
    sourceKey: 'id'
})

funcionario_producto.hasMany(funcionario,{
    foreignKey: 'funcionario_productoid',
    targetId: 'id'
})


//relacion entre funcionario y proyecto
 funcionario.hasMany(funcionario_proyecto,{
    foreignKey: 'funcionarioid',
    sourceKey: 'id'
 })
 funcionario_proyecto.hasMany(funcionario,{
    foreignKey: 'funcionario_proyectoid',
    targetId: 'id'
 })




 //relacion entre funcionario y semilleros
 funcionario.hasMany( funcionario_semillero,{
    foreignKey: 'funcionarioid',
    sourceKey: 'id'

 })
 funcionario_semillero.hasMany(funcionario,{
    foreignKey: 'funcionario_semilleroid',
    targetId: 'id'
 })