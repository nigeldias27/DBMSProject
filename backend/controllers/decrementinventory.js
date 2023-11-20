import con from "../database";
export default async function decrementInventory(req, res) {
  const [row, field] = await con.execute(
    `SELECT * FROM Prescription_medicine where Prescription_medicine_ID=${req.body.prescriptionID}`
  );
  for (var v in row) {
    var [rows, fields] = await con.execute(
      `UPDATE Medicine set Quantity = Quantity - ${
        v.Duration_of_consumption * v.Rate
      } where Medicine_ID = '${req.body.pharmaID}'`
    );
  }
  var [rows, fields] = await con.execute(
    `UPDATE Prescription set BOUGHT_ID = '${req.body.pharmaID}' where Prescription_ID = '${req.body.prescriptionID}'`
  );
  res.send("Done");
}
