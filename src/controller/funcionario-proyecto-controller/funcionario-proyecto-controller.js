import { funcionario_proyecto } from "../../models/funcionario-proyecto/funcionario-proyecto-models.js";

export const get_funcionario_proyecto = async (req,res)=>{

    try {
        const new_funcionario_proyecto = await funcionario_proyecto.findAll()
        res.status(200).json({message: "datos obtenidos",new_funcionario_proyecto})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}