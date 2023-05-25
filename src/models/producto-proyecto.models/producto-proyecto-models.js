import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import {producto} from "../productos-models/productos-models.js"
import {proyecto} from "../proyecto-models/proyecto-models.js"
export const producto_proyecto= sequelize.define('producto_proyecto',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    id_producto:{
        type:DataTypes.INTEGER,
        foreignKey:true
    },
    id_proyecto:{
        type:DataTypes.INTEGER,
        foreignKey:true
    }
},
{
    timestamps: false 
})

producto.belongsToMany(proyecto, {
    through: 'producto_proyecto',
    foreignKey: 'id_producto',
  });

  proyecto.belongsToMany(producto, {
    through: 'producto_proyecto',
    foreignKey: 'id_proyecto',
  });
  