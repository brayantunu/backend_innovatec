import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";


export const PRODUCTOS = sequelize.define('PRODUCTOS',{
    PRODUCTO_ID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
        
    },
    PRODUCTO_TITULO:{
        type:DataTypes.STRING(200)
    },
    PRODUCTOS_ANO:{
        type:DataTypes.DATE
    },
    PRODUCTOS_URL:{
        type:DataTypes.STRING(100)
    },
    PRODUCTOS_TIPO:{
        type:DataTypes.REAL
    },
    PRODUCTOS_SUBTIPO:{
           type:DataTypes.REAL
    },
    PRODUCTOS_DETALLE:{
        type:DataTypes.STRING(400)
    },
    PRODUCTOS_IDIOMA:{
        type:DataTypes.REAL
    },
    PRODUCTOS_LINEA:{
        type:DataTypes.REAL
    }
},
{
    timestamps:false
})