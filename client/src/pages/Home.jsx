import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from "axios"
import bannerImg from '../img/banner.jpg'

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
      <div className='banner-place'>
        <img className='banner-img' src={bannerImg}/>  

        <div className="banner">
          <h1 className="banner-title">Welcome to My Website</h1>
          <p className="banner-subtitle">Explore and enjoy our content!</p>
          <Link className='main-button' to="/blog">See Posts</Link>

        </div>
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
      <div className='more-info'>
        <div className='more-info-text'>
          <h1>More Info</h1>
          <p> Imperdiet tempor purus, maecenas pretium et dolor turpis arcu nec orci arcu lacus dictum nunc, ridiculus a vestibulum sapien erat nulla ipsum magna odio. </p>
        </div>
        <div className='more-info-image-container'>
        <div className='more-info-image-col01'>
          <div className='more-info-image-item'><img src='https://websitedemos.net/childcare-blog-02/wp-content/uploads/sites/760/2021/01/child-care-template-topics-img-1.jpg' alt='' /></div>
          <div className='more-info-image-item'><img src='https://websitedemos.net/childcare-blog-02/wp-content/uploads/sites/760/2021/01/child-care-template-topics-img-2.jpg' alt='' /></div>
        </div>

        <div className='more-info-image-col02'>
          <div className='more-info-image-item'><img src='https://websitedemos.net/childcare-blog-02/wp-content/uploads/sites/760/2021/01/child-care-template-topics-img-3.jpg' alt='' /></div>
          <div className='more-info-image-item'><img src='https://websitedemos.net/childcare-blog-02/wp-content/uploads/sites/760/2021/01/child-care-template-topics-img-4.jpg' alt='' /></div>
        </div>
      
        </div>
      </div>

      <div className='about-me'>
        <img src='https://websitedemos.net/childcare-blog-02/wp-content/uploads/sites/760/2021/01/child-care-template-expert-img-3.jpg' alt=''/>
        <div className='about-me-text'>
          <div className='about-me-title'>About me</div>
          <div className='about-me-desc'>description</div>
        </div>
      </div>

      <div className='contact-us'>
        <h1> Contact Me</h1>
        <p>
        Aenean massa feugiat imperdiet a scelerisque et morbi tempus massa tincidunt vitae libero aenean tincidunt molestie.
        </p>
        <div className='contact-info'>
          <div className='icon'>icon</div>
          <div className='number'> 09111111111 </div>
        </div>
      </div>


      
    </div>
  )
}

export default Home