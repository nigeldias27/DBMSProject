import con from "../database";

export const login = async (req, res) => {
  var l = {};
  var [rows, fields] = await con.execute(
    `Select * from Patient where Email='${req.body.Email}' and Password='${req.body.Password}' `
  );
  console.log("Patient");
  console.log(rows);
  if (rows.length > 0) {
    l = { ...rows[0], role: "Patient" };
  }
  var [rows, fields] = await con.execute(
    `Select * from ListOfDoctors where Email='${req.body.Email}' and Password='${req.body.Password}' `
  );
  console.log("Doc");
  console.log(rows);
  if (rows.length > 0) {
    l = { ...rows[0], role: "Doctor" };
  }
  var [rows, fields] = await con.execute(
    `Select * from Pharmacy where Email='${req.body.Email}' and Password='${req.body.Password}' `
  );
  console.log("Pharma");
  console.log(rows);
  if (rows.length > 0) {
    l = { ...rows[0], role: "Pharma" };
  }
  var [rows, fields] = await con.execute(
    `Select * from Lab where Email_ID='${req.body.Email}' and Password='${req.body.Password}' `
  );
  console.log("Lab");
  console.log(rows);
  if (rows.length > 0) {
    l = { ...rows[0], role: "Lab" };
  }
  console.log("Result");
  console.log(l);
  if (l.Password == undefined) {
    res.send("Error");
  } else {
    res.json(l);
  }
};

export const signUp = async (req, res) => {
  var id = Math.floor(Math.random() * 1000000);
  if (req.body.role == "Patient") {
    var [row, field] = await con.execute(
      `INSERT INTO Patient VALUES(${id},'${req.body.Email}','${req.body.Phone_no}',${req.body.Age},'${req.body.Name}','${req.body.Password}','${req.body.profileURL}')`
    );
    for (let index = 0; index < req.body.allergies.length; index++) {
      var element = req.body.allergies[index];
      var [row, field] = await con.execute(
        `INSERT INTO Allergies Values (${id},'${element}')`
      );
    }
    for (let index = 0; index < req.body.chronicDisease.length; index++) {
      var element = req.body.chronicDisease[index];
      var [row, field] = await con.execute(
        `INSERT INTO chronicDiseases Values (${id},'${element}')`
      );
    }
  } else if (req.body.role == "Doctor") {
    var [row, field] =
      await con.execute(`INSERT INTO List_of_Doctors (Name, Age, Phone, Email, Password, Speciality, Profile_URL, BIO) VALUES
    ('${req.body.Name}', ${req.body.Age}, '${req.body.Phone_no}', '${req.body.Email}', '${req.body.Password}', '${req.body.Speciality}', '${req.body.profileURL}', '${req.body.Bio}')`);
    for (let index = 0; index < req.body.education.length; index++) {
      var element = req.body.education[index];
      var [row, field] = await con.execute(
        `INSERT INTO education Values (${id},'${element}')`
      );
    }
    for (
      let index = 0;
      index < req.body.professionalAchievements.length;
      index++
    ) {
      var element = req.body.professionalAchievements[index];
      var [row, field] = await con.execute(
        `INSERT INTO professionalAchievements Values (${id},'${element}')`
      );
    }
    for (let index = 0; index < req.body.location.length; index++) {
      var element = req.body.location[index];
      var [row, field] = await con.execute(
        `INSERT INTO location Values (${id},'${element}')`
      );
    }
  } else if (req.body.role == "Pharma") {
    var [row, field] = await con.execute(
      `INSERT INTO Pharmacy VALUES('${req.body.Name}','${req.body.Password}',${req.body.Phone_no},'${req.body.Location}','${req.body.Email}','${req.body.profileURL}')`
    );
  } else if (req.body.role == "Lab") {
    var [row, field] = await con.execute(
      `INSERT INTO Pharmacy VALUES('${req.body.Name}','${req.body.Location}',${req.body.Phone_no},'${req.body.Password}','${req.body.Email}','${req.body.Test_Conducted}')`
    );
  }
  res.send("Done");
};
