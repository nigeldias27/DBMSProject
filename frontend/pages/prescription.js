import { Avatar, Dialog, DialogTitle } from "@mui/material";
export default function Prescription() {
  return (
    <div
      className="w-screen flex justify-center items-center bg-purple-50"
      style={{ height: "60vh" }}
    >
      <div className="grid grid-cols-2">
        <div className="flex justify-center items-center">
          <Avatar
            sx={{ width: 240, height: 240, marginRight: 36 }}
            src={`${
              userData == null ? "" : localStorage.getItem("prescription")
            }`}
          ></Avatar>
        </div>

        <div className="flex justify-center flex-col">
          <h3 className="font-head text-6xl">
            {userData == null ? "" : userData.Name}
          </h3>
          <h3 className="font-small text-3xl pt-8">
            I am {userData == null ? "" : userData.Age} years old
          </h3>
          <h3 className="font-small text-3xl pt-4">
            Chronic Diseases:
            {userData == null ? "" : userData.Chronic_Disease}
          </h3>
          <h3 className="font-small text-3xl pt-4">
            Allergies: {userData == null ? "" : userData.Allergies}
          </h3>
        </div>
      </div>
    </div>
  );
}
