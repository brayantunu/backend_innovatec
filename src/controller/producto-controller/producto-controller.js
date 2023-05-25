import { producto } from "../../models/productos-models/productos-models.js";
// se importa los modelos de productos a los controladores para ser creados
import { sequelize } from "../../db/db.js";
// se hace la conexion con la base de datos esto sirve para hacer las consultas de los crud de obtener para realizar la consulta por query
const Op = Sequelize.Op; 
// 
import { Sequelize } from "sequelize";
// permite manipular varios modelos o tablas de sql
import readXlsxFile from "read-excel-file/node";
import fs from "fs";
import { QueryTypes } from "sequelize";
import multer from "multer";
import path from "path";

export const getproducto = async (req, res) => {

  // creamos una constante y export la const getproducto para ser utilizado por el frontend o servicios
  try {
    const new_producto = await sequelize.query(`SELECT productos.*,puntajes.*
   FROM productos JOIN puntajes ON puntajes.producto_id = productos.producto_id`);
// hacemos la consulta en una promesa try catch lo que permite mediante en una variable guarda los objetos 
    res.status(200).json({ succes: true, message: "listado", new_producto });
    // este permite ver el estado de la peticion del servicio en este caso en 200 significa 200 mostrando un mensaje listado con obtencion de los datos solcitados por el cliente 
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
    productos_idioma,
    productos_linea,
    productos_autor,
  } = req.body;
  console.log(productos_titulo)
  try {
    const new_producto = await producto.create({
      productos_titulo,
      productos_ano,
      productos_tipo,
      productos_subtipo,
      productos_idioma,
      productos_linea,
      productos_imagen,
      productos_autor,
    });
    res
      .status(200)
      .json({ message: "se creo el producto correctamente", new_producto });
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
      productos_idioma,
      productos_linea,
      productos_subtipo,
      productos_titulo,
      productos_tipo,
      producto_imagen,
    } = req.body;

    const PRODUCTO = await producto.findByPk(producto_id);
    PRODUCTO.productos_titulo = productos_titulo;
    PRODUCTO.productos_ano = productos_ano;
    PRODUCTO.productos_tipo = productos_tipo;
    PRODUCTO.productos_subtipo = productos_subtipo;
    PRODUCTO.productos_idioma = productos_idioma;
    PRODUCTO.productos_linea = productos_linea;
    PRODUCTO.producto_imagen = producto_imagen;
    await producto.save();
    res.status(201).json({
      message: "se ha actualizado el proyecto",
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
    // res.sendStatus(204)
    // api.setEstado("success", "success", "se ah creado exitosamente la especie")
    // res.json("eliminado")
    res
      .status(200)
      .json({ message: "projecto eliminado correctamente", producto_id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const get_producto_id = async (req, res) => {
  const { producto_id } = req.params;
  try {
    const new_producto = await producto.findOne({
      where: { producto_id },
    });
    res.status(200).json({ message: "item obtenido por id", new_producto });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// export const searchProducts = async (req, res, next) => {
//   try {
//     const titulo = req.query.q;
//     const productos = await producto.findAll({
//       where: {
//         productos_titulo: {
//           [Op.iLike]: "%" + titulo + "%",
//         },
//       },
//     });
//     if (productos.length === 0) {
//       const error = new Error(
//         `No se encontraron productos que coincidan con '${titulo}'`
//       );
//       error.statusCode = 404;
//       throw error;
//     }
//     res
//       .status(200)
//       .json({ message: "item obtenido por productos_titulo", productos });
//   } catch (error) {
//     // return res.status(500).json({ message: error.message })
//     next(error);
//   }
// };



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
      `SELECT *
      FROM productos
      INNER JOIN semillero_productos
      on semillero_productos.id_producto = productos.producto_id
	  INNER JOIN semilleros
	  on semilleros.semillero_id = semillero_productos.id_semillero
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
      `SELECT *
      FROM productos
      INNER JOIN semillero_productos
      on semillero_productos.id_producto = productos.producto_id
	  INNER JOIN semilleros
	  on semilleros.semillero_id = semillero_productos.id_semillero
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
  // http://localhost:3000/producto?productos_ano[]=3021
// este es la ruta del controlador de años
  const buscaraño = req.query.productos_ano;

console.log(buscaraño)
  if (!Array.isArray(buscaraño)) {
    return res
      .status(400)
      .send("Los autores deben ser proporcionados como un array");
  }

  const filtroaños = buscaraño.map((ano) => `%${ano}%`);

  try {
    const producto = await sequelize.query(
      `SELECT *
      FROM productos
      INNER JOIN semillero_productos
      on semillero_productos.id_producto = productos.producto_id
	  INNER JOIN semilleros
	  on semilleros.semillero_id = semillero_productos.id_semillero
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



// filtroProducto?productos_autores=bra&productos_autores=er



// export const filtroProducto = async (req, res) => {
//   try {
//     const productosAutores = req.query.productos_autores;
//     console.log(productosAutores);

//     if (!productosAutores || !Array.isArray(productosAutores)) {
//       throw new Error("Los parámetros de autores son inválidos");
//     }

//     const filtrosAutores = productosAutores.map(autor => `%${autor}%`);
//     console.log(filtrosAutores);

//     const autores = await producto.findAll({
//       where: {
//         productos_autor: {
//           [Sequelize.Op.or]: filtrosAutores,
//         },
//       },
//     });

//     if (autores.length === 0) {
//       return res.status(404).send("No se encontraron autores");
//     }

//     res.send(autores);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error al obtener los autores");
//   }
// };

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
      `SELECT *
      FROM productos
      INNER JOIN funcionario_productos
      on funcionario_productos.id_producto = productos.producto_id
      INNER JOIN funcionarios
      on funcionarios.funcionario_id = funcionario_productos.id_funcionario
      INNER JOIN producto_proyectos
      on producto_proyectos.id_producto = productos.producto_id
      INNER JOIN proyectos
      on proyectos.proyecto_id = producto_proyectos.id_producto
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
