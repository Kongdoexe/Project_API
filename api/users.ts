import express from "express";
import { connect, queryAsync } from "../dbconnect";
import { error } from "console";
import  mysql from 'mysql';
export const router = express.Router();

//GET trip from database
// router.get("/", (req, res)=>{
//     if(req.query.id){
//         const id = req.query.id;
//         const name = req.query.name;
//         // res.send("Method GET in trip.ts With", ${id}, ${name});
//         res.send("Method GET in users.ts With" + id + " " + name);
//     }
//     else{
//        const sql = "select * from image";
//        connect.query(sql, (err, result)=>{
//         if(err){
//             res.json(err);
//         }
//         else{
//             res.json(result);
//         }
//        });
//     }
   
// });
// router.get("/:id", (req, res) => {
//     const id = req.params.id;
//     connect.query("select * from users where userid = ?" , 
//     [id], (err, result) => {
//     if (err) {
//         res.json(err);
//     }
//     else{
//         res.json(result);
//     }
//     });
//   });
  

// //POST tp /trip
// //insert data

//    router.post("/register", (req, res) => {
//      const { username, password,image, email } = req.body;
  
//      // Validate required fields
//      if (!username || !password  || !image || !email) {
//        res.status(400).send("Missing required fields!");
//        return;
//      }
  
//      // Check if the username already exists in the database
//      const checkUsernameSql = "SELECT * FROM `users` WHERE `username` = ?";
//      const checkUsernameValues = [username];
  
//      connect.query(checkUsernameSql, checkUsernameValues, (err, results) => {
//        if (err) {
//         res.status(500).send("Error!");
//          return;
//        }
  
//        // If the username already exists, return an error
//        if (results.length > 0) {
//          res.status(409).send("Username already exists!");
//          return;
//        }
  
//        // If the username is unique, proceed with registration
//        const insertUserSql = "INSERT INTO `users` (`username`, `password`,`image`, `email`) VALUES (?, ?, ?, ?)";
//        const insertUserValues = [username, password,image, email];
  
//        connect.query(insertUserSql, insertUserValues, (err) => {
//          if (err) {
//            res.status(500).send("Error!");
//            return;
//          }
  
//          res.status(201).send("User registered successfully!");
//        });
//      });
//    });
  
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   console.log( username, password);

//   const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
//   const values = [username, password];

//   connect.query(sql, values, (err, results) => {
//     if (err) {
//       res.status(500).json({ error: "Error!" });
//       return;
//     }

//     if (results.length === 0) {
//       res.status(401).json({ error: "Invalid userid or password!" });
//       return;
//     }

//     // User login successful
//     res.status(200).json(results[0]);
//   });
// });
// router.post("/Register", (req, res) => {
//   const { email, username, password, confirm } = req.body;

//   let sql = "SELECT * FROM users WHERE email = ?";
//   const values = [email]

//     connect.query(sql, values, (err, result) => {
//       if (err) {
//         res.status(500).json({ error: "Error!" });
//         return;
//       }
  
//       if (result == 0) {
//         sql = "INSERT INTO users`(username`, password, image,`type`, email) VALUES (?,?,?,?,?)";
  
//         sql = mysql.format(sql , [
//           username,
//           password,
//           '',
//           'user',
//           email
//         ])
//         console.log(sql);

//         connect.query(sql , (err, result) => {
          
//           if(err) {
//             res.status(500).json({ error: "Error!" });
//             return; 
//           }

//           res.json(result);
//         })
//       } else {
//         res.status(500).json("Error")
//       }
//     });
//   } 
// );


// router.get('/randomimage', (req, res) => {
//   connect.query('SELECT * FROM images ORDER BY RAND() LIMIT 1', (error, results, fields) => {
//       if (error) {
//           return res.status(500).json({ error: 'An error occurred while fetching the random image' });
//       }

//       const pic1 = results[0];

//       connect.query("SELECT * FROM images WHERE imageID != ? ORDER BY RAND() LIMIT 1", [pic1.imageID], (error, results, fields) => {
//           if (error) {
//               return res.status(500).json({ error: 'An error occurred while fetching the random image' });
//           }

