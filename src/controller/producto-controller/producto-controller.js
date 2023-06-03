import { producto } from "../../models/productos-models/productos-models.js";
import { funcionario_producto } from "../../models/funcionario_producto-models/funcionario_producto-models.js";
// se importa los modelos de productos a los controladores para ser creados
import { sequelize } from "../../db/db.js";
// se hace la conexion con la base de datos esto sirve para hacer las consultas de los crud de obtener para realizar la consulta por query
//
import { Sequelize } from "sequelize";
// permite manipular varios modelos o tablas de sql
import readXlsxFile from "read-excel-file/node";
import fs from "fs";
export const getproducto = async (req, res) => {
  // creamos una constante y export la const getproducto para ser utilizado por el frontend o servicios
  try {
    const nuevo_producto = await producto.findAll();
    //       await sequelize.query(`SELECT productos.productos_titulo,puntajes.puntaje_puntuacion
    // FROM productos JOIN puntajes ON puntajes.producto_id = productos.producto_id`);
    const new_producto = await sequelize.query(`SELECT productos.*,puntajes.*
   FROM productos JOIN puntajes ON puntajes.producto_id = productos.producto_id`);
    // hacemos la consulta en una promesa try catch lo que permite mediante en una variable guarda los objetos
    res.status(200).json({ succes: true, message: "listado", new_producto });
    // este permite ver el estado de la peticion del servicio en este caso en 200 significa 200 mostrando un mensaje listado con obtencion de los datos solcitados por el cliente
    res.status(200).json({ succes: true, message: "listado", nuevo_producto });
  } catch (error) {
    return res.status(400).json({ message: error.message });
    // este permite si la solicitud del cliente es erronea el servicio no sea mostrado al cliente mostrando un mensaje que no ha sido listado
  }
};

