import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";


export const puntaje = sequelize.define('puntaje',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
        
    },
    puntaje_puntuacion:{
        type:DataTypes.DOUBLE
    }
},
{
    timestamps:false
})