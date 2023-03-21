import {SEMILLEROPROYECTO} from "../../../models/semillero-proyecto-model/semillero-proyecto-models.js"
export const GET_SEMILLERO_PROYECTO =async (req,res)=>{
    try {
        const NEW_SEMILLERO_PROYECTO = await SEMILLEROPROYECTO.findAll()
        res.status(200).json({message: "datos obtenidos",NEW_SEMILLERO_PROYECTO})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const CREATE_SEMILLERO_PROYECTO = async (req,res)=>{
    try {
        const {proyectoId,semilleroId} = req.body;
        const NEW_SEMILLERO_PROYECTO = await SEMILLEROPROYECTO.create({
            proyectoId,
            semilleroId
        })
        res.status(200).json({message: "recurso creado",NEW_SEMILLERO_PROYECTO})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

export const UPDATE_SEMILLERO_PROYECTO = async (req,res)=>{

    try {
        const {id} = req.params
        const {  proyectoId,semilleroId} = req.body
        const  NEW_SEMILLERO_PROYECTO = await SEMILLEROPROYECTO.findByPk(id)
        NEW_SEMILLERO_PROYECTO.proyectoId=proyectoId,
        NEW_SEMILLERO_PROYECTO.semilleroId = semilleroId,

        await NEW_SEMILLERO_PROYECTO.save()
        return res.status(200).json({message: "se ha actualizado el item",NEW_SEMILLERO_PROYECTO})

        
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
    
}

export const DELETE_SEMILLERO_PROYECTO = async (req,res)=>{
    try {
        const {id} = req.params
        await SEMILLEROPROYECTO.destroy({
            where:{
                id
            }
        })
        res.status(200).json({message:"Item eliminado correctamente"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}

export const GET_SEMILLERO_PROYECTO_ID = async (req,res)=>{
    const { id } = req.params
    try {
        const  NEW_SEMILLERO_PROYECTO = await SEMILLEROPROYECTO.findOne({
            where: { id },      
        })
        res.status(200).json({message:"item obtenido por id", NEW_SEMILLERO_PROYECTO})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}





