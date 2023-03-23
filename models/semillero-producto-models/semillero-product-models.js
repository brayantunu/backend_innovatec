import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";

export const semillero_producto= sequelize.define('semillero_producto',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    }
},
{
    timestamps: false 
})