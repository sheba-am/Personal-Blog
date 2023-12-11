import React, { useContext, useState } from 'react'
import Logo from '../img/logo.png'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const {currentUser, logout} = useContext(AuthContext);
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const closeNavbar = () => {
    setShowLinks(false);
  };

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to="/"><img src={Logo} alt='this is a logo'/></Link>
        </div>
        <button className="toggle-button" onClick={toggleLinks}>
        {showLinks ? '✖' : '☰'} {/* Unicode characters for close and hamburger icons */}
        </button>
        <div className={`links ${showLinks ? 'active' : ''}`}> 
          <Link className='link' to="/blog/?cat=art" onClick={closeNavbar}><h6>ART</h6></Link>
          <Link className='link' to="/blog/?cat=science" onClick={closeNavbar}><h6>SCIENCE</h6></Link>
          <Link className='link' to="/blog/?cat=technology" onClick={closeNavbar}><h6>TECHNOLOGY</h6></Link>
          <Link className='link' to="/blog/?cat=cinema" onClick={closeNavbar}><h6>CINEMA</h6></Link>
          <Link className='link' to="/blog/?cat=design" onClick={closeNavbar}><h6>DESIGN</h6></Link>
          <Link className='link' to="/blog/?cat=food" onClick={closeNavbar}><h6>FOOD</h6></Link>
          <span> {currentUser?.username}</span>
          {currentUser? (<span onClick={logout}> Logout</span>):( <Link className='link' to='/login'>Login</Link>)}
          {currentUser?(<span className='write'>
            <Link className='link' to="/write">Write</Link>
          </span>):<div></div>}
        </div>
       </div>
    </div>
  )
}

export default Navbar