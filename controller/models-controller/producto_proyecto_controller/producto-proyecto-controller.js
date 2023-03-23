import {producto_proyecto} from "../../../models/producto-proyecto-models/producto-proyecto-models.js"

export const get_producto_proyecto = async (req,res)=>{
    try {
        const new_producto_proyecto = await producto_proyecto.findAll()
        res.status(200).json({message:"datos obtenidos",new_producto_proyecto})
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

export const create_producto_proyecto = async (req,res)=>{
    try {
        const {PRODUCTOPRODUCTOID,proyectoId} = req.body;
        const new_producto_proyecto = await producto_proyecto.create({
            proyectoId,
            PRODUCTOPRODUCTOID
        })
        res.status(200).json({message: "recurso creado",new_producto_proyecto})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

export const update_producto_proyecto = async (req,res)=>{
    try {
        const {id} = req.params
        const {proyectoId,PRODUCTOPRODUCTOID} = req.body
        const new_producto_proyecto = await producto_proyecto.findByPk(id)
        new_producto_proyecto.proyectoId=proyectoId,
        new_producto_proyecto.PRODUCTOPRODUCTOID = PRODUCTOPRODUCTOID

        await new_producto_proyecto.save()
        return res.status(200).json({message: "se ha actualizado el item",new_producto_proyecto})

        
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}


export const delete_producto_proyecto = async (req,res)=>{
    try {
        const {id} = req.params
        await producto_proyecto.destroy({
            where:{
                id
            }
        })
        res.status(200).json({message:"Item eliminado correctamente"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}

export const get_producto_proyecto_id = async (req, res) => {
    const { id } = req.params
    try {
        const new_producto_proyecto = await producto_proyecto.findOne({
            where: { id },      
        })
        res.status(200).json({message:"item obtenido por id",new_producto_proyecto})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}