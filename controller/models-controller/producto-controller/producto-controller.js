import { producto } from "../../../models/productos-models/productos-models.js";

export const getproducto= async (req,res)=>{
    try {
        const new_producto= await producto.findAll()
        res.status(200).json({succes:true, message:'listado',new_producto})
    } catch (error) {
        return res.status(400).json({ message: error.message })
  
    }
}

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
    }catch (error) {
        return res.status(400).json({ message: error.message })
    }
}




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
}  catch (error) {
    return res.status(500).json({ message: error.message })
}

}


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
}





export const BUSCADOR_PRODUCTO = async (req, res) => {

//     const { q, filtro } = req.query;
//   let query = `
//     SELECT * FROM productos
//     WHERE producto_titulo ILIKE $1
//   `;
//   let parametros = [`%${q}%`];
//   if (filtro) {
//     query = `
//       SELECT * FROM productos
//       WHERE ${filtro} ILIKE $1
//     `;
//     parametros = [`%${q}%`];
//   }
//   sequelize.query(query, parametros, (error, resultado) => {
//     if (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error interno del servidor' });
//     } else {
//       res.json(resultado.rows);
//     }
//   });

const searchTerm = req.query.search;
  const query = {
    text: 'SELECT * FROM productos WHERE name ILIKE $1',
    values: [`%${searchTerm}%`],
  };
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }




  sequelize.query(query, parametros, (error, resultado) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(resultado.rows);
    }
  });


}