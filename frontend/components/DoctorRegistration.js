import { MdAdd } from "react-icons/md";
import Expandible from "@/components/Expandible";

import { initializeApp } from "firebase/app";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Doctor() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [profileURL, setProfileURL] = useState("");
  const [education, setEducation] = useState("");
  const [educationList, setEducationList] = useState([]);
  const [location, setLocation] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [professionalAchievements, setProfessionalAchievements] = useState("");
  const [professionalAchievementsList, setProfessionalAchievementsList] =
    useState([]);
  const changed = (props) => (e) => {
    var d = {};
    d[props] = e.target.value;
    setData({ ...data, ...d });
    console.log(data);
  };
  const educationChanged = (props) => (e) => {
    setEducation(e.target.value);
  };
  const locationChanged = (props) => (e) => {
    setLocation(e.target.value);
  };
  const professionalAchievementsChanged = (props) => (e) => {
    setProfessionalAchievements(e.target.value);
  };
  const signUpClick = async () => {
    const newData = {
      ...data,
      profileURL: profileURL,
      role: "Doctor",
      education: educationList,
      location: locationList,
      professionalAchievements: professionalAchievementsList,
    };
    console.log(newData);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}` + "signUp",
      newData
    );
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    router.push("/login");
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
            if (param == "profilepic") {
              setProfileURL(downloadURL);
              alert("Profile pic has been uploaded");
            } else {
              setReports([...reports, downloadURL]);
              alert("Report has been uploaded");
            }
          });
        }
      );
    };
    input.click();
  };
  return (
    <div>
      <div className="w-full px-20 pt-24 pb-12">
        <div className="flex flex-row justify-between items-center">
          <h3 className="font-small text-xl align-middle">Profile Picture</h3>
          <button
            class="x-6 drop-shadow-xl font-small rounded-full bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-3 text-white"
            type="submit"
            onClick={() => {
              fileUpload("profilepic");
            }}
          >
            <MdAdd color="white" size={23} />
          </button>
        </div>
      </div>
      <Expandible name="Personal Info">
        <div className="pt-4 grid grid-cols-3">
          <div className="px-4">
            <input
              placeholder="Name"
              onChange={changed("Name")}
              className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
            ></input>
          </div>
          <div className="px-4">
            <input
              placeholder="Age"
              onChange={changed("Age")}
              className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
            ></input>
          </div>
          <div className="px-4">
            <input
              placeholder="Phone no"
              onChange={changed("Phone_no")}
              className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
            ></input>
          </div>
        </div>
        <div className="px-4">
          <input
            placeholder="Email"
            onChange={changed("Email")}
            className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
          ></input>
        </div>
        <div className="px-4">
          <input
            placeholder="Password"
            onChange={changed("Password")}
            className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
          ></input>
        </div>
        <div className="px-4">
          <input
            placeholder="Speciality"
            onChange={changed("Speciality")}
            className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
          ></input>
        </div>
        <div className="px-4">
          <textarea
            placeholder="Bio"
            onChange={changed("Bio")}
            className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
          ></textarea>
        </div>
        <div className="px-4 flex flex-row">
          <input
            placeholder="Education"
            onChange={educationChanged("Chronic_Disease")}
            className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
          ></input>
          <button
            class="x-6 ml-4 my-4 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
            type="submit"
            onClick={() => {
              setEducationList([...educationList, education]);
              setChronicDisease("");
            }}
          >
            <span className="text-xl">Add</span>
          </button>
        </div>
        {educationList.map((v) => {
          return <h6 className="font-small">{v}</h6>;
        })}
        <div className="px-4 flex flex-row">
          <input
            placeholder="Location"
            onChange={locationChanged("Chronic_Disease")}
            className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
          ></input>
          <button
            class="x-6 ml-4 my-4 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
            type="submit"
            onClick={() => {
              setLocationList([...locationList, location]);
              setChronicDisease("");
            }}
          >
            <span className="text-xl">Add</span>
          </button>
        </div>
        {locationList.map((v) => {
          return <h6 className="font-small">{v}</h6>;
        })}
        <div className="px-4 flex flex-row">
          <input
            placeholder="Professional Achievements"
            onChange={professionalAchievementsChanged("Chronic_Disease")}
            className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
          ></input>
          <button
            class="x-6 ml-4 my-4 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
            type="submit"
            onClick={() => {
              setProfessionalAchievementsList([
                ...professionalAchievementsList,
                professionalAchievements,
              ]);
              setChronicDisease("");
            }}
          >
            <span className="text-xl">Add</span>
          </button>
        </div>
        {professionalAchievementsList.map((v) => {
          return <h6 className="font-small">{v}</h6>;
        })}
      </Expandible>

      <div className="flex w-full pr-8 justify-end">
        <button
          class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
          type="submit"
          onClick={() => {
            signUpClick();
          }}
        >
          <span className="text-xl">Sign Up</span>
        </button>
      </div>
    </div>
  );
}
