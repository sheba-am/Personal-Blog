import {db} from "../db.js"
export const getPosts = (req,res) => {
    // here we want to see if there is any query( in addressbar anything after ? is query) and find category to show only that category of posts
    const q = req.query.cat 
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

    db.query(q, [req.query.cat], (err,data) => {
        if (err) return res.send(err); //send or json doesn't matter
        return res.status(200).json(data);
    })
}


// export const getPost = (req,res) => {
//     const q = "SELECT `username`, `title`, `desc`, p.img, `cat`, `date`, FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ? "
//     db.query(q, [req.params.id], (err, data) =>{
//         if(err) return res.json(err)        
//         return res.status(200).json(data[0]);
//     });


// }; 
export const getPost = (req, res) => {
    const q =
      "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
  
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data[0]);
    });
  };


export const addPost = (req,res) => {
    res.json("from controller")
}


export const deletePost = (req,res) => {
    res.json("from controller")
}


export const updatePost = (req,res) => {
    res.json("from controller")
}