import express from "express";
import { addInventory, getInventory } from "../controllers/addinventory.js";
import { addReview } from "../controllers/addPatient.js";
import { login, signUp } from "../controllers/auth.controller.js";
import decrementInventory from "../controllers/decrementinventory.js";
import { LoadDoctor } from "../controllers/loadDoctor.js";
import { LoadPatient } from "../controllers/loadPatient.js";
import {
  addLabTest,
  addPrescription,
  loadSinglePatient,
  updateMedicalInfo,
  updateMedicalTest,
} from "../controllers/loadSinglePatient.js";
import {
  loadPrescription,
  readPrescription,
} from "../controllers/readPrescription.js";
import {
  seachDoc,
  docDetails,
  bookAppt,
  docApts,
} from "../controllers/searchDoc.js";

const router = express.Router();
//http://localhost:4000/api/newrole

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/addReview", addReview);
router.post("/LoadDoctor", LoadDoctor);
router.post("/loadSinglePatient", loadSinglePatient);
router.post("/updateMedicalInfo", updateMedicalInfo);
router.post("/LoadPatient", LoadPatient);
router.post("/addPrescription", addPrescription);
router.post("/readPrescription", readPrescription);
router.post("/loadPrescription", loadPrescription);
router.post("/addinventory", addInventory);
router.post("/decrementinventory", decrementInventory);
router.post("/searchDoc", seachDoc);
router.post("/docDetails", docDetails);
router.post("/bookApt", bookAppt);
router.post("/docAppts", docApts);
router.post("/addLabTest"), addLabTest;
router.post("/updateMedicalTest", updateMedicalTest);
router.post("/getInventory", getInventory);
module.exports = router;
