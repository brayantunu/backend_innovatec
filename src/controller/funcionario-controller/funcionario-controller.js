import { funcionario } from "../../models/funcionario-models/funcionario-models.js";
import bcryptjs from "bcryptjs";
import jwt from "./token.js";
import nodemailer from "nodemailer"

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


export const create_funcionario = async (req, res) => {

  try {
    const {
      funcionario_iden,
      funcionario_nombre,
      funcionario_apellido,
      funcionario_correo,
      funcionario_telefono,
      funcionario_admin,
      funcionario_contrasena,
      
    } = req.body;
    console.log(req.body)

    const hashedPassword = await bcryptjs.hash(funcionario_contrasena, 10);

    const nuevo_funcionario = await funcionario.create({
      funcionario_iden,
      funcionario_nombre,
      funcionario_apellido,
      funcionario_correo,
      funcionario_telefono,
      funcionario_admin,
      funcionario_contrasena: hashedPassword
    })

    res.json(nuevo_funcionario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const update_funcionario_id = async (req, res) => {


  try {
    const { funcionario_id } = req.params;
    const { funcionario_iden, funcionario_nombre, funcionario_apellido, funcionario_correo, funcionario_telefono, funcionario_contrasena, funcionario_admin } = req.body
      const hashedPassword = await bcryptjs.hash(funcionario_contrasena, 10);

    
    const funcionarios = await funcionario.findByPk(funcionario_id)
    funcionarios.funcionario_nombre = funcionario_nombre,
      funcionarios.funcionario_apellido = funcionario_apellido,
      funcionarios.funcionario_correo = funcionario_correo,
      funcionarios.funcionario_telefono = funcionario_telefono,
      funcionarios.funcionario_iden = funcionario_iden,
      funcionarios.funcionario_contrasena = hashedPassword
    funcionarios.funcionario_admin = funcionario_admin

    await funcionarios.save();

    res.status(200).json({ message: "se ha actualizado la información del Funcionario", funcionarios })
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
    res.status(200).json({ message: 'Funcionario eliminado satisfactoriamente', resultado })


  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}


export const login = async (req, res) => {
  try {
    const { funcionario_iden, funcionario_contrasena } = req.body
    const usuario = await funcionario.findOne({
      where: { funcionario_iden: funcionario_iden }
    })

    const admin = usuario.funcionario_admin
    console.log(usuario);

    const contrasena_correcta = usuario === null ? false : await bcryptjs.compare(funcionario_contrasena, usuario.funcionario_contrasena)
    if (!(funcionario_iden && contrasena_correcta)) {
      // console.log("entro al if");

      res.status(401).json({
        error: 'Identificacion y/o Contraseña Incorrecta'
      })
      //if (!funcionario_iden || !contrasena_correcta) {
      //return res.status(400).json({ error: 'Debes completar todos los campos' });
      //}
    } else if ((funcionario_iden && contrasena_correcta) && !admin) {

      res.status(401).json({
        error: 'No tienes permiso para ingresar'
      })



    } else {
      // console.log("entro al else");
      const jsontoken = new jwt()
      const usuariotoken = {
        id: usuario.funcionario_id,
        identificacion: usuario.funcionario_iden,
        hashedPassword: usuario.funcionario_contrasena
      }
      console.log({ usuariotoken });
      const token = jsontoken.sing(usuariotoken)
      res.status(200).json({
        usuariotoken: usuariotoken,
        token: token
      })

    }


  } catch (error) {
    res.status(401).json({
      error: 'Usuario no Registrado'
    })

  }

  //   res.status(500).json(error);
}


function generarcodigo() {
  let codigo = "";
  const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const caracteresLength = caracteres.length;
  const longitud = 6; // Longitud deseada para el código generado

  for (let i = 0; i < longitud; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteresLength));


  }
  console.log(codigo);

  return codigo
}

export const recuperar_contrasena = async (req, res) => {


  const codigo_aleatorio = generarcodigo(6);
  //const puerto_smtp = 587; // Ejemplo de valor de puerto SMTP


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'tusenactpi@gmail.com',
      pass: 'tbdnapumanklnzxf'
    },
    //authMethod:"PLAIN"
    //connectionTimeout: 5000, // 5 segundos
    //socketTimeout: 30000, // 30 segundos
  })

  const mensaje = {
    from: 'tusenactpi@gmail.com',
    to: req.body.funcionario_correo, // Email del destinatario obtenido desde la solicitud
    subject: 'Restablecer Contraseña',
    text: ``,
    html: `
    <head>
        <title>Recuperación de Contraseña</title>
    </head>
    <body>
    <img src="https://pixabay.com/es/illustrations/comercio-electronico-3082813/" alt="Imagen adjunta">
        <h2>Recuperación de contraseña</h2>
        <p>Hola,</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña. Copia el siguiente codigo que te ayudara en el proceso:</p>
         <h1><strong>${codigo_aleatorio}</strong></h1>
         <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.</p>
        <p>Gracias,</p>
        <p>Equipo TuSena CTPI</p>
    </body>`
  };

  const correoVerificar = req.body.funcionario_correo
  const verificacion = await funcionario.findOne({
    where: { funcionario_correo: correoVerificar }
  })

  console.log(verificacion);

  await transporter.sendMail(mensaje, async (error, info) => {
    if (verificacion) {
      console.log('Correo enviado correctamente:', info.response);


      const guardarCodigo = await funcionario.findByPk(verificacion.funcionario_id)
      guardarCodigo.funcionario_recuperar = codigo_aleatorio,
        await guardarCodigo.save();

      res.status(200).json({
        message: 'Correo de recuperación enviado exitosamente',
        codigo_aleatorio,
        // guardarCodigo
      });

    } else {
      console.log('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Ocurrió un error al enviar el correo electrónico' });
    }
  });
};


export const actualizar_contrasena = async (req, res) => {

  const { funcionario_correo } = req.params;

  const usuario = await funcionario.findOne({
    where: { funcionario_correo:funcionario_correo }
  })
  const id = usuario.funcionario_id

  const { funcionario_recuperar, funcionario_contrasena } = req.body

  const hashedPassword = await bcryptjs.hash(funcionario_contrasena, 10);

  if (funcionario_recuperar == usuario.funcionario_recuperar) {


    try {
      const funcionarios = await funcionario.findByPk(id)

      funcionarios.funcionario_recuperar = funcionario_recuperar,
      funcionarios.funcionario_contrasena = hashedPassword

      await funcionarios.save();
      res.status(200).json({ message: "se ha actualizado la información del Funcionario", funcionarios })

    } finally{
    }
  }else{
    return res.status(500).json({ message:"ERROR" })


  }

}