const express = require("express");
const fetchOrg = require("../middleware/fetchOrg");
const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// var jwt = require("jsonwebtoken");
const Event = require("../modules/Event");

// Route 1 : Registration for event - org login requires
router.post("/EventRegistration", fetchOrg, async (req, res) => {
  let success = false;
  try {
    //FETCHING Org ID FROM REQUEST

   const event = await Event.create({
        org: req.org.id,
        ename: req.body.ename,
        edate: req.body.edate,
        etime: req.body.etime,
        co_ordinator: req.body.co_ordinator,
        mode: req.body.mode,
        registration_fee: req.body.registration_fee,
        rules: req.body.rules,
        address: req.body.address,
        phone: req.body.phone,
      });

      
      success = true;
      res.send({ success, event });
      

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

//Route 2 : Get All Events of Org
router.get("/getEvents",fetchOrg , async(req, res)=>{
  let success=false
  try {
    const events = await Event.find({ org: req.org.id });
    success=true
    res.send(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

module.exports = router;

