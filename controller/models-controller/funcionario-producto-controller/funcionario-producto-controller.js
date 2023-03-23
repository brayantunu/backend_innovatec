import {funcionario_producto} from "../../../models/funcionario-producto-models/funcionario-producto.-models.js"


export const get_funcionario_producto = async (req,res)=>{

    try {
        const new_funcionario_producto = await funcionario_producto.findAll()
        res.status(200).json({message: "datos obtenidos",new_funcionario_producto})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const create_funcionario_producto = async (req,res)=>{
    try {
        const {funcionarioFuncionarioId,PRODUCTOPRODUCTOID} = req.body;
        const new_funcionario_producto = await funcionario_producto.create({
            funcionarioFuncionarioId,
            PRODUCTOPRODUCTOID
        })
        res.status(200).json({message: "recurso creado",new_funcionario_producto})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

export const update_funcionario_producto = async (req,res)=>{
    try {
        const {id} = req.params
        const {funcionarioFuncionarioId,PRODUCTOPRODUCTOID} = req.body
        const new_funcionario_producto = await funcionario_producto.findByPk(id)
        new_funcionario_producto.funcionarioFuncionarioId=funcionarioFuncionarioId,
        new_funcionario_producto.PRODUCTOPRODUCTOID = PRODUCTOPRODUCTOID

        await new_funcionario_producto.save()
        return res.status(200).json({message: "se ha actualizado el item",new_funcionario_producto})

        
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}

export const delete_funcionario_producto = async (req,res)=>{
    try {
        const {id} = req.params
        await funcionario_producto.destroy({
            where:{
                id
            }
        })
        res.status(200).json({message:"Item eliminado correctamente"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}

export const get_funcionario_producto_id = async (req, res) => {
    const { id } = req.params
    try {
        const new_funcionario_producto = await funcionario_producto.findOne({
            where: { id },      
        })
        res.status(200).json({message:"item obtenido por id",new_funcionario_producto})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}