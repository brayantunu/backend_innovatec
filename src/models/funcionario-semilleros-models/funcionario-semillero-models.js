import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { funcionario } from "../funcionario-models/funcionario-models.js";
import {semilleros} from "../semilleros-models/semilleros-models.js"
export const funcionario_semillero= sequelize.define('funcionario_semillero',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    id_funcionario:{
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

funcionario.belongsToMany(semilleros, {
    through: 'funcionario_semillero',
    foreignKey: 'id_funcionario',
  });

  semilleros.belongsToMany(funcionario, {
    through: 'funcionario_semillero',
    foreignKey: 'id_semillero',
  });
  