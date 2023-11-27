import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req,res) => {
    //  CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q, [req.body.email, req.body.username], (err,data) => {
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User already exists!")

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`,`email`, `password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash, 
        ]

        db.query(q, [values], (err,data)=>{
            if(err) return res.json(err);
            return res.status(200).json("User has been created!");
        })
    })

}

export const login = (req,res) => {
    // CHECK USER 
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err,data) => {
        if (err) return res.json(err);
        //if we don't have this username
        if(data.length === 0) return res.status(404).json("User not found!");

        //Check password
        // data[0] is all the information about user
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password); 

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!")

        //To save user so this user does not change anything it does not have access to
        //we are storing the token in cookie
        // "jwtkey" has to be random in real life
        const token =jwt.sign({id:data[0].id}, "jwtkey")

        // we don't want to send password as plain text so we only send specific information 
        const {password, ...other} = data[0]

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other);  

    })

}
export const logout = (req,res) => {
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out.")
};



export const forgotPassword =  (req,res) => { 
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], (err,data) => {
        if(err) return  res.status(408).json("User does not exists!")
        if(data.length) {
            //return  res.status(200).json("User exists!")
            const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
            const secret = JWT_SECRET + data[0].password;
            const token = jwt.sign({ email: data[0].email, id: data[0].id }, secret, {
              expiresIn: "5m",
            });
            const link = `http://localhost:8800/api/auth/reset-password/${data[0].id}/${token}`;
            console.log(link)
        }

    })

};
 export const resetPassword = async (req,res) => {
    res.send("Done!!")
 };
// export const resetPassword = async (req,res) => {
//     const { id, token } = req.params;
//     const { password } = req.body;
  
//     const query = "SELECT * FROM users WHERE id = ?";
//     const user = await executeQuery(query, [id]);
  
//     if (user.length === 0) {
//       return res.json({ status: "User Not Exists!!" });
//     }
  
//     const secret = JWT_SECRET + user[0].password;
//     try {
//       const verify = jwt.verify(token, secret);
//       const encryptedPassword = await bcrypt.hash(password, 10);
  
//       const updateQuery = "UPDATE users SET password = ? WHERE id = ?";
//       await executeQuery(updateQuery, [encryptedPassword, id]);
  
//       // Additional code if needed
  
//       res.json({ status: "Password reset successful" });
//     } catch (error) {
//       // Handle error
//       res.json({ status: "Failed to reset password" });
//     }
// };