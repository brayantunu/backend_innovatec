  
import { proyecto } from "../../../models/proyecto-models/proyecto-models.js"

export const GET_PROYECTO = async (req,res)=>{

    try {
        const NEW_PROYECTO = await proyecto.findAll()
        res.status(200).json({message: "datos obtenidos",NEW_PROYECTO})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const CREATE_PROYECTO = async (req,res)=>{
    try {
        const {proyecto_codigo,proyecto_linea,proyecto_nombre,proyecto_presupuesto} = req.body;
        const NEW_PROYECTO = await proyecto.create({
            proyecto_codigo,
            proyecto_linea,
            proyecto_nombre,
            proyecto_presupuesto
        })
        res.status(200).json({message: "recurso creado",NEW_PROYECTO})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

export const UPDATE_PROYECTO = async (req,res)=>{
    try {
        const {id} = req.params
        const {proyecto_codigo,proyecto_linea,proyecto_nombre,proyecto_presupuesto} = req.body
        const NEW_PROYECTO = await proyecto.findByPk(id)
        NEW_PROYECTO.proyecto_codigo=proyecto_codigo,
        NEW_PROYECTO.proyecto_linea=proyecto_linea,
        NEW_PROYECTO.proyecto_nombre=proyecto_nombre,
        NEW_PROYECTO.proyecto_presupuesto=proyecto_presupuesto

        await NEW_FUNCIONARIO_PRODUCTO.save()
        return res.status(200).json({message: "se ha actualizado el item",NEW_PROYECTO})

        
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}


export const DELETE_PROYECTO = async (req,res)=>{
    try {
        const {id} = req.params
        await proyecto.destroy({
            where:{
                id
            }
        })
        res.status(200).json({message:"Item eliminado correctamente"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}


export const GET_PROYECTO_ID= async (req, res) => {
    const { id } = req.params
    try {
        const NEW_PROYECTO = await proyecto.findOne({
            where: { id },      
        })
        res.status(200).json({message:"item obtenido por id",NEW_PROYECTO})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}