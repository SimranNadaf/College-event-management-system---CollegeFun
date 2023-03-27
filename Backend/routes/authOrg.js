const express = require("express");
const router = express.Router();
const Org = require("../modules/Org");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchOrg = require("../middleware/fetchOrg");

const JWT_SECRET_SIGN = "Sirman@#";

// router.post("/createOrg", (req, res)=>{
//   res.send(req.body);
// });

// ROUTE 1 : Creating new Org through post request : LOGIN NOT REQUIRED
router.post(
  "/createOrg",
  [
    body("aemail", "Enter valid email id").isEmail(),
    body("password", "Password must be lenght 5").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //for Org
    let success = false;

    // Handling validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Checking Duplication - Already exits email id
      let org = await Org.findOne({ aemail: req.body.aemail });
      if (org) {
        return res.status(400).json({
          success,
          error: "Sorry a Org with email id already exists.",
        });
      }

      // Hashing password using bcryptjs with salt
      const salt = bcrypt.genSaltSync(10);
      const SecPass = bcrypt.hashSync(req.body.password, salt);

      // To create new Org
      org = await Org.create({
        name: req.body.name,
        aname: req.body.aname,
        adesignation: req.body.adesignation,
        aemail: req.body.aemail,
        aphone: req.body.aphone,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        password: SecPass,
      });

      const data = {
        org: {
          id: org.id,
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

// // ROUTE 2 : lgoin Org through post request : LOGIN NOT REQUIRED

router.post(
  "/orgLogin",
  [
    body("email", "Please enter valid email id").isEmail(),
    body("password", "Please enter valid Password").exists(),
  ],
  async (req, res) => {
    //for Org
    let success = false;

    // Handling validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let org = await Org.findOne({ email: email });
      if (!org) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const ComparePassword = await bcrypt.compare(password, org.password);
      if (!ComparePassword) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        org: {
          id: org.id,
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

// // ROUTE 3 : get Org details throught Org id : post request : LOGIN REQUIRED

router.put("/getOrg", fetchOrg, async (req, res) => {
  try {
    //FETCHING Org ID FROM REQUEST
    const orgId = req.org.id;
    //FETCH Org THROUGH Org ID - NO PASSWORD
    const org = await Org.findById(orgId).select("-password");
    res.send(org);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

//Route 4 : Update Org information - Login required
router.put("/updateOrg", fetchOrg, async (req, res) => {
  try {
    let success = false;
    //FETCHING Student ID FROM REQUEST
    const orgId = req.org.id;
    //FETCH Student THROUGH Student ID - NO PASSWORD
    const org = await Org.findByIdAndUpdate(orgId, {
      name: req.body.name,
      aname: req.body.aname,
      adesignation: req.body.adesignation,
      aemail: req.body.aemail,
      aphone: req.body.aphone,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
    });
    if (org) {
      success = true;
      res.send({ success });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

module.exports = router;
