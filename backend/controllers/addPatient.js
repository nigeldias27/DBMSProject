import con from "../database";
export const addReview = async (req, res) => {
  var [rows, fields] = await con.execute(
    `Select * from Appointment where Patient_ID=${req.body.patientID} and Doctor_ID=${req.body.doctorID}`
  );
  if (rows.length != 0) {
    var [row, field] = await con.execute(
      `INSERT INTO Review VALUES(${req.body.doctorID},'${req.body.Review}',${req.body.Rating})`
    );
  }
  res.send("Done");
};
