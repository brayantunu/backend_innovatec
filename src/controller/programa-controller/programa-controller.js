import { programas } from "../../models/programa-models/programa-models.js";
// importamos el modelo de programas oara su correcto funcionamiento de su servicios 

export const programa = async (req,res)=>{
  // creamos una constante la cual se exportara para que las rutas sean utilizadas en lo visual
    try {
      // es una promesa lo que hace si los parametros de la busqueda se encuentra le mandamos una respuesta al cliente mostrando los programas buscados
        const new_programa = await programas. finAll()
        res.status(200).json({message: "se obtener los programas exitosamente "})
    } catch (error) {
      // si falla la promesa se le enviara una respuesta al cliente de que fallo el controlador de la busqueda
        return res.status(400).json({message:error.message})
        
    }
}


export const create_programa = async (req, res) => {
    const {
        nombre_programa,
    } = req.body;
  
    try {
      const new_programa = await programas.create({
        nombre_programa
      });
      res
        .status(200)
        .json({ message: "se creo el programa correctamente", new_programa });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  
  
  
export const update_programa = async (req, res) => {
    try {
      const { programa_id } = req.params;
      const {
        nombre_programa
      } = req.body;
  
      const programa = await programas.findByPk(programa_id);
     programa.nombre_programa=nombre_programa
      await programas.save();
      res.status(201).json({
        message: "se ha actualizado el programa",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  

  
export const delete_programa = async (req, res) => {
    try {
      const { programa_id } = req.params;
      await programas.destroy({
        where: {
            programa_id,
        },
      });
      // res.sendStatus(204)
      // api.setEstado("success", "success", "se ah creado exitosamente la especie")
      // res.json("eliminado")
      res
        .status(200)
        .json({ message: "programa eliminado correctamente", programa_id });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
export const get_programa_id = async (req, res) => {
    const { programa_id } = req.params;
    try {
      const new_programa = await programas.findOne({
        where: { programa_id },
      });
      res.status(200).json({ message: "item obtenido por id", new_programa });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  
