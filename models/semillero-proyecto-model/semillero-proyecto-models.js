import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";

export const semillero_proyecto= sequelize.define('semillero_proyecto',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    }
},
{
    timestamps: false 
})