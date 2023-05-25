import { sequelize } from "../../db/db.js";
// se importa la base de datos la cual la funcion es que se guarde los modelos que creamos en la base de datos
import { DataTypes } from "sequelize";
// importamos los tipos de datos de la libreria de sequelize

export const producto = sequelize.define(
// creamos una constate que se llame producto y la exportamos con export definimos el nombre de sequelize que es la conexion de la base de datos 
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

    // estos datos son los atributos que se diagramo en el modelo uml
  },
  {
    timestamps: false,
  },
  { sequelize, modelName: "producto",
tableName:"producto" }

// se define sequelize con modelname poniendole el nombre de la tabla 


)

