import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import {funcionario} from "../funcionario-models/funcionario-models.js"
import {proyecto} from "../proyecto-models/proyecto-models.js"

export const funcionario_proyecto= sequelize.define('funcionario_proyecto',{
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_funcionario:{
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

funcionario.belongsToMany(proyecto, {
    through: 'funcionario_proyecto',
    foreignKey: 'id_funcionario',
  });
  
  proyecto.belongsToMany(funcionario, {
    through: 'funcionario_proyecto',
    foreignKey: 'id_proyecto',
  });
  