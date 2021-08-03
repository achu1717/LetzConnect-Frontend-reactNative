const  Skills  = require("../models/Skills");
const authService = require("../services/auth.service");
const { to, ReE, ReS, isNull, isEmpty } = require("../services/util.service");
const ObjectId = require("mongoose").Types.ObjectId;
const moment = require("moment");
const CONFIG = require("../config/config");
const HttpStatus = require("Http-status");

module.exports.createSkills= async function (req,res) {
    let body=req.body
    let user=req.user
    if (isNull(body.skills)) {
        return ReE(
          res,
          "Please enter Skills",
          HttpStatus.BAD_REQUEST
        );
      }
      let skill={
        userId:user._id,
          skills:[body.skills]
      }
  
    let err, skills;
  
    [err, skills] = await to(Skills.create(skill));
  
    if (err) {
      return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
    return ReS(res, { message: "Skills Created", data: skills }, HttpStatus.Ok);
  };

  module.exports.getSkills = async(req, res) =>{
    let  user = req.user;
    let err, skill;
  
    [err, skill] = await to(Skills.find({userId:user._id}));
  
    if (err) {
      return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
    return ReS(res, { message: "Skills Found", data: skill }, HttpStatus.Ok);
}

module.exports.updateSkills = async function (req, res) {
    let err, skills, data
    user = req.user
    data = req.body

    skills =await to(Skills.updateOne({ userId:user._id },{ $set: data}));
     if (skills.nModified === 0) {
        return ReS(res, { message: "Already Verified" }, HttpStatus.OK)
      } else {
        return ReS(res, { message: "Referal Matched" }, HttpStatus.OK)
      }
}

