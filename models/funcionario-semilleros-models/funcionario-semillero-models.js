import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";

export const funcionario_semillero= sequelize.define('funcionario_semillero',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    }
},
{
    timestamps: false 
})