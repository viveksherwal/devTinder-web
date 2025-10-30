import axios from "axios";
import React, {useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("viratkholi@gmail.com");
  const [password, setPassword] = useState("Virat1234$");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await axios.post(BASE_URL+"/login", {emailId, password},{withCredentials:true});
      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate('/');
    }catch(err){
      console.log(err); 
 }
};

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset my-1">
              <legend className="fieldset-legend py-2">Email ID</legend>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs "
                onChange={(e)=>setEmailId(e.target.value)}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend py-2">Password</legend>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full max-w-xs "
                onChange={(e)=>setPassword(e.target.value)} 
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center flex  ">
            <button className="btn btn-primary bg-green-500 px-6 py-4 my-2 "onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