//           const pic2 = results[0];
//           return res.json({ pic1, pic2 });
//       });
//   });
// });
//   router.post("/voteimage", (req , res)=>{
//     const id_image1 = req.body.id_image1;
//     const id_image2 = req.body.id_image2;
//     const point1 = req.body.point1;
//     const point2 = req.body.point2;
  
//     let ra: number, rb: number;
  
//     connect.query("SELECT * FROM image WHERE id_image = ?",[id_image1],(error, results1)=>{
//         if(error){
//           return res.status(500).json({error : "An error while fetching image1"})
//         }
//         ra = results1[0].score_image;
//     connect.query("SELECT * FROM image WHERE id_image = ?",[id_image2],(error , results2)=>{
//             if(error){
//               return res.status(500).json({error: "An error while fetching image2"});
//             } else {
//               rb = results2[0].score_image;
  
//               const ea = 1 / (1 + Math.pow(10, (rb-ra) /400 ));
//               const eb = 1 / (1 + Math.pow(10, (ra-rb) /400 ));
//               console.log("ea=" + ea);
//               console.log("eb=" + eb);
  
//               const rpa:number = ra + 32 * (point1 - ea); 
//               const rpb:number = rb + 32 * (point2 - ea);
//               console.log("rpa=" + rpa);
//               console.log("rpb=" + rpb);
  
//               const currentDate = new Date();
//               const day = currentDate.getDate();
//               const month = currentDate.getMonth() + 1;
//               const year = currentDate.getFullYear();
//               const formattedDate = `${year}-${month}-${day}`;
//               console.log(formattedDate);
  
//               connect.query("SELECT day FROM vote WHERE day = ? AND id_image = ?", [formattedDate, results1[0].imageID], (error, results3)=>{
//                 if(error){
//                   return res.status(500).json({error : "An error with image 1"});
//                 } else {
//                   if(results3.length == 0){
//                     const sql ="INSERT INTO `vote` (`id_image`, `score_day`, `day`) VALUES (?, ?, ?)";
//                     connect.query(sql, [id_image1, rpa, formattedDate], (err , result)=>{
//                       if(err){
//                         console.error("Error inserting user", err);
//                         return res.status(500).json({error : "Error User"});
//                       }
//                       res.status(200).json({message: "Vote recorded successfully"});
//                     });
//                   } else {
//                     const sql = "UPDATE `vote` SET `score_day`=? WHERE `id_image`=?";
//                     connect.query(sql, [rpa, id_image1], (err, results)=>{
//                       if(err){
//                         console.error("ERROR", err);
//                         res.status(500).json({error : "Error updating vote"});
//                       } else {
//                         const sql ="UPDATE `image` SET `score_image`=? WHERE `id_image`=?";
//                         connect.query(sql, [rpa, id_image1], (err, results)=>{
//                           if(err){
//                             console.error("Error updating image score", err);
//                             return res.status(500).json({error: "Error updating image score"});
//                           }
//                           res.status(200).json({message: "Vote recorded successfully"});
//                         });
//                       }
//                     });
//                   }
//                 }
//               });
//             }
//           }
//         );
//       }
//     );
//   });
  

  // router.get('/randomimage', (req, res) => {
  //   connect.query('SELECT * FROM image ORDER BY RAND() LIMIT 1', (error, results, fields) => {
  //     if (error) {
  //       return res.status(500).json({ error: 'An error occurred while fetching the random image' });
  //     }
  
  //     const pic1 = results[0];
  
  //     connect.query("SELECT * FROM image WHERE id_image != ? ORDER BY RAND() LIMIT 1", [pic1.id_image], (error, results, fields) => {
  //       if (error) {
  //         return res.status(500).json({ error: 'An error occurred while fetching the random image' });
  //       }
  
  //       const pic2 = results[0];
  //       return res.json({ pic1, pic2 });
  //     });
  //   });
  // });

 
 

  
