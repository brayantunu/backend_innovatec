import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";

export const funcionario_proyecto= sequelize.define('funcionario_proyecto',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    }
},
{
    timestamps: false 
})