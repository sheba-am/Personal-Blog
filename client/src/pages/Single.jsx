import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useLocation } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import {AuthContext} from "../context/authContext"
const Single = () => {
  const [post, setPost] = useState({})
  const location = useLocation() // this is the text in addressbar
  const postId = location.pathname.split("/")[2] // post id is the third thing if we split the addressbar text
  const {currentUser} = useContext(AuthContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();  // can't make async function with useEffect  so we create function like this to be async
  }, [postId]); // eveytime we change postID fetchData is going to be called again

  return (
    <div className='single'>
      <div className='content'>
        <img src= {post?.img} alt='' />
        <div className='user'>
          <img src= "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt='' />
          <div className='info'>
          <span> {post.username}</span>
          <p> Posted {moment(post.date).fromNow()}</p>
          </div>
          { currentUser.username === post.username &&
            <div className='edit' >
            <Link to={'/write?edit=2'}><img src={Edit} alt=''/></Link>
            <img src={Delete} alt='' />
          </div>}
        </div>
        <h1> {post.title} </h1>
        {post.desc}

      </div>
    <Menu />
      
    </div>
  )
}

export default Single