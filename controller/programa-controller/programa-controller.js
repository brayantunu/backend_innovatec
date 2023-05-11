import { programas } from "../../models/programa-models/programa-models.js";

export const programa = async (req,res)=>{
    try {
        const new_programa = await programas. finAll()
    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }
}

export const createprograma = async (req,res)=>{
    try {
        const {nombre_programa} = req.body;
        const new_programa = await programas.create({
            nombre_programa
            
        })
        res.status(200).json({message: "recurso creado",new_programa})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}