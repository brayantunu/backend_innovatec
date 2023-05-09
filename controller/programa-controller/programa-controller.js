import { programas } from "../../models/programa-models/programa-models.js";

export const programa = async (req,res)=>{
    try {
        const new_programa = await programas. finAll()
    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }
}