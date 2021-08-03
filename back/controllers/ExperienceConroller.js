const  Experience  = require("../models/Experience");
const authService = require("../services/auth.service");
const { to, ReE, ReS, isNull, isEmpty } = require("../services/util.service");
const ObjectId = require("mongoose").Types.ObjectId;
const moment = require("moment");
const CONFIG = require("../config/config");
const HttpStatus = require("Http-status");

module.exports.createExperience= async function (req,res) {
    let body=req.body
    let user=req.user
    if (isNull(body.company)) {
        return ReE(
          res,
          "Please enter company",
          HttpStatus.BAD_REQUEST
        );
      }
      if (isNull(body.title)) {
        return ReE(
          res,
          "Please enter title",
          HttpStatus.BAD_REQUEST
        );
      }
      if (isNull(body.from)) {
        return ReE(
          res,
          "Please enter from",
          HttpStatus.BAD_REQUEST
        );
      }
      if (isNull(body.to)) {
        return ReE(
          res,
          "Please enter to",
          HttpStatus.BAD_REQUEST
        );
      }
      if (isNull(body.currentlyWork)) {
        return ReE(
          res,
          "Please enter currentlyWork",
          HttpStatus.BAD_REQUEST
        );
      }
    let newExperience = {
        company: body.company,
        userId: user._id,
        title: body.title,
        location: body.location,
        from:body.from,
        to: body.to,
        Description: body.Description,
        currentlyWork: body.currentlyWork,

    };

  
  
    let err, experience;
  
    [err, experience] = await to(Experience.create(newExperience));
  
    if (err) {
      return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
    return ReS(res, { message: "Experience Created", data: experience }, HttpStatus.Ok);
  };

  module.exports.getExperience = async(req, res) =>{
    let  user = req.user;
    let err, experience;
  
    [err, experience] = await to(Experience.find({userId:user._id}));
  
    if (err) {
      return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
    return ReS(res, { message: "Experiences Found", data: experience }, HttpStatus.Ok);
}

module.exports.updateExperience = async function (req, res) {
    let err, experience, data
    user = req.user
    data = req.body

    experience =await to(Experience.updateOne({ _id:data.id },{ $set: data}));
     if (experience.nModified === 0) {
        return ReS(res, { message: "Already Verified" }, HttpStatus.OK)
      } else {
        return ReS(res, { message: "Referal Matched" }, HttpStatus.OK)
      }
}
module.exports.getAllExperience = async(req, res) =>{
        let  user = req.user;
        let err, experience;
      let body =req.body;
        [err, experience] = await to(Experience.findOne({_id:body.id}));
      
        if (err) {
          return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      
        return ReS(res, { message: "Experience Found", data: experience }, HttpStatus.Ok);
    }
