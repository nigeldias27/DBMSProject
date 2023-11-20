import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Avatar, Dialog, DialogTitle } from "@mui/material";
import axios from "axios";
export default function Appointment(props) {
  const router = useRouter();
  const bookInput = useRef(null);
  const reviewInput = useRef(null);
  const ratingInput = useRef(null);
  const [docdetails, setDocDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [addReview, setAddReview] = useState(false);
  useEffect(() => {
    if (router.isReady) {
      initstate();
    }
  }, [router.isReady]);
  const initstate = async () => {
    console.log(router.query);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}` + "docDetails",
      { id: router.query.Doctor_ID }
    );
    setDocDetails(response.data);
  };
  const handleClose = (value) => {
    setOpen(false);
    setAddReview(false);
  };
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
              src={`${router.query == null ? "" : router.query.Profile_URL}`}
            ></Avatar>
          </div>

          <div className="flex justify-center flex-col">
            <h3 className="font-head text-6xl">
              {router.query == null ? "" : router.query.Name}
            </h3>
            <h3 className="font-small text-3xl pt-8">
              Age: {router.query == null ? "" : router.query.Age} years old
            </h3>
            <h3 className="font-small text-3xl pt-4">
              Speciality:
              {router.query == null ? "" : router.query.Speciality}
            </h3>
            <h3 className="font-small text-3xl pt-4">
              Rating: {router.query == null ? "" : router.query.Rating}
            </h3>
            <div>
              <div className="flex flex-row">
                <button
                  class="my-2 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
                  type="submit"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <div className="flex flex-row items-center">
                    <span className="text-xl">Book Now</span>
                  </div>
                </button>
                <button
                  class="my-2 mx-3 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
                  type="submit"
                  onClick={() => {
                    window.location.href = `https://maps.google.com?q=${
                      docdetails.location == undefined
                        ? ""
                        : docdetails.location[0].LocationInfo
                    }`;
                  }}
                >
                  <div className="flex flex-row items-center">
                    <span className="text-xl">Open in Google Maps</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-16">
        <div className="max-w-min py-8">
          <span className="font-head text-5xl">Bio</span>
          <div className="h-2 w-full bg-purple-400 rounded-lg"></div>
        </div>
        <h3 className="font-small">
          {router.query == null ? "" : router.query.Bio}
        </h3>
        <div className="max-w-min py-8">
          <span className="font-head text-5xl">Education</span>
          <div className="h-2 w-full bg-purple-400 rounded-lg"></div>
        </div>
        {docdetails.education == undefined ? (
          <div></div>
        ) : (
          docdetails.education.map((v) => {
            return <h3 className="font-small">{v.Education}</h3>;
          })
        )}
        <div className="max-w-full py-8">
          <span className="font-head text-5xl">Professional Achievements</span>
          <div className="h-2 w-80 bg-purple-400 rounded-lg mb-8"></div>
          {docdetails.professionalAchievements == undefined ? (
            <div></div>
          ) : (
            docdetails.professionalAchievements.map((v) => {
              return <h3 className="font-small">{v.Achievements}</h3>;
            })
          )}
        </div>
        <div className="flex flex-row justify-between">
          <div className="max-w-min pt-8">
            <span className="font-head text-5xl">Reviews</span>
            <div className="h-2 w-full bg-purple-400 rounded-lg"></div>
          </div>
          <button
            class="my-2 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
            type="submit"
            onClick={() => {
              setAddReview(true);
              setOpen(true);
            }}
          >
            <div className="flex flex-row items-center">
              <span className="text-xl">Add Review</span>
            </div>
          </button>
        </div>

        {docdetails.review == undefined ? (
          <div></div>
        ) : (
          docdetails.review.map((v) => {
            return (
              <div className="flex flex-row justify-between bg-purple-50 rounded-lg p-8 my-8">
                <h3 className="font-small">{v.Review}</h3>
                <div className=" bg-green-600 rounded-md">
                  <span className="text-white p-4">{v.Rating}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Dialog onClose={handleClose} open={open}>
        <div className="p-12">
          <h2 className="font-head text-4xl">
            {addReview ? "Add a Review" : "Book Appointment"}
          </h2>
          {addReview ? (
            <div>
              <textarea
                className="w-full px-4 my-8 py-4 text-base border placeholder:font-small placeholder:text-lg border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
                placeholder="Review"
                ref={reviewInput}
              ></textarea>

              <input
                type="number"
                className="w-full px-4 my-8 py-4 text-base border placeholder:font-small placeholder:text-lg border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
                placeholder="Rating"
                ref={ratingInput}
              ></input>
            </div>
          ) : (
            <input
              type="datetime-local"
              className="w-full px-4 my-8 py-4 text-base border placeholder:font-small placeholder:text-lg border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
              placeholder="Datetime"
              ref={bookInput}
            ></input>
          )}

          <button
            class="my-2 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
            type="submit"
            onClick={async () => {
              if (addReview) {
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_API}` + "addReview",
                  {
                    patientID: JSON.parse(localStorage.getItem("userInfo"))
                      .Patient_ID,
                    doctorID: router.query.Doctor_ID,
                    Review: reviewInput.current.value,
                    Rating: ratingInput.current.value,
                  }
                );
                var x = await response.data;
                handleClose();
              } else {
                console.log(bookInput.current.value);
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_API}` + "bookApt",
                  {
                    patientID: JSON.parse(localStorage.getItem("userInfo"))
                      .Patient_ID,
                    doctorID: router.query.Doctor_ID,
                    datetime: bookInput.current.value.replace("T", " "),
                  }
                );
                var x = await response.data;
                handleClose();
              }
            }}
          >
            <div className="flex flex-row items-center">
              <span className="text-xl">{addReview ? "Add" : "Book Now"}</span>
            </div>
          </button>
        </div>
      </Dialog>
    </div>
  );
}
