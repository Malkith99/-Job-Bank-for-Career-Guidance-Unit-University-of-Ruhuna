const router=require("express").Router();      // import the empress package get Router()
let Student= require("../models/Student");
// CRUD Operations

//adding the data to databse
 //httP://localhost:8070/student/add  --- way that calling from front end to backend
router.route("/add").post((req,res)=>{

    const name=req.body.name;
    const age=Number(req.body.age);
    const gender=req.body.gender;

    const newStudent =new Student({
        name,
        age,
        gender
    })
     // through model student.js this data is passed to database
    newStudent.save().then(()=>{
        res.json("Student Added") // in jason format
    }).catch((err)=>{
        console.log(err);
    }) 

})   
// read the data in the database
//http://Localhost:8070/student/
router.route("/").get((req,res)=>{
    Student.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err)
    })
})
// update the data in database
//http://localhost:8070/student/update/  
router.route("/update/:id").put(async(req,res)=>{       //async function is used
    let userID=req.params.id;   //params- parameter   // fetch the id which is a parameter of URL
    const{name,age,gender}=req.body;

    const updateStudent={
        name,
        age,
        gender
    }
    const update =await Student.findByIdAndUpdate(userID,updateStudent)// await() function is used 
    .then(()=>{     // if update is success
        res.status(200).send({status:"User updated"}) // send the updated data to the front end
    }).catch((err)=>{   // if update is failure
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })
    
})

//delete the data in the database
//http://localhost:8070/student/delete/
router.route("/delete/:id").delete(async(req,res)=>{
    let userID=req.params.id;

    await Student.findByIdAndDelete(userID)
    .then(()=>{
        res.status(200).send({status:"User Deleted"});
    }).catch((err)=>{
       console.log(err.message);
       res.status(500).send({status:"Error with delete user",error: err.message});
    })
})

//get the data of only one user
router.route("/get/:id").get(async(req,res)=>{
    let userID= req.params.id;
    await Student.findById(userID)
    .then((student)=>{
        res.status(200).send({status:"User fetched",student}); 
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user", error: err.message});
    })
} )




module.exports= router;  //defenitly should  export             