import Sequelize from "sequelize";
import {DB_PORT,DB_USER,DB_PASSWORD,DB_DATABASE} from '../../config.js'
export const sequelize = new Sequelize(
    DB_DATABASE,//nombre de la base de datos
    DB_USER,//usuario
    DB_PASSWORD,//contraseña de la base de datos
    {
        host: 'localhost',
        dialect: 'postgres',
        port: DB_PORT ,
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },

    })

// se importa la libreria de sequelize para hacer la conecxion mas fiable al servicio


// export const sequelize = new Sequelize({

//   host: dbHost,
//   port: dbPort,
//   user: dbUser,
//   password: dbPassword,
//   database: dbName


  // "final" es el nombre de la base de datos
  // "postgres" es el nombre de usuario que se ha creado con el perfil de la base de datos de postgres
  // el numero es la contraseña de usuario que esta relacionada el perfil del usuarios de postgress
  // host: "localhost",
  // host es la conexion de la base de datos al servicio del backend
  // dialect: "postgres",
  // dialect que motor de base de datos se va ah utilizar
// });

// creamos la conecxion del proyecto a la base de datos de postgress