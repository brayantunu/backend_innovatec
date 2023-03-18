import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { funcionario_producto } from "../funcionario-producto-models/funcionario-producto-models.js"; 
import { funcionario_proyecto } from "../funcionario-proyecto/funcionario-proyecto-models.js";
import { funcionario_semillero } from "../funcionario-semilleros-models/funcionario-semillero-models.js";


export const funcionario = sequelize.define('funcionario', {
    id: {
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
funcionario.belongsToMany(funcionario_producto,{
    foreignKey:'FUNCIONARIO_ID',
    sourceKey:'id'
})

funcionario_producto.belongsToMany(funcionario,{
    foreignKey: 'FUNCIONARIO_ID',
    targetId: 'id'
})


//relacion entre funcionario y proyecto
 funcionario.belongsToMany(funcionario_proyecto,{
    foreignKey: 'FUNCIONARIO_ID',
    sourceKey: 'id'
 })
 funcionario_proyecto.belongsToMany(funcionario,{
    foreignKey: 'FUNCIONARIO_ID',
    targetId: 'id'
 })




 //relacion entre funcionario y semilleros
 funcionario.belongsToMany( funcionario_semillero,{
    foreignKey: 'FUNCIONARIO_ID',
    sourceKey: 'id'

 })
 funcionario_semillero.belongsToMany(funcionario,{
    foreignKey: 'FUNCIONARIO_ID',
    targetId: 'id'
 })