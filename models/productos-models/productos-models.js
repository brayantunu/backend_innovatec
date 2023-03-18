import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { funcionario_producto } from "../funcionario-producto-models/funcionario-producto.-models.js";
import { semillero_producto } from "../semillero-producto-models/semillero-product-models.js";
import { producto_proyecto } from "../producto-proyecto-models/producto-proyecto-models.js";
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
        type:DataTypes.STRING
    },
    PRODUCTOS_SUBTIPO:{
           type:DataTypes.STRING
    },
    PRODUCTOS_DETALLE:{
        type:DataTypes.STRING(400)
    },
    PRODUCTOS_IDIOMA:{
        type:DataTypes.STRING
    },
    PRODUCTOS_LINEA:{
        type:DataTypes.STRING
    }
},
{
    timestamps:false
})

//relacion entre funcionario y productos
PRODUCTOS.hasMany(funcionario_producto,{
    foreignKey: 'PRODUCTOSID',
    sourceKey: 'id'
})

funcionario_producto.hasMany(PRODUCTOS,{
    foreignKey: 'funcionario_productoid',
    targetId: 'id'
})

//relacion prodcuto y proyecto
PRODUCTOS.hasMany (producto_proyecto,{
    foreignKey: 'proyectoid',
    sourceKey: 'id'
})

producto_proyecto.hasMany (PRODUCTOS,{
    foreignKey: 'producto_proyectoid',
    sourceKey: 'id'
})


//relacion entre producto y semillero
PRODUCTOS.hasMany(semillero_producto,{
    foreignKey: 'PRODUCTOSID',
    sourceKey: 'id'
})

semillero_producto.hasMany(PRODUCTOS,{
    foreignKey: 'semillero_productoid',
    targetId: 'id'
})

