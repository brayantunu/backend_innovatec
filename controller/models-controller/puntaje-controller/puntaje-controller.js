import { puntaje } from "../../../models/puntaje-models/puntaje-models.js";

export const getpuntaje = async (req,res)=>{
    try {
        const Puntaje = await puntaje.findAll()
        res.status(200).json({succes:true, message:'listado',Puntaje})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}