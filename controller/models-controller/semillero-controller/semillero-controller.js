import { semilleros } from "../../../models/semilleros-models/semilleros-models.js";

export const GET_SEMILLERO = async (req,res)=>{
    try {
        const NEW_SEMILLERO = await semilleros.findALL()
        res.status(200).json({message:"datos obtenidos",NEW_SEMILLERO})
    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }
}

export const GET_SEMILLERO_ID = async (req,res) =>{
    try {
        const {id} = req.params;
        const NEW_SEMILLERO = await semilleros.findOne({
            where:{
                id
            }
        })
        res.status(200).json({message:"item creado",NEW_SEMILLERO})
    } catch (error) {
        
    }
}

export const CREATE_SEMILLERO = async (req,res)=>{
    const {semillero_nombre} = req.body
    try {
        const NEW_SEMILLERO = await semilleros.create({
            semillero_nombre
        })
        res.status(200).json({message:"item creado",NEW_SEMILLERO})
    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }
}

export const UPDATE_SEMILLERO = async (req,res)=>{
    try {
        const {id} = req.params;
        const {semillero_nombre} = req.body
        const NEW_SEMILLERO = await semilleros.findByPk(id)
        NEW_SEMILLERO.semillero_nombre=semillero_nombre
        await NEW_SEMILLERO.save()
        return res.status(200).json({message: "se ha actualizado el item", NEW_SEMILLERO})

    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}

export const DELETE_SEMILLERO = async (req,res) =>{
    try {
        const {id} = req.params;
        const NEW_SEMILLERO = await semilleros.destroy({
            where:{
                id
            }
        })
        res.status(200).json({message:'funcionario eliminado satisfactoriamente',NEW_SEMILLERO})

    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}