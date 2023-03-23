import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { SEMILLEROPRODUCTO } from "../semillero-producto-models/semillero-product-models.js";
import { producto_proyecto } from "../producto-proyecto-models/producto-proyecto-models.js";
import { proyecto } from "../proyecto-models/proyecto-models.js";
import { semilleros } from "../semilleros-models/semilleros-models.js";
import { puntaje } from "../puntaje-models/puntaje-models.js";

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



//relacion prodcuto y proyecto
PRODUCTOS.belongsToMany(proyecto,{
    through:producto_proyecto
    // foreignKey: 'PRODUCTOS_ID',
    // sourceKey: 'id'
})

proyecto.belongsToMany(PRODUCTOS,{
    through:producto_proyecto
    // foreignKey: 'PRODUCTOS_ID',
    // sourceKey: 'id'
})


//relacion entre producto y semillero
PRODUCTOS.belongsToMany(semilleros,{
    through:SEMILLEROPRODUCTO
    // foreignKey: 'PRODUCTOS_ID',
    // sourceKey: 'id'
})

semilleros.belongsToMany(PRODUCTOS,{
    through:SEMILLEROPRODUCTO
    // foreignKey: 'PRODUCTOS_ID',
    // targetId: 'id'
})


PRODUCTOS.hasMany(puntaje,{
    foreingKey:'PRODUCTO_ID',
    sourceKey:'PRODUCTO_ID'
})

puntaje.belongsTo(PRODUCTOS,{
    foreingKey:'PRODUCTO_ID',
    targetId:'PRODUCTO_ID'
})


// como hacer un buscador controlador nodejs express