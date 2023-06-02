import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";

export const producto_programa = sequelize.define('producto_programa', {
    producto_programa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fk_programa: {
        type:DataTypes.INTEGER,
        foreignKey:true
    } 
},
    { sequelize,
        tableName:'producto_programa',
        modelName: 'producto_programa' },
    {
        timestamps: false
    }

)
