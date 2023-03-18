import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";

export const producto_proyecto= sequelize.define('producto_proyecto',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    }
},
{
    timestamps: false 
})