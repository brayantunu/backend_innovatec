import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { funcionario } from "../funcionario-models/funcionario-models.js";
import { producto } from "../productos-models/productos-models.js";

export const funcionario_producto = sequelize.define('funcionario_producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    id_producto:{
        type:DataTypes.INTEGER,
        foreignKey:true
        // references:{
        //     model:'productos',
        //     key:'producto_id'
        // }
    },
    id_funcionario:{
        type:DataTypes.INTEGER,
        foreignKey:true
        // references:{
        //     model:'funcionarios',
        //     key:'funcionario_id'
        // }
     }
},
{
    timestamps: true
},

)

funcionario.belongsToMany(producto, {
    through: 'funcionario_producto',
    foreignKey: 'id_funcionario',
  });
  
  producto.belongsToMany(funcionario, {
    through: 'funcionario_producto',
    foreignKey: 'id_producto',
  });
  