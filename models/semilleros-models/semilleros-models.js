import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { funcionario_semillero } from "../funcionario-semilleros-models/funcionario-semillero-models.js";
import { semillero_producto } from "../semillero-producto-models/semillero-product-models.js";
import { semillero_proyecto } from "../semillero-proyecto-model/semillero-proyecto-models.js";
import { PRODUCTOS } from "../productos-models/productos-models.js";

export const semilleros=sequelize.define({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    semillero_nombre: {
        type: DataTypes.STRING,


    },
})
 //relacion entre semiileros y funcionarios
semilleros.hasMany( funcionario_semillero,{
    foreignKey: 'semilleroid',
    sourceKey: 'id'

 })
 funcionario_semillero.hasMany(semilleros,{
    foreignKey: 'funcionario_semilleroid',
    targetId: 'id'
 })

 //relacion entre productos y semilleros

 semilleros.hasMany(semillero_producto ,{
    foreignKey: 'semilleroid',
    sourceKey: 'id'

 })
 semillero_producto.hasMany(semilleros,{
    foreignKey: 'semillero_producto',
    targetId: 'id'
 })

 //relacion entre proyectos y semilleros

 PRODUCTOS.hasMany(semillero_proyecto,{
    foreignKey: 'PRODUCTOID',
    sourceKey: 'id'
})

semillero_proyecto.hasMany(PRODUCTOS,{
    foreignKey: 'semillero_proyectoid',
    targetId: 'id'
})