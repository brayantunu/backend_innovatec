import {funcionario_producto} from "../../../models/funcionario-producto-models/funcionario-producto.-models.js"


export const GET_FUNCIONARIO_PRODUCTO = async (req,res)=>{

    try {
        const NEW_FUNCIONARIO_PRODUCTO = await funcionario_producto.findAll()
        res.status(200).json({message: "datos obtenidos",NEW_FUNCIONARIO_PRODUCTO})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const CREATE_FUNCIONARIO_PRODUCTO = async (req,res)=>{
    try {
        const {funcionarioFuncionarioId,PRODUCTOPRODUCTOID} = req.body;
        const NEW_FUNCIONARIO_PRODUCTO = await funcionario_producto.create({
            funcionarioFuncionarioId,
            PRODUCTOPRODUCTOID
        })
        res.status(200).json({message: "recurso creado",NEW_FUNCIONARIO_PRODUCTO})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

export const UPDATE_FUNCIONARIO_PRODUCTO = async (req,res)=>{
    try {
        const {id} = req.params
        const {funcionarioFuncionarioId,PRODUCTOPRODUCTOID} = req.body
        const NEW_FUNCIONARIO_PRODUCTO = await funcionario_producto.findByPk(id)
        NEW_FUNCIONARIO_PRODUCTO.funcionarioFuncionarioId=funcionarioFuncionarioId,
        NEW_FUNCIONARIO_PRODUCTO.PRODUCTOPRODUCTOID = PRODUCTOPRODUCTOID

        await NEW_FUNCIONARIO_PRODUCTO.save()
        return res.status(200).json({message: "se ha actualizado el item",NEW_FUNCIONARIO_PRODUCTO})

        
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}

export const DELETE_FUNCIONARIO_PRODUCTO = async (req,res)=>{
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

export const GET_FUNCIONARIO_PRODUCTO_ID = async (req, res) => {
    const { id } = req.params
    try {
        const NEW_FUNCIONARIO_PRODUCTO = await funcionario_producto.findOne({
            where: { id },      
        })
        res.status(200).json({message:"item obtenido por id",NEW_FUNCIONARIO_PRODUCTO})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}