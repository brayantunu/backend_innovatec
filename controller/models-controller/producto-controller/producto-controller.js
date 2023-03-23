<<<<<<< HEAD
import { producto } from "../../../models/productos-models/productos-models.js";

export const getproducto= async (req,res)=>{
    try {
        const new_producto= await producto.findAll()
        res.status(200).json({succes:true, message:'listado',new_producto})
=======
import { PRODUCTOS } from "../../../models/productos-models/productos-models.js";
import { sequelize } from "../../../db/db.js";

export const GETPRODUCTO = async (req, res) => {
    try {
        const NEWPRODUCTO = await PRODUCTOS.findAll()
        res.status(200).json({ succes: true, message: 'listado', NEWPRODUCTO })
>>>>>>> 377416f4552893202e31e28301f0f780ea866e21
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

<<<<<<< HEAD
export const create_producto = async (req,res)=>{

    const {productos_titulo,productos_ano,productos_url,productos_tipo,productos_subtipo,productos_detalle,productos_idioma,productos_linea} = req.body
    try {
        const new_producto = await producto.create({
            productos_titulo,
            productos_ano,
            productos_url,
            productos_detalle,
            productos_tipo,
            productos_subtipo,
            productos_idioma,
            productos_linea  
        })
        res.status(200).json({message:'se creo el puntaje',new_producto})
=======
export const CREATEPRODUCTO = async (req, res) => {

    const { producto_titulo, PRODUCTOS_ANO, PRODUCTOS_URL, PRODUCTOS_TIPO, PRODUCTOS_SUBTIPO, PRODUCTOS_DETALLE, PRODUCTOS_IDIOMA, PRODUCTOS_LINEA } = req.body
    try {
        const NEWPRODUCTO = await PRODUCTOS.create({
            producto_titulo,
            PRODUCTOS_URL,
            PRODUCTOS_ANO,
            PRODUCTOS_DETALLE,
            PRODUCTOS_TIPO,
            PRODUCTOS_SUBTIPO,
            PRODUCTOS_IDIOMA,
            PRODUCTOS_LINEA
        })
        res.status(200).json({ message: 'se creo el puntaje', NEWPRODUCTO })
>>>>>>> 377416f4552893202e31e28301f0f780ea866e21
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

<<<<<<< HEAD
export const update_producto = async (req,res) => {
    try {
      const { producto_id } = req.params;
      const {productos_ano,productos_detalle,productos_idioma,productos_linea,productos_subtipo,productos_titulo,productos_url,productos_tipo} = req.body
  
      const PRODUCTO = await producto.findByPk(producto_id);
      PRODUCTO.productos_titulo=productos_titulo    
      PRODUCTO.productos_ano=productos_ano
      PRODUCTO.productos_url=productos_url
      PRODUCTO.productos_detalle=productos_detalle
      PRODUCTO.productos_tipo=productos_tipo
      PRODUCTO.productos_subtipo=productos_subtipo
      PRODUCTO.productos_idioma=productos_idioma
      PRODUCTO.productos_linea=productos_linea
      await producto.save();
      res.status(201).json({message: 'se ha actualizado el proyecto'
  })
      console.log(producto_id)
=======
export const UPDATEPRODUCTO = async (req, res) => {
    try {
        const { PRODUCTO_ID } = req.params;
        const { PRODUCTOS_ANO, PRODUCTOS_DETALLE, PRODUCTOS_IDIOMA, PRODUCTOS_LINEA, PRODUCTOS_SUBTIPO, PRODUCTOS_TIPO, PRODUCTOS_URL, PRODUCTO_TITULO } = req.body

        const PRODUCTO = await PRODUCTOS.findByPk(PRODUCTO_ID);
        PRODUCTO.PRODUCTOS_ANO = PRODUCTOS_ANO,
            PRODUCTO.PRODUCTOS_DETALLE = PRODUCTOS_DETALLE,
            PRODUCTO.PRODUCTOS_IDIOMA = PRODUCTOS_IDIOMA,
            PRODUCTO.PRODUCTOS_LINEA = PRODUCTOS_LINEA,
            PRODUCTO.PRODUCTOS_SUBTIPO = PRODUCTOS_SUBTIPO,
            PRODUCTO.PRODUCTOS_TIPO = PRODUCTOS_TIPO,
            PRODUCTO.PRODUCTOS_URL = PRODUCTOS_URL,
            PRODUCTO.PRODUCTO_TITULO = PRODUCTO_TITULO,
            await PRODUCTO.save();
        res.status(201).json({
            message: 'se ha actualizado el proyecto'
        })
        console.log(PRODUCTO_ID)
>>>>>>> 377416f4552893202e31e28301f0f780ea866e21
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const DELETEPRODUCTO = async (req, res) => {
    try {
        const { PRODUCTO_ID } = req.params;
        await PRODUCTOS.destroy({
            where: {
                PRODUCTO_ID,
            },
        });
        // res.sendStatus(204)
        // api.setEstado("success", "success", "se ah creado exitosamente la especie")
        // res.json("eliminado")
        res.status(200).json({ message: 'projecto eliminado correctamente', PRODUCTO_ID })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export const BUSCADOR_PRODUCTO = async (req, res) => {

    const { q, filtro } = req.query;
  let query = `
    SELECT * FROM productos
    WHERE producto_titulo ILIKE $1
  `;
  let parametros = [`%${q}%`];
  if (filtro) {
    query = `
      SELECT * FROM productos
      WHERE ${filtro} ILIKE $1
    `;
    parametros = [`%${q}%`];
  }
<<<<<<< HEAD

  export const delete_producto = async(req,res) => {
    try {
        const {producto_id} = req.params;
    await producto.destroy({
        where:{
            producto_id,    
        },
    });
    // res.sendStatus(204)
    // api.setEstado("success", "success", "se ah creado exitosamente la especie")
    // res.json("eliminado")
    res.status(200).json({message:'projecto eliminado correctamente', producto_id})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


export const get_producto_id = async (req, res) => {
    const { producto_id } = req.params
    try {
        const new_producto = await producto_proyecto.findOne({
            where: { producto_id },      
        })
        res.status(200).json({message:"item obtenido por id",new_producto})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

=======
  sequelize.query(query, parametros, (error, resultado) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(resultado.rows);
    }
  });
>>>>>>> 377416f4552893202e31e28301f0f780ea866e21

}