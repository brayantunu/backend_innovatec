import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import {proyecto} from "../proyecto-models/proyecto-models.js"
import {semilleros} from "../semilleros-models/semilleros-models.js"
export const semillero_proyecto= sequelize.define('semillero_proyecto',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    id_semillero:{
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


proyecto.belongsToMany(semilleros, {
    through: 'semillero_proyecto',
    foreignKey: 'id_proyecto',
  });

  semilleros.belongsToMany(proyecto, {
    through: 'semillero_proyecto',
    foreignKey: 'id_semillero',
  });
  