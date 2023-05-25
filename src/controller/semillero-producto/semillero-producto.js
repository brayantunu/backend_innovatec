import {semillero_producto} from "../../models/semillero-producto-models/semillero-product-models.js"
 
export const get_semillero_producto =async (req,res)=>{
    try {
        const nuevo_semillero_producto = await semillero_producto.findAll()
        res.status(200).json({message: "datos obtenidos",nuevo_semillero_producto})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const create_semillero_producto =async(req,res)=>{
    try {
        const {id_producto,id_semillero} = req.body;
        const nuevo_semillero_producto = await semillero_producto.create({
            id_semillero,
            id_producto
        })
        res.status(200).json({message: "recurso creado",nuevo_semillero_producto})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

export const update_semillero_producto =async(req,res)=>{
    try {
        const {id} = req.params
        const {  PRODUCTOPRODUCTOID,semilleroId} = req.body
        const  nuevo_semillero_producto = await semillero_producto.findByPk(id)
        nuevo_semillero_producto.PRODUCTOPRODUCTOID=PRODUCTOPRODUCTOID,
        nuevo_semillero_producto.semilleroId = semilleroId,

        await nuevo_semillero_producto.save()
        return res.status(200).json({message: "se ha actualizado el item",nuevo_semillero_producto})

        
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }

}

export const delete_semillero_producto =async(req,res)=>{
    try {
        const {id} = req.params
        await semillero_producto.destroy({
            where:{
                id
            }
        })
        res.status(200).json({message:"Item eliminado correctamente"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }

}

export const get_semillero_producto_id =async(req,res)=>{
    const { id } = req.params
    try {
        const  nuevo_semillero_producto = await semillero_producto.findOne({
            where: { id },      
        })
        res.status(200).json({message:"item obtenido por id", nuevo_semillero_producto})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


