const express    = require('express');
const apptRouter = express.Router();
const passport   = require('passport');
const bcrypt     = require('bcryptjs');
const User       = require('../models/user');
const Appointments = require('../models/appointment');
const Service      =require('../models/service');

apptRouter.post('/private/addtimes', (req, res, next)=> {
    const index = req.body.index;
    const day = req.body.day;
    console.log(day, index);

User.findById(req.user._id)
.then((theUser)=>{

    const blah = Object.assign(theUser);
    theUser = {};
    theUser = blah;
    theUser.weeklySchedule[day][index].value = true;

    console.log(theUser.weeklySchedule[day])
        theUser.save()
.then((response)=>{
    res.json(response);
})
.catch((err)=>{
    res.json(err);
})
})
.catch((err)=>{
    res.json(err);
})
})

apptRouter.post('/private/removetimes', (req, res, next)=> {
    const index = req.body.index;
    const day = req.body.day;
    console.log(day, index);

User.findById(req.user._id)
.then((theUser)=>{

    const blah = Object.assign(theUser);
    theUser = {};
    theUser = blah;
    theUser.weeklySchedule[day][index].value = false;

    console.log(theUser.weeklySchedule[day])
        theUser.save()
.then((response)=>{
    res.json(response);
})
.catch((err)=>{
    res.json(err);
})
})
.catch((err)=>{
    res.json(err);
})
})



apptRouter.post('/private/profile/:id/bookappt', (req, res, next)=>{
    let info;
    const profile = req.params.id;
    const index = req.body.index;
    const day = req.body.day;
    const userID = req.user._id;


User.findById(profile)
.then((theUser)=>{

    const blah = Object.assign(theUser);
    theUser = {};
    theUser = blah;
    theUser.weeklySchedule[day][index].value = false;
    const profileName = theUser.name;
    
         info = {
            freelancer: req.params.id,
            day: req.body.day,
            client: req.user._id,
            time: theUser.weeklySchedule[day][index].time,
            profileName: profileName
        }

        theUser.myAppointments.push(info);


        theUser.save()
.then((response)=>{

        User.findById(userID) 
        .then((loggedInUser)=>{
            const clientName = loggedInUser.name
            loggedInUser.myAppointments.push(info, clientName);
            loggedInUser.save()
            .then((theAppt)=>{
                res.json(theAppt)
            })


        })
})
.catch((err)=>{
    res.json(err);
})
})
.catch((err)=>{
    res.json(err);
})



})



module.exports = apptRouter;