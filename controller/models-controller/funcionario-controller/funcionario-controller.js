import{funcionario} from "../../../models/funcionario-models/funcionario-models.js"

export const getfuncionario= async (req,res)=>{
    try {
        const newfuncionario = await funcionario.findAll()
        res.status(200).json({succes:true, message:'lista de los ',newfuncionario})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}


export const getfuncionarioid = async (req, res) => {

    const { funcionario_id } = req.params
    try {
        const funcionario = await task.findOne({
            where: { funcionario_id },
            
            
        })
        res.json(funcionario)

    } catch (error) {

    }


}

export const createfuncionario = async (req,res)=>{

    const { funcionario_iden,funcionario_nombre,funcionario_apellido,funcionario_correo,funcionario_telefono} = req.body
    try {
        const newfuncionario = await funcionario.create({
            funcionario_iden,
            funcionario_nombre,
            funcionario_apellido,
            funcionario_correo,
            funcionario_telefono,
        
        })
        res.status(200).json({message:'funcionario creado',newfuncionario})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


export const updatefuncionario = async (req,res) => {

    try {
        const { funcionario_id } = req.params;
        const funcionario = await funcionario.findOne({
            where: { funcionario_id }
        })

        funcionario.set(req.body);
        await task.save();
        return res.json(funcionario)

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
  }

  export const deletefuncionario = async (req, res) => {
    const { funcionario_id } = req.params
    try {
        const result = await funcionario.destroy({
            where: { funcionario_id }
        })
        res.status(200).json({message:'funcionario eliminado satisfactoriamente', funcionario_id})


    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

