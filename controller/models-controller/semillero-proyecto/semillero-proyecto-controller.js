import {semillero_proyecto} from "../../../models/semillero-proyecto-model/semillero-proyecto-models.js"
export const get_semillero_proyecto =async (req,res)=>{
    try {
        const new_semillero_proyecto = await semillero_proyecto.findAll()
        res.status(200).json({message: "datos obtenidos",new_semillero_proyecto})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const create_semillero_proyecto = async (req,res)=>{
    try {
        const {proyectoId,semilleroId} = req.body;
        const new_semillero_proyecto = await semillero_proyecto.create({
            proyectoId,
            semilleroId
        })
        res.status(200).json({message: "recurso creado",new_semillero_proyecto})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

export const update_semillero_proyecto = async (req,res)=>{

    try {
        const {id} = req.params
        const {  proyectoId,semilleroId} = req.body
        const  new_semillero_proyecto = await semillero_proyecto.findByPk(id)
        new_semillero_proyecto.proyectoId=proyectoId,
        new_semillero_proyecto.semilleroId = semilleroId,

        await new_semillero_proyecto.save()
        return res.status(200).json({message: "se ha actualizado el item",new_semillero_proyecto})

        
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
    
}

export const delete_semillero_proyecto = async (req,res)=>{
    try {
        const {id} = req.params
        await semillero_proyecto.destroy({
            where:{
                id
            }
        })
        res.status(200).json({message:"Item eliminado correctamente"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}

export const get_semillero_proyecto_id = async (req,res)=>{
    const { id } = req.params
    try {
        const  new_semillero_proyecto = await semillero_proyecto.findOne({
            where: { id },      
        })
        res.status(200).json({message:"item obtenido por id", new_semillero_proyecto})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}





