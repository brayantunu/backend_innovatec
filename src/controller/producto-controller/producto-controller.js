import { producto } from "../../models/productos-models/productos-models.js";
import { funcionario_producto } from "../../models/funcionario_producto-models/funcionario_producto-models.js";
import { producto_programa } from "../../models/producto_programa/producto_programa_models.js";
// se importa los modelos de productos a los controladores para ser creados
import { sequelize } from "../../db/db.js";
import { funcionario } from "../../models/funcionario-models/funcionario-models.js";
import { programas } from "../../models/programa-models/programa-models.js";
import { semilleros } from "../../models/semilleros-models/semilleros-models.js";

// se hace la conexion con la base de datos esto sirve para hacer las consultas de los crud de obtener para realizar la consulta por query
const Op = Sequelize.Op;

import { Sequelize } from "sequelize";
// permite manipular varios modelos o tablas de sql
import readXlsxFile from "read-excel-file/node";
import fs from "fs";

import multer from "multer";
import path from "path";

import { fileURLToPath } from 'url';
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);


export const getData = async (req, res) => {
  try {
    const { option } = req.params;
    console.log(option);
    let data;

    if (option === 'semilleros') {
      data = await producto.count({
        attributes: ['semillero_fk'],
        group: ['semillero_fk']
      });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los datos.' });
  }
};
export const getproducto = async (req, res) => {
  try {
    const nuevo_producto = await sequelize.query(
      `SELECT productos.producto_id, productos.producto_titulo, productos.producto_imagen, productos.producto_ano, productos.producto_tipo, productos.producto_subtipo, productos.producto_url,
        ARRAY_AGG(DISTINCT funcionario.funcionario_id) AS funcionarios_ids,
        ARRAY_AGG(DISTINCT funcionario.funcionario_nombre) AS funcionarios_nombres,
        ARRAY_AGG(DISTINCT funcionario.funcionario_apellido) AS funcionarios_apellidos,
        ARRAY_AGG(DISTINCT funcionario.funcionario_correo) AS funcionarios_correos,
        semilleros.*,
        productos.proyecto_fk,
        proyecto.proyecto_id, proyecto.proyecto_codigo, proyecto.proyecto_linea, proyecto.proyecto_nombre, proyecto.proyecto_presupuesto,
        ARRAY_AGG(DISTINCT programa.programa_id) AS programas_ids,
        ARRAY_AGG(DISTINCT programa.programa_nombre) AS programas_nombres
      FROM productos
      JOIN funcionario_productos ON productos.producto_id = funcionario_productos.producto_fk
      JOIN funcionario ON funcionario.funcionario_id = funcionario_productos.funcionario_fk
      JOIN semilleros ON semilleros.semillero_id = productos.semillero_fk
      JOIN proyecto ON proyecto.proyecto_id = productos.proyecto_fk
      JOIN producto_programa ON producto_programa.productos_fk = productos.producto_id
      JOIN programa ON programa.programa_id = producto_programa.programa_fk
      GROUP BY productos.producto_id, semilleros.semillero_id, semilleros.semillero_nombre, productos.proyecto_fk, proyecto.proyecto_id, proyecto.proyecto_codigo, proyecto.proyecto_linea, proyecto.proyecto_nombre, proyecto.proyecto_presupuesto`
    );

    const productos = nuevo_producto[0];
    const result = productos.map((producto) => ({
      producto_id: producto.producto_id,
      producto_imagen: producto.producto_imagen,
      producto_titulo: producto.producto_titulo,
      producto_ano: producto.producto_ano,
      producto_tipo: producto.producto_tipo,
      producto_subtipo: producto.producto_subtipo,
      producto_url: producto.producto_url,
      funcionarios: producto.funcionarios_ids.map((funcionarioId, index) => ({
        funcionario_id: funcionarioId,
        funcionario_nombre: producto.funcionarios_nombres[index],
        funcionario_apellido: producto.funcionarios_apellidos[index],
        funcionario_correo: producto.funcionarios_correos[index],
      })),
      semillero: {
        semillero_id: producto.semillero_id,
        semillero_nombre: producto.semillero_nombre,
      },
      proyecto: {
        proyecto_id: producto.proyecto_id,
        proyecto_codigo: producto.proyecto_codigo,
        proyecto_linea: producto.proyecto_linea,
        proyecto_nombre: producto.proyecto_nombre,
        proyecto_presupuesto: producto.proyecto_presupuesto,
      },
      programas: producto.programas_ids.map((programaId, index) => ({
        programa_id: programaId,
        programa_nombre: producto.programas_nombres[index],
      })),
    }));

    res.status(200).json({
      success: true,
      message: "Listado de productos",
      productos: result,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};




//   try {
//     const nuevo_producto = await producto.findAll();
//     //       await sequelize.query(`SELECT productos.productos_titulo,puntajes.puntaje_puntuacion
//     // FROM productos JOIN puntajes ON puntajes.producto_id = productos.producto_id`);

//     //   const new_producto = await sequelize.query(`SELECT productos.*,puntajes.*
//     //  FROM productos JOIN puntajes ON puntajes.producto_id = productos.producto_id`);
//     // hacemos la consulta en una promesa try catch lo que permite mediante en una variable guarda los objetos 
//     res.status(200).json({ succes: true, message: "listado", nuevo_producto });
//     // este permite ver el estado de la peticion del servicio en este caso en 200 significa 200 mostrando un mensaje listado con obtencion de los datos solcitados por el cliente 


//     // res.status(200).json({ succes: true, message: "Listado de los productos", nuevo_producto });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//     // este permite si la solicitud del cliente es erronea el servicio no sea mostrado al cliente mostrando un mensaje que no ha sido listado
//   }
// };

export const create_producto = async (req, res) => {
  try {
    const { mimetype, path } = req.file;
    fs.renameSync(path, path + '.' + mimetype.split('/')[1]);

    const imagenData = fs.readFileSync(path + '.' + mimetype.split('/')[1]).toString("base64");
    const {
      producto_titulo,
      producto_ano,
      producto_tipo,
      producto_subtipo,
      // producto_imagen,
      producto_url,
      proyecto_fk,
      semillero_fk,

    } = req.body;

    console.log(req.body.funcionario_fk);
    const funcionario_fk = Array.isArray(req.body.funcionario_fk)
      ? req.body.funcionario_fk
      : req.body.funcionario_fk.split(',');

    const programa_fk = Array.isArray(req.body.programa_fk)
      ? req.body.programa_fk
      : req.body.programa_fk.split(',');
    // const producto_imagen = fs.readFileSync(req.file.path);
    console.log(funcionario_fk);
    // const producto_imagen = fs.readFileSync(req.file.path);


    const nuevo_producto = await producto.create({
      // nombre: filename,
      producto_titulo,
      producto_ano,
      producto_tipo,
      producto_subtipo,
      producto_imagen: imagenData,
      producto_url,
      proyecto_fk,
      semillero_fk,
    });



    let nuevos_funcionarios = [];
    if (funcionario_fk && funcionario_fk.length > 0) {
      const asociacionesFuncionarioProducto = funcionario_fk.map((id) => ({
        funcionario_fk: id,
        producto_fk: nuevo_producto.producto_id,
      }));
      await funcionario_producto.bulkCreate(asociacionesFuncionarioProducto);

      nuevos_funcionarios = await funcionario.findAll({
        where: { funcionario_id: funcionario_fk },
      });
    }

    let nuevos_programas = [];
    if (programa_fk && programa_fk.length > 0) {
      const asociacionesProgramaProducto = programa_fk.map((id) => ({
        programa_fk: id,
        productos_fk: nuevo_producto.producto_id,
      }));
      await producto_programa.bulkCreate(asociacionesProgramaProducto);

      nuevos_programas = await programas.findAll({
        where: { programa_id: programa_fk },
      });
    }

    const productoCompleto = {
      producto_id: nuevo_producto.producto_id,
      producto_titulo,
      producto_ano,
      producto_tipo,
      producto_imagen: imagenData,
      producto_subtipo,
      producto_url,
      proyecto_fk,
      semillero_fk,
      funcionarios: nuevos_funcionarios,
      programas: nuevos_programas,
    };
    fs.unlinkSync(path + '.' + mimetype.split('/')[1]);


    res.status(200).json({
      message: 'Se creó el producto correctamente.',
      producto: productoCompleto,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};








// controlador de cargar imagen en el crud de crear
// https://www.youtube.com/watch?v=Bj3Gcpohbu4

export const update_producto = async (req, res) => {
  const {
    producto_id,
    producto_imagen,
    producto_titulo,
    producto_ano,
    producto_tipo,
    producto_subtipo,
    producto_url,
    proyecto_fk,
    semillero_fk,
    funcionario_fk,
    programa_fk
  } = req.body;

  try {
    await producto.update(
      {
        producto_imagen,
        producto_titulo,
        producto_ano,
        producto_tipo,
        producto_subtipo,
        producto_url,

        proyecto_fk,
        semillero_fk,
        // funcionario_fk,
      },
      {
        where: {
          producto_id: producto_id,
        },
      }
    );

    await funcionario_producto.update(
      {
        funcionario_fk,
      },
      {
        where: {
          producto_fk: producto_id,
        },
      }
    );

    await producto_programa.update(
      {
        programa_fk,
      },
      {
        where: {
          productos_fk: producto_id,
        },
      }
    );

    const updatedProducto = await producto.findByPk(producto_id);
    const updatedFuncionarioProducto = await funcionario_producto.findOne({
      where: {
        producto_fk: producto_id,
      },
    });
    const updatedProductoPrograma = await producto_programa.findOne({
      where: {
        productos_fk: producto_id,
      },
    });

    res.status(200).json({
      message: "El producto se actualizó correctamente.",
      updatedProducto,
      updatedFuncionarioProducto,
      updatedProductoPrograma,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};


export const delete_producto = async (req, res) => {
  const { producto_id } = req.params;

  try {
    // Eliminar el producto
    const deletedProducto = await producto.destroy({
      where: {
        producto_id: producto_id,
      },
    });

    // Eliminar las relaciones en funcionario_producto y producto_programa
    await funcionario_producto.destroy({
      where: {
        producto_fk: producto_id,
      },
    });

    await producto_programa.destroy({
      where: {
        productos_fk: producto_id,
      },
    });

    res.status(200).json({
      message: "El producto se eliminó correctamente.",
      deletedProducto,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};


// export const get_producto_id = async (req, res) => {
//   const { producto_id } = req.params;
//   try {
//     const nuevo_producto = await producto.findOne({
//       where: { producto_id },
//     });
//     res.status(200).json({ message: "item obtenido por id", nuevo_producto });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const get_producto_id = async (req, res) => {
  const productoId = req.params.producto_id;

  try {
    const producto = await sequelize.query(
      `SELECT productos.*, funcionario.*, proyecto.*, semilleros.*, programa.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.producto_fk
      JOIN funcionario
      ON funcionario.funcionario_id = funcionario_productos.funcionario_fk
      JOIN semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN proyecto
      ON proyecto.proyecto_id = productos.proyecto_fk
      JOIN producto_programa
      ON producto_programa.productos_fk = productos.producto_id
      JOIN programa
      ON programa.programa_id = producto_programa.programa_fk
      WHERE productos.producto_id = :productoId`,
      {
        replacements: { productoId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (producto.length === 0) {
      return res.status(404).json({ success: false, message: "No se encontró el producto" });
    }

    res.status(200).json({ success: true, message: "Producto encontrado", producto });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const get_funcionario_identificacion = async (req, res) => {
  const funcionarioiden = req.params.funcionario_iden;
  console.log(funcionarioiden)
  try {
    const producto = await sequelize.query(
      `SELECT productos.*, funcionario.*, proyecto.*, semilleros.*, programa.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.producto_fk
      JOIN funcionario
      ON funcionario.funcionario_id = funcionario_productos.funcionario_fk
      JOIN semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN proyecto
      ON proyecto.proyecto_id = productos.proyecto_fk
      JOIN producto_programa
      ON producto_programa.productos_fk = productos.producto_id
      JOIN programa
      ON programa.programa_id = producto_programa.programa_fk
      WHERE funcionario.funcionario_iden = :funcionarioiden`,
      {
        replacements: { funcionarioiden },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (producto.length === 0) {
      return res.status(404).json({ success: false, message: "No se encontró el producto de funcionario" });
    }

    res.status(200).json({ success: true, message: "funcionario encontrado", producto });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


export const filtrosemilleros = async (req, res) => {

  const semilleroNombre = req.query.semillero_nombre
  console.log(semilleroNombre);
  if (!Array.isArray(semilleroNombre)) {
    return res.status(400).send("Los autores deben ser proporcionados como un array");
  }


  const filtrosSemillero = semilleroNombre.map((autor) => `%${autor}%`);

  try {
    const semillero = await sequelize.query(
      `SELECT productos.*, funcionario.*,proyecto.*,semilleros.*,programa.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.producto_fk
      JOIN funcionario
      ON funcionario.funcionario_id = funcionario_productos.funcionario_fk
      JOIN  semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN  proyecto
      ON proyecto.proyecto_id = productos.proyecto_fk
      JOIN producto_programa
      ON producto_programa.productos_fk = productos.producto_id
      JOIN programa
      ON programa.programa_id = producto_programa.programa_fk      
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

export const subtipoproducto = async (req, res) => {
  const productossubtipos = req.query.producto_subtipo

  if (!Array.isArray(productossubtipos)) {
    return res
      .status(400)
      .send("Los autores deben ser proporcionados como un array");
  }
  const filtrosproducto = productossubtipos.map((autor) => `%${autor}%`);
  try {
    const producto = await sequelize.query(
      `SELECT productos.*, funcionario.*,proyecto.*,semilleros.*,programa.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.producto_fk
      JOIN funcionario
      ON funcionario.funcionario_id = funcionario_productos.funcionario_fk
      JOIN  semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN  proyecto
      ON proyecto.proyecto_id = productos.proyecto_fk
      JOIN producto_programa
      ON producto_programa.productos_fk = productos.producto_id
      JOIN programa
      ON programa.programa_id = producto_programa.programa_fk   
	   WHERE productos.producto_subtipo LIKE ANY(ARRAY[:filtrosproducto])`,
      {
        replacements: { filtrosproducto },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (producto.length === 0) {
      return res.status(404).send("No se encontraron productos");
    }

    res.send(producto);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos");
  }
};

export const filtroaño = async (req, res) => {
  const buscarano = req.query.productos_ano;
  console.log(buscarano);
  if (!Array.isArray(buscarano)) {
    return res.status(400).send("Los anos deben ser proporcionados como un array");
  }
  const filtroanos = buscarano.map((ano) => `%${ano}%`);

  try {
    const producto = await sequelize.query(
      `SELECT productos.*, funcionario.*,proyecto.*,semilleros.*,programa.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.producto_fk
      JOIN funcionario
      ON funcionario.funcionario_id = funcionario_productos.funcionario_fk
      JOIN  semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN  proyecto
      ON proyecto.proyecto_id = productos.proyecto_fk
      JOIN producto_programa
      ON producto_programa.productos_fk = productos.producto_id
      JOIN programa
      ON programa.programa_id = producto_programa.programa_fk   
	   WHERE productos.producto_ano LIKE ANY(ARRAY[:filtroanos])`,
      {
        replacements: { filtroanos },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (producto.length === 0) {
      return res.status(404).send("No se encontraron productos");
    }

    res.send(producto);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos");
  }
};

export const upload = async (req, res) => {
  readXlsxFile(fs.createReadStream("./excel/input.xls")).then((rows) => {
    console.log(rows);
  });
};


export const filtroproyecto = async (req, res) => {
  const buscarproyecto = req.query.proyectos_nombre;
  console.log(buscarproyecto);
  if (!Array.isArray(buscarproyecto)) {
    return res.status(400).send("Los proyectos deben ser proporcionados como un array");
  }
  const filtroproyectos = buscarproyecto.map((ano) => `%${ano}%`);

  try {
    const producto = await sequelize.query(
      `SELECT productos.*, funcionario.*,proyecto.*,semilleros.*,programa.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.producto_fk
      JOIN funcionario
      ON funcionario.funcionario_id = funcionario_productos.funcionario_fk
      JOIN  semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN  proyecto
      ON proyecto.proyecto_id = productos.proyecto_fk
      JOIN producto_programa
      ON producto_programa.productos_fk = productos.producto_id
      JOIN programa
      ON programa.programa_id = producto_programa.programa_fk   
	   WHERE proyecto.proyecto_nombre LIKE ANY(ARRAY[:filtroproyectos])`,
      {
        replacements: { filtroproyectos },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (producto.length === 0) {
      return res.status(404).send("No se encontraron productos");
    }

    res.send(producto);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos");
  }
};


export const filtroprograma = async (req, res) => {
  const buscarprograma = req.query.programas_nombre;
  console.log(buscarprograma);
  if (!Array.isArray(buscarprograma)) {
    return res.status(400).send("Los programas deben ser proporcionados como un array");
  }
  const filtroprogramas = buscarprograma.map((ano) => `%${ano}%`);

  try {
    const producto = await sequelize.query(
      `SELECT productos.*, funcionario.*,proyecto.*,semilleros.*,programa.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.producto_fk
      JOIN funcionario
      ON funcionario.funcionario_id = funcionario_productos.funcionario_fk
      JOIN  semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN  proyecto
      ON proyecto.proyecto_id = productos.proyecto_fk
      JOIN producto_programa
      ON producto_programa.productos_fk = productos.producto_id
      JOIN programa
      ON programa.programa_id = producto_programa.programa_fk   
	   WHERE programa.programa_nombre LIKE ANY(ARRAY[:filtroprogramas])`,
      {
        replacements: { filtroprogramas },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (producto.length === 0) {
      return res.status(404).send("No se encontraron productos");
    }

    res.send(producto);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos");
  }
};














// export const searchProducts = async (req, res, next) => {
//   try {
//     const titulo = req.query.titulo;
//     const productos = await producto.findAll({
//       where: {
//         producto_titulo: {
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





export const searchProducts = async (req, res, next) => {
  try {
    const query = req.query.titulo;
    console.log(query);

    const productos = await sequelize.query(
      `SELECT productos.*, funcionario.*,proyecto.*,semilleros.*,programa.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.producto_fk
      JOIN funcionario
      ON funcionario.funcionario_id = funcionario_productos.funcionario_fk
      JOIN  semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN  proyecto
      ON proyecto.proyecto_id = productos.proyecto_fk
      JOIN producto_programa
      ON producto_programa.productos_fk = productos.producto_id
      JOIN programa
      ON programa.programa_id = producto_programa.programa_fk
    WHERE productos.producto_titulo LIKE :query`,
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



// creando imagenes


// Controlador para subir una imagen

export const aplicarFiltros = async (req, res) => {

  const semilleroNombre = req.query.semillero_nombre ?? [];
  const productosSubtipos = req.query.producto_subtipo ?? [];
  const buscarAno = req.query.productos_ano ?? [];
  const buscarProyecto = req.query.proyectos_nombre ?? [];
  const buscarPrograma = req.query.programas_nombre ?? [];

  const filtrosSemillero = semilleroNombre.map((nombre) => `%${nombre}%`);
  const filtrosProducto = productosSubtipos.map((subtipo) => `%${subtipo}%`);
  const filtroAnos = buscarAno.map((ano) => `%${ano}%`);
  const filtroProyectos = buscarProyecto.map((proyecto) => `%${proyecto}%`);
  const filtroProgramas = buscarPrograma.map((programa) => `%${programa}%`);


  try {
    // Crea una variable para almacenar las condiciones de filtrado
    let condiciones = [];

    // Crea una variable para almacenar los valores de los filtros
    let valoresFiltros = {};

    // Verificar si se ha seleccionado algún filtro y agregar la condición correspondiente
    if (filtrosSemillero.length > 0) {
      condiciones.push(`semilleros.semillero_nombre LIKE ANY(ARRAY[:filtrosSemillero])`);
      valoresFiltros.filtrosSemillero = filtrosSemillero;

      

    }

    if (filtrosProducto.length > 0) {
      condiciones.push(`productos.producto_subtipo LIKE ANY(ARRAY[:filtrosProducto])`);
      valoresFiltros.filtrosProducto = filtrosProducto;
    }

    if (filtroAnos.length > 0) {
      condiciones.push(`productos.producto_ano LIKE ANY(ARRAY[:filtroAnos])`);
      valoresFiltros.filtroAnos = filtroAnos;
    }

    if (filtroProyectos.length > 0) {
      condiciones.push(`proyecto.proyecto_nombre LIKE ANY(ARRAY[:filtroProyectos])`);
      valoresFiltros.filtroProyectos = filtroProyectos;
    }

    if (filtroProgramas.length > 0) {
      condiciones.push(`programa.programa_nombre LIKE ANY(ARRAY[:filtroProgramas])`);
      valoresFiltros.filtroProgramas = filtroProgramas;
    }



    // Crear la consulta SQL base
    let consultaSQL =
      `SELECT productos.*, funcionario.*, proyecto.*, semilleros.*, programa.*
      FROM productos
      JOIN funcionario_productos 
      ON productos.producto_id = funcionario_productos.producto_fk
      JOIN funcionario
      ON funcionario.funcionario_id = funcionario_productos.funcionario_fk
      JOIN semilleros
      ON semilleros.semillero_id = productos.semillero_fk
      JOIN proyecto
      ON proyecto.proyecto_id = productos.proyecto_fk
      JOIN producto_programa
      ON producto_programa.productos_fk = productos.producto_id
      JOIN programa
      ON programa.programa_id = producto_programa.programa_fk `;

    // Agregar las condiciones de filtrado a la consulta si existen
    if (condiciones.length > 0) {
      consultaSQL += `WHERE ${condiciones.join(' AND ')}`;
    }
    console.log("aqui estan los filtros de los semillero000000000000000000000000000000000000000000", condiciones);

    // Ejecutar la consulta con los filtros correspondientes
    const productos = await sequelize.query(consultaSQL, {
      replacements: valoresFiltros,
      type: sequelize.QueryTypes.SELECT,
    });

    if (productos.length === 0) {
      return res.status(404).send("No se encontraron productos");
    }

    res.send(productos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos");
  }
};
