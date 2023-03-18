import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { funcionario_producto } from "../funcionario-producto-models/funcionario-producto-models.js";
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
PRODUCTOS.belongsToMany(funcionario_producto,{
    foreignKey: 'PRODUCTOS_ID',
    sourceKey: 'id'
})

funcionario_producto.belongsToMany(PRODUCTOS,{
    foreignKey: 'PRODUCTOS_ID',
    targetId: 'id'
})

//relacion prodcuto y proyecto
PRODUCTOS.belongsToMany(producto_proyecto,{
    foreignKey: 'PRODUCTOS_ID',
    sourceKey: 'id'
})

producto_proyecto.belongsToMany(PRODUCTOS,{
    foreignKey: 'PRODUCTOS_ID',
    sourceKey: 'id'
})


//relacion entre producto y semillero
PRODUCTOS.belongsToMany(semillero_producto,{
    foreignKey: 'PRODUCTOS_ID',
    sourceKey: 'id'
})

semillero_producto.belongsToMany(PRODUCTOS,{
    foreignKey: 'PRODUCTOS_ID',
    targetId: 'id'
})

