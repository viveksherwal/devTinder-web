import axios from "axios";
import {useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error,setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (isLoading) return; // Prevent multiple requests
    
    try{
      setError(""); // Clear previous errors
      setIsLoading(true);
      
      const res = await axios.post(BASE_URL+"/login", {emailId, password},{withCredentials:true});
      console.log("Login response:", res.data);
      
      // Check if login was actually successful
      if (res.status === 200 && res.data) {
        dispatch(addUser(res.data));
        return navigate("/");
      } else {
        setError("Login failed - Invalid response from server");
      }
    }catch(err){
      console.error("Login error:", err);
      
      // Better error handling
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data?.message || err.response.data || `Error ${err.response.status}: Login failed`;
        setError(errorMessage);
      } else if (err.request) {
        // Network error
        setError("Network error - Cannot connect to server");
      } else {
        // Other error
        setError("Something went wrong during login");
      }
    } finally {
      setIsLoading(false);
    }
};

const handleSignUp = async () => {
    if (isLoading) return; // Prevent multiple requests
    
    try{
      setError(""); // Clear previous errors
      setIsLoading(true);
      
      const res = await axios.post(BASE_URL+"/signup", {firstName,lastName,emailId, password},{withCredentials:true});
      console.log("Signup response:", res.data);
      
      // Check if signup was successful and extract user data
      if (res.status === 200 && res.data?.data) {
        dispatch(addUser(res.data.data)); // Use res.data.data for signup
        return navigate("/");
      } else {
        setError("Signup failed - Invalid response from server");
      }
    }catch(err){
      console.error("Signup error:", err);
      
      // Better error handling
      if (err.response) {
        const errorMessage = err.response.data?.message || err.response.data || `Error ${err.response.status}: Signup failed`;
        setError(errorMessage);
      } else if (err.request) {
        setError("Network error - Cannot connect to server");
      } else {
        setError("Something went wrong during signup");
      }
    } finally {
      setIsLoading(false);
    }
};


  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
          {!isLoginForm && (
            <>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend py-2">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs "
                    onChange={(e)=>setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend py-2">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs "
                    onChange={(e)=>setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
            </>
          )}
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
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs "
                onChange={(e)=>setPassword(e.target.value)} 
              />
            </fieldset>
          </div>
          <p className="text-red-600">{error}</p>
          <div className="card-actions justify-center flex  ">
            <button 
              className={`btn btn-primary bg-green-500 px-6 py-4 my-2 ${isLoading ? 'loading' : ''}`}
              onClick={isLoginForm ? handleLogin : handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (isLoginForm ? 'Logging in...' : 'Signing up...') : (isLoginForm ? "Login" : "SignUp")}
            </button>
          </div>
          <p className="m-auto cursor-pointer py-2"
          onClick={() => {
            setIsLoginForm((value) => !value);
          }}
          >
            {isLoginForm ? "New User? Sign Up" : "Existing User? Login"}

          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
