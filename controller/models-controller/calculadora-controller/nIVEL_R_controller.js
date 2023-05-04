import { nivel_relativo } from "../../../models/calculadora-models/nivel-relactivo-models.js"
export const create_funcionario = async (req,res)=>{

    const { n_relativo_codigo_nivel,n_relativo_descripcion} = req.body
    try {
        const new_funcionario = await nivel_relativo.create({
           n_relativo_codigo_nivel,
           n_relativo_descripcion
        
        })
        res.status(200).json({message:'funcionario creado',new_funcionario})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}