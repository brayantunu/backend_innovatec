import { semilleros } from "../../../models/semilleros-models/semilleros-models.js";

export const get_semillero = async (req,res)=>{
    try {
        const new_semillero = await semilleros.findAll()
        res.status(200).json({message:"datos obtenidos",new_semillero})
    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }
}

export const get_semillero_id = async (req,res) =>{
    try {
        const {id} = req.params;
        const new_semillero = await semilleros.findOne({
            where:{
                id
            }
        })
        res.status(200).json({message:"item creado", new_semillero})
    } catch (error) {
        
    }
}

export const create_semillero = async (req,res)=>{
    const {semillero_nombre} = req.body
    try {
        const new_semillero = await semilleros.create({
            semillero_nombre
        })
        res.status(200).json({message:"item creado",new_semillero})
    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }
}

export const update_semillero = async (req,res)=>{
    try {
        const {id} = req.params;
        const {semillero_nombre} = req.body
        const new_semillero = await semilleros.findByPk(id)
        new_semillero.semillero_nombre=semillero_nombre
        await new_semillero.save()
        return res.status(200).json({message: "se ha actualizado el item", new_semillero})

    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}

export const delete_semillero = async (req,res) =>{
    try {
        const {id} = req.params;
        const new_semillero = await semilleros.destroy({
            where:{
                id
            }
        })
        res.status(200).json({message:'funcionario eliminado satisfactoriamente',new_semillero})

    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}