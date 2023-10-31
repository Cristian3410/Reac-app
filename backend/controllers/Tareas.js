

import getConnection from "../db.js";


export const getsSchedule = async (req,res) =>{
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ success: false, error: "No autorizado" });
      }
    
      const connection = await getConnection();
      const find = "SELECT u.id, u.username, h.diaSemana, h.horaEntradaAsignada, h.horaSalidaAsignada, h.fecha FROM usuarios u LEFT JOIN horarios h ON u.id = h.created_by WHERE u.id = ?";
      const userData = await connection.query(find, [userId]);
    
      console.log(userData);
      res.json(userData);
  }
  