import axios from 'axios';
import moment from 'moment';
import React, {useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {
  const state = useLocation().state // this is to make the difference when editing instead of publishing

  const [value, setValue] = useState(state?.desc ||'');
  const [content, setContent] = useState(state?.content ||'');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');
  const [error, setError] = useState('');


  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async e => {
    e.preventDefault()

    // Check potential errors
    if (value.length > 1000) {
      setError('Description must be 1000 characters or less.');
      return;
    }
    if (content.length > 5000) {
      setError('Content must be 5000 characters or less.');
      return;
    }

    const imgUrl = await upload()
    try {
      state ? await axios.put(`/posts/${state.id} `,{
        title,
        desc: value,
        content: content,
        cat,
        img: file ? imgUrl : '', 

      })
      : await axios.post(`/posts/`, {
        title,
        desc: value,
        content: content,
        cat,
        img: file ? imgUrl : '',
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") 
      });
      navigate('/')
    } catch (err) {
      setError(err)
      console.log(err)
    }
  }
  return (
    <div className='add'>
      <div className="page-content">
        {error && <p className='error'>{error}</p>}
        <input type='text' placeholder='title' value={title} onChange={e => setTitle(e.target.value)} />
        <h2>Description:</h2>
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
        <h2>Content:</h2>
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={content} onChange={setContent} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span> 
            <b>Status:</b> Draft
          </span>
          <span> 
            <b>Visibility:</b> Public
          </span>
          <input  style={{display: 'none'}} type='file' name=''  id='file' onChange={e=>setFile(e.target.files[0])} />
          <label className='file' htmlFor='file'>Upload Image</label>
          <div className='buttons' >
            {/* <button> Save as a draft</button> */}
            <button onClick={handleClick}> Publish </button>
          </div>
        </div>
        <div className="item">
          <h1> Category</h1>
          <div className='cat'>
            <input type='radio' checked={cat === 'art'} name='cat' value='art' id='art'  onChange={e => setCat(e.target.value)} />
            <label htmlFor='art'>Art</label>
          </div>
          <div className='cat'> 
            <input type='radio' checked={cat === 'science'} name='cat' value='science' id='science' onChange={e => setCat(e.target.value)} />
            <label htmlFor='science'>science</label>
          </div>         
          <div className='cat'>
            <input type='radio' checked={cat === 'technology'} name='cat' value='technology' id='technology' onChange={e => setCat(e.target.value)} />
            <label htmlFor='technology'>technology</label>
          </div>         

        </div>
      </div>
    </div>
  )
}

export default Write