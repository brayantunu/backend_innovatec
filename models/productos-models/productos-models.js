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
    },
    productos_ano: {
      type: DataTypes.DATE,
    },
    productos_tipo: {
      type: DataTypes.STRING,
    },
    productos_subtipo: {
      type: DataTypes.STRING,
    },
    productos_detalle: {
      type: DataTypes.STRING(400),
    },
    productos_idioma: {
      type: DataTypes.STRING,
    },
    productos_linea: {
      type: DataTypes.STRING,
    },
    productos_imagen: {
      type: DataTypes.BLOB('long'),
    },
    productos_autor: {
      type: DataTypes.STRING,
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
