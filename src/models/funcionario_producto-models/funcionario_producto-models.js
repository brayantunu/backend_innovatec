import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";


export const funcionario_producto = sequelize.define('funcionario_producto',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
        
    },
    id_producto:{
        type:DataTypes.DOUBLE
    },
    id_funcionario:{
        type:DataTypes.DOUBLE
    }

},
{
    timestamps:false
}
,
{ sequelize, modelName: 'funcionario_producto' })
