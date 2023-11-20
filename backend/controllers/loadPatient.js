import con from "../database";
export const LoadPatient = async (req, res) => {
  const [rows, fields] = await con.execute(
    `select * from Appointment natural join Patient where Doctor_ID = ${req.body.id}`
  );
  res.json(rows);
};
