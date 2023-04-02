import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { semillero_producto } from "../semillero-producto-models/semillero-product-models.js";
import { producto_proyecto } from "../producto-proyecto-models/producto-proyecto-models.js";
import { proyecto } from "../proyecto-models/proyecto-models.js";
import { semilleros } from "../semilleros-models/semilleros-models.js";
import { puntaje } from "../puntaje-models/puntaje-models.js";


export const producto = sequelize.define('producto',{
    producto_id:{
 
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
        
    },
    productos_titulo:{
        type:DataTypes.STRING
    },
    productos_ano:{
        type:DataTypes.DATE
    },
    productos_url:{
        type:DataTypes.STRING(100)
    },
    productos_tipo:{
        type:DataTypes.STRING
    },
    productos_subtipo:{
           type:DataTypes.STRING
    },
    productos_detalle:{
        type:DataTypes.STRING(400)
    },
    productos_idioma:{
        type:DataTypes.STRING
    },
    productos_linea:{
        type:DataTypes.STRING
    }
},
{
    timestamps:false
})



//relacion prodcuto y proyecto
producto.belongsToMany(proyecto,{
    through:producto_proyecto
   
})

proyecto.belongsToMany(producto,{
    through:producto_proyecto

})


//relacion entre producto y semillero
producto.belongsToMany(semilleros,{
    through:semillero_producto

})

semilleros.belongsToMany(producto,{
    through:semillero_producto

})


producto.hasMany(puntaje,{
    foreingKey:'producto_id',
    sourceKey:'producto_id'
})

puntaje.belongsTo(producto,{
    foreingKey:'producto_id',
    targetId:'producto_id'
})


// como hacer un buscador controlador nodejs express