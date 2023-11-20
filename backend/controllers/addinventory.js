import con from "../database";
export async function addInventory(req, res) {
  const [row, field] = await con.execute(
    `SELECT * from Medicine where Medicine_ID=${req.body.id} and Name=${req.body.medicine}`
  );
  if (row.length == 0) {
    const [rows, fields] = await con.execute(
      `Insert Into Medicine Values('${req.body.id}','${req.body.medicine}',${req.body.price},${req.body.quantity})`
    );
  } else {
    const [rowz, fieldz] = await con.execute(
      `UPDATE Medicine set Price=${req.body.price},Quantity=${req.body.quantity} where Medicine_ID='${req.body.id}' and Name='${req.body.medicine}'`
    );
  }
  res.send("Done");
}

export async function getInventory(req, res) {
  const [row, field] = await con.execute(
    `SELECT * from Medicine where Medicine_ID='${req.body.id}'`
  );
  res.json(row);
}
