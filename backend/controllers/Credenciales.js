import getConnection from "../db.js";
import bcrypt from "bcryptjs"



export const register = async (req,res) => {
    const {username,password} = req.body
    const find = "SELECT * FROM usuarios WHERE username = ?";
    const connection = await getConnection();
    try{
        const userExist = await connection.query(find,[username])
        if(userExist.length>0){
            return res.status(400).json({ success: false, error: "El usuario ya se encuentra registrado" });

        }else{
            const passhash = await bcrypt.hash(password,10)
            const nuevoDato = await connection.query("INSERT INTO usuarios SET ?",{username:username,password:passhash})
            const nuevoUsuario = {id:nuevoDato.insertId,username,passhash}
            req.session.user = nuevoUsuario;
            console.log(nuevoUsuario)
            res.status(200).json({ success: true, message: "Registro exitoso", user: nuevoUsuario });
        }
    }catch{
        res.status(500).json({ success: false, error: "Error en la base de datos" });
    }

}



export const login = async (req,res) =>{
    const {username,password} = req.body
    const connection = await getConnection();
    try{
        const find = await connection.query("SELECT * FROM usuarios WHERE username = ?",[username])
        if(!find.length>0){
            return res.status(401).json({success:false,error:"usuario no encontrado"});
        }
        const passhash = find[0].password
        const passwordMatch = await bcrypt.compare(password,passhash)
        if(!passwordMatch){
            return res.status(401).json({success:false,error:"Credenciales incorrectas"})
        }
        const usuarioEncontrado ={id:find[0].id,username:username}
        
        req.session.userId = usuarioEncontrado.id;
          
        console.log(usuarioEncontrado)
        res.status(200).json({ success: true, message: "Inicio de sesion exitoso", user: usuarioEncontrado });

    }catch(error){
        console.error("Error en el inicio de sesion:",error)
        res.status(500).json({success:false,error:"error en el servidor"});
    }
}

