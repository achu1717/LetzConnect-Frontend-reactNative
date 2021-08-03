require('dotenv').config()//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.app = process.env.APP || 'development'
CONFIG.port = process.env.PORT || '3200'
CONFIG.db_uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/letsConnect'
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || "Let'sConnect"
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000'
CONFIG.userType=['Working','Fresher']
CONFIG.gender=['Male','Female']
CONFIG.editableUserFields=['full_name','education','type','phone','password','address','gender','DOB']

// CONFIG.send_email = process.env.SEND_EMAIL || 'true'

// CONFIG.mg_key = 'bb079f6d9778957e26f2d4fb2aa55594-d5e69b0b-d5134081'
// CONFIG.mg_domain = 'sandbox5811dc2384894e7caa482e15683b0343.mailgun.org'



module.exports = CONFIG