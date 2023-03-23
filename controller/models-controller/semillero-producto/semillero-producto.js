import {semillero_producto} from "../../../models/semillero-producto-models/semillero-product-models.js"
 
export const get_semillero_producto =async (req,res)=>{
    try {
        const new_semillero_producto = await semillero_producto.findAll()
        res.status(200).json({message: "datos obtenidos",new_semillero_producto})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const create_semillero_producto =async(req,res)=>{
    try {
        const {PRODUCTOPRODUCTOID,semilleroId} = req.body;
        const new_semillero_producto = await semillero_producto.create({
            PRODUCTOPRODUCTOID,
            semilleroId
        })
        res.status(200).json({message: "recurso creado",new_semillero_producto})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

export const update_semillero_producto =async(req,res)=>{
    try {
        const {id} = req.params
        const {  PRODUCTOPRODUCTOID,semilleroId} = req.body
        const  new_semillero_producto = await semillero_producto.findByPk(id)
        new_semillero_producto.PRODUCTOPRODUCTOID=PRODUCTOPRODUCTOID,
        new_semillero_producto.semilleroId = semilleroId,

        await new_semillero_producto.save()
        return res.status(200).json({message: "se ha actualizado el item",new_semillero_producto})

        
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
        const  new_semillero_producto = await semillero_producto.findOne({
            where: { id },      
        })
        res.status(200).json({message:"item obtenido por id", new_semillero_producto})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


