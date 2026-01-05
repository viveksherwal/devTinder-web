import { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../utils/userSlice'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try{
      const res = await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
      dispatch(addUser(res.data));
    }catch(err){
      if(err.response?.status === 401){
        navigate('/login');
      }
      console.error("Auth check failed:", err);
    }
  };

  useEffect(() => {
    // Only fetch user if not already in store
    if (!userData) {
      fetchUser();
    }
  }, []); // Remove userData dependency to prevent infinite loops


  return (
    <div>
        <NavBar />
        <Outlet /> 
        <Footer />
    </div>
  )
}

export default Body