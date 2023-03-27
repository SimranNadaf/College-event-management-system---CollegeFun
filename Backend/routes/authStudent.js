const express = require("express");
const router = express.Router();
const Student = require("../modules/Student");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchStudent = require("../middleware/fetchuser");

const JWT_SECRET_SIGN = "Sirman@#";

// ROUTE 1 : Creating new Student through post request : LOGIN NOT REQUIRED
router.post(
  "/createStudent",
  [
    body("email", "Enter valid email id").isEmail(),
    body("password", "Password must be lenght 5").isLength({ min: 5 }),
    body("fname").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //for Student
    let success = false;

    // Handling validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Checking Duplication - Already exits email id
      let student = await Student.findOne({ email: req.body.email });
      if (student) {
        return res.status(400).json({
          success,
          error: "Sorry a Student with email id already exists.",
        });
      }

      // Hashing password using bcryptjs with salt
      const salt = bcrypt.genSaltSync(10);
      const SecPass = bcrypt.hashSync(req.body.password, salt);

      // To create new Student
      student = await Student.create({
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        education: req.body.education,
        institution: req.body.institution,
        password: SecPass,
      });

      const data = {
        student: {
          id: student.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET_SIGN);
      // console.log(authToken);
      success = true;
      res.send({ success, authToken });
      // res.send(req.body);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error occured");
    }
  }
);

// // ROUTE 2 : lgoin Student through post request : LOGIN NOT REQUIRED

router.post(
  "/studentLogin",
  [
    body("email", "Please enter valid email id").isEmail(),
    body("password", "Please enter valid Password").exists(),
  ],
  async (req, res) => {
    //for Student
    let success = false;

    // Handling validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let student = await Student.findOne({ email: email });
      if (!student) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const ComparePassword = await bcrypt.compare(password, student.password);
      if (!ComparePassword) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        student: {
          id: student.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET_SIGN);
      success = true;
      res.send({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error occured");
    }
  }
);

// // ROUTE 3 : get Student details throught Student id : post request : LOGIN REQUIRED

router.put("/getStudent", fetchStudent, async (req, res) => {
  try {
    //FETCHING Student ID FROM REQUEST
    const studentId = req.student.id;
    //FETCH Student THROUGH Student ID - NO PASSWORD
    const student = await Student.findById(studentId).select("-password");
    res.send(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

//Route 4 : Update student information - Login required
router.put("/updateStudent", fetchStudent, async (req, res) => {
  try {
    let success = false;
    //FETCHING Student ID FROM REQUEST
    const studentId = req.student.id;
    //FETCH Student THROUGH Student ID - NO PASSWORD
    const student = await Student.findByIdAndUpdate(studentId, {
      fname: req.body.fname,
      mname: req.body.mname,
      lname: req.body.lname,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      education: req.body.education,
      institution: req.body.institution,
    });
    if (student) {
      success = true;
      res.send({ success });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

module.exports = router;
