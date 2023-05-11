import { programas } from "../../models/programa-models/programa-models.js";

export const programa = async (req,res)=>{
    try {
        const new_programa = await programas. finAll()
    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }
}


export const create_programa = async (req,res)=>{
    const {nombre_programa} = req.body
    console.log()
    try {
        const new_programa = await programas.create({
            nombre_programa
        })
        res.status(200).json({message:"item creado",new_programa})
    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }
}