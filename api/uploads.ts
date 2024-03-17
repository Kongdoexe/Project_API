import express from "express";
import { connect, queryAsync } from "../dbconnect";
import multer from "multer";
import path from "path";
import { Photo } from "../photo";

export const router = express.Router();
router.get("/", (req, res)=>{
  if(req.query.id){
      const id = req.query.id;
      const name = req.query.name;
      // res.send("Method GET in trip.ts With", ${id}, ${name});
      res.send("Method GET in users.ts With" + id + " " + name);
  }
  else{
     const sql = "select * from images";
     connect.query(sql, (err, result)=>{
      if(err){
          res.json(err);
      }
      else{
          res.json(result);
      }
     });
  }
 
});
class FileMiddleware {
    //Attribute filename
    filename = "";

    //Attribute Disloader
    //Create obj  of diskloader for saving file
    public readonly diskLoader = multer({
        //storage = define floder (disk)to be saved 
      storage: multer.diskStorage({
        //destination = saving floder
        destination: (_req, _file, cb) => {
          cb(null, path.join(__dirname, "../uploads"));
        },
        // filename = random unique name
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 10000);
          this.filename = uniqueSuffix + "." + file.originalname.split(".").pop();
          cb(null, this.filename);
        },
      }),
      //limit file
      limits: {
        fileSize: 67108864, // 64 MByte
      },
    });
  }
const fileUpload = new FileMiddleware();
router.post("/:id", fileUpload.diskLoader.single("photo"), async (req, res)=>{
  const id = req.params.id;
  const name_photo = req.body.Name_photo;
  const filename = fileUpload.filename;
  const filePath =  `http:localhost:3000/uploads/${filename}`;

  try {
    let photo : Photo = req.body;
    let sql = "INSERT INTO `images`(`imageID`, `imageURL`, `rank`, `score`, `name`) VALUES (?,?,? NOW())";
    connect.query(sql, [id , name_photo, filePath]);

    console.log("successFully");
    res.json({filename: filename, file_path: filePath,Name_photo: name_photo});
  }catch(err){
    console.error("Error", err);
    res.status(500).send("Error inserting");
  }
});
//   const fileUpload = new FileMiddleware();
//   router.post("/",fileUpload.diskLoader.single("file"), (req, res)=>{
//     res.status(200).json({
//         file : "http://localhost:3000/uploads/"+ fileUpload.filename
//     });
    
//   });

// router.get("/", (req, res)=>{
//     // const id = req.params.id;
//     res.send("Method GET in upload.ts");
// });

// //connect firebase
// import {initializeApp} from "firebase/app";
// import {getStorage ,ref , uploadBytesResumable ,getDownloadURL} from "firebase/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyCOsTChmg9BKZwyUl7s11YglItH09pOHV4",
//   authDomain: "tripbooking-app-der.firebaseapp.com",
//   projectId: "tripbooking-app-der",
//   storageBucket: "tripbooking-app-der.appspot.com",
//   messagingSenderId: "1044452279643",
//   appId: "1:1044452279643:web:01934111b0a2416b6d467e",
//   measurementId: "G-9MEQNKSLLT"
// };

//   initializeApp(firebaseConfig);
//   const storage = getStorage();


// class FileMiddleware {
//   //Attribute filename
//   filename = "";

//   //Attribute Disloader
//   //Create obj  of diskloader for saving file
//   public readonly diskLoader = multer({
//       //storage = define floder (disk)to be saved 
//     storage: multer.memoryStorage(),
//     //limit file
//     limits: {
//       fileSize: 67108864, // 64 MByte
//     },
//   });
// }

// //upload to fire base
// const fileUpload = new FileMiddleware();
// router.post("/",fileUpload.diskLoader.single("file"), async(req, res)=>{
//   //generate filename
//   const filename =  Date.now() + "-" + Math.round(Math.random() * 10000) + "png";
//   //deine saveing file name on storage
//   const storageRef = ref(storage, "/imges/" + filename )
//   //define file detail 
//   const metadata ={
//     contentType : req.file!.mimetype
//   }
//   // upload to firebase stroage
//   const result = await uploadBytesResumable(storageRef, req.file!.buffer,  metadata);

//   //return url of image o  fire baase
//   const url = await getDownloadURL(result.ref);
//   res.status(200).json({
//       file : url
//   });
  
// });