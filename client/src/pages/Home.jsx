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


  //   const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];

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
        <button class="main-button">See Posts</button>
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

      
      <div className='posts'>
        {posts.map((post) => (
          //console.log(post.id)
          <div className='post' key={post.id}>
            <div className='img'>
              <img  src={`../upload/${post?.img}`} alt="" />
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`} >
                <h1>{post.title} </h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button> Read More </button>
              
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Home