export const create_producto = async (req, res) => {
  const {
    productos_imagen,
    productos_titulo,
    productos_ano,
    productos_tipo,
    productos_subtipo,
    productos_linea,
    productos_autor,
    proyecto_fk,
    semillero_fk,
    id_producto,
    id_funcionario
  } = req.body;
  try {
  
    const nuevo_producto = await producto.create({
      productos_titulo,
      productos_ano,
      productos_tipo,
      productos_subtipo,
      productos_linea,
      productos_imagen,
      productos_autor,
      proyecto_fk,
      semillero_fk
    });
    const nuevo_funcionario_producto = await funcionario_producto.create({
      id_producto,
      id_funcionario
    })
    res
      .status(200)
      .json({ message: "se creo el producto correctamente ",nuevo_producto,nuevo_funcionario_producto});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// const storage = multer.diskStorage({
//   destination:path.join(dirname, "../../images"),
//   filename:(req,file,cb) =>{
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// })

// controlador de cargar imagen en el crud de crear
// https://www.youtube.com/watch?v=Bj3Gcpohbu4

export const update_producto = async (req, res) => {
  try {
    const { producto_id } = req.params;
    const {
      productos_ano,
      productos_linea,
      productos_subtipo,
      productos_titulo,
      productos_tipo,
      producto_imagen,
    } = req.body;
    const productos = await producto.findByPk(producto_id);
    productos.productos_titulo = productos_titulo;
    productos.productos_ano = productos_ano;
    productos.productos_tipo = productos_tipo;
    productos.productos_subtipo = productos_subtipo;
    productos.productos_linea = productos_linea;
    productos.producto_imagen = producto_imagen;
    await productos.save();
    res.status(201).json({
      message: "se ha actualizado el producto",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const delete_producto = async (req, res) => {
  try {
    const { producto_id } = req.params;
    await producto.destroy({
      where: {
        producto_id,
      },
    });
    res
      .status(200)
      .json({ message: "producto eliminado correctamente", producto_id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const get_producto_id = async (req, res) => {
  const { producto_id } = req.params;
  try {
    const nuevo_producto = await producto.findOne({
      where: { producto_id },
    });
    res.status(200).json({ message: "item obtenido por id", nuevo_producto });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const filtrosemilleros = async (req, res) => {
  const semilleroNombre = req.query.semillero_nombre;

  if (!Array.isArray(semilleroNombre)) {
    return res
      .status(400)
      .send("Los autores deben ser proporcionados como un array");
  }

  const filtrosSemillero = semilleroNombre.map((autor) => `%${autor}%`);

  try {
    const semillero = await sequelize.query(
      `SELECT productos.*, funcionarios.*,proyectos.*,semilleros.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.id_producto
      JOIN funcionarios
      ON funcionarios.funcionario_id = funcionario_productos.id_funcionario
      JOIN  semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN  proyectos
      ON proyectos.proyecto_id = productos.proyecto_fk      
	   WHERE semilleros.semillero_nombre LIKE ANY(ARRAY[:filtrosSemillero])`,
      {
        replacements: { filtrosSemillero },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (semillero.length === 0) {
      return res.status(404).send("No se encontraron autores");
    }
    res.send(semillero);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los autores");
  }
};

export const tipoproducto = async (req, res) => {
  const productostipos = req.query.productos_tipo;

  if (!Array.isArray(productostipos)) {
    return res
      .status(400)
      .send("Los autores deben ser proporcionados como un array");
  }
  const filtrosproducto = productostipos.map((autor) => `%${autor}%`);
  try {
    const producto = await sequelize.query(
      `SELECT productos.*, funcionarios.*,proyectos.*,semilleros.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.id_producto
      JOIN funcionarios
      ON funcionarios.funcionario_id = funcionario_productos.id_funcionario
      JOIN  semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN  proyectos
      ON proyectos.proyecto_id = productos.proyecto_fk      
	   WHERE productos.productos_tipo LIKE ANY(ARRAY[:filtrosproducto])`,
      {
        replacements: { filtrosproducto },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (producto.length === 0) {
      return res.status(404).send("No se encontraron autores");
    }

    res.send(producto);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los autores");
  }
};

export const filtroaño = async (req, res) => {
  const buscaraño = req.query.productos_ano;

  console.log(buscaraño);
  if (!Array.isArray(buscaraño)) {
    return res
      .status(400)
      .send("Los autores deben ser proporcionados como un array");
  }
  const filtroaños = buscaraño.map((ano) => `%${ano}%`);

  try {
    const producto = await sequelize.query(
      `SELECT productos.*, funcionarios.*,proyectos.*,semilleros.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.id_producto
      JOIN funcionarios
      ON funcionarios.funcionario_id = funcionario_productos.id_funcionario
      JOIN  semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN  proyectos
      ON proyectos.proyecto_id = productos.proyecto_fk      
	   WHERE productos.productos_ano LIKE ANY(ARRAY[:filtroaños])`,
      {
        replacements: { filtroaños },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (producto.length === 0) {
      return res.status(404).send("No se encontraron autores");
    }

    res.send(producto);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los autores");
  }
};

export const upload = async (req, res) => {
  readXlsxFile(fs.createReadStream("./excel/input.xls")).then((rows) => {
    console.log(rows);
  });
};

export const searchProducts = async (req, res, next) => {
  try {
    const { query } = req.query;
    console.log(query);
    const productos = await sequelize.query(
      `SELECT productos.*, funcionarios.*,proyectos.*,semilleros.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.id_producto
      JOIN funcionarios
      ON funcionarios.funcionario_id = funcionario_productos.id_funcionario
      JOIN  semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN  proyectos
      ON proyectos.proyecto_id = productos.proyecto_fk
      WHERE productos.productos_titulo ILIKE :query`,
      {
        replacements: { query: `%${query}%` },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    console.log(productos);
    res.status(200).json({ productos });
  } catch (error) {
    next(error);
  }
};
