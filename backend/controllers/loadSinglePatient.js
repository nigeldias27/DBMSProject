import con from "../database";
export const loadSinglePatient = async (req, res) => {
  const [row, field] = await con.execute(
    `SELECT * from Patient where Patient_ID=${req.body.patientID}`
  );
  const [chronicDisease, fields] = await con.execute(
    `SELECT * from ChronicDiseases where ID=${req.body.patientID}`
  );
  const [Allergies, fieldss] = await con.execute(
    `SELECT * from Allergies where ID=${req.body.patientID}`
  );
  const [medicalRecord, fieldz] = await con.execute(
    `SELECT * from MedicalRecord natural join Appointment natural join ListOfDoctors where Patient_ID=${req.body.patientID}`
  );
  const [medicalTest, fieldzz] = await con.execute(
    `Select * from MedicalTest natural join Appointment natural join ListOfDoctors where Patient_ID=${req.body.patientID}`
  );
  res.json({
    patient: row[0],
    chronicDisease: chronicDisease,
    allergies: Allergies,
    medicalRecord: medicalRecord,
    medicalTest: medicalTest,
  });
};

export const updateMedicalInfo = async (req, res) => {
  const [row, field] = await con.execute(
    `insert into MedicalRecord VALUES(${Math.floor(Math.random() * 100000)},'${
      req.body.Symptoms
    }',${req.body.appointmentID}) `
  );
  res.json(row);
};
export const addLabTest = async (req, res) => {
  const [row, field] = await con.execute(
    `insert into MedicalTest(Medical_test_ID,Test_Conducted,Appointment_ID) VALUES(${Math.floor(
      Math.random() * 100000
    )},'${req.body.testConducted}',${req.body.appointmentID}) `
  );
  res.json(row);
};

export const addPrescription = async (req, res) => {
  const prescriptionID = Math.floor(Math.random() * 1000000);
  const [rows, fieldss] = await con.execute(
    `insert into Prescription values(${prescriptionID},${req.body.appointmentID}) `
  );
  for (var x in req.body.medicineList) {
    var [row, fields] = await con.execute(
      `insert into Prescription_medicine values(${prescriptionID},${v.Name},${v.Duration},${v.Rate})`
    );
  }
};

export const updateMedicalTest = async (req, res) => {
  var [row, fields] = await con.execute(
    `update MedicalTest set Result='${req.body.result}' where Medical_test_ID=${req.body.id}`
  );
  res.json(row);
};
