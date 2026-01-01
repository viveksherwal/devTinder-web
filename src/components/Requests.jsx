// import React, { useEffect } from 'react'
// import axios from 'axios'
// import { BASE_URL } from '../utils/constants'
// import { useDispatch, useSelector } from 'react-redux'
// import { addRequests } from '../utils/requestSlice'



// const Requests = () => {
//     const dispatch = useDispatch();
//     const requests = useSelector((state) => state.requests);

//     const fetchRequests = async () => {
//         try{
//             const res = await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
//             dispatch(addRequests(res.data.data));
//         }catch(err){
//             throw new Error("Unable to fetch requests");
//         }   
//     }

//     useEffect(() => {   
//         fetchRequests();
//     }, []);

//  if(!requests)return;

// if(requests.length===0){return <h1>No Requests</h1>}


//   return (
//     <div className='text-center my-10'>
//         <h1 className="text-bold text-white text-3xl">Requests</h1>
//         {requests.map((Request) => {
//             const {_id, firstName,lastName,photoUrl,age,gender,about} = Request.fromUserId;
//             return (
//                 <div key={_id} className='flex justify-between  m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
//                     <div>
//                         <img src={photoUrl} alt="photo" className='w-20 h-20 rounded-full' />
//                     </div>
//                     <div className='text-left mx-0'>
//                         <h2 className='font-bold text-xl'>
//                             {firstName + " " +lastName}
//                         </h2>
//                         {age && gender && <p>{age + " " +gender}</p>}
//                         <p>{about}</p>
//                     </div>
//                     <div>
//                         <button className='btn px-4 bg-primary btn-primary mx-2'>Accept</button>
//                         <button className='btn px-3 bg-secondary btn-secondary mx-2'>Reject</button>
//                     </div>
//                 </div>
//             );
//         })}
            
//     </div>
//   );
// };

// export default Requests


import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Unable to fetch requests", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <h1 className="text-center text-white text-2xl mt-10">
        No Requests
      </h1>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl mb-6">
        Requests
      </h1>

      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        } = request.fromUserId;

        return (
          <div
            key={_id}
            className="flex items-center justify-between m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            {/* LEFT: Image + Text */}
            <div className="flex items-center gap-4">
              <img
                src={photoUrl}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover"
              />

              <div className="text-left">
                <h2 className="font-bold text-xl">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm opacity-80">
                    {age} {gender}
                  </p>
                )}
                <p className="text-sm mt-1">{about}</p>
              </div>
            </div>

            {/* RIGHT: Buttons */}
            <div className="flex gap-2">
              <button className="btn px-4 bg-primary btn-primary">
                Accept
              </button>
              <button className="btn px-4 bg-secondary btn-secondary">
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
