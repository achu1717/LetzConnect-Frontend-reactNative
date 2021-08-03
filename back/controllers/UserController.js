const User = require('../models/User')
const { to, ReE, ReS, getUniqueField } = require('../services/util.service')
const CONFIG = require('../config/config')
const { isNull } = require('../services/util.service')
const authService = require('../services/auth.service')
const HttpStatus = require('http-status')
const validator = require('validator')
const httpStatus = require('http-status')
// const notificationService = require('../services/notification.service')
const { isEmail } = validator


module.exports.userRegister = async (req, res) =>{
    let body= req.body;
    let err, existingUser, newUser

    let fields = [
        'email',
        'name',
        'password'
    ]

    let invalidFields = fields.filter(field =>{
        if(isNull(body[field])){
            return true
        }
    })

    if (invalidFields.length !== 0) {
        return ReE(res, {message: `Please enter ${invalidFields}`},
            HttpStatus.BAD_REQUEST)
    }
    if (body.name.length < 3) {
        return ReE(res, 'Please enter a name with minimum 3 characters',
            HttpStatus.BAD_REQUEST)
    }
    
    if(!isEmail(body.email)) {return await  ReE(res, 'Please enter valid Email Id', HttpStatus.BAD_REQUEST)}
    
    [err, existingUser] = await to(User.findOne({email:body.email,name:body.name}))
  
if(existingUser){
    let takenFields = fields.filter(field =>{
        if(existingUser[field]){
            return true
        }
    })
    
    if (takenFields.length !== 0) {
        return ReE(res, {message: `${takenFields} already taken`},
            HttpStatus.BAD_REQUEST)
    }
}
  
    await console.log('body', body);
    [err, newUser] = await to(User.create(body));
    await console.log('user', newUser);
    if(err)return ReE(res, 'unable to create',err, HttpStatus.INTERNAL_SERVER_ERROR)
    if(!newUser)return ReE(res, 'user doesn\'t created', HttpStatus.BAD_REQUEST)

    if(newUser){
    return ReS(res, {
        message: 'Register Succesfull',
        user:newUser
    }, 201)
    }
}

module.exports.login = async(req, res) =>{
        const body = req.body
        let{password} = body
        let err, compare, existingUser, setActive,user
        
        let uniqueKey = await getUniqueField(body);
       
        if(uniqueKey === 'not_email') return ReE(res, {message:'please Enter Valid Email'}, httpStatus.BAD_REQUEST);
        if(uniqueKey === null) return ReE(res, {message:'please Enter user name or Email Id'}, httpStatus.BAD_REQUEST);
    
        [err, existingUser] = await to(User.findOne({ $or: [ { email: uniqueKey}, { name: uniqueKey } ] } ))
        console.log(existingUser);
        if(err) return ReE(res, {message:'unable to fetch user'},err, httpStatus.INTERNAL_SERVER_ERROR)
        if((!existingUser)){
            return ReE(res, 'User not yet registered', httpStatus.BAD_REQUEST)
        }
        if((existingUser.password == null)){
            return ReE(res, 'User not yet registered', httpStatus.BAD_REQUEST)
        }
    
        [err, compare] = await to(existingUser.comparePassword(password))
        if(err) return ReE(res, {message:'unable to compare password'},err, httpStatus.INTERNAL_SERVER_ERROR)
        if (!compare) {
            return ReE(res,
                {message: 'Invalid Username or password. please try again.'},
                 httpStatus.BAD_REQUEST)
        }
        
            // [err, setActive] = await to(User.updateOne({email:existingUser.email},{$set:{active:true}}))
            // if(err) return ReE(res, {message:'unable to set active'},err, httpStatus.INTERNAL_SERVER_ERROR)
    
            existingUser.password = undefined;
            user={email:existingUser.email,uid:existingUser.uid}
    
            return ReS(res,
                 {message:'signed In successfully',user:existingUser, token:existingUser.getJWT()},
                  httpStatus.OK )
     
       
    }
    
    module.exports.update = async function (req, res) {
            let err, user, data
            user = req.user
            data = req.body
        
            CONFIG.editableUserFields.forEach(function (field) {
                if (typeof field === 'string' && data[field] !== undefined) {
                    user[field] = data[field]
                }
            });
        
            [err, user] = await to(user.save())
            if (err) {
                return ReE(res, err, 400)
            }
            return ReS(res,
                {
                    message: 'Updated User.',
                    user: user,
                }, HttpStatus.OK,
            )
        }
        
        module.exports.getUser = async(req, res) =>{
            let  decoded = req.user;
            decoded.password = undefined;
            return ReS(res, {message:'user fetched successfully', user:decoded},
            httpStatus.OK
            )
        }





























