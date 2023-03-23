import { PRODUCTOS } from "../../../models/productos-models/productos-models.js";

export const GETPRODUCTO= async (req,res)=>{
    try {
        const NEWPRODUCTO = await PRODUCTOS.findAll()
        res.status(200).json({succes:true, message:'listado',NEWPRODUCTO})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const CREATEPRODUCTO = async (req,res)=>{

    const {PRODUCTO_TITULO,PRODUCTOS_ANO,PRODUCTOS_URL,PRODUCTOS_TIPO,PRODUCTOS_SUBTIPO,PRODUCTOS_DETALLE,PRODUCTOS_IDIOMA,PRODUCTOS_LINEA} = req.body
    try {
        const NEWPRODUCTO = await PRODUCTOS.create({
            PRODUCTO_TITULO,
            PRODUCTOS_URL,
            PRODUCTOS_ANO,
            PRODUCTOS_DETALLE,
            PRODUCTOS_TIPO,
            PRODUCTOS_SUBTIPO,
            PRODUCTOS_IDIOMA,
            PRODUCTOS_LINEA  
        })
        res.status(200).json({message:'se creo el puntaje',NEWPRODUCTO})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const UPDATEPRODUCTO = async (req,res) => {
    try {
      const { PRODUCTO_ID } = req.params;
      const {PRODUCTOS_ANO,PRODUCTOS_DETALLE,PRODUCTOS_IDIOMA,PRODUCTOS_LINEA,PRODUCTOS_SUBTIPO,PRODUCTOS_TIPO,PRODUCTOS_URL,PRODUCTO_TITULO} = req.body
  
      const PRODUCTO = await PRODUCTOS.findByPk(PRODUCTO_ID);
      PRODUCTO.PRODUCTOS_ANO=PRODUCTOS_ANO,
      PRODUCTO.PRODUCTOS_DETALLE=PRODUCTOS_DETALLE,
      PRODUCTO.PRODUCTOS_IDIOMA=PRODUCTOS_IDIOMA,
      PRODUCTO.PRODUCTOS_LINEA=PRODUCTOS_LINEA,
      PRODUCTO.PRODUCTOS_SUBTIPO=PRODUCTOS_SUBTIPO,
      PRODUCTO.PRODUCTOS_TIPO=PRODUCTOS_TIPO,
      PRODUCTO.PRODUCTOS_URL=PRODUCTOS_URL,
      PRODUCTO.PRODUCTO_TITULO=PRODUCTO_TITULO,
      await PRODUCTO.save();
      res.status(201).json({message: 'se ha actualizado el proyecto'
  })
      console.log(PRODUCTO_ID)
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }

  export const DELETEPRODUCTO = async(req,res) => {
    try {
        const {PRODUCTO_ID} = req.params;
    await PRODUCTOS.destroy({
        where:{
            PRODUCTO_ID,    
        },
    });
    // res.sendStatus(204)
    // api.setEstado("success", "success", "se ah creado exitosamente la especie")
    // res.json("eliminado")
    res.status(200).json({message:'projecto eliminado correctamente',PRODUCTO_ID})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


export const BUSCADOR_PRODUCTO = async(req,res)=>{
    try {
            const { q } = req.query;
            const productos = await PRODUCTOS.find({
              $or: [
                { PRODUCTO_TITULO: { $regex: q, $options: 'i' } }
              ],
            });
            res.json(productos);
          
           
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}