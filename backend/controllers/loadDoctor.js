import con from "../database";
export const LoadDoctor = async (req, res) => {
  const [rows, fields] = await con.execute(
    `select * from Appointment natural join ListOfDoctors where Patient_ID = ${req.body.id}`
  );
  res.json(rows);
};
