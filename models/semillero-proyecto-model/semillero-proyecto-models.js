import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";

export const SEMILLEROPROYECTO= sequelize.define('SEMILLEROPROYECTO',{
    id1: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    }
},
{
    timestamps: false 
})