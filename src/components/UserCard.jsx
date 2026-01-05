import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

// ✅ Default image
const DEFAULT_PHOTO =
  "data:image/jpeg;base64,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";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Unable to send request", err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl overflow-hidden">
      {/* IMAGE */}
      <figure className="w-full h-80">
        <img
          src={photoUrl || DEFAULT_PHOTO}
          alt="photo"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DEFAULT_PHOTO;
          }}
        />
      </figure>

      {/* CONTENT */}
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-sm opacity-80">
            {age}, {gender}
            <br />
            {about}
          </p>
        )}

        {/* <p className="opacity-80 my-0">{about}</p> */}

        <div className="card-actions justify-center my-2">
          <button
            className="btn px-4 mx-2 bg-primary btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>

          <button
            className="btn px-4 bg-secondary btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
