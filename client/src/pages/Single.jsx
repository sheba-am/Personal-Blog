import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import {AuthContext} from "../context/authContext"
const Single = () => {

  const [post, setPost] = useState({})
  const location = useLocation() // this is the text in addressbar
  const postId = location.pathname.split("/")[2] // post id is the third thing if we split the addressbar text

  const navigate = useNavigate()
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

  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  // when getting text don't get the p tag as well
  const getText = (html) => {
    const doc= new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }  
  return (
    <div className='single'>
      <div className='content'>
        <img src= {`../upload/${post?.img}`} alt='' />
        <div className='user'>
          {post.userImg && <img src= {post.userImg} alt='' />}
          <div className='info'>
          <span> {post.username}</span>
          <p> Posted {moment(post.date).fromNow()}</p>
          </div>
          { currentUser.username === post.username &&
            <div className='edit' >
            <Link to={'/write?edit=2'} state={post}><img src={Edit} alt=''/></Link>
            <img onClick={handleDelete} src={Delete} alt='' />
          </div>}
        </div>
        <h1> {post.title} </h1>
        {getText(post.desc)}

      </div>
    <Menu cat={post.cat}/>
      
    </div>
  )
}

export default Single