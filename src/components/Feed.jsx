import React, {useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store)=>store.feed);
  console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async()=>{
    if(feed)return ;
    try{
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true});
      console.log(res);
      dispatch(addFeed(res.data));
    }catch(err){
      console.error(err)
    }
  };
  useEffect(()=>{
    getFeed();
  },[]);  

  if(!feed)return null;
  if(feed.length===0){
    return <h1 className='text-center text-bold text-white text-2xl mt-10'>No Users Available in Feed</h1>
  }



  return (
    feed &&(
    <div className='flex justify-center my-10'>
      <UserCard user = {feed[0]}/>
    </div>
    )
  )
}

export default Feed