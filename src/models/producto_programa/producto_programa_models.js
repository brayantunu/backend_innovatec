import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import {producto} from "../productos-models/productos-models.js"
import{programas} from "../programa-models/programa-models.js"

export const producto_programa = sequelize.define('producto_programa', {
    producto_programa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fk_programa: {
        type:DataTypes.INTEGER,
        foreignKey:true
    },
    fk_productos: {
        type:DataTypes.INTEGER,
        foreignKey:true
    } 
},
    { sequelize,
        tableName:'producto_programa',
        modelName: 'producto_programa' },
    {
        timestamps: false
    }

)
programas.belongsToMany(producto, {
    through: 'producto_programa',
    foreignKey: 'fk_programa',
  });
  
  producto.belongsToMany(programas, {
    through: 'producto_programa',
    foreignKey: 'fk_productos',
  });