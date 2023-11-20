import { Avatar, Dialog, DialogTitle } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import QRCode from "qrcode";
import QrReader from "react-qr-scanner";
import axios from "axios";
import Graph from "@/components/graph";
export default function Home() {
  const router = useRouter();
  const [src, setSrc] = useState("");
  const [doctorPatient, setdoctorPatient] = useState([]);
  const [search, setSearch] = useState("");
  const [searchbool, setSearchBool] = useState(false);
  const [tdyAppointments, setTdyAppointments] = useState([]);
  const [searchDocList, setSearchDocList] = useState([]);
  const [open, setOpen] = useState(false);
  const [prescription_l, setPrescription_l] = useState([]);
  const [done, setDone] = useState(false);
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [userInfo, setuserInfo] = useState({});
  useEffect(() => {
    setuserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, []);
  useEffect(() => {
    initstate();
  }, [userInfo]);

  const initstate = async () => {
    if (userInfo.role != undefined) {
      console.log(userInfo["_id"]);
      if (userInfo.role == "Patient") {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}` + "LoadDoctor",
          { id: userInfo["Patient_ID"] }
        );
        console.log(response.data);
        setdoctorPatient(response.data);
        const resp_reply = await axios.post(
          `${process.env.NEXT_PUBLIC_API}` + "readPrescription",
          { id: userInfo["Patient_ID"] }
        );
        console.log(resp_reply.data);
        setPrescription_l(resp_reply.data);
      } else if (userInfo.role == "Doctor") {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}` + "docAppts",
          { doctorID: userInfo["Doctor_ID"] }
        );
        const response1 = await axios.post(
          `${process.env.NEXT_PUBLIC_API}` + "LoadPatient",
          { id: userInfo["Doctor_ID"] }
        );
        console.log(response.data);
        setTdyAppointments(response.data);
        setdoctorPatient(response1.data);
      } else if (userInfo.role == "Pharma") {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}` + "getInventory",
          { id: userInfo["Location"] }
        );
        setdoctorPatient(response.data);
      }
    }
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  if (userInfo.role == "Patient") {
    const searchDoc = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}` + "searchDoc",
        { keyword: search }
      );
      console.log(response.data);
      setSearchBool(true);
      setSearchDocList(response.data);
    };
    return (
      <div>
        <div className="bg-purple-100" style={{ height: "90vh" }}>
          <div className="flex flex-row justify-between items-center pt-4 px-12">
            <h1 className="font-head text-7xl">0R</h1>
            <div className="flex flex-row items-center">
              <Avatar
                sx={{ width: 90, height: 90 }}
                src={userInfo.Profile_URL}
              ></Avatar>
              <button
                class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
                type="submit"
                onClick={() => {
                  localStorage.setItem("userInfo", "");
                  router.push("/");
                }}
              >
                <div className="flex flex-row items-center">
                  <span className="text-xl">Logout</span>
                </div>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <h3
              className="pt-4 px-20 font-head text-9xl text-indigo-900 font-bold align-middle"
              style={{ paddingTop: "13vh" }}
            >
              Welcome back, {userInfo.Name}!
            </h3>
            <div className="flex justify-center">
              {" "}
              <img src="https://cdn3d.iconscout.com/3d/premium/thumb/medicine-3494848-2928740.png"></img>
            </div>
          </div>
        </div>
        <div className="w-screen px-20 flex flex-row relative bottom-20">
          <div className="w-1/6 flex justify-center items-center">
            <div
              className="py-4 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 px-8"
              onClick={() => {
                QRCode.toDataURL(userInfo["Patient_ID"].toString()).then(
                  (data) => {
                    setSrc(data);
                  }
                );
                setOpen(true);
              }}
            >
              <span className="text-white text-justify align-middle">
                Generate QR Code
              </span>
            </div>
          </div>
          <div className="p-8 w-full">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="w-full px-4 py-8 border placeholder:font-small placeholder:text-2xl text-2xl border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              placeholder="Search for doctors,prescriptions"
            ></input>
          </div>
          <div className="w-1/6 flex justify-center items-center">
            <div
              onClick={() => {
                searchDoc();
              }}
              className="p-8 drop-shadow-xl font-small rounded-full bg-gradient-to-r from-purple-400 to-purple-500  flex items-center justify-center"
            >
              <MdSearch size={32} color="white" />
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-small text-black ml-24">
          {searchbool == true ? `Results for ${search}` : ""}
        </h1>
        {searchbool == true ? (
          <div className="overflow-x-auto flex flex-row px-24 py-12">
            {searchDocList.map((v) => {
              return (
                <div
                  onClick={() => {
                    router.push({ pathname: "/appointment", query: v });
                  }}
                  style={{ width: "240px" }}
                  className="rounded-md drop-shadow-2xl mx-8 bg-purple-50 py-16  flex flex-col justify-center items-center"
                >
                  <Avatar
                    sx={{ width: 120, height: 120 }}
                    src={v.Profile_URL}
                  ></Avatar>
                  <span className="mt-8 text-xl font-small w-90 text-justify">
                    {v.Name}{" "}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
        <h1 className="text-5xl font-small text-black ml-24">
          Diseases spreading in your neighbourhood
        </h1>
        <Graph />
        <div>
          <h1 className="text-5xl font-small text-black ml-24">Your doctors</h1>
          <div className="overflow-x-auto flex flex-row px-24 py-12">
            {doctorPatient.map((v) => {
              return (
                <div
                  onClick={() => {
                    router.push({ pathname: "/appointment", query: v });
                  }}
                  style={{ width: "240px" }}
                  className="rounded-md drop-shadow-2xl mx-8 bg-purple-50 py-16  flex flex-col justify-center items-center"
                >
                  <Avatar
                    sx={{ width: 120, height: 120 }}
                    src={v.profileURL}
                  ></Avatar>
                  <span className="mt-8 text-xl font-small w-90 text-justify">
                    {v.Name}{" "}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-small text-black ml-24">
            Your prescription
          </h1>
          <div className="overflow-x-auto flex flex-row px-24 py-12">
            {prescription_l.map((v) => {
              return (
                <div
                  style={{ width: "240px" }}
                  onClick={() => {
                    QRCode.toDataURL("P" + v["Prescription_ID"]).then(
                      (data) => {
                        setSrc(data);
                      }
                    );
                    setOpen(true);
                  }}
                  className="rounded-md drop-shadow-2xl mx-8 bg-purple-50 py-16  flex flex-col justify-center items-center"
                >
                  <span className="mt-8 text-xl font-small w-90 text-justify">
                    {v["Name_of_Medicine"]}
                  </span>
                  <span className="mt-8 text-xl font-small w-90 text-justify">
                    Doctor: {v["Name"]}
                  </span>
                  <span className="mt-8 px-2 text-xl font-small w-90 text-justify">
                    Prescribed: {new Date(v["DateTime"]).toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <Dialog onClose={handleClose} open={open}>
          <div className="w-screen flex flex-col">
            <DialogTitle>QR Code</DialogTitle>
            <img src={src} className="w-48 ml-48"></img>
          </div>
        </Dialog>
      </div>
    );
  } else if (userInfo.role == "Doctor") {
    return (
      <div>
        <div className="bg-purple-100" style={{ height: "90vh" }}>
          <div className="flex flex-row justify-between items-center pt-4 px-12">
            <h1 className="font-head text-7xl">0R</h1>
            <div className="flex flex-row items-center">
              <Avatar
                sx={{ width: 90, height: 90 }}
                src={userInfo.profileURL}
              ></Avatar>
              <button
                class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
                type="submit"
                onClick={() => {
                  localStorage.setItem("userInfo", "");
                  router.push("/");
                }}
              >
                <div className="flex flex-row items-center">
                  <span className="text-xl">Logout</span>
                </div>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <h3
              className="pt-4 px-20 font-head text-9xl text-indigo-900 font-bold align-middle"
              style={{ paddingTop: "13vh" }}
            >
              Welcome back, {userInfo.Name}!
            </h3>
            <div className="flex justify-center">
              {" "}
              <img src="https://cdn3d.iconscout.com/3d/premium/thumb/medicine-3494848-2928740.png"></img>
            </div>
          </div>
        </div>
        <div className="w-screen px-20 flex flex-row relative bottom-20">
          <div className="w-1/6 flex justify-center items-center">
            <div
              className="py-4 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 px-8"
              onClick={() => {
                QRCode.toDataURL(userInfo["Doctor_ID"].toString()).then(
                  (data) => {
                    setSrc(data);
                  }
                );
                setOpen(true);
              }}
            >
              <span className="text-white text-justify align-middle">
                Scan QR Code
              </span>
            </div>
          </div>
          <div className="p-8 w-full">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="w-full px-4 py-8 border placeholder:font-small placeholder:text-2xl text-2xl border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              placeholder="Search for patients"
            ></input>
          </div>
          <div className="w-1/6 flex justify-center items-center">
            <div
              onClick={() => {
                setSearchBool(true);
              }}
              className="p-8 drop-shadow-xl font-small rounded-full bg-gradient-to-r from-purple-400 to-purple-500  flex items-center justify-center"
            >
              <MdSearch size={32} color="white" />
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-small text-black ml-24">
            {searchbool == true ? `Results for ${search}` : ""}
          </h1>
          <div className="overflow-x-auto flex flex-row px-24 py-12">
            {doctorPatient.map((v) => {
              if (
                searchbool == true &&
                v.Name.toLowerCase().includes(search.toLowerCase())
              ) {
                return (
                  <div
                    onClick={() => {
                      router.push("/updateInfo/" + v["_id"]);
                    }}
                    style={{ width: "240px" }}
                    className="rounded-md drop-shadow-2xl mx-8 bg-purple-50 py-16  flex flex-col justify-center items-center"
                  >
                    <Avatar
                      sx={{ width: 120, height: 120 }}
                      src={v == null ? "" : v.profileURL}
                    ></Avatar>
                    <span className="mt-8 text-xl font-small w-90 text-justify">
                      {v == null ? "" : v.Name}{" "}
                    </span>
                  </div>
                );
              } else {
                return <div></div>;
              }
            })}
          </div>
        </div>
        <h1 className="text-5xl font-small text-black ml-24">
          Today's Appointments
        </h1>
        <div className="overflow-x-auto flex flex-row px-24 py-12">
          {tdyAppointments.map((v) => {
            return (
              <div
                onClick={() => {
                  router.push({
                    pathname: "/updateInfo/" + v["Patient_ID"],
                    query: { appt: v["Appointment_ID"] },
                  });
                }}
                style={{ width: "240px" }}
                className="rounded-md drop-shadow-2xl mx-8 bg-purple-50 py-16  flex flex-col justify-center items-center"
              >
                <Avatar
                  sx={{ width: 120, height: 120 }}
                  src={v == null ? "" : v.Profile_URL}
                ></Avatar>
                <span className="mt-8 text-xl font-small w-90 text-justify">
                  {v == null ? "" : v.Name}{" "}
                </span>
                <span className="mt-8 px-4 font-small text-lg text-gray-400 w-90 text-justify">
                  {v == null
                    ? ""
                    : `Scheduled On: ${new Date(
                        v.DateTime
                      ).toUTCString()}`}{" "}
                </span>
              </div>
            );
          })}
        </div>

        <div>
          <h1 className="text-5xl font-small text-black ml-24">
            Your patients
          </h1>
          <div className="overflow-x-auto flex flex-row px-24 py-12">
            {doctorPatient.map((v) => {
              return (
                <div
                  onClick={() => {
                    router.push({
                      pathname: "/updateInfo/" + v["Patient_ID"],
                      query: { appt: v["Appointment_ID"] },
                    });
                  }}
                  style={{ width: "240px" }}
                  className="rounded-md drop-shadow-2xl mx-8 bg-purple-50 py-16  flex flex-col justify-center items-center"
                >
                  <Avatar
                    sx={{ width: 120, height: 120 }}
                    src={v == null ? "" : v.profileURL}
                  ></Avatar>
                  <span className="mt-8 text-xl font-small w-90 text-justify">
                    {v == null ? "" : v.Name}{" "}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Dialog onClose={handleClose} open={open}>
          <div className="w-screen flex flex-col">
            <DialogTitle>QR Code</DialogTitle>
            <QrReader
              delay={50000}
              style={{
                height: 240,
                width: 320,
              }}
              onError={(err) => {
                console.log(err);
              }}
              onScan={async (data) => {
                console.log("this is running");
                console.log(data);

                if (data != null && done == false) {
                  try {
                    setDone(true);
                    /*const response = await axios.post(
                      `${process.env.NEXT_PUBLIC_API}` + "addPatient",
                      { doctorID: userInfo["_id"], patientID: data.text }
                    );*/
                    const response = await axios.post(
                      `${process.env.NEXT_PUBLIC_API}` + "bookApt",
                      {
                        patientID: data.text,
                        doctorID: userInfo.Doctor_ID,
                        datetime: new Date().toISOString().replace("T", " "),
                      }
                    );
                    router.push({
                      pathname: "/updateInfo/" + data.text,
                      query: { appt: response.data.toString() },
                    });
                    router.push("/updateInfo/" + data.text);
                  } catch (e) {
                    console.log(e);
                  }
                }
              }}
            />
          </div>
        </Dialog>
      </div>
    );
  } else if (userInfo.role == "Pharma") {
    return (
      <div>
        <div className="bg-purple-100" style={{ height: "90vh" }}>
          <div className="flex flex-row justify-between items-center pt-4 px-12">
            <h1 className="font-head text-7xl">0R</h1>
            <div className="flex flex-row items-center">
              <Avatar
                sx={{ width: 90, height: 90 }}
                src={userInfo.profileURL}
              ></Avatar>
              <div
                onClick={() => {
                  router.push("/inventory/" + userInfo.Location);
                }}
                className="py-4 px-6 text-lg ml-5 drop-shadow-xl font-small rounded-full bg-gradient-to-r from-purple-400 to-purple-500 text-white  flex items-center justify-center"
              >
                +
              </div>
              <button
                class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
                type="submit"
                onClick={() => {
                  localStorage.setItem("userInfo", "");
                  router.push("/");
                }}
              >
                <div className="flex flex-row items-center">
                  <span className="text-xl">Logout</span>
                </div>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <h3
              className="pt-4 px-20 font-head text-9xl text-indigo-900 font-bold align-middle"
              style={{ paddingTop: "13vh" }}
            >
              Welcome back, {userInfo.Name}!
            </h3>
            <div className="flex justify-center">
              {" "}
              <img src="https://cdn3d.iconscout.com/3d/premium/thumb/medicine-3494848-2928740.png"></img>
            </div>
          </div>
        </div>
        <div className="w-screen px-20 flex flex-row relative bottom-20">
          <div className="w-1/6 flex justify-center items-center">
            <div
              className="py-4 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 px-8"
              onClick={() => {
                QRCode.toDataURL(userInfo.Location).then((data) => {
                  setSrc(data);
                });
                setOpen(true);
              }}
            >
              <span className="text-white text-justify align-middle">
                Scan QR Code
              </span>
            </div>
          </div>
          <div className="p-8 w-full">
            <input
              className="w-full px-4 py-8 border placeholder:font-small placeholder:text-2xl text-2xl border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              placeholder="Search for patients"
            ></input>
          </div>
          <div className="w-1/6 flex justify-center items-center">
            <div className="p-8 drop-shadow-xl font-small rounded-full bg-gradient-to-r from-purple-400 to-purple-500  flex items-center justify-center">
              <MdSearch size={32} color="white" />
            </div>
          </div>
        </div>{" "}
        <div className="w-screen flex justify-center px-48">
          <table className="border-collapse border border-slate-400 table-fixed w-full ">
            <thead>
              <tr>
                <th className="border border-slate-300 font-small w-1/3 py-2">
                  Name
                </th>
                <th className="border border-slate-300 font-small w-1/3 py-2">
                  Price
                </th>
                <th className="border border-slate-300 font-small w-1/3 py-2">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {doctorPatient.map((v) => {
                return (
                  <tr>
                    <td className="border border-slate-300 font-small w-1/3 py-2 pl-4">
                      {v.Name}
                    </td>
                    <td className="border border-slate-300 font-small w-1/3 py-2 pl-4">
                      {v.Price}
                    </td>
                    <td className="border border-slate-300 font-small w-1/3 py-2 pl-4">
                      {v.Quantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Dialog onClose={handleClose} open={open}>
          {done == false ? (
            <div className="w-screen flex flex-col">
              <DialogTitle>QR Code</DialogTitle>
              <QrReader
                delay={50000}
                style={{
                  height: 240,
                  width: 320,
                }}
                onError={(err) => {
                  console.log(err);
                }}
                onScan={async (data) => {
                  console.log("this is running");
                  console.log(data);

                  if (data != null && done == false) {
                    try {
                      const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_API}` + "loadPrescription",
                        {
                          id: data.text.split("P")[1],
                          pharmaID: userInfo.Location,
                        }
                      );
                      setPrescriptionDetails(response.data);
                      setDone(true);
                      console.log("Presc");
                      console.log(response.data);
                      console.log(prescriptionDetails);
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }}
              />
            </div>
          ) : (
            <div className=" w-full flex flex-col">
              <DialogTitle>Prescription</DialogTitle>
              <div className="flex flex-row pl-8">
                <Avatar
                  sx={{ width: 90, height: 90 }}
                  src={`${
                    prescriptionDetails.length == 0
                      ? ""
                      : prescriptionDetails[0].Profile_URL
                  }`}
                ></Avatar>
                <div className="pl-3">
                  <h3>
                    Name of Patient:
                    {prescriptionDetails.length == 0
                      ? ""
                      : prescriptionDetails[0].Name}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <table className="border-collapse border border-slate-400 table-fixed w-full ">
                  <thead>
                    <tr>
                      <th className="border border-slate-300 font-small w-1/3 py-2">
                        Name
                      </th>
                      <th className="border border-slate-300 font-small w-1/3 py-2">
                        Price
                      </th>
                      <th className="border border-slate-300 font-small w-1/3 py-2">
                        Quantity to be prescribed
                      </th>
                      <th className="border border-slate-300 font-small w-1/3 py-2">
                        Price for Qty
                      </th>
                      <th className="border border-slate-300 font-small w-1/3 py-2">
                        Quantity available
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptionDetails.map((v) => {
                      return (
                        <tr>
                          <td className="border border-slate-300 font-small w-1/3 py-2 pl-4">
                            {v.Medicine_name}
                          </td>
                          <td className="border border-slate-300 font-small w-1/3 py-2 pl-4">
                            {v.Price}
                          </td>
                          <td className="border border-slate-300 font-small w-1/3 py-2 pl-4">
                            {v.Duration_of_consumption * v.Rate}
                          </td>

                          <td className="border border-slate-300 font-small w-1/3 py-2 pl-4">
                            {v.Duration_of_consumption * v.Rate * v.Price}
                          </td>
                          <td className="border border-slate-300 font-small w-1/3 py-2 pl-4">
                            {v.Quantity == null ||
                            v.Quantity > v.Duration_of_consumption * v.Rate
                              ? "Out of stock"
                              : v.Quantity}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center">
                <h3>
                  Total Price:
                  {prescriptionDetails.reduce((total, v) => {
                    return total + v.Duration_of_consumption * v.Rate * v.Price;
                  }, 0)}
                </h3>
                <button
                  class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
                  onClick={async () => {
                    const response = await axios.post(
                      `${process.env.NEXT_PUBLIC_API}` + "decrementinventory",
                      {
                        prescriptionID: prescriptionDetails[0].Prescription_ID,
                        pharmaID: userInfo.Location,
                      }
                    );
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-row items-center">
                    <span className="text-xl">Prescribed</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </Dialog>
      </div>
    );
  } else if (userInfo.role == "Lab") {
    return (
      <div>
        <div className="bg-purple-100" style={{ height: "90vh" }}>
          <div className="flex flex-row justify-between items-center pt-4 px-12">
            <h1 className="font-head text-7xl">0R</h1>
            <div className="flex flex-row items-center">
              <Avatar
                sx={{ width: 90, height: 90 }}
                src={userInfo.profileURL}
              ></Avatar>

              <button
                class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
                type="submit"
                onClick={() => {
                  localStorage.setItem("userInfo", "");
                  router.push("/");
                }}
              >
                <div className="flex flex-row items-center">
                  <span className="text-xl">Logout</span>
                </div>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <h3
              className="pt-4 px-20 font-head text-9xl text-indigo-900 font-bold align-middle"
              style={{ paddingTop: "13vh" }}
            >
              Welcome back, {userInfo.Name}!
            </h3>
            <div className="flex justify-center">
              {" "}
              <img src="https://cdn3d.iconscout.com/3d/premium/thumb/medicine-3494848-2928740.png"></img>
            </div>
          </div>
        </div>
        <div className="w-screen px-20 flex flex-row relative bottom-20">
          <div className="w-1/6 flex justify-center items-center">
            <div
              className="py-4 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 px-8"
              onClick={() => {
                setOpen(true);
              }}
            >
              <span className="text-white text-justify align-middle">
                Scan QR Code
              </span>
            </div>
          </div>
          <div className="p-8 w-full">
            <input
              className="w-full px-4 py-8 border placeholder:font-small placeholder:text-2xl text-2xl border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              placeholder="Search for patients"
            ></input>
          </div>
          <div className="w-1/6 flex justify-center items-center">
            <div className="p-8 drop-shadow-xl font-small rounded-full bg-gradient-to-r from-purple-400 to-purple-500  flex items-center justify-center">
              <MdSearch size={32} color="white" />
            </div>
          </div>
        </div>{" "}
        <Dialog onClose={handleClose} open={open}>
          {done == false ? (
            <div className="w-screen flex flex-col">
              <DialogTitle>QR Code</DialogTitle>
              <QrReader
                delay={50000}
                style={{
                  height: 240,
                  width: 320,
                }}
                onError={(err) => {
                  console.log(err);
                }}
                onScan={async (data) => {
                  console.log("this is running");
                  console.log(data);

                  if (data != null && done == false) {
                    try {
                      router.push({
                        pathname: "/updateInfo/" + data.text,
                      });
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }}
              />
            </div>
          ) : (
            <div className="w-screen flex flex-col">
              <DialogTitle>Prescription</DialogTitle>
              <div className="flex flex-row pl-8">
                <Avatar
                  sx={{ width: 90, height: 90 }}
                  src={`${
                    prescriptionDetails.user == null
                      ? ""
                      : prescriptionDetails.user.profileURL
                  }`}
                ></Avatar>
                <div className="pl-3">
                  <h3>
                    Name of Doctor:
                    {prescriptionDetails.presc == null
                      ? ""
                      : prescriptionDetails.presc.DoctorName}
                  </h3>
                  <h3>
                    Name of Medicine:
                    {prescriptionDetails.presc == null
                      ? ""
                      : prescriptionDetails.presc.Name_of_Medicine}
                  </h3>
                  <h3>
                    Quantity:
                    {prescriptionDetails.presc == null
                      ? ""
                      : prescriptionDetails.presc.Quantity}
                  </h3>
                  <h3>
                    Note:
                    {prescriptionDetails.presc == null
                      ? ""
                      : prescriptionDetails.presc.Description}
                  </h3>
                  <h3>
                    Prescribed at:
                    {prescriptionDetails.presc == null
                      ? ""
                      : prescriptionDetails.presc.createdAt}
                  </h3>
                  <button
                    class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
                    onClick={async () => {
                      const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_API}` + "decrementinventory",
                        {
                          id: JSON.parse(localStorage.getItem("userInfo"))[
                            "_id"
                          ],
                          quantity: prescriptionDetails.presc.Quantity,
                          medicine: prescriptionDetails.presc.Name_of_Medicine,
                        }
                      );
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-row items-center">
                      <span className="text-xl">Prescribed</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </Dialog>
      </div>
    );
  } else {
    return <div></div>;
  }
}
