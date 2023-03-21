import {producto_proyecto} from "../../../models/producto-proyecto-models/producto-proyecto-models.js"

export const GET_PRODUCTO_PROYECTO = async (req,res)=>{
    try {
        const NEW_PRODUCTO_PROYECTO = await producto_proyecto.findAll()
        res.status(200).json({message:"datos obtenidos",NEW_PRODUCTO_PROYECTO})
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

export const CREATE_PRODUCTO_PROYECTO = async (req,res)=>{
    try {
        const {PRODUCTOPRODUCTOID,proyectoId} = req.body;
        const NEW_PRODUCTO_PROYECTO = await producto_proyecto.create({
            proyectoId,
            PRODUCTOPRODUCTOID
        })
        res.status(200).json({message: "recurso creado",NEW_PRODUCTO_PROYECTO})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

export const UPDATE_PRODUCTO_PROYECTO = async (req,res)=>{
    try {
        const {id} = req.params
        const {proyectoId,PRODUCTOPRODUCTOID} = req.body
        const NEW_PRODUCTO_PROYECTO = await producto_proyecto.findByPk(id)
        NEW_FUNCIONARIO_PRODUCTO.proyectoId=proyectoId,
        NEW_FUNCIONARIO_PRODUCTO.PRODUCTOPRODUCTOID = PRODUCTOPRODUCTOID

        await NEW_FUNCIONARIO_PRODUCTO.save()
        return res.status(200).json({message: "se ha actualizado el item",NEW_PRODUCTO_PROYECTO})

        
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}


export const DELETE_PRODUCTO_PROYECTO = async (req,res)=>{
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

export const GET_PRODUCTO_PROYECTO_ID = async (req, res) => {
    const { id } = req.params
    try {
        const NEW_PRODUCTO_PROYECTO = await producto_proyecto.findOne({
            where: { id },      
        })
        res.status(200).json({message:"item obtenido por id",NEW_PRODUCTO_PROYECTO})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}