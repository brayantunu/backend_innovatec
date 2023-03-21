import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";

export const SEMILLEROPRODUCTO= sequelize.define('SEMILLEROPRODUCTO',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    }
},
{
    timestamps: false 
})