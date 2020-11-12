const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
  
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "india@123",
  database: "database1",
});
 
app.post("/register", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;


   db.query(
      "INSERT INTO users (username,email, password) VALUES (?,?,?)",
      [username, email, password],
      (err, result) => {
        if (err) {
          res.send({err:err});
        }
       
            if(result){
                res.send(result);
            }else{
              res.send({message:'error'});
            }
      }
    );
});


app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
   [username, password],
    (err, result) => {
      if (err) {
        res.send({err:err});
      }
     
          if(result){
              res.send(result);
          }else{
            res.send({message:'error'});
          }   
      }
  );
});

app.listen(3001, () => {
  console.log("running server");
});