import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";


const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const[showToast,setShowToast]= useState(false);
  

  const saveProfile = async () => {
    setError(""); //clear previous error
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
    } catch (err) {
      console.error(err);
      setError(err.response.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit profile</h2>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend py-2">firstName</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs "
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-2">lastName</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs "
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-2">age</legend>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs "
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-2">gender</legend>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full max-w-xs "
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-2">about</legend>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs "
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-2">photoUrl</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs "
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-600">{error}</p>
              <div className="card-actions justify-center flex  ">
                <button
                  className="btn btn-primary bg-green-500 px-6 py-4 my-2"
                  onClick={saveProfile}
                >
                  Save profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>profile saved successfully</span>
            </div>
          </div>
        )}
    </>
  );
};

export default EditProfile;
