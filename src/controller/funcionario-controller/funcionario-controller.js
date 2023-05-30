import { funcionario } from "../../models/funcionario-models/funcionario-models.js";
import bcryptjs from "bcryptjs";
import jwt from "./token.js";
//import nodemailer from "nodemailer"

export const get_funcionario = async (req, res) => {
  try {
    const nuevo_funcionario = await funcionario.findAll();
    res
      .status(200)
      .json({ succes: true, message: "lista de los funcionarios ", nuevo_funcionario });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const get_funcionario_id = async (req, res) => {
  const { funcionario_id } = req.params;
  try {
    const nuevo_funcionario = await funcionario.findOne({
      where: { funcionario_id },
    });
    res.status(200).json({ message: "Funcionario obtenido por id", nuevo_funcionario });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const create_funcionario = async (req,res)=>{
    
  try {
   const { funcionario_iden,
    funcionario_nombre,
    funcionario_apellido,
    funcionario_correo,
    funcionario_telefono,
    funcionario_contrasena } = req.body;


  const hashedPassword = await bcryptjs.hash(funcionario_contrasena, 10);

    const nuevo_funcionario = await funcionario.create({ funcionario_iden,
      funcionario_nombre,
      funcionario_apellido,
      funcionario_correo,
      funcionario_telefono,
      funcionario_contrasena: hashedPassword})

    res.json(nuevo_funcionario);
  } catch (error) {
  
    res.status(500).json({ error: 'No se puede registrar al Funcionario' });
  }
};


export const update_funcionario_id = async (req,res) => {

  try {
      const { funcionario_id } = req.params;
      const {funcionario_iden,funcionario_nombre,funcionario_apellido,funcionario_correo,funcionario_telefono, funcionario_contrasena} = req.body
      const funcionarios = await funcionario.findByPk(funcionario_id)
      funcionarios.funcionario_nombre=funcionario_nombre,
      funcionarios.funcionario_apellido=funcionario_apellido,
      funcionarios.funcionario_correo=funcionario_correo,
      funcionarios.funcionario_telefono=funcionario_telefono,
      funcionarios.funcionario_iden=funcionario_iden,
      funcionarios. funcionario_contrasena=funcionario_contrasena

      await funcionarios.save();
      
      res.status(200).json({message: "se ha actualizado la información del Funcionario", funcionarios})
  }
     // if (funcionarios.affectedRows ===0){
      //return res.status (404).json({
        //  message: 'no encontrado'
      //})
      
      //else{
        //  const [rows] =await funcionario.query ('SELECT * FROM funcionario WHERE funcionario_id =? ',[funcionario_id])

          //res.json(rows[0])
          catch (error) {
              return res.status(500).json({ message: error.message })
      
          }
      }
      
    //  }
     
     
  //} 
  export const delete_funcionario_id = async (req, res) => {

    try {
        const { funcionario_id } = req.params
        const resultado = await funcionario.destroy({
            where: { funcionario_id }
        })
        res.status(200).json({message:'Funcionario eliminado satisfactoriamente',resultado})


    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export const login = async(req,res)=>{
  try {
      const {funcionario_iden,funcionario_contrasena}=req.body
      const usuario= await funcionario.findOne({
          where: {funcionario_iden:funcionario_iden}})
          //console.log(usuario);
     //un ternario

      const contrasena_correcta=usuario===null? false:await bcryptjs.compare(funcionario_contrasena,usuario.funcionario_contrasena)
      //comparamos la contraseña incriptada
      
   if (!(funcionario_iden && contrasena_correcta)){
    // un ciclo para poder validar si los campos que ingresa el usuario son validos y se encuentran 
    //en la base de daros
    // console.log("entro al if");

      res.status(401).json({
          error :'Identificacion o Contraseña Incorrecta'
      })
      //if (!funcionario_iden || !contrasena_correcta) {
        //return res.status(400).json({ error: 'Debes completar todos los campos' });
      //}
   }else{
    //si estan en la base datos y son validos entra el else el cual el uusario 
    //logiado se  le creara un token como validacion
    // console.log("entro al else");
      const jsontoken = new jwt()
      const usuariotoken={
          id: usuario.funcionario_id,
          identificacion:usuario.funcionario_iden,
          hashedPassword: usuario.funcionario_contrasena
      }
      console.log({usuariotoken});
      const token =jsontoken.sing(usuariotoken)
      res.status(200).json({
        // ya esto se guarada en un json el cual da los datos del usuario y el token creado
          usuariotoken:usuariotoken,
          token:token
      })
      
   }


  } catch (error) {
    //   res.status(500).json(error);
    console.log(error);
      
  }

}