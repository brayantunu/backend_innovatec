  
import { proyecto } from "../../../models/proyecto-models/proyecto-models.js"

export const get_proyecto = async (req,res)=>{

    try {
        const new_proyecto = await proyecto.findAll()
        res.status(200).json({message: "datos obtenidos",new_proyecto})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const create_proyecto = async (req,res)=>{
    try {
        const {proyecto_codigo,proyecto_linea,proyecto_nombre,proyecto_presupuesto} = req.body;
        const new_proyecto = await proyecto.create({
            proyecto_codigo,
            proyecto_linea,
            proyecto_nombre,
            proyecto_presupuesto
        })
        res.status(200).json({message: "recurso creado",new_proyecto})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

export const update_proyecto = async (req,res)=>{
    try {
        const {id} = req.params
        const { proyecto_codigo,proyecto_linea,proyecto_nombre,proyecto_presupuesto} = req.body
        const new_proyecto = await proyecto.findByPk(id)
        new_proyecto.proyecto_codigo= proyecto_codigo,
        new_proyecto.proyecto_linea=proyecto_linea,
        new_proyecto.proyecto_nombre=proyecto_nombre,
        new_proyecto.proyecto_presupuesto=proyecto_presupuesto

        await new_proyecto.save()
        return res.status(200).json({message: "se ha actualizado el item",NEW_PROYECTO})

        
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}


export const delete_proyecto = async (req,res)=>{
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


export const get_proyecto_id= async (req, res) => {
    const { id } = req.params
    try {
        const new_proyecto = await proyecto.findOne({
            where: { id },      
        })
        res.status(200).json({message:"item obtenido por id",new_proyecto})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}