// module.exports.userRegister = async (req, res) =>{
//     let body= req.body;
//     let err, existingUser, newUser

//     let fields = [
//         'email',
//         'name'
//     ]

//     let invalidFields = fields.filter(field =>{
//         if(isNull(body[field])){
//             return true
//         }
//     })

//     if (invalidFields.length !== 0) {
//         return ReE(res, {message: `Please enter ${invalidFields}`},
//             HttpStatus.BAD_REQUEST)
//     }
//     if (body.name.length < 3) {
//         return ReE(res, 'Please enter a name with minimum 3 characters',
//             HttpStatus.BAD_REQUEST)
//     }
    
//     if(!isEmail(body.email)) {return await  ReE(res, 'Please enter valid Email Id', HttpStatus.BAD_REQUEST)}
    
//     [err, existingUser] = await to(User.findOne({email:body.email,name:body.name}))
  
// if(existingUser){
//     let takenFields = fields.filter(field =>{
//         if(existingUser[field]){
//             return true
//         }
//     })
    
//     if (takenFields.length !== 0) {
//         return ReE(res, {message: `${takenFields} already taken`},
//             HttpStatus.BAD_REQUEST)
//     }
// }
  
//     body.verifyCode = await authService.generateCode(body.email);
//     body.codeVerified = false;
//     await console.log('body', body);
//     [err, newUser] = await to(User.create(body));
//     await console.log('user', newUser);
//     if(err)return ReE(res, 'unable to create',err, HttpStatus.INTERNAL_SERVER_ERROR)
//     if(!newUser)return ReE(res, 'user doesn\'t created', HttpStatus.BAD_REQUEST)

//     if(newUser){
//         [err, response] = 
//         await to (notificationService.sendEmail(newUser.email, {
//             subject: 'Confirm email',
//             body: '<!DOCTYPE html>\n' +
//                 '<html>\n' +
//                 '<body>\n' +
//                 '<h1>YellowFie</h1>\n' +
//                 `\tPlease use this code to verify your email id ${newUser.verifyCode}.\n` +
//                 '</body>\n' +
//                 '</html>\n',
//         }))

//     if (err) return ReE(res, 'Cannot send email' + err.message,
//         HttpStatus.INTERNAL_SERVER_ERROR)

//     return ReS(res, {
//         message: 'Verification email sent.',
//         verifyCode:newUser.verifyCode,
//                 token: newUser.getJWT()
//     }, 201)
//     }
// }

// module.exports.userVerify = async(req, res) =>{
//     const body = req.body;
//     const decoded = req.user;
//     let user, err

//     if(body.verifyCode !== decoded.verifyCode) return ReE(res , {message:'verification code not match'}, httpStatus.BAD_REQUEST);

//     [err, user] = await to(User.updateOne({_id:decoded._id}, {$set:{codeVerified:true},$unset:{verifyCode:''}}));

//     if(user) return ReS(res, {message:'code verified'}, httpStatus.OK);
//     if(err) return ReE(res, {message:'unable to verify'},err, httpStatus.INTERNAL_SERVER_ERROR);
//     // [err, user] = await to(User.findOne({verifyCode:decoded.verifyCode}))
// }

// module.exports.setPassword = async(req, res) =>{
//     const body = req.body;
//    let decoded = req.user
//    let user, err, userObj
//     if(!decoded.codeVerified) return ReE(res, {message:'not yet verified code'}, httpStatus.BAD_REQUEST);

//     let fields = [
//         'password',
//         'confirmPassword'
//     ]

//     let invalidFields = fields.filter(field =>{
//         if(isNull(body[field])){
//             return true
//         }
//     })

//     if (invalidFields.length !== 0) {
//         return ReE(res, {message: `Please enter ${invalidFields}`},
//             HttpStatus.BAD_REQUEST)
//     }
//     if(body.password.length < 8) return ReE(res, {message:'please enter minimum 8 chractes'}, httpStatus.BAD_REQUEST);
    
//    if(body.password !== body.confirmPassword) return ReE(res, {message:'Password & confirm Password not matching'}, httpStatus.BAD_REQUEST);
//    userObj = decoded
//    userObj.password = body.password,
   
//    console.log('decoded',userObj);
//    [err, user] = await to(userObj.save())
//    if(user) return ReS(res, {message:'password Successfully set'}, httpStatus.OK)
//    if(err) return ReE(res, {message:'unable to set password'},err, httpStatus.INTERNAL_SERVER_ERROR)

// }

// module.exports.login = async(req, res) =>{
//     const body = req.body
//     let{password} = body
//     let err, compare, existingUser, setActive,user
    
//     let uniqueKey = await getUniqueField(body);
   
//     if(uniqueKey === 'not_email') return ReE(res, {message:'please Enter Valid Email'}, httpStatus.BAD_REQUEST);
//     if(uniqueKey === null) return ReE(res, {message:'please Enter user name or Email Id'}, httpStatus.BAD_REQUEST);

//     [err, existingUser] = await to(User.findOne({ $or: [ { email: uniqueKey}, { name: uniqueKey } ] } ))
//     console.log(existingUser);
//     if(err) return ReE(res, {message:'unable to fetch user'},err, httpStatus.INTERNAL_SERVER_ERROR)
//     if((!existingUser)){
//         return ReE(res, 'User not yet registered', httpStatus.BAD_REQUEST)
//     }
//     if((existingUser.password == null)){
//         return ReE(res, 'User not yet registered', httpStatus.BAD_REQUEST)
//     }

//     [err, compare] = await to(existingUser.comparePassword(password))
//     if(err) return ReE(res, {message:'unable to compare password'},err, httpStatus.INTERNAL_SERVER_ERROR)
//     if (!compare) {
//         return ReE(res,
//             {message: 'Invalid Username or password. please try again.'},
//              httpStatus.BAD_REQUEST)
//     }
    
//         [err, setActive] = await to(User.updateOne({email:existingUser.email},{$set:{active:true}}))
//         if(err) return ReE(res, {message:'unable to set active'},err, httpStatus.INTERNAL_SERVER_ERROR)

//         existingUser.password = undefined;
//         user={email:existingUser.email,uid:existingUser.uid}

//         return ReS(res,
//              {message:'signed In successfully',user:existingUser, token:existingUser.getJWT()},
//               httpStatus.OK )
 
   
// }


// module.exports.generateOTP =async (req, res) =>{
//     const body = req.body;
//     let  err, setOTP, existingUser,error,response,user;
//     let code = await authService.generateCode(body.email);
//     if(isNull(body.email)){
//         return ReE(res, {message:'please Enter Email'}, HttpStatus.BAD_REQUEST)
//     }
//     if(!isEmail(body.email)){
//         return ReE(res, {message:'please Enter Valid Email'}, HttpStatus.BAD_REQUEST)
//     }
//     [err, existingUser] = await to(User.findOne({email:body.email}))
//     if(!existingUser){
//         return ReE(res, {message:'user not registered'}, HttpStatus.BAD_REQUEST)
//     }

//     [err, setOTP] = await to(User.updateOne({email:existingUser.email},{$set:{otp:code,otpVerified:false }}))

//     if(err) return ReE(res, {message:'unable to set OTP'},err, HttpStatus.INTERNAL_SERVER_ERROR);
//     [err, user] = await to(User.findOne({email:existingUser.email}));
//     if(err) return ReE(res, {message:'unable to fetch user'},err, HttpStatus.INTERNAL_SERVER_ERROR);
//     [error, response] = 
//     await to (notificationService.sendEmail(user.email, {
//         subject: 'Confirm email',
//         body: '<!DOCTYPE html>\n' +
//             '<html>\n' +
//             '<body>\n' +
//             '<h1>YellowFie</h1>\n' +
//             `\tPlease use this otp to set New password ${user.otp}.\n` +
//             '</body>\n' +
//             '</html>\n',
//     }))

// if (error) return ReE(res, 'Cannot send email' + err.message,
//     HttpStatus.INTERNAL_SERVER_ERROR)

//     return ReS(res, {message:'otp generated successfully', 
//                         token:existingUser.getJWT(),
//                             otp: user.otp}, HttpStatus.OK)
    
    
// }
// module.exports.verifyOtp = async(req, res) =>{
//     console.log('kasdlksjdladlsak');
//     const body = req.body;
//     const decoded = req.user;
//     let user, err
   
//     if(body.otp !== decoded.otp) return ReE(res , {message:'OTP not match'}, httpStatus.BAD_REQUEST);
 
    
//     [err, user] = await to(User.updateOne({_id:decoded._id}, {$set:{otpVerified:true},$unset:{otp:''}}));

//     if(user) return ReS(res, {message:'otp verified'}, httpStatus.OK);
//     if(err) return ReE(res, {message:'unable to verify otp'},err, httpStatus.INTERNAL_SERVER_ERROR);
//     // [err, user] = await to(User.findOne({verifyCode:decoded.verifyCode}))
// }

// module.exports.updateForgotPassword = async(req, res) =>{
//     const body = req.body;
//    let decoded = req.user
//    let user, err, userObj
//     if(!decoded.otpVerified) return ReE(res, {message:'not yet verified code'}, httpStatus.BAD_REQUEST);

//     let fields = [
//         'password',
//         'confirmPassword'
//     ]

//     let invalidFields = fields.filter(field =>{
//         if(isNull(body[field])){
//             return true
//         }
//     })

//     if (invalidFields.length !== 0) {
//         return ReE(res, {message: `Please enter ${invalidFields}`},
//             HttpStatus.BAD_REQUEST)
//     }
//     if(body.password.length < 8) return ReE(res, {message:'please enter minimum 8 chractes'}, httpStatus.BAD_REQUEST);
    
//     if(body.password !== body.confirmPassword) return ReE(res, {message:'Password & confirm Password not matching'}, httpStatus.BAD_REQUEST);
//    userObj = decoded
//    userObj.password = body.password,
   
//    console.log('decoded',userObj);
//    [err, user] = await to(userObj.save())
//    if(user) return ReS(res, {message:'password updated Successfully'}, httpStatus.OK);
//    if(err) return ReE(res, {message:'unable to update password'},err, httpStatus.INTERNAL_SERVER_ERROR);

// }

// module.exports.logOut = async(req, res) =>{
//   let  decoded = req.user
//     let err, setActive;
//   [err, active] = await to( User.updateOne({email:decoded.email},{$set:{active:false}}))
//   if(err) return ReE(res, {message:'unable to log out'},err, httpStatus.INTERNAL_SERVER_ERROR)

//   return ReS(res, {message:'logged out successfully'}, httpStatus.OK)
// }

// module.exports.getUser = async(req, res) =>{
//     let  decoded = req.user;
//     decoded.password = undefined;
//     return ReS(res, {message:'user fetched successfully', user:decoded},
//     httpStatus.OK
//     )
// }

// module.exports.resendVerifyCode = async(req, res) =>{
//     let decoded = req.user
//     let setCode, err,  existingUser;

//     let code = await authService.generateCode(decoded.email);

//     [err, setCode] = await to(User.updateOne({email:decoded.email},{$set:{verifyCode:code}}))
//     if(err) return ReE(res, {message:'unable to update verifycode'},err, httpStatus.INTERNAL_SERVER_ERROR);

//     if(setCode.nModified === 0) return ReE(res, {message:'unable to change the code'}, httpStatus.BAD_REQUEST);

//     [err, existingUser] = await to(User.findOne({email:decoded.email}));
//     if(err) return ReE(res, {message:'unable to find user'},err, httpStatus.INTERNAL_SERVER_ERROR);

