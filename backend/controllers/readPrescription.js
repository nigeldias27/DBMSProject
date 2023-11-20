import con from "../database";
export const readPrescription = async (req, res) => {
  const [rows, fields] = await con.execute(
    `select * from Prescription natural join Appointment natural join ListOfDoctors where Patient_ID=${req.body.id} and BOUGHT_ID is null`
  );
  res.json(rows);
};

export const loadPrescription = async (req, res) => {
  const [rows, fields] = await con.execute(
    `select * from (select * from Patient natural join Appointment natural join (select * from Prescription_medicine inner join Prescription on Prescription_medicine.Prescription_medicine_ID = Prescription.Prescription_ID) as s1 where Prescription_medicine_ID = ${req.body.id})as s3 left join (select Name as "Pharma_Medicine_Name",Price,Quantity from Medicine where Medicine_ID = '${req.body.pharmaID}') as s4 on s3.Medicine_name = s4.Pharma_Medicine_Name`
  );
  res.json(rows);
};
