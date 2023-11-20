import mysql from "mysql2";
import bluebird from "bluebird";
var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Leginsaid322$",
  database: "hospitalNetwork",
});
/*
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
*/
export default con.promise();
