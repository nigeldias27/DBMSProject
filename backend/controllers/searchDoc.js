import con from "../database";

export const seachDoc = async (req, res) => {
  var [row, field] = await con.execute(
    `Select * from ListOfDoctors where Name Like '%${req.body.keyword}%' or Speciality Like '${req.body.keyword}'`
  );
  console.log(row);
  res.json(row);
};

export const docDetails = async (req, res) => {
  if (req.body.id != undefined) {
    var [ed, field] = await con.execute(
      `Select * from Education where ID=${req.body.id}`
    );
    var [location, field] = await con.execute(
      `Select * from Location where ID=${req.body.id}`
    );
    var [professionalAchievements, field] = await con.execute(
      `Select * from ProfessionalAchievements where ID=${req.body.id}`
    );
    var [review, field] = await con.execute(
      `Select * from Review where ID=${req.body.id}`
    );
    res.json({
      education: ed,
      location: location,
      professionalAchievements: professionalAchievements,
      review: review,
    });
  }
};

export const bookAppt = async (req, res) => {
  var [rows, fields] = await con.execute(
    `Select * from Appointment where Patient_ID=${req.body.patientID} and Doctor_ID=${req.body.doctorID} and DATE(DateTime)=CURDATE()`
  );
  if (rows.length == 0) {
    var apptID = Math.floor(Math.random() * 100000);
    const [row, field] = await con.execute(
      `INSERT INTO Appointment VALUES(${req.body.doctorID},${req.body.patientID},${apptID},'${req.body.datetime}')`
    );
  } else {
    var apptID = rows[0].Appointment_ID;
  }

  res.json(apptID);
};

export const apptExists = async (req, res) => {
  const [row, field] = await con.execute(
    `Select * from Appointment where Doctor_ID=${req.body.doctorID} and Patient_ID=${req.body.patientID}`
  );
  res.json(row);
};

export const docApts = async (req, res) => {
  const [row, field] = await con.execute(
    `Select * from Appointment inner join Patient on Patient.Patient_ID=Appointment.Patient_ID where Appointment.Doctor_ID=${req.body.doctorID} and DateTime>=NOW() and DATE(DateTime)=CURDATE()`
  );
  res.json(row);
};
