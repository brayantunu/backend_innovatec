import { puntaje } from "../../../models/puntaje-models/puntaje-models.js";

export const getpuntaje = async (req,res)=>{
    try {
        const Puntaje = await puntaje.findAll()
        res.status(200).json({succes:true, message:'listado',Puntaje})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const createpuntaje = async (req,res)=>{

    const {puntaje_puntuacion} = req.body
    try {
        const newpuntaje_puntuacion = await puntaje.create({
            puntaje_puntuacion
        })
        res.status(200).json({message:'se creo el puntaje',newpuntaje_puntuacion})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updatepuntaje = async (req,res) => {
    try {
      const { id } = req.params;
      const {puntaje_puntuacion} = req.body
  
      const Puntaje = await puntaje.findByPk(id);
      Puntaje.puntaje_puntuacion=puntaje_puntuacion
      await Puntaje.save();
      res.status(201).json({message: 'se ha actualizado el proyecto'
  })
      
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }

  export const deletepuntaje = async(req,res) => {
    try {
        const {id} = req.params;
    await puntaje.destroy({
        where:{
            id,    
        },
    });
    // res.sendStatus(204)
    // api.setEstado("success", "success", "se ah creado exitosamente la especie")
    // res.json("eliminado")
    res.status(200).json({message:'projecto eliminado correctamente',id})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
