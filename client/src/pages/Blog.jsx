import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from "axios"

const Blog = () => {
  const [posts, setPosts] = useState([])
  const cat = useLocation().search
  
  useEffect(()=> {
    const fetchData = async() => {
      try{
        const res = await axios.get(`/posts${cat}`)
        const sortedPosts = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sortedPosts);
        //setPosts(res.data)
      }catch(err) {
        console.log(err)        
      }
    };
    fetchData(); // can't make async function with useEffect  so we create function like this to be async
  }, [cat]) // eveytime we change category fetchData is going to be called again



  // when getting text don't get the p tag as well
  const getText = (html) => {
    const doc= new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='blog'>


      
      <div className='posts'>
        {posts.map((post) => (
          //console.log(post.id)
          <div className='post' key={post.id}>
            <div className='img'>
              <img  src={`../upload/${post?.img}`} alt=""  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.style.display = 'none'; // Hide the image if not found
                    //e.target.src = '../upload/default-image.png'; // Replace with the path to your default image or a placeholder
                  }} />
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`} >
                <h1>{post.title} </h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <Link  className="read-more" to={`/post/${post.id}`} >
                Read more 
              </Link>
              
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Blog