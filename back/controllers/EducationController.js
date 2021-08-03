const  Education  = require("../models/Education");
const authService = require("../services/auth.service");
const { to, ReE, ReS, isNull, isEmpty } = require("../services/util.service");
const ObjectId = require("mongoose").Types.ObjectId;
const moment = require("moment");
const CONFIG = require("../config/config");
const HttpStatus = require("Http-status");

module.exports.createEducation= async function (req,res) {
    let body=req.body
    let user=req.user
    if (isNull(body.institution)) {
        return ReE(
          res,
          "Please enter Institution",
          HttpStatus.BAD_REQUEST
        );
      }
    let newEducation = {
        institution: body.institution,
        userId: user._id,
        degree: body.degree,
        field: body.field,
        grade: body.grade,
        activities: body.activities,
        start: body.start,
        end: body.end,
        Description: body.Description,

    };

  
  
    let err, education;
  
    [err, education] = await to(Education.create(newEducation));
  
    if (err) {
      return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
    return ReS(res, { message: "Notification Found", data: education }, HttpStatus.Ok);
  };

  module.exports.getEducation = async(req, res) =>{
    let  user = req.user;
    let err, education;
  
    [err, education] = await to(Education.find({userId:user._id}));
  
    if (err) {
      return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
    return ReS(res, { message: "Notification Found", data: education }, HttpStatus.Ok);
}

module.exports.updateEducation = async function (req, res) {
    let err, education, data
    user = req.user
    data = req.body

     education =await to(Education.updateOne({ _id:data.id },{ $set: data}));
     if (education.nModified === 0) {
        return ReS(res, { message: "Already Verified" }, HttpStatus.OK)
      } else {
        return ReS(res, { message: "Referal Matched" }, HttpStatus.OK)
      }
}
module.exports.getAllEducation = async(req, res) =>{
        let  user = req.user;
        let err, education;
      let body =req.body;
        [err, education] = await to(Education.findOne({_id:body.id}));
      
        if (err) {
          return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      
        return ReS(res, { message: "Notification Found", data: education }, HttpStatus.Ok);
    }
