import { useRouter } from "next/router";
import { Avatar, Dialog, DialogTitle } from "@mui/material";
import Expandible from "@/components/Expandible";
import { useEffect, useState } from "react";
import useDownloader from "react-use-downloader";
import axios from "axios";
import Link from "next/link";
import { async } from "@firebase/util";

export default function UpdateInfo() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  const [script, setScript] = useState({});
  const [userData, setUserData] = useState({});
  const changed = (props) => (e) => {
    var d = {};
    d[props] = e.target.value;
    setData({ ...data, ...d });
    console.log(data);
  };

  const cchanged = (props) => (e) => {
    var d = {};
    d[props] = e.target.value;
    setScript({ ...script, ...d });
    console.log(data);
  };
  return (
    <div className="w-screen">
      <div
        className="min-h-screen w-screen flex justify-center items-center bg-purple-50"
        style={{ height: "60vh" }}
      >
        <div className="grid grid-cols-2">
          <div className="flex justify-center items-center">
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/medicine-prescription-4036034-3342343.png"></img>
          </div>

          <div className="flex justify-center flex-col">
            <h3 className="font-head text-6xl">Add/Update inventory</h3>
            <div className="px-4">
              <input
                placeholder="Name of Medicine"
                onChange={changed("Name")}
                className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              ></input>
            </div>
            <div className="px-4">
              <input
                placeholder="Quantity"
                onChange={changed("Quantity")}
                className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              ></input>
            </div>
            <div className="px-4">
              <input
                placeholder="Price"
                onChange={changed("Price")}
                className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              ></input>
            </div>
            <button
              class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
              type="submit"
              onClick={async () => {
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_API}` + "addinventory",
                  {
                    id: id,
                    quantity: data["Quantity"],
                    medicine: data["Name"],
                    price: data["Price"],
                  }
                );
                router.push("/home");
              }}
            >
              <span className="text-xl">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