//     [err, response] = 
//     await to (notificationService.sendEmail(existingUser.email, {
//         subject: 'Confirm email',
//         body: '<!DOCTYPE html>\n' +
//             '<html>\n' +
//             '<body>\n' +
//             '<h1>YellowFie</h1>\n' +
//             `\tPlease use this otp to set New password ${existingUser.verifyCode}.\n` +
//             '</body>\n' +
//             '</html>\n',
//     }))

//     if(err) return ReE(res, {message:'unable to send code to email'},err, httpStatus.INTERNAL_SERVER_ERROR)
//     return ReS(res, {
//         message: 'Verification email sent.',
//         verifyCode:existingUser.verifyCode,
//                 token: existingUser.getJWT()
//     }, httpStatus.OK)
    
// }

// module.exports.resendOtp = async(req, res) =>{
//     let decoded = req.user
//     let setOtp, err, existingUser;

//     let code = await authService.generateCode(decoded.email);

//     [err, setOtp] = await to(User.updateOne({email:decoded.email},{$set:{otp:code}}))
//     if(err) return ReE(res, {message:'unable to update OTP'},err, httpStatus.INTERNAL_SERVER_ERROR);

//     if(setOtp.nModified === 0) return ReE(res, {message:'unable to change the code'}, httpStatus.BAD_REQUEST);

//     [err, existingUser] = await to(User.findOne({email:decoded.email}));
//     if(err) return ReE(res, {message:'unable to find user'},err, httpStatus.INTERNAL_SERVER_ERROR);

//     [err, response] = 
//     await to (notificationService.sendEmail(existingUser.email, {
//         subject: 'Confirm email',
//         body: '<!DOCTYPE html>\n' +
//             '<html>\n' +
//             '<body>\n' +
//             '<h1>YellowFie</h1>\n' +
//             `\tPlease use this otp to set New password ${existingUser.otp}.\n` +
//             '</body>\n' +
//             '</html>\n',
//     }))

//     if(err) return ReE(res, {message:'unable to send code to email'},err, httpStatus.INTERNAL_SERVER_ERROR)
//     return ReS(res, {
//         message: 'Verification email sent.',
//         verifyCode:existingUser.otp,
//                 token: existingUser.getJWT()
//     }, httpStatus.OK)
    
// }

// module.exports.setUserType = async(req, res) =>{
//     let decoded = req.user;
//     let body = req.body;
//     let err, setType, user;
//     let stringEmail
//     let data
//      if(isNull(body.type)) return ReE(res, {message:'please Select a user type'}, httpStatus.BAD_REQUEST);
//      [err, user] = await to(User.findOne({email:decoded.email}))
//      if(!user.password) return ReE(res, {message:'user not regstered yet'}, httpStatus.BAD_REQUEST);
//      if(!CONFIG.userType.includes(body.type)) return ReE(res, {message:'please enter valid type'}, httpStatus.BAD_REQUEST);
     
//      [err, setType] = await to(User.updateOne({email:decoded.email}, {$set:{type:body.type, active:true}}))
//      if(err) return  ReE( res, {message:'unable to fetch user'},err, httpStatus.INTERNAL_SERVER_ERROR)
    
//      if(setType.nModified === 0) return ReE(res, {message: 'unable to set type'}, httpStatus.BAD_REQUEST)
 
    
//      if(err) return  ReE( res, {message:'unable to fetch user'},err, httpStatus.INTERNAL_SERVER_ERROR)

     
//         return ReS(res, { message: "Register Successfully" ,token: user.getJWT()}, HttpStatus.OK)
    
  
// }


// module.exports.update = async function (req, res) {
//     let err, user, data
//     user = req.user
//     data = req.body

//     CONFIG.editableUserFields.forEach(function (field) {
//         if (typeof field === 'string' && data[field] !== undefined) {
//             user[field] = data[field]
//         }
//     });

//     [err, user] = await to(user.save())
//     if (err) {
//         return ReE(res, err, 400)
//     }
//     return ReS(res,
//         {
//             message: 'Updated User.',
//             user: user,
//         }, HttpStatus.OK,
//     )
// }
