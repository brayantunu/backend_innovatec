import{funcionario_semillero} from "../../../models/funcionario-semilleros-models/funcionario-semillero-models.js"

export const get_funcionario_semillero= async (req,res)=>{
    try {
        const new_funcionario_semillero = await funcionario_semillero.findAll()
        res.status(200).json({message: "datos obtenidos",new_funcionario_semillero})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const get_funcionario_semillero_id =async(req,res)=>{
    const { id } = req.params
    try {
        const  new_funcionario_semillero = await funcionario_semillero.findOne({
            where: { id },      
        })
        res.status(200).json({message:"item obtenido por id", new_funcionario_semillero})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export const create_funcionario_semillero= async(req,res)=>{
    try {
        const {funcionarioFuncionarioId,semilleroId} = req.body;
        const new_funcionario_semillero = await funcionario_semillero.create({
            funcionarioFuncionarioId,
            semilleroId
        })
        res.status(200).json({message: "recurso creado",new_funcionario_semillero})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}


export const update_funcionario_semillero= async(req,res)=>{
    try {
        const {id} = req.params
        const {  funcionarioFuncionarioId,semilleroId} = req.body
        const  new_funcionario_semillero = await funcionario_semillero.findByPk(id)
        new_funcionario_semillero.funcionarioFuncionarioId=funcionarioFuncionarioId,
        new_funcionario_semillero.semilleroId = semilleroId,

        await new_funcionario_semillero.save()
        return res.status(200).json({message: "se ha actualizado el item",new_funcionario_semillero})

        
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}

 export const delete_funcionario_semillero =async (req,res)=>{
    try {
        const {id} = req.params
        await funcionario_semillero.destroy({
            where:{
                id
            }
        })
        res.status(200).json({message:"Item eliminado correctamente"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
 }