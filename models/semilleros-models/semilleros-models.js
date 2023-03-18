import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { funcionario_semillero } from "../funcionario-semilleros-models/funcionario-semillero-models.js";
import { semillero_producto } from "../semillero-producto-models/semillero-product-models.js";
import { semillero_proyecto } from "../semillero-proyecto-model/semillero-proyecto-models.js";
import { PRODUCTOS } from "../productos-models/productos-models.js";

export const semilleros=sequelize.define('semilleros',{
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
semilleros.belongsToMany( funcionario_semillero,{
    foreignKey: 'SEMILLEROS_ID',
    sourceKey: 'id'

 })
 funcionario_semillero.belongsToMany(semilleros,{
    foreignKey: 'SEMILLEROS_ID',
    targetId: 'id'
 })

 //relacion entre productos y semilleros

 semilleros.belongsToMany(semillero_producto ,{
    foreignKey: 'SEMILLEROS_ID',
    sourceKey: 'id'

 })
 semillero_producto.belongsToMany(semilleros,{
    foreignKey: 'SEMILLEROS_ID',
    targetId: 'id'
 })

 //relacion entre proyectos y semilleros

 semilleros.belongsToMany(semillero_proyecto,{
    foreignKey: 'SEMILLERO_ID',
    sourceKey: 'id'
})

semillero_proyecto.belongsToMany(semilleros,{
    foreignKey: 'semillero_proyectoid',
    targetId: 'id'
})