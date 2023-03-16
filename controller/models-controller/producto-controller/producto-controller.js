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
        const NEWPRODUCTO = await puntaje.create({
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
  
      const PRODUCTOS = await producto.findByPk(PRODUCTO_ID);
      producto.PRODUCTOS_ANO=PRODUCTOS_ANO,
      producto.PRODUCTOS_DETALLE=PRODUCTOS_DETALLE,
      producto.PRODUCTOS_IDIOMA=PRODUCTOS_IDIOMA,
      producto.PRODUCTOS_LINEA=PRODUCTOS_LINEA,
      producto.PRODUCTOS_SUBTIPO=PRODUCTOS_SUBTIPO,
      producto.PRODUCTOS_TIPO=PRODUCTOS_TIPO,
      producto.PRODUCTOS_URL=PRODUCTOS_URL,
      producto.PRODUCTO_TITULO=PRODUCTO_TITULO
      await PRODUCTOS.save();
      res.status(201).json({message: 'se ha actualizado el proyecto'
  })
      
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }

  export const DELETEPRODUCTO = async(req,res) => {
    try {
        const {PRODUCTO_ID} = req.params;
    await producto.destroy({
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
