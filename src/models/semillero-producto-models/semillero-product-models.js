import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import {producto} from "../productos-models/productos-models.js"
import { semilleros } from "../semilleros-models/semilleros-models.js"
export const semillero_producto= sequelize.define('semillero_producto',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    id_producto:{
        type:DataTypes.INTEGER,
        foreignKey:true
    },
    id_semillero:{
        type:DataTypes.INTEGER,
        foreignKey:true
    }
},
{
    timestamps: false 
})


producto.belongsToMany(semilleros, {
    through: 'semillero_producto',
    foreignKey: 'id_producto',
  });

  semilleros.belongsToMany(producto, {
    through: 'semillero_producto',
    foreignKey: 'id_semillero',
  });
  