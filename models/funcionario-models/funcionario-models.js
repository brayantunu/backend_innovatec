import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { funcionario_producto } from "../funcionario-producto-models/funcionario-producto.-models.js";
import { funcionario_proyecto } from "../funcionario-proyecto/funcionario-proyecto-models.js";
import { funcionario_semillero } from "../funcionario-semilleros-models/funcionario-semillero-models.js";
import { producto } from "../productos-models/productos-models.js";
import { proyecto } from "../proyecto-models/proyecto-models.js";
import { semilleros } from "../semilleros-models/semilleros-models.js";


export const funcionario = sequelize.define('funcionario', {
    funcionario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    funcionario_iden: {
        type: DataTypes.INTEGER
    },

    funcionario_nombre: {
        type: DataTypes.STRING
    },

    funcionario_apellido: {
        type: DataTypes.STRING
    },

    funcionario_correo: {
        type: DataTypes.STRING
    },

    funcionario_contraseña: {
        type: DataTypes.STRING
    },

    funcionario_telefono: {
        type: DataTypes.BIGINT
    },

    funcionario_administrador: {
        type: DataTypes.BOOLEAN, 
        allowNull: false
    }
},
    {
        timestamps: false
    })


//relacion entre funcionario y producto
funcionario.belongsToMany(producto, {
    through: funcionario_producto,
 
});

producto.belongsToMany(funcionario, {
    through: funcionario_producto,
  
});


//relacion entre funcionario y proyecto
funcionario.belongsToMany(proyecto, {
    through: funcionario_proyecto,
   
});
proyecto.belongsToMany(funcionario, {
    through: funcionario_proyecto,

});




//relacion entre funcionario y semilleros
funcionario.belongsToMany(semilleros, {
    through: funcionario_semillero
   

})
semilleros.belongsToMany(funcionario, {
    through: funcionario_semillero
  
})