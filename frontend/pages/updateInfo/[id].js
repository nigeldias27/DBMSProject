import { useRouter } from "next/router";
import { Avatar, Dialog, DialogTitle } from "@mui/material";
import Expandible from "@/components/Expandible";
import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import useDownloader from "react-use-downloader";
import axios from "axios";
export default function UpdateInfo() {
  const router = useRouter();
  const symptoms = useRef(null);
  const medicalTest = useRef(null);
  const [open, setOpen] = useState(false);
  const { id } = router.query;
  const [data, setData] = useState({});
  const [script, setScript] = useState({});
  const [medicine, setMedicine] = useState({});
  const [medicineList, setMedicineList] = useState([]);
  const [userData, setUserData] = useState({});
  const [userInfo, setuserInfo] = useState({});
  const [reports, setReports] = useState("");
  const [reportClicked, setReportClicked] = useState({});
  useEffect(() => {
    setuserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, []);
  const handleClose = (value) => {
    setOpen(false);
  };
  const fileUpload = (param) => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations
      const firebaseConfig = {
        apiKey: "AIzaSyCcvAMGKrrMkifMT58FaZ3sdwJtP8adXvQ",
        authDomain: "newsheadstheworld2.firebaseapp.com",
        databaseURL: "https://newsheadstheworld2.firebaseio.com",
        projectId: "newsheadstheworld2",
        storageBucket: "newsheadstheworld2.appspot.com",
        messagingSenderId: "799353860306",
        appId: "1:799353860306:web:5eb8f7681f857adcaebd0b",
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      let files = Array.from(input.files);
      const file = files[0];
      const storage = getStorage();
      const storageRef = ref(storage, `files/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);

            setReports(downloadURL);
            alert("Report has been uploaded");
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API}` + "updateMedicalTest",
              {
                id: reportClicked.Medical_test_ID,
                result: downloadURL,
              }
            );
          });
        }
      );
    };
    input.click();
  };
  const changed = (props) => (e) => {
    var d = {};
    d[props] = e.target.value;
    setData({ ...data, ...d });
    console.log(data);
  };
  useEffect(() => {
    if (router.isReady) {
      initstate();
    }
  }, [router.isReady]);
  /*router.post("/loadSinglePatient", loadSinglePatient);
router.post("/updateMedicalInfo", updateMedicalInfo);
router.post("/LoadPatient", LoadPatient);
router.post("/addPrescription", addPrescription); */
  const initstate = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}` + "loadSinglePatient",
      { patientID: id }
    );
    console.log(response.data);
    setUserData(response.data);
  };
  const cchanged = (props) => (e) => {
    var d = {};
    d[props] = e.target.value;
    setScript({ ...script, ...d });
    console.log(data);
  };
  const medicineChanged = (props) => (e) => {
    var d = {};
    d[props] = e.target.value;
    setMedicine({ ...medicine, ...d });
    console.log(data);
  };
  if (userInfo.role == "Patient") {
    return (
      <div className="w-screen">
        <div
          className="w-screen flex justify-center items-center bg-purple-50"
          style={{ height: "60vh" }}
        >
          <div className="grid grid-cols-2">
            <div className="flex justify-center items-center">
              <Avatar
                sx={{ width: 240, height: 240, marginRight: 36 }}
                src={`${
                  userData.patient == undefined
                    ? ""
                    : userData.patient.Profile_URL
                }`}
              ></Avatar>
            </div>

            <div className="flex justify-center flex-col">
              <h3 className="font-head text-6xl">
                {userData.patient == undefined ? "" : userData.patient.Name}
              </h3>
              <h3 className="font-small text-3xl pt-8">
                I am {userData.patient == undefined ? "" : userData.patient.Age}{" "}
                years old
              </h3>
              <h3 className="font-small text-3xl pt-4">
                Chronic Diseases:
                {userData.chronicDisease == undefined
                  ? ""
                  : userData.chronicDisease
                      .map((x) => {
                        return x.ChronicDisease;
                      })
                      .join()}
              </h3>
              <h3 className="font-small text-3xl pt-4">
                Allergies:{" "}
                {userData.allergies == undefined
                  ? ""
                  : userData.allergies
                      .map((x) => {
                        return x.Allergy;
                      })
                      .join()}
              </h3>
            </div>
          </div>
        </div>
        <Expandible name="Medical History">
          <div className="flex flex-col items-center">
            {userData == null || userData.medicalRecord == undefined ? (
              <div></div>
            ) : (
              userData.medicalRecord.map((v) => {
                return (
                  <div className="w-5/6 bg-purple-50 mt-8 rounded-md p-12  drop-shadow-lg">
                    <div className="flex flex-row justify-between pb-4">
                      <h3 className="font-small text-xl">{v.Name}</h3>
                      <span>{new Date(v.DateTime).toLocaleDateString()}</span>
                    </div>
                    <span className="font-small">{v.Symptoms}</span>
                  </div>
                );
              })
            )}
          </div>
        </Expandible>
        <Expandible name="Reports">
          {userData == null || userData.medicalTest == undefined ? (
            <div></div>
          ) : (
            userData.medicalTest.map((v, i) => {
              if (v.Result != null) {
                return (
                  <div
                    onClick={() => {
                      w.location.href = v.Result;
                    }}
                    className="w-5/6 bg-purple-50 mt-8 rounded-md p-12  drop-shadow-lg"
                  >
                    <div className="flex flex-row justify-between pb-4">
                      <h3 className="font-small text-xl">{v.Name}</h3>
                      <span>{new Date(v.DateTime).toLocaleDateString()}</span>
                    </div>
                    <span className="font-small">{v.Test_Conducted}</span>
                  </div>
                );
              } else {
                return (
                  <div className="w-5/6 bg-purple-400 mt-8 rounded-md p-12  drop-shadow-lg">
                    <div className="flex flex-row justify-between pb-4">
                      <h3 className="font-small text-xl">{v.Name}</h3>
                      <span>{new Date(v.DateTime).toLocaleDateString()}</span>
                    </div>
                    <span className="font-small">{v.Test_Conducted}</span>
                  </div>
                );
              }
            })
          )}
        </Expandible>
      </div>
    );
  }
  if (userInfo.role == "Doctor") {
    return (
      <div className="w-screen">
        <div
          className="w-screen flex justify-center items-center bg-purple-50"
          style={{ height: "60vh" }}
        >
          <div className="grid grid-cols-2">
            <div className="flex justify-center items-center">
              <Avatar
                sx={{ width: 240, height: 240, marginRight: 36 }}
                src={`${
                  userData.patient == undefined
                    ? ""
                    : userData.patient.Profile_URL
                }`}
              ></Avatar>
            </div>

            <div className="flex justify-center flex-col">
              <h3 className="font-head text-6xl">
                {userData.patient == undefined ? "" : userData.patient.Name}
              </h3>
              <h3 className="font-small text-3xl pt-8">
                I am {userData.patient == undefined ? "" : userData.patient.Age}{" "}
                years old
              </h3>
              <h3 className="font-small text-3xl pt-4">
                Chronic Diseases:
                {userData.chronicDisease == undefined
                  ? ""
                  : userData.chronicDisease
                      .map((x) => {
                        return x.ChronicDisease;
                      })
                      .join()}
              </h3>
              <h3 className="font-small text-3xl pt-4">
                Allergies:{" "}
                {userData.allergies == undefined
                  ? ""
                  : userData.allergies
                      .map((x) => {
                        return x.Allergy;
                      })
                      .join()}
              </h3>
            </div>
          </div>
        </div>
        <Expandible name="Medical History">
          <div className="flex flex-col items-center">
            <button
              class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
              type="submit"
              onClick={() => {
                setOpen(true);
              }}
            >
              <div className="flex flex-row items-center">
                <span className="text-xl">Add</span>
              </div>
            </button>
            {userData == null || userData.medicalRecord == undefined ? (
              <div></div>
            ) : (
              userData.medicalRecord.map((v) => {
                return (
                  <div className="w-5/6 bg-purple-50 mt-8 rounded-md p-12  drop-shadow-lg">
                    <div className="flex flex-row justify-between pb-4">
                      <h3 className="font-small text-xl">{v.Name}</h3>
                      <span>{new Date(v.DateTime).toLocaleDateString()}</span>
                    </div>
                    <span className="font-small">{v.Symptoms}</span>
                  </div>
                );
              })
            )}
          </div>
        </Expandible>
        <Expandible name="Reports">
          {userData == null || userData.medicalTest == undefined ? (
            <div></div>
          ) : (
            userData.medicalTest.map((v, i) => {
              if (v.Result != null) {
                return (
                  <div
                    onClick={() => {
                      w.location.href = v.Result;
                    }}
                    className="w-5/6 bg-purple-50 mt-8 rounded-md p-12  drop-shadow-lg"
                  >
                    <div className="flex flex-row justify-between pb-4">
                      <h3 className="font-small text-xl">{v.Name}</h3>
                      <span>{new Date(v.DateTime).toLocaleDateString()}</span>
                    </div>
                    <span className="font-small">{v.Test_Conducted}</span>
                  </div>
                );
              }
            })
          )}
        </Expandible>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Add Medical History</DialogTitle>
          <div className="pt-4">
            <div className="px-4">
              <textarea
                ref={symptoms}
                placeholder="Add causes,inferences,etc"
                className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              ></textarea>
            </div>
          </div>

          <div className="px-4 py-4">
            <button
              class="x-6 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
              type="submit"
              onClick={async () => {
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_API}` + "updateMedicalInfo",
                  {
                    appointmentID: router.query.appt,
                    Symptoms: symptoms.current.value,
                  }
                );
              }}
            >
              <span className="text-xl">Add</span>
            </button>
          </div>
          <DialogTitle>Add Medical Test</DialogTitle>
          <div className="pt-4 grid grid-cols-2">
            <div className="px-4">
              <input
                ref={medicalTest}
                placeholder="Test Conducted"
                className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              ></input>
            </div>
          </div>

          <div className="px-4 py-4">
            <button
              class="x-6 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
              type="submit"
              onClick={async () => {
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_API}` + "addLabTest",
                  {
                    appointmentID: router.query.appt,
                    testConducted: medicalTest.current.value,
                  }
                );
              }}
            >
              <span className="text-xl">Add</span>
            </button>
          </div>
          <DialogTitle>Prescription</DialogTitle>
          <div className="pt-4 grid grid-cols-3">
            <div className="px-4">
              <input
                onChange={medicineChanged("Name")}
                placeholder="Medicine Name"
                className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              ></input>
            </div>
            <div className="px-4">
              <input
                onChange={medicineChanged("Duration")}
                placeholder="Quantity"
                className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              ></input>
            </div>
            <div className="px-4">
              <input
                placeholder="Rate"
                onChange={medicineChanged("Rate")}
                className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              ></input>
            </div>
          </div>

          <div className="px-4 py-4">
            <button
              class="x-6 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
              type="submit"
              onClick={async () => {
                setMedicineList([...medicineList, medicine]);
              }}
            >
              <span className="text-xl">Add</span>
            </button>
          </div>
          <div className="px-4 py-4">
            <button
              class="x-6 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
              type="submit"
              onClick={async () => {
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_API}` + "addPrescription",
                  {
                    appointmentID: router.query.appt,
                    medicineList: medicineList,
                  }
                );
              }}
            >
              <span className="text-xl">Submit</span>
            </button>
          </div>
        </Dialog>
      </div>
    );
  }
  if (userInfo.role == "Lab") {
    return (
      <div className="w-screen">
        <div
          className="w-screen flex justify-center items-center bg-purple-50"
          style={{ height: "60vh" }}
        >
          <div className="grid grid-cols-2">
            <div className="flex justify-center items-center">
              <Avatar
                sx={{ width: 240, height: 240, marginRight: 36 }}
                src={`${
                  userData.patient == undefined
                    ? ""
                    : userData.patient.Profile_URL
                }`}
              ></Avatar>
            </div>

            <div className="flex justify-center flex-col">
              <h3 className="font-head text-6xl">
                {userData.patient == undefined ? "" : userData.patient.Name}
              </h3>
              <h3 className="font-small text-3xl pt-8">
                I am {userData.patient == undefined ? "" : userData.patient.Age}{" "}
                years old
              </h3>
              <h3 className="font-small text-3xl pt-4">
                Chronic Diseases:
                {userData.chronicDisease == undefined
                  ? ""
                  : userData.chronicDisease
                      .map((x) => {
                        return x.ChronicDisease;
                      })
                      .join()}
              </h3>
              <h3 className="font-small text-3xl pt-4">
                Allergies:{" "}
                {userData.allergies == undefined
                  ? ""
                  : userData.allergies
                      .map((x) => {
                        return x.Allergy;
                      })
                      .join()}
              </h3>
            </div>
          </div>
        </div>
        <Expandible name="Reports">
          {userData == null || userData.medicalTest == undefined ? (
            <div></div>
          ) : (
            userData.medicalTest.map((v, i) => {
              if (v.Result == null) {
                return (
                  <div
                    onClick={() => {
                      setReportClicked(v);
                      setOpen(true);
                    }}
                    className="w-5/6 bg-purple-50 mt-8 rounded-md p-12  drop-shadow-lg"
                  >
                    <div className="flex flex-row justify-between pb-4">
                      <h3 className="font-small text-xl">{v.Name}</h3>
                      <span>{new Date(v.DateTime).toLocaleDateString()}</span>
                    </div>
                    <span className="font-small">{v.Test_Conducted}</span>
                  </div>
                );
              }
            })
          )}
        </Expandible>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Add Result of Medical Test</DialogTitle>

          <div className="px-4 py-4">
            <button
              class="x-6 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
              type="submit"
              onClick={async () => {
                fileUpload("reports");
              }}
            >
              <span className="text-xl">Add Result</span>
            </button>
          </div>
        </Dialog>
      </div>
    );
  }
}
