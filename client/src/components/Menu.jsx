import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Menu({cat}) {


  const [posts, setPosts] = useState([])
  
  useEffect(()=> {
    const fetchData = async() => {
      try{
        const res = await axios.get(`/posts/?cat=${cat}`)
        setPosts(res.data)
      }catch(err) {
        console.log(err)        
      }
    };
    fetchData(); // can't make async function with useEffect  so we create function like this to be async
  }, [cat]) // eveytime we change category fetchData is going to be called again 
  
  // Slice the array to get only the last 3 posts
  const latestPosts = posts.slice(-3);
  return (
    <div className='menu'>
        <h1> Other posts you may like </h1>
        {latestPosts.map((post) => (
            <div className='post' key={post.id}>
                <img src= {`../upload/${post?.img}`} alt='' onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.style.display = 'none'; // Hide the image if not found
                  }}/>
                <h2>{post.title}</h2>
                <button>Read More</button>
                <Link  className="read-more" to={`/post/${post.id}`} >
                Read more 
                </Link>
            </div>
        ))}
    </div>
  )
}

export default Menu