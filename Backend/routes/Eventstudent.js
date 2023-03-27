const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Event = require("../modules/Event");
const Participant = require("../modules/Participant");
// const Participant = require("../modules/Participant");
const router = express.Router();

// Route 1: get All events of all org - student login required
router.get("/getEvents",fetchuser , async(req, res)=>{
    let success=false
    try{
      const events = await Event.find();
      success=true
      res.send(events);

      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error occured");
    }
});

//Router 2 : Register for event - login required
router.post("/registerEvent",fetchuser , async(req, res)=>{
    
        let success = false;
        try {
          //FETCHING Org ID FROM REQUEST
      
         const participant = await Participant.create({
              student: req.student.id,
              event: req.body.event,
              org: req.body.org,
            });             
      
            
            success = true;
            res.send({ success, participant });
            
      
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Some internal server error occured");
        }
});

//Router 3 : get a event info - login required
router.post("/getEvent",fetchuser , async(req, res)=>{
  let success=false
    try{
      const events = await Event.find({_id:req.body.eventId});
      success=true
      res.send(events);

      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error occured");
    }
});


module.exports = router;
