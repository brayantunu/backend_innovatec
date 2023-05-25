import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";

export const programas = sequelize.define('programas', {
    programa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_programa: {
        type: DataTypes.STRING ,
        unique:true,
        allowNull: false

       
    }  
},
    { sequelize,
        tableName:'programas',
        modelName: 'programa' },
    {
        timestamps: false
    }

)
