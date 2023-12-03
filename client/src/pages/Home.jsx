import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from "axios"

const Home = () => {
  const [posts, setPosts] = useState([])
  const cat = useLocation().search
  
  useEffect(()=> {
    const fetchData = async() => {
      try{
        const res = await axios.get(`/posts${cat}`)
        setPosts(res.data)
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
    <div className='home'>
      <div className="banner">
        <h1 className="banner-title">Welcome to My Website</h1>
        <p className="banner-subtitle">Explore and enjoy our content!</p>
        <Link className='main-button' to="/blog">See Posts</Link>

      </div>
      <div className='featured-title'>Featured Articles</div>

      <div className='featured-articles'>
        <div className='featured-item' >
          <img src='https://websitedemos.net/childcare-blog-02/wp-content/uploads/sites/760/2021/01/child-care-template-featured-article-img-1.jpg' alt='' />
          <p>item 1</p>
          <button> Read more</button>
          
        </div>
        <div className='featured-item' >
          <img src='https://websitedemos.net/childcare-blog-02/wp-content/uploads/sites/760/2021/01/child-care-template-featured-article-img-1.jpg' alt='' />
          <p>item 1</p>
          <button> Read more</button>
        </div>
        <div className='featured-item' >
          <img src='https://websitedemos.net/childcare-blog-02/wp-content/uploads/sites/760/2021/01/child-care-template-featured-article-img-1.jpg' alt='' />
          <p>item 1</p>
          <button> Read more</button>
        </div>
      </div>
      <div className='about-me'>
        <img src='https://websitedemos.net/childcare-blog-02/wp-content/uploads/sites/760/2021/01/child-care-template-expert-img-3.jpg' alt=''/>
        <div className='about-me-text'>
          <div className='about-me-title'>About me</div>
          <div className='about-me-desc'>description</div>
        </div>
      </div>

      
    </div>
  )
}

export default Home