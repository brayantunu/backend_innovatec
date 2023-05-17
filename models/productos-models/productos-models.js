import { sequelize } from "../../db/db.js";
import { DataTypes } from "sequelize";
import { funcionario } from "../funcionario-models/funcionario-models.js";


export const producto = sequelize.define(
  "producto",
  {
    producto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productos_titulo: {
      type: DataTypes.STRING,
      allowNull: false


    },
    productos_ano: {
      type: DataTypes.DATE,
      allowNull: false

    },
    productos_tipo: {
      type: DataTypes.STRING,
      allowNull: false

    },
    productos_subtipo: {
      type: DataTypes.STRING,
      allowNull: false

    },
    productos_idioma: {
      type: DataTypes.STRING,
      allowNull: false

    },
    productos_linea: {
      type: DataTypes.STRING,
      allowNull: false

    },
    productos_imagen: {
      type: DataTypes.BLOB('long'),
      allowNull: false

    },
    productos_autor: {
      type: DataTypes.STRING,
      allowNull: false

    }
  },
  {
    timestamps: false,
  },
  { sequelize, modelName: "producto",
tableName:"producto" }
)

// productos.belongsToMany(funcionario, {
//   foreignKey: 'producto_id',
//   otherKey: 'funcionario_id',
// })
