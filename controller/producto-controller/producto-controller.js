import { producto } from "../../models/productos-models/productos-models.js";
import { sequelize } from "../../db/db.js";
const Op = Sequelize.Op;
import { Sequelize } from "sequelize";
import readXlsxFile from "read-excel-file/node";
import fs from "fs";
import { QueryTypes } from "sequelize";

export const getproducto = async (req, res) => {
  try {
    const new_producto = await producto.findAll();
    //       await sequelize.query(`SELECT productos.productos_titulo,puntajes.puntaje_puntuacion
    // FROM productos JOIN puntajes ON puntajes.producto_id = productos.producto_id`);

    res.status(200).json({ succes: true, message: "listado", new_producto });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



export const create_producto = async (req, res) => {
  const {
    productos_imagen,
    productos_titulo,
    productos_ano,
    productos_tipo,
    productos_subtipo,
    productos_detalle,
    productos_idioma,
    productos_linea,
    productos_autor,
  } = req.body;
  try {
    const new_producto = await producto.create({
      productos_titulo,
      productos_ano,
      productos_detalle,
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



export const update_producto = async (req, res) => {
  try {
    const { producto_id } = req.params;
    const {
      productos_ano,
      productos_detalle,
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
    PRODUCTO.productos_detalle = productos_detalle;
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



export const searchProducts = async (req, res, next) => {
  try {
    const titulo = req.query.q;
    const productos = await producto.findAll({
      where: {
        productos_titulo: {
          [Op.iLike]: "%" + titulo + "%",
        },
      },
    });
    if (productos.length === 0) {
      const error = new Error(
        `No se encontraron productos que coincidan con '${titulo}'`
      );
      error.statusCode = 404;
      throw error;
    }
    res
      .status(200)
      .json({ message: "item obtenido por productos_titulo", productos });
  } catch (error) {
    // return res.status(500).json({ message: error.message })
    next(error);
  }
};



export const filtroProducto = async (req, res) => {
  const productosAutores = req.query.productos_autores;

  if (!Array.isArray(productosAutores)) {
    return res
      .status(400)
      .send("Los autores deben ser proporcionados como un array");
  }

  const filtrosAutores = productosAutores.map((autor) => `%${autor}%`);

  try {
    const autores = await sequelize.query(
      "SELECT * FROM productos WHERE productos_autor LIKE ANY(ARRAY[:filtrosAutores])",
      {
        replacements: { filtrosAutores },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (autores.length === 0) {
      return res.status(404).send("No se encontraron autores");
    }

    res.send(autores);
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

export const searchProducts1 = async (req, res, next) => {
